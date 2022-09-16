import styled from "styled-components";

export const IconCard = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props?.theme?.colors?.pure};
  padding: 10px;
  height: 100%;
  border-radius: 5px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  cursor: pointer;
`;
