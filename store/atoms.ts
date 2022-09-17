import { atom } from "recoil";
import { localStorageEffect } from "../helpers/localStorageEffects";

import { IQuestion, TQuestions } from "../interfaces";

const localStorage = typeof window !== `undefined` ? window.localStorage : null;

export const atomFavorites = atom<TQuestions | undefined>({
  key: "atomFavorites",
  default: [],
  effects: [localStorageEffect("current_favorites")],
});

export const atomNewQuestion = atom<IQuestion>({
  key: "atomNewQuestion",
  default: undefined,
});
