import React, { ReactNode, createContext, useContext } from "react";
import { OtherContext } from "./other";
// import { createContext } from "./createContext";

type ContextValueType = {
  value: string;
  boo: boolean;
};

// const [Provider, useInputContext] =
//   createContext<ContextValueType>("Container");

const MainContext = createContext({
  value: "main",
  boo: true,
});

type ContainerProps = {
  children: ReactNode;
};

export const Contaienr = ({ children }: ContainerProps) => {
  return (
    <MainContext.Provider
      value={{
        value: "main",
        boo: true,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const Child = () => {
  const ctx = useContext(OtherContext);
  return <div>main : {ctx.value}</div>;
};
