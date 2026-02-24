import styled from "styled-components/native";

const Container = styled.View`
    width: 100%;
    align-items: flex-start;
    paddingHorizontal: 16px;
`;

interface TextProps {
    done?: boolean,
    warning?: boolean,
    text?: string
}
const StyledText = styled.Text<TextProps>`
    font-size: 16px;
    color: ${({ theme, done, warning}) => warning ? theme.errorText : (done ? theme.text : theme.checkText)};
    font-family: ${({ theme }) => theme.fonts.bold};
    paddingVertical: 4px;
`;

const Text = ({done=true, warning=false, text}: TextProps) => {
    return (
        <Container>
            <StyledText done={done} warning={warning}>
                {text}
            </StyledText>
        </Container>
    );
};

export default Text;