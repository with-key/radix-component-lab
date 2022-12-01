import React, {
  ComponentPropsWithoutRef,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Primitive } from "@radix-ui/react-primitive";
import { styled } from "@styles/stitches.config";
// import { createContext, createContextScope } from "@radix-ui/react-context";

type SelectRootProps = {
  children: ReactNode;
};

type SelectOptionListDataType = {
  key: string;
  label: string;
};

type SelectContextValueType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value: SelectOptionListDataType | null;
  setValue: Dispatch<SetStateAction<SelectOptionListDataType | null>>;
};

const SelectContext = createContext<SelectContextValueType | null>(null);

const SelectRoot = ({ children }: SelectRootProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<SelectOptionListDataType | null>(null);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        setValue,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

type SelectTriggerProps = {} & ComponentPropsWithoutRef<typeof PrimitiveButton>;

const SelectTrigger = (props: SelectTriggerProps) => {
  const ctx = useContext(SelectContext);
  const { onClick, ...triggerProps } = props;
  return (
    <PrimitiveButton
      {...triggerProps}
      onClick={() => ctx?.setOpen((pre) => !pre)}
    />
  );
};

type SelectOptionListProps = {
  children: ReactNode;
};

const SelectOptionList = (props: SelectOptionListProps) => {
  const ctx = useContext(SelectContext);
  return ctx?.open ? <>{props.children}</> : <></>;
};

type SelectOptionProps = {
  children: ReactNode;
  value: string;
};

const SelectOption = (props: SelectOptionProps) => {
  const ctx = useContext(SelectContext);
  return (
    <StyledOption onClick={() => ctx?.setValue()}>
      {props.children}
    </StyledOption>
  );
};

const PrimitiveButton = styled(Primitive.button, {});
const PrimitiveDiv = styled(Primitive.div, {});

const StyledOption = styled(PrimitiveDiv, {
  border: "1px solid teal",
  width: 200,
});

export const Root = SelectRoot;
export const Trigger = SelectTrigger;
export const OptionList = SelectOptionList;
export const Option = SelectOption;
