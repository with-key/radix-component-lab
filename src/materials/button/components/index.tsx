import React, { ElementRef, forwardRef, ReactNode } from "react";
import { Primitive } from "@radix-ui/react-primitive";
import { createContext } from "@radix-ui/react-context";
import { styled } from "@styles/stitches.config";

import type { ComponentPropsWithoutRef } from "@radix-ui/react-primitive";

/* ---------------------------------------------------------------------------------------*
 * Button context
 * -------------------------------------------------------------------------------------- */

type ButtonContext = {
  space: number;
};

const BUTTON_NAME = "Button";
const [ButtonProbvider, useButtonContext] = createContext<ButtonContext>(
  BUTTON_NAME,
  { space: 4 }
);

/* ---------------------------------------------------------------------------------------*
 * Button Implement
 * -------------------------------------------------------------------------------------- */

type Props = {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  size?: "xs" | "s" | "m" | "l" | "xl";
} & PrimitiveButtonProps;
type ElementProps = ElementRef<typeof Primitive.button>;

export const ButtonImple = forwardRef<ElementProps, Props>(
  ({ children, leftSlot, rightSlot, size, ...buttonProps }, forwardedRef) => {
    const space = size === "xs" ? 2 : size === "s" ? 4 : 6;
    return (
      <ButtonProbvider space={space}>
        <StButton {...buttonProps} ref={forwardedRef}>
          <>{leftSlot}</>
          {children}
        </StButton>
        <>{rightSlot}</>
      </ButtonProbvider>
    );
  }
);

ButtonImple.displayName = "ButtonImple";

type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof StButton>;
const StButton = styled(Primitive.button, {
  bdr: "#333",
  w: 150,
  h: 40,
  mx: 10,
  my: 10,
  cursor: "pointer",
  br: 8,
});

/* ---------------------------------------------------------------------------------------*
 * Button Slot Root
 * -------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------*
 * Export
 * -------------------------------------------------------------------------------------- */
const Button = Object.assign({}, ButtonImple);
export default Button;
