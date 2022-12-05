import React, { createContext, ReactNode, useContext } from "react";

type ContextValue = {
  text: string;
};
const Context = createContext<ContextValue | null>(null);

type Props = {
  children: ReactNode;
  text: string;
};

export const Root = ({ children, text }: Props) => {
  return (
    <Context.Provider
      value={{
        text,
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
