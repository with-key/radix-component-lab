import React, { createContext, useContext, useState } from "react";

// children render prop + context

type ContextValueType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Context = createContext<ContextValueType | null>(null);

type ContainerChildProps = {
  children: (context: ContextValueType | null) => JSX.Element;
};

const ContainerChild = ({ children }: ContainerChildProps) => {
  const context = useContext(Context);
  return children(context);
};

export const Container = () => {
  const [value, setValue] = useState<string>("initial state");
  return (
    <Context.Provider
      value={{
        value,
        setValue,
      }}
    >
      <ContainerChild>
        {(context) => {
          return (
            <div>
              <div>{context?.value}</div>
              <button onClick={() => context?.setValue("변경하기")}>
                버튼
              </button>
            </div>
          );
        }}
      </ContainerChild>
    </Context.Provider>
  );
};
