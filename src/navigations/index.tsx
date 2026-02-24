import { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import MainStack from "./MainStack";

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#ffffff',
    },
};

const Navigation = () => {
    return (
        <NavigationContainer theme={navTheme}>
            {<MainStack />}
        </NavigationContainer>
    );
};

export default Navigation;