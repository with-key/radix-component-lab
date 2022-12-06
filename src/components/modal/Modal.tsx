import * as React from "react";
import { Primitive } from "@radix-ui/react-primitive";

import { createContextScope, Scope } from "@radix-ui/react-context";

type ModalScopeProps<P> = P & { __scopeModal?: Scope };
export type ModalProps = {
  children: React.ReactNode;
  text?: string;
  open?: boolean;
  onOpenToggle?: () => void;
};

type ContextValueType = {
  text?: string;
  open?: boolean;
  onOpenToggle?: () => void;
};

const MODAL_NAME = "Modal";
const [createContext, createScope] = createContextScope(MODAL_NAME);
const [Provider, useContext] = createContext<ContextValueType>(MODAL_NAME);

export const Modal = (props: ModalScopeProps<ModalProps>) => {
  const [open, setOpen] = React.useState(false);
  const { __scopeModal, open: openState = true, ...modalRootProps } = props;

  const onOpenToggle = () => {
    setOpen((pre) => !pre);
  };

  return (
    <Provider
      scope={__scopeModal}
      {...modalRootProps}
      open={open}
      onOpenToggle={onOpenToggle}
    >
      {modalRootProps.children}
    </Provider>
  );
};

const ModalContentName = "ModalContent";
type ModalContentProps = {};

export const ModalContent = (props: ModalScopeProps<ModalContentProps>) => {
  const { __scopeModal } = props;
  const context = useContext(ModalContentName, __scopeModal);
  return <div>{context.text}</div>;
};

const TriggerName = "ModalTrigger";
interface ModalTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.button> {}

// Radix button 타입을 받아야 함
export const ModalTrigger = (props: ModalScopeProps<ModalTriggerProps>) => {
  const { __scopeModal, ...modalTriggerProps } = props;
  const context = useContext(TriggerName, __scopeModal);

  console.log(__scopeModal, " ->  : ", context.open);

  return (
    <Primitive.button {...modalTriggerProps} onClick={context.onOpenToggle} />
  );
};

export { createScope };
