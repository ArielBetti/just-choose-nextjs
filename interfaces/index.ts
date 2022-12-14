import { ObjectId } from "mongoose";

export type TJustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "initial"
  | "inherit";

export type TAlignItems =
  | "stretch"
  | "center"
  | "flex-start"
  | "flex-end"
  | "baseline"
  | "initial"
  | "inherit";

export interface IFlexBoxProps {
  direction: "row" | "column";
  justify: TJustifyContent;
  align: TAlignItems;
  width?: "xsm" | "sm" | "md" | "lg" | "xl";
  gap?: "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
}

export interface IQuestion {
  id: ObjectId | string;
  name: string;
  url: string;
}

export interface IEndpointQuestion {
  _id: ObjectId | string;
  question: string;
  answers: number;
}

export type TQuestions = IQuestion[];
