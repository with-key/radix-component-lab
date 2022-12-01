import React from "react";

import type * as Radix from "@radix-ui/react-primitive";
import { styled } from "@styles/stitches.config";

type Props = Radix.PrimitivePropsWithRef<typeof StInput>;

const Input = (props: Props) => {
  return <StInput {...props} type="text" />;
};

const StInput = styled("input", {});

export default Input;
