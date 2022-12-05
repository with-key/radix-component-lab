import React, { createContext, ReactNode, useContext } from "react";
import * as Core from "./Core";

type ContextValue = {
  text: string;
};

const BranchContext = createContext<ContextValue>({
  text: "branch",
});

type Props = {
  children: ReactNode;
  text: string;
};

export const BranchRoot = ({ children, text }: Props) => {
  return (
    <Core.Root Context={BranchContext} text={text}>
      {children}
    </Core.Root>
  );
};

export const BranchTrigger = () => {
  return <Core.Trigger Context={BranchContext}></Core.Trigger>;
};
