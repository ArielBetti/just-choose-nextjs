import { FC } from "react";

import * as Atom from "./atoms";
import { IButtonProps } from "./types";

const Button: FC<IButtonProps> = ({
  textColor,
  children,
  onClick,
  feedback,
  variant,
  bold,
  ...rest
}) => {
  if (variant === "secondary") {
    return (
      <Atom.SecondaryButton
        {...rest}
        feedback={feedback}
        onClick={onClick}
        textColor={textColor}
      >
        {children}
      </Atom.SecondaryButton>
    );
  }

  return (
    <Atom.Button
      {...rest}
      feedback={feedback}
      onClick={onClick}
      textColor={textColor}
      bold={bold}
    >
      {children}
    </Atom.Button>
  );
};

export default Button;
