import React, {
  Context as CoreContext,
  createContext,
  ReactNode,
  useContext,
} from "react";

export type ContextValue = {
  text: string;
};

const CoreContext = createContext<ContextValue>({
  text: "default",
});

type Props = {
  children: ReactNode;
  text: string;
  Context?: CoreContext<ContextValue>;
};

export const Root = ({ children, text, Context = CoreContext }: Props) => {
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

type TriggerProps = {
  Context?: CoreContext<ContextValue>;
};

export const Trigger = ({ Context = CoreContext }: TriggerProps) => {
  const context = useContext(Context);
  return <span>{context?.text}</span>;
};
