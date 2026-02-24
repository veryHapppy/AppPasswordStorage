import { Buffer } from '@craftzdog/react-native-buffer';

export type MainStackParamList = {
  "Login": undefined;
  "site": undefined;
  "sideBar": undefined;

  "Signup": undefined;
  "ConfirmPW": {password: string};
  "Main": {masterKey: string};
  "SiteMod": {masterKey: string};
  //Chat: { roomID: string }; 
};