import { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { useRoute } from '@react-navigation/native';
import { Buffer } from '@craftzdog/react-native-buffer';
import { Button } from "../components";
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
    flex: 1;

`;

const HeaderContainer = styled.View`
    width: 100%;
    flex-direction: column;
    padding: 32px;
`;

const AddButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.buttonBackgroundActivated};
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    margin-left: 32px;
`;

const ButtonText = styled.Text`
    font-size: 32px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.bold};
`;


const Main = () => {
    const route = useRoute<any>();
    const masterKey = Buffer.from(route.params.masterKey, 'hex');
    const [sort, setSort] = useState(true); //true: 날짜순, false: 이름순
    const navigation = useNavigation<any>();


    return (
        <Container>
            <HeaderContainer>
                <View style={{ width: 120, flexDirection: 'row'}}>
                    <Button 
                        text="날짜순" 
                        activated={sort} 
                        onPress={() => setSort(true)} 
                        disabled={false}
                    />
                    <Button 
                        text="이름순" 
                        activated={!sort} 
                        onPress={() => setSort(false)}
                        disabled={false}
                    />
                    <AddButton
                        onPress={() => navigation.navigate('SiteMod', { masterKey: masterKey.toString('hex')})}
                    >
                        <ButtonText>+</ButtonText>
                    </AddButton>
                </View>

            </HeaderContainer>
            <Text>{masterKey}</Text>
        </Container>
    );
};

export default Main;