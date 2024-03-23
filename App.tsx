import { useFonts } from 'expo-font';
import { Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla"
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, theme, Text } from 'native-base';
import { SignIn } from '@screens/SignIn';
import { Loading } from '@components/Loading';

export default function App() {
  let [fontsLoaded] = useFonts({
    Karla_400Regular, Karla_700Bold
  });
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        style='dark'
        backgroundColor='transparent'
        translucent
      />
      <Text>Teste</Text>
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}
