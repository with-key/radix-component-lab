import * as React from "react";

import { createContextScope, Scope } from "@radix-ui/react-context";

type ModalScopeProps<P> = P & { __scopeModal?: Scope };
export type ModalProps = {
  children: React.ReactNode;
  text?: string;
};

type ContextValueType = {
  text?: string;
};

const MODAL_NAME = "Modal";
const [createContext, createScope] = createContextScope(MODAL_NAME);
const [Provider, useContext] = createContext<ContextValueType>(MODAL_NAME);

export const Modal = (props: ModalScopeProps<ModalProps>) => {
  const { __scopeModal, children, text = "default" } = props;
  return (
    <Provider scope={__scopeModal} text={text}>
      {children}
    </Provider>
  );
};

const ModalContentNAme = "ModalContent";
type ModalContentProps = {};

export const ModalContent = (props: ModalScopeProps<ModalContentProps>) => {
  const { __scopeModal } = props;
  const context = useContext(ModalContentNAme, __scopeModal);
  return <div>{context.text}</div>;
};

export { createScope };
