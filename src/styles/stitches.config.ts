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
    mx: (value: number) => ({ marginLeft: value, marginRight: value }),
    my: (value: number) => ({ marginTop: value, marginBottom: value }),

    bdr: (value: string) => ({
      border: `1px solid ${value}`,
    }),

    w: (value: number) => ({
      width: `${value}px`,
    }),

    h: (value: number) => ({
      height: `${value}px`,
    }),

    br: (value: number) => ({
      borderRadius: `${value}px`,
    }),
  },
});
