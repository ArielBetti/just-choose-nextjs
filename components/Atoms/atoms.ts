import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { IFlexBoxProps } from "../../interfaces";

export const FlexBox = styled.div<IFlexBoxProps>`
  display: flex;
  justify-content: ${(props) => props?.justify};
  align-items: ${(props) => props?.align};
  flex-direction: ${(props) => props?.direction};
  max-width: ${(props) =>
    props?.width ? props?.theme?.breakpoints?.[props?.width] : "100%"};
  width: 100%;
  gap: ${(props) => (props?.gap ? props?.theme?.spacing?.[props?.gap] : 0)};
`;

export const AppToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  .Toastify__toast {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  }
  .Toastify__progress-bar {
    background-color: ${(props) => props?.theme?.colors?.primary};
  }
`;

export const SkeletonContainer = styled.div`
  width: 100%;
  span {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    justify-content: flex-start;
    min-width: 100%;
  }
`;
