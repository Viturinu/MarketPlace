import { useFonts } from 'expo-font';
import { Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla"
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { SignIn } from '@screens/SignIn';
import { Loading } from '@components/Loading';
import { THEME } from 'src/theme';

export default function App() {
  let [fontsLoaded] = useFonts({
    Karla_400Regular, Karla_700Bold
  });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        style='dark'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}
