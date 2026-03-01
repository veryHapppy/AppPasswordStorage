import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Signup, ConfirmPW, Main, SiteMod, Login, Site, SideBar, AuthLoading } from "../screens";
import { MainStackParamList } from "./type";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import EncryptedStorage from "react-native-encrypted-storage";
import { AppState, AppStateStatus } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator
            initialRouteName="AuthLoading"
            screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitle: '비밀번호 저장소',
                    headerTitleStyle: {
                        fontFamily: theme?.fonts.bold,
                        fontSize: 24,
                    },
                    
                    headerTitleContainerStyle: {
                        marginHorizontal: 0,
                        left: 0,
                        right: 0,
                    },
                    headerLeftContainerStyle: { 
                        width: 48,
                        paddingLeft: 16,
                    },
                    headerRightContainerStyle: {
                        paddingRight: 16,
                    },
                }}
        >
            
            <Stack.Screen name="AuthLoading" component={AuthLoading} />
            
                
            <Stack.Screen name="Signup" component={Signup} options={{
                gestureEnabled: false
            }}/>
            <Stack.Screen name="ConfirmPW" component={ConfirmPW} />
            
            <Stack.Screen name="Login" component={Login} options={{
                gestureEnabled: false,
                headerRight: () => (
                <MaterialCommunityIcons
                    name="menu"
                    size={24}
                    onPress={() => navigation.navigate('SideBar')}
                />
            ),
            }} />

            <Stack.Screen name="Main" component={Main} options={{
                headerRight: () => (
                <MaterialCommunityIcons
                    name="menu"
                    size={24}
                    onPress={() => navigation.navigate('SideBar')}
                />
            ),
            }}/>
            
            <Stack.Screen name="SiteMod" component={SiteMod} />
            <Stack.Screen name="Site" component={Site} options={{
                headerRight: () => (
                <MaterialCommunityIcons
                    name="menu"
                    size={24}
                    onPress={() => navigation.navigate('SideBar')}
                />
            ),
            }}/>
            <Stack.Screen name="SideBar" component={SideBar} options={{ 
                headerStyle: {
                    elevation: 0,       // 안드로이드에서 선(그림자) 제거
                    shadowOpacity: 0,    // iOS에서 선(그림자) 제거
                    borderBottomWidth: 0, // 일부 환경에서의 하단 테두리 제거
                    },
                }}
            />
        </Stack.Navigator>
    );
};

export default MainStack;

/*
options={{
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
                }}   
*/                    