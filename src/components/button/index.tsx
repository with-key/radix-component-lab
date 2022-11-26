import React, { ReactNode } from "react";
import { styled } from "../../styles/stitches.config";
import type * as Stitches from "@stitches/react";

type Props = {
  children: ReactNode;
  onClick(): void;
} & StPrimitiveButtonVariants;

export const PrimitiveButton = ({ children, ...props }: Props) => {
  return <StPrimitiveButton {...props}>{`버튼`}</StPrimitiveButton>;
};

const StPrimitiveButton = styled("button", {
  variants: {
    size: {
      full: {
        width: "100%",
        height: "55px",
      },
      main: {
        width: "200px",
        height: "40px",
      },
      big: {
        width: "400px",
        height: "55px",
      },
      small: {
        width: "120px",
        height: "35px",
      },
    },
    color: {},
  },
});

// ** typing
type StPrimitiveButtonVariants = Stitches.VariantProps<
  typeof StPrimitiveButton
>;
