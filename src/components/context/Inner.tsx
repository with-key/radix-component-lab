import React, { createContext, ReactNode, useContext } from "react";

type ContextValue = {
  text: string;
};
const Context = createContext<ContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const Root = ({ children }: Props) => {
  return (
    <Context.Provider
      value={{
        text: "inner",
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const Trigger = () => {
  const context = useContext(Context);
  return <span>{context?.text}</span>;
};
