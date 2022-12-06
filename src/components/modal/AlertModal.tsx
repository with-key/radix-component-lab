import * as React from "react";
import * as Modal from "./Modal";

import type { Scope } from "@radix-ui/react-context";
import type { ModalProps } from "./Modal";

type AlertModalScopeProps<P> = P & { __alertModalScope?: Scope };
const useScope = Modal.createScope();

export const AlertModal = (props: AlertModalScopeProps<ModalProps>) => {
  const { __alertModalScope, ...alertModalProps } = props;
  const alertModalScope = useScope(__alertModalScope);
  return <Modal.Modal {...alertModalScope} {...alertModalProps} />;
};

export const AlertModalContent = (props: AlertModalScopeProps<{}>) => {
  const { __alertModalScope, ...alertModalContentProps } = props;
  const alertModalScope = useScope(__alertModalScope);
  return (
    <Modal.ModalContent {...alertModalScope} {...alertModalContentProps} />
  );
};

export const AlertModalTrigger = (
  props: AlertModalScopeProps<{
    children: React.ReactNode;
  }>
) => {
  const { __alertModalScope, ...alertModalContentProps } = props;
  const alertModalScope = useScope(__alertModalScope);
  console.log(alertModalContentProps);
  return (
    <Modal.ModalTrigger {...alertModalScope} {...alertModalContentProps} />
  );
};
