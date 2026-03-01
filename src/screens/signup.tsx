import { Button, TextInput, Text } from '../components'
import { useState, useRef } from 'react';
import styled from "styled-components/native";
import { Linking, Alert, Keyboard, TouchableWithoutFeedback, View, TextInput as RNTextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = styled.View`
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
`;

const TermContainer = styled.TouchableOpacity`
    
`;

const StyledText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fonts.bold};
    paddingVertical: 4px;
`;

const Signup = () => {
    const navigation = useNavigation<any>();
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const inputRef = useRef<any>(null);

    const handleFocusOut = () => {
        Keyboard.dismiss();
        inputRef.current?.blur();
    };

    const pwConfirm = (pw: string) => {
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/;
        
        return (pwRegex.test(pw) && checked);
    };

    const _handleTerms = async () => {
        const url = "https://marmalade-locket-e42.notion.site/31574db951cd806c9bafd55ab4228fcf";
        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("해당 주소를 열수 없습니다.", "개발자에게 문의해 주세요");
            }
        } catch (e) {
            console.error("링크 열기 에러: ", e);
            Alert.alert("해당 주소를 열수 없습니다.", "개발자에게 문의해 주세요");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handleFocusOut} accessible={false} >
            <Container>
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 32,
                        justifyContent: 'center'
                    }}>
                        
                    <Text warning={true} text="추후에 변경할 수 없습니다!!!"/>
                    <TextInput 
                        ref={inputRef}
                        value={password}
                        onChangeText={(text) => {
                            const filter = text.replace(/[^A-Za-z0-9@$!%*#?&]/g, '');
                            setPassword(filter);
                        }}
                        placeholder='앱에서 사용할 비밀번호를 입력해 주세요.'
                        stroke={false}
                        fontSize={24}
                    />
                </View>
                <View style={{flex:1, paddingHorizontal: 32,}}>
                    <Text done={false} text="* 6 ~ 16자리"/>
                    <Text done={false} text="* 알파벳, 숫자, 특수기호 모두 포함"/>
                    <Text warning={true} text="꼭 기억해 주세요. 보안의 핵심입니다."/>
                </View>
                <View style={{flex:1}}/>
                <View style={{ width:"100%", flexDirection:"row", gap:4, paddingStart: 36, alignItems:'center', marginVertical: 48}}>
                    <TermContainer onPress={() => setChecked(!checked)}>
                        <Icon
                            name={checked ? "checkbox-marked" : "checkbox-blank-outline"}
                            size={30}
                            color={checked ? "#2ecc71" : "#bdc3c7"}
                        />
                    </TermContainer>
                    <TermContainer onPress={_handleTerms}>
                        <StyledText>이용약관 및 개인정보처리방침 (내용보기)</StyledText>
                    </TermContainer>
                </View>
                <Button 
                    text='확인'
                    activated={pwConfirm(password)}
                    onPress={() => navigation.navigate('ConfirmPW', {password: password})}
                />
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default Signup;