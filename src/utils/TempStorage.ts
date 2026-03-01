// 메모리에만 존재하며 앱 종료 시 사라지는 임시 공간입니다.
let tempPassword = "";

export const setTempPassword = (pw: string) => { tempPassword = pw; };
export const getTempPassword = () => tempPassword;
export const clearTempPassword = () => { tempPassword = ""; };