import styled from "@emotion/styled";

export const HeaderWrapperStyled = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 150px;
  background-image: url(${({ backgroundImg }) => backgroundImg});
  background-size: cover;
  background-color: ${({ theme }) => theme.noColor};
  z-index: 1000;
  transition: 0.3s ease-in-out all;
`;

export const HeaderStyled = styled.div`
  position: relative;
  display: flex;
  height: 68px;
  align-items: center;
  justify-content: start;
  padding: 0 23px;
  border-bottom: ${({ theme, backgroundImg }) =>
    !backgroundImg && `1px solid ${theme.elevationOneBorderNormal}`};

  > div {
    margin-left: 16px;
  }
`;

export const HeaderContentStyled = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchInputStyled = styled.input`
  cursor: pointer;
  width: 100%;
  height: 36px;
  padding: 8px 16px;
  border-radius: 4px;
  outline: none;
  font-size: 15px;
  background: ${({ theme }) => theme.fieldBodyDisabled};
  color: ${({ theme }) => theme.primary};

  &::placeholder {
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.tertiary};
  }
`;

export const SearchIconStyled = styled.span`
  position: absolute;
  z-index: 1;
  right: 16px;
  top: 8px;
`;
