import { useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import { useNavigation } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";

const AuthLoading = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
            const checkAuth = async () => {
                try {
                    const authData = await EncryptedStorage.getItem("user_auth");
                    if (authData) {
                        navigation.replace('Login');
                    } else {
                        navigation.replace('Signup');
                    }
                } catch (e) {
                    console.log('데이터 조회 실패:', e);
                    navigation.replace('Signup');
                }
            };
    
            checkAuth();
        }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" /> 
        </View>
    )
};

export default AuthLoading;