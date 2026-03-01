import { useEffect } from "react";
import { StatusBar} from "react-native";
import { ThemeProvider } from 'styled-components/native';
import { theme } from "./theme";
import Navigation from "./navigations";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from "react-native-encrypted-storage";
import MobileAds from "react-native-google-mobile-ads";

const App = () => {
    useEffect(() => {
        const checkData = async () => {
            try {
                const adapterStatuses = await MobileAds().initialize();
                console.log('광고 초기화 완료:', adapterStatuses);

                const hasLaunchedBefore = await AsyncStorage.getItem('hasLaunchedBefore');

                if (hasLaunchedBefore === null) {
                    await EncryptedStorage.clear();

                    await AsyncStorage.setItem('hasLaunchedBefore', 'true');
                    console.log('신규 설치: 데이터 초기화 완료');
                }
            } catch (e) {
                console.error('초기화 실패', e);
            }
        };

        checkData();
    }, []);
    
    return (
        <ThemeProvider theme={theme}>

            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Navigation />
            <Toast />
        </ThemeProvider>
    );
};

export default App;