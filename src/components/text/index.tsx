import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Primitive } from "@radix-ui/react-primitive";
import { styled } from "../../styles/stitches.config";

import type * as Radix from "@radix-ui/react-primitive";

// React.ComponentPropsWithoutRef VS Radix.ComponentPropsWithoutRef ??
type PrimitiveSpanAtrr = Radix.ComponentPropsWithoutRef<typeof StText>;
type TextProps = {} & PrimitiveSpanAtrr;
type SpanElement = ElementRef<typeof Primitive.span>;

export const PrimitiveTextImple = forwardRef<SpanElement, TextProps>(
  ({ children, ...props }, ref) => {
    return (
      <StText {...props} ref={ref}>
        {children}
      </StText>
    );
  }
);

const StText = styled(Primitive.span, {});
PrimitiveTextImple.displayName = "PrimitiveTextImple";

// refer
// https://github.com/SoYoung210/Uing/blob/main/src/components/material/Text.tsx
