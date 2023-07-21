import styled from "@emotion/styled";
import { Checkbox } from "../selection";
import { Headline5, Typography } from "../typography";

export const SwitchStyled = styled(Checkbox)`
  & ~ p {
    margin-left: 0;
    padding-left: 0 !important;
  }
`;

export const SwitchRowStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;

  :first-child {
    padding-top: 16px;
  }

  :last-child {
    padding-bottom: 0;
  }
`;

export const HeadlineStyled = styled(Headline5)`
  line-height: 24px;
`;

export const TypographyStyled = styled(Typography)`
  font-size: 14px;
  line-height: 18px;
`;

export const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const InfoStyled = styled.div`
  margin-left: 16px;
`;
