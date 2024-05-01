import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { AppError } from "@utils/AppError";
import { useToast } from "native-base";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextProviderProps = {
    children: ReactNode;
}

export type AuthContextProps = {
    user: UserDTO,
    isLoadingUserStorageData: boolean,
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState<UserDTO>({} as UserDTO) //estado que ficara em nosso contexto, para manipulação e re-renderização a qualquer tempo
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(false);

    const toast = useToast();

    async function userAndTokenUpdate(userData: UserDTO, token: string) { //vai atualizar os estados e cabeçalho de requisições da aplicação tanto na reinicialização quanto no login ()
        //took out try catch cause it is just an update info according to teacher
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;//definindo o headers com a recuperação do api.post
        setUser(userData); //definindo o estado com a recuperação do api.post
    }

    async function updateUserProfile(userUpdate: UserDTO) { //pra atualizar no handleUserPhotoSelected() e no handleUserUpdate()
        try {
            setUser(userUpdate);
            await storageUserSave(userUpdate);
        } catch (error) {
            throw error;
        }
    }

    async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) { //vai salvar no AsyncStorage pra persistir os dados no mobile
        try {
            setIsLoadingUserStorageData(true);
            await storageUserSave(userData); //gravando no Async
            await storageAuthTokenSave({ token, refresh_token }); //gravando no Async -> frufru na minha opiniao; podia ser feito aqui mesmo;
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function signIn(email: string, password: string) { //ao inves de mandar setUser pra outra tela, a gente centraliza a lógica toda aqui nesse contexto, mandando o signIn (setUser() fica dentro do signIn()) apenas.

        try {
            const { data } = await api.post("/sessions", { //chama API pra buscar as informações
                email,
                password
            });

            if (data.user && data.token && data.refresh_token) { //check se voltou os resultados de usuario, token e refresh_token de usuário

                setIsLoadingUserStorageData(true);

                await storageUserAndTokenSave(data.user, data.token, data.refresh_token); //salva os dados no AsyncStorage
                await userAndTokenUpdate(data.user, data.token); //salva as variáveis nos estados
            }
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível realizar essa operação agora."

            toast.show({
                title,
                placement: "top",
                bgColor: "red.700"
            })
        } finally {
            setIsLoadingUserStorageData(false);
        }

    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true)
            //Atualiza os estados pra vazios
            setUser({} as UserDTO);
            //Remove do AsyncStorage os dados de usuário e token de usuário
            await storageAuthTokenRemove(); //excluindo do Async Storage
            await storageUserRemove(); //excluindo do Async Storage
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true);

            const user = await storageUserGet();
            const { token } = await storageAuthTokenGet();

            if (user && token) userAndTokenUpdate(user, token);
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }
    //na reinicialização do app, a gente então carrega os dados do usuário do Storage, se houver, e aplica o interceptor passando a função de signOut exigida por parâmetro
    useEffect(() => {
        loadUserData();
    }, [])

    useEffect(() => {
        const subscribe = api.interceptor(signOut); //aqui temos acesso a função de signOut, lá no api.ts nós não temos; portanto, passamos ela aqui no AuthContext. Aqui acontece a execução do interceptor;
        return () => {
            subscribe(); //No React, quando você usa o useEffect, você pode retornar uma função que será executada quando o componente for desmontado, o que é conhecido como uma "função de limpeza" ou "cleanup function". Essa função de limpeza é opcional e é usada para limpar quaisquer efeitos secundários gerados pelo código dentro do useEffect antes que o componente seja removido do DOM.
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoadingUserStorageData,
                signIn,
                signOut,
                updateUserProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}