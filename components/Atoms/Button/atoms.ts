import styled, { DefaultTheme } from "styled-components";
import { IButtonProps, TButtonFeedback } from "./types";

export const changeTextColor = (
  theme: DefaultTheme,
  text: "light" | "dark" | undefined
) => {
  switch (text) {
    case "light":
      return theme?.font?.colors?.white;
    case "dark":
      return theme?.font?.colors?.dark;
    default:
      return theme?.font?.colors?.pure;
  }
};

export const changeFeedback = (
  theme: DefaultTheme,
  type: TButtonFeedback | undefined
) => {
  switch (type) {
    case "error":
      return theme?.colors?.feedback?.error;
    case "success":
      return theme?.colors?.feedback?.success;
    case "warning":
      return theme?.colors?.feedback?.warning;
    case "info":
      return theme?.colors?.feedback?.info;
    default:
      return theme?.colors?.primary;
  }
};

export const Button = styled.button<Partial<IButtonProps>>`
  font-weight: ${(props) => (props?.bold ? "bold" : "normal")};
  background-color: ${(props) => changeFeedback(props?.theme, props?.feedback)};
  color: ${(props) => changeTextColor(props?.theme, props?.textColor)};
  font-size: 16px;
  border: none;
  padding: 10px 15px;
  min-width: 60px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  :disabled {
    background-color: ${(props) => props?.theme?.colors?.neutral?.[1]};
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button<Partial<IButtonProps>>`
  font-weight: ${(props) => (props?.bold ? "bold" : "normal")};
  background-color: transparent;
  color: ${(props) => changeTextColor(props?.theme, props?.textColor)};
  font-size: 16px;
  border: 2px solid ${(props) => changeFeedback(props?.theme, props?.feedback)};
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  :disabled {
    border: 2px solid ${(props) => props?.theme?.colors?.neutral?.[1]};
    cursor: not-allowed;
  }
`;
