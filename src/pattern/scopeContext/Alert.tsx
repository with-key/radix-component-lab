import React, { forwardRef, ReactNode } from "react";
import { createContextScope } from "@radix-ui/react-context";

import { Primitive } from "@radix-ui/react-primitive";

import type { Scope } from "@radix-ui/react-context";
import type * as Radix from "@radix-ui/react-primitive";

/**
 * 개념 : context를 매번 생성하지 않고, Prop으로 다른 context를 주입받아
 * context를 참조할때도 prop으로 전달받은 context를 참조한다
 */

/**
 * dialog
 */

// 컴포넌트 프롭
type ScopedProps<P> = P & { __scopeDialog?: Scope };
const [createDialogContext, createDialogScope] = createContextScope("Dialog");

// context에서 관리할 값들
type DialogContextValue = {
  value?: string;
  open?: boolean;
};

// context 생성
const [DialogProvider, useDialogContext] =
  createDialogContext<DialogContextValue>("Dialog");

// root 컴포넌트 구현

type DialogRootProps = {
  children: ReactNode;
  open?: boolean;
  value?: string;
};

export const DialogRoot = (props: DialogRootProps) => {
  const { ...dialogProps } = props;
  //   console.log(__scopeDialog);
  /*
   * DialogProvider는 scope라는 prop이 존재하면 해당 scope의 Context를 참조하고,
   * undefined라면 새로 생성한 Context를 참조하도록 구성되어 있다.
   */

  return (
    <DialogProvider {...dialogProps}>{dialogProps.children}</DialogProvider>
  );
};

type DialogTriggerElement = React.ElementRef<typeof Primitive.button>;
type Props = Radix.ComponentPropsWithoutRef<typeof Primitive.button>;

export const DialogTrigger = forwardRef<
  DialogTriggerElement,
  ScopedProps<Props>
>((props, ref) => {
  const { __scopeDialog, ...triggerProps } = props;
  const context = useDialogContext("DialogTrigger", __scopeDialog);
  console.log("context", context);

  return <Primitive.button {...triggerProps} ref={ref} />;
});

DialogTrigger.displayName = "DialogTrigger";

/**
 * alert
 */

type AlertScopedProps<P> = P & { __scopeAlertDialog?: Scope };

const [createAlertDialogContext, createAlertDialogScope] = createContextScope(
  "AlertDialog",
  [] // 참조하고자하는 context를 의존성배열에 넣음
);

const [AlertProvider, useAlertContext] = createAlertDialogContext("Alert");
const useDialogScope = createDialogScope();

export const AlertRoot = (props: AlertScopedProps<DialogRootProps>) => {
  // prop으로  `__scopeAlertDialog` 참조하고자 하는 scope를 받는다.

  const { __scopeAlertDialog, ...alertRootProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  /**
   * AlertDialog에서는 useDialogScope hook을 사용해서 Dialog Context를 새로 생성하고
   * 이를 __scopeDialog라는 이름으로 Dialog에 전달한다.
   */

  return <DialogRoot {...dialogScope} {...alertRootProps} />;
};

type AlertDialogTriggerElement = React.ElementRef<typeof DialogTrigger>;
type AlertTriggerProps = Radix.ComponentPropsWithoutRef<typeof DialogTrigger>;

export const AlertTrigger = forwardRef<
  AlertDialogTriggerElement,
  AlertScopedProps<AlertTriggerProps>
>((props, ref) => {
  const { __scopeAlertDialog, ...alertTriggerProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return <DialogTrigger ref={ref} {...dialogScope} {...alertTriggerProps} />;
});

AlertTrigger.displayName = "AlertTrigger";

const AlertContent = () => {
  return <div></div>;
};
