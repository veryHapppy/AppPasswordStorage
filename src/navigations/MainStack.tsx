import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens";
import { MainStackParamList } from "./type";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={Login} 
                options={{
                    headerTitle: '비밀번호 저장소',
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={24}
                            onPress={() => {}}
                        />
                    ),
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name="menu"
                            size={24}
                            onPress={() => {}}
                        />
                    ),
                }}/>
        </Stack.Navigator>
    );
};

export default MainStack;