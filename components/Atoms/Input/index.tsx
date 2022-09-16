import { FC } from "react";

// atoms
import * as Atom from "./atoms";

// types
import { IInputProps } from "./types";

// ::
const Input: FC<IInputProps> = ({ label, ...rest }) => {
  return (
    <Atom.InputContainer>
      {label && (
        <label>
          <span>{label}</span>
        </label>
      )}
      <Atom.InputComponent {...rest} />
    </Atom.InputContainer>
  );
};

export default Input;
