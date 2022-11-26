import { createStitches } from "@stitches/react";

type FlexParam = {
  dir: "column" | "row" | "colunm-reverse" | "row-reverse";
  ai: "cetner" | "end" | "start";
  jc: "";
};

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      gray400: "gainsboro",
      gray500: "lightgray",
    },
  },
  utils: {
    marginX: (value: string) => ({ marginLeft: value, marginRight: value }),
    flexX: ({ dir = "row", ai = "cetner" }: FlexParam) => ({
      display: "flex",
      flexDirection: dir,
      justifyContent: "",
    }),
  },
});
