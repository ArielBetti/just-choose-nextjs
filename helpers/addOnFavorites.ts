import { Dispatch, SetStateAction } from "react";
import { ObjectId } from "mongoose";
import { notificationPush } from "./notificationPush";
import { IQuestion, TQuestions } from "../interfaces";

export const onAddFavorites = (
  id: ObjectId | string,
  newsState: IQuestion,
  state: TQuestions,
  setState: Dispatch<SetStateAction<any>>
) => {
  if (!state?.find((item) => item?.id === id)) {
    if (state) {
      setState([...state, newsState]);
    } else {
      setState([newsState]);
    }

    notificationPush("info", "Proposta adiciona aos favoritos!");
  } else {
    notificationPush("warning", "Essa proposta já esta nos seus favoritos");
  }
};
