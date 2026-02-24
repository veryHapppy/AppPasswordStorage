import styled from "styled-components/native";
import { TextInput as RNTextInput } from 'react-native';

interface TextInputProps {
    stroke?: boolean,
    fontSize?: number,
    placeholder?: string,
    value?: string,
    onChangeText?: (text:string) => void;
    inputRef?: React.RefObject<RNTextInput>;
};
const StyledInput = styled.TextInput.attrs<TextInputProps>(({ theme }) => ({
    placeholderTextColor: theme.textInputPlaceholder,
}))<TextInputProps>`
    width: 100%;
    padding: 16px;
    border-width: 1px;
    border-color: ${({ theme, stroke}) => stroke ? theme.textInputStroke : theme.textInputNonStroke};
    font-size: ${({fontSize}) => fontSize}px;
    include-font-padding: false;
    text-align-vertical: top;
    height: 100px;
`;


const TextInput = ({stroke=true, fontSize=16, placeholder, value, onChangeText, inputRef}: TextInputProps ) => {
    return (
        <StyledInput
            stroke={stroke}
            fontSize={fontSize}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            multiline={true}
            ref={inputRef}
        />
    );
};

export default TextInput;

