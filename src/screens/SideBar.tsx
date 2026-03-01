import styled from "styled-components/native";
import EncryptedStorage from 'react-native-encrypted-storage';
import { Alert, Share, Platform, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNFS from 'react-native-fs';
//import DocumentPicker from 'react-native-document-picker';

const Container = styled.View`
    flex: 1;
    padding: 32px;
    margin-top: 80px;
`;

const TextContainer = styled.TouchableOpacity`
    width: 100%;
    margin-bottom: 60px;
`;

const StyledText = styled.Text`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.black };
    font-family: ${({ theme }) => theme.fonts.light};
    paddingVertical: 4px;
`;

const SideBar = () => {
    const navigation = useNavigation<any>();

    const APP_FOLDER_NAME = "PasswordStorage";
    const folderPath = `${RNFS.ExternalStorageDirectoryPath}/${APP_FOLDER_NAME}`;


    const _handleExtract = async () => {
        const authData = await EncryptedStorage.getItem("user_auth");
        const vaultData = await EncryptedStorage.getItem("vault_list");

        if (!authData && !vaultData) {
            Alert.alert("알림", "추출할 데이터가 존재하지 않습니다.");
            return;
        }

        const backup = {
            exportDate: new Date().toISOString(),
            auth: authData ? JSON.parse(authData) : null,
            vault: vaultData ? JSON.parse(vaultData) : []
        };

        const backupString = JSON.stringify(backup, null, 2);

        const fileName = `PasswordStorage_Backup_${new Date().getTime()}.json`;
        const path = `${RNFS.CachesDirectoryPath}/${fileName}`;

        // 3. 파일 쓰기
        await RNFS.writeFile(path, backupString, 'utf8');

        const shareOptions = {
            title: '백업 파일 저장',
            url: Platform.OS === 'android' ? `file://${path}` : path,
            type: 'application/json',
        };

        await Share.share(shareOptions);
    };

    const _handleLoad = async () => {
        /*
        try {
            const res = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.allFiles], // 혹은 [DocumentPicker.types.json]
        });

        // res.uri를 RNFS.readFile로 넘겨서 데이터 복구 진행
        const fileContent = await RNFS.readFile(res.uri, 'utf-8');const backupData = JSON.parse(fileContent);

            if (!backupData.auth || !backupData.vault) {
                throw new Error("올바른 백업 파일 형식이 아닙니다.");
            }

            //todo




        } catch (e) {
            console.log('데이터 불러오기 실패: ', e);
        }
            */
    };

    const _handleInit = () => {
            Alert.alert("정말 초기화 하시겠습니까?", "삭제된 데이터는 복구할 수 없습니다.",
                [
                    {
                        text: "취소",
                        onPress: () => console.log("취소됨"),
                        style: "cancel"
                    },
                    {
                        text: "초기화하기",
                        onPress: () => confirmInit(),
                        style: "destructive"
                    }
                ],
                { cancelable: false }
            );
        };

    const confirmInit = async () => {

        try {
            await EncryptedStorage.clear();
            console.log('데이터가 삭제되었습니다.');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Signup' }],
            });

        } catch (e) {
            console.log('초기화 에러: ',e);
        }
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
        <Container>
            <TextContainer
                onPress={_handleInit}>
                <StyledText >데이터 초기화</StyledText>
            </TextContainer>
            <TextContainer
                onPress={_handleTerms}>
                <StyledText >이용약관 및 개인정보 처리방침</StyledText>
            </TextContainer>
        </Container>
    );
};

export default SideBar;

/*
return (
        <Container>
            <TextContainer
                onPress={_handleExtract}>
                <StyledText >데이터 추출</StyledText>
            </TextContainer>
            <TextContainer
                onPress={_handleLoad}>
                <StyledText >데이터 불러오기</StyledText>
            </TextContainer>
            <TextContainer
                onPress={_handleInit}>
                <StyledText >데이터 초기화</StyledText>
            </TextContainer>
            <TextContainer
                onPress={_handleTerms}>
                <StyledText >이용약관 및 개인정보 처리방침</StyledText>
            </TextContainer>
        </Container>
    );
*/