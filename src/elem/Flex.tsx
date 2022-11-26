import React from "react";
import { styled } from "../styles/stitches.config";
import { Primitive } from "@radix-ui/react-primitive";

type Props = React.ComponentPropsWithoutRef<typeof StFlex>;

export const Flex = (props: Props) => {
  return <StFlex {...props}>{props.children}</StFlex>;
};

const StFlex = styled(Primitive.div, {
  display: "flex",
});
