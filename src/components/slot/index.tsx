import React, { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

type Props = {
  asChild?: boolean;
  children: ReactNode;
};

/**
 * asChild 를 사용할 수 있는 custom Component
 */

export const SlotButton = ({ asChild, ...props }: Props) => {
  const Comp = asChild ? Slot : "button";
  return <Comp {...props} />;
};
