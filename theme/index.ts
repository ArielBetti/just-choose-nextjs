import { DefaultTheme } from "styled-components";
import merge from "deepmerge";

import { dark } from "./default";
import { ligth } from "./ligth";

const selectTheme = (theme: string): DefaultTheme => {
  let selectedTheme;

  switch (theme.toLowerCase()) {
    case "ligth":
      selectedTheme = ligth();
      break;

    default:
      selectedTheme = {};
      break;
  }

  const overwriteMerge = (
    __destinationArray: any,
    sourceArray: any,
    __options: any
  ) => sourceArray;

  return merge(dark(), selectedTheme, {
    arrayMerge: overwriteMerge,
  });
};

export default selectTheme;
