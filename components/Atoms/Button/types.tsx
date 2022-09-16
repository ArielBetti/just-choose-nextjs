import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  textColor?: "light" | "dark" | undefined;
  variant?: "secondary" | "primary";
  feedback?: TButtonFeedback;
  onClick: (e?: any) => void | any;
  bold?: boolean;
}

export type TButtonFeedback = "error" | "success" | "info" | "warning";
