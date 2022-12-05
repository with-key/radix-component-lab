import React, { createContext, ReactNode, useContext } from "react";
// import { createContext } from "./createContext";

type ContextValueType = {
  value: string;
  boo: boolean;
};

// const [Provider, useInputContext] =
//   createContext<ContextValueType>("Container");

export const OtherContext = createContext({
  value: "other",
  boo: false,
});

type ContainerProps = {
  children: ReactNode;
};

export const Contaienr = ({ children }: ContainerProps) => {
  return (
    <OtherContext.Provider
      value={{
        value: "other",
        boo: false,
      }}
    >
      {children}
    </OtherContext.Provider>
  );
};

export const Child = () => {
  const ctx = useContext(OtherContext);
  return <div>ohter: {ctx.value}</div>;
};
