import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props?.theme?.colors?.neutral?.pure};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 600px;
  position: relative;
`;

export const CardContent = styled.div`
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  position: relative;
  padding: 10px;
`;

export const Question = styled.h1`
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`;

export const ButtonPosition = styled.div<{
  transformButton: boolean;
  left: number;
  bottom: number;
  top: number;
  right: number;
  scapeActive: boolean;
}>`
  position: ${(props) => (props?.transformButton ? "absolute" : "initial")};
  top: ${(props) => props?.top || 0}%;
  left: ${(props) => props?.left || 0}%;
  right: ${(props) => props?.right || 0}%;
  bottom: ${(props) => props?.bottom || 0}%;
  order: ${(props) => (props?.scapeActive ? -1 : 0)};
  width: ${(props) => (props?.scapeActive ? "60px" : "auto")};
  height: ${(props) => (props?.scapeActive ? "60px" : "auto")};
`;
