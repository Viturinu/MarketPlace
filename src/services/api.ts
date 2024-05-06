import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";
import { SignOut } from "phosphor-react-native";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
    interceptor: (signOut: SignOut) => () => void;
}

export const api = axios.create({
    baseURL: "http://10.0.0.103:3333"
}) as APIInstanceProps;

api.interceptor = (signOut) => { //essa função 'interceptor' tipada acima é apenas para podermos passar a função de SignOut no contexto, caso contrario aqui mesmo, sem a função interceptor, poderiamos fazer as tratativas de resposta
    const interceptManager = api.interceptors.response.use(response => response, async (RequestError) => { //primeiro parametro serve pra tratar respostas bem sucedidas (2xx), já o segundo para tratar respostas de erros (4xx, 5xx)
        if (RequestError.response.status === 400) {//erro de autorização
            if (RequestError.response.data.message === "Informe o refresh token." || RequestError.response.data.message === "token.expired" || RequestError.response.data.message === "token.invalid") { //interceptTokenManager é referência do nosso interceptador, para passar pra função reject logo abaixo
                const { refresh_token } = await storageAuthTokenGet(); //resgatando nosso refresh_token aramazenado no AsyncStorage (para recuperação de token novo) (se tiver)

                if (refresh_token) {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const { data } = await api.post("/sessions/refresh-token", { refresh_token }); //resgata novo token e refresh_token no objeto data retornado da api

                            if (data.status === "error") {
                                return signOut(); //caso dê erro na requisição (token invalidado, por exemplo, ele retorna)
                            }

                            await storageAuthTokenSave({ token: data.token, refresh_token }) // se não retornou, vai usar mesmo refresh token, pois estamos usando o metodo de refresh token convencional, não o rotation
                            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; //garantir que todas as futuras requisições usem o novo token válido para autenticação

                        } catch (error) {
                            signOut();
                            console.log(error);
                            reject(error);
                        }
                    })
                }

            }

            signOut(); //vai entrar aqui apenas no caso de não retornar a promessa acima;
        }
        //se erro diferente de status = 400, então faça abaixo
        if (RequestError.response && RequestError.response.data) { //padrão utilizado na api, logo estamos verificando se aquilo que fizemos na api está caindo aqui, com a mensagem padronizada pela api em uma condicional (se cair, foi aquele erro lá que deu)
            return Promise.reject(new AppError(RequestError.response.data.message)); //estamos rejeitando (como se fosse jogando pro catch da instrução que chamou (toda Promisse é assim Promisse(resolve, reject))) a promisse e passando essa promisse para um novo padrão de mensagem de erro/excessão
        } else { //error.response.data é um padrão seguido, pois no backend só existe um lançamento de excessão com uma class AppError e sua mensagem e statusCode; já aqui no mobile pegamos dessa forma (error.response.data) logo, é um padrão a ser seguido (inferência)
            return Promise.reject(RequestError); //aqui é um erro genérico, pois se não existem RequestError.response, logo manda promise com toda a resposta errada que veio da api (status, data, header, etc), RequestError.response.data, logo RequestError.response.data.message então é um erro feito pelo servidor (talvez pelo fastify ou express, a depender do framework)
        }
    })

    return () => {
        api.interceptors.response.eject(interceptManager);//essa função retornada será executada na reexecução do useEffect por alguma alteração nas dependências ou na desmontagem do componente, essa função fica alocada em subscribe lá no useEffect, e está presente no return do useEffect (por isso esse comportamento)
    }
}