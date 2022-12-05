import * as React from "react";
import { composeEventHandlers } from "@radix-ui/primitive";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createContextScope } from "@radix-ui/react-context";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { usePrevious } from "@radix-ui/react-use-previous";
import { useSize } from "@radix-ui/react-use-size";
import { Primitive } from "@radix-ui/react-primitive";

import type * as Radix from "@radix-ui/react-primitive";
import type { Scope } from "@radix-ui/react-context";

/* -------------------------------------------------------------------------------------------------
 * Switch
 * -----------------------------------------------------------------------------------------------*/
const SWITCH_NAME = "Switch";

// createContextScope를 사용하기 위한 타입 선언
type ScopedProps<P> = P & { __scopeSwitch?: Scope };
// createContextScope 생성
const [createSwitchContext, createSwitchScope] =
  createContextScope(SWITCH_NAME);

// context value type
type SwitchContextValue = { checked: boolean; disabled?: boolean };

// context 생성
const [SwitchProvider, useSwitchContext] =
  createSwitchContext<SwitchContextValue>(SWITCH_NAME);

// Ref 타입 생성
type SwitchElement = React.ElementRef<typeof Primitive.button>;

// ComponentPropsWithoutRef type 생성
type PrimitiveButtonProps = Radix.ComponentPropsWithoutRef<
  typeof Primitive.button
>;

// ComponentPropsWithoutRef를 extends해서 component props type 생성
interface SwitchProps extends PrimitiveButtonProps {
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
  onCheckedChange?(checked: boolean): void;
}

// Switch component implement
const Switch = React.forwardRef<SwitchElement, SwitchProps>(
  (props: ScopedProps<SwitchProps>, forwardedRef) => {
    // prop 구조분해할당, ScopedProps를 사용해서 scope를 생성
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      ...switchProps
    } = props;

    console.log(__scopeSwitch);

    // 현재 버튼의 노드임.
    const [button, setButton] = React.useState<HTMLButtonElement | null>(null);

    const composedRefs = useComposedRefs(forwardedRef, (node) => {
      return setButton(node);
    });
    const hasConsumerStoppedPropagationRef = React.useRef(false);
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = button ? Boolean(button.closest("form")) : true;

    // useControllableState를 사용해서 상태관리, 외부에서 상태를 주입해서도 사용할수 있도록 useControllableState 사용
    const [checked = false, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    });

    return (
      <SwitchProvider
        scope={__scopeSwitch}
        checked={checked}
        disabled={disabled} // context로 값이 들어간다.
      >
        <Primitive.button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-required={required}
          data-state={getState(checked)}
          data-disabled={disabled ? "" : undefined}
          disabled={disabled}
          value={value}
          {...switchProps}
          ref={composedRefs}
          onClick={composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);

            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current =
                event.isPropagationStopped();
              // if switch is in a form, stop propagation from the button so that we only propagate
              // one click event (from the input). We propagate changes from an input so that native
              // form validation works and form events reflect switch updates.
              if (!hasConsumerStoppedPropagationRef.current)
                event.stopPropagation();
            }
          })}
        />
        {isFormControl && (
          <BubbleInput
            control={button}
            bubbles={!hasConsumerStoppedPropagationRef.current}
            name={name}
            value={value}
            checked={checked}
            required={required}
            disabled={disabled}
            // We transform because the input is absolutely positioned but we have
            // rendered it **after** the button. This pulls it back to sit on top
            // of the button.
            style={{ transform: "translateX(-100%)" }}
          />
        )}
      </SwitchProvider>
    );
  }
);

Switch.displayName = SWITCH_NAME;

/* -------------------------------------------------------------------------------------------------
 * SwitchThumb
 * -----------------------------------------------------------------------------------------------*/

const THUMB_NAME = "SwitchThumb";

// Ref 타입
type SwitchThumbElement = React.ElementRef<typeof Primitive.span>;

// span ComponentPropsWithoutRef 타입
type PrimitiveSpanProps = Radix.ComponentPropsWithoutRef<typeof Primitive.span>;
interface SwitchThumbProps extends PrimitiveSpanProps {}

// SwitchThumb implement
const SwitchThumb = React.forwardRef<SwitchThumbElement, SwitchThumbProps>(
  (props: ScopedProps<SwitchThumbProps>, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;

    console.log(__scopeSwitch);

    // 생성된 context를 사용하다.
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    console.log(context);
    return (
      <Primitive.span
        data-state={getState(context.checked)}
        data-disabled={context.disabled ? "" : undefined}
        {...thumbProps}
        ref={forwardedRef}
      />
    );
  }
);

SwitchThumb.displayName = THUMB_NAME;

/* ---------------------------------------------------------------------------------------------- */

type InputProps = Radix.ComponentPropsWithoutRef<"input">;
interface BubbleInputProps extends Omit<InputProps, "checked"> {
  checked: boolean;
  control: HTMLElement | null; // ?
  bubbles: boolean; // ?
}

const BubbleInput = (props: BubbleInputProps) => {
  const { control, checked, bubbles = true, ...inputProps } = props;
  const ref = React.useRef<HTMLInputElement>(null);
  const prevChecked = usePrevious(checked);
  const controlSize = useSize(control);

  // Bubble checked change to parents (e.g form change event)
  React.useEffect(() => {
    const input = ref.current!;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(
      inputProto,
      "checked"
    ) as PropertyDescriptor;

    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", { bubbles });
      setChecked.call(input, checked);
      input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]);

  return (
    <input
      type="checkbox"
      aria-hidden
      defaultChecked={checked}
      {...inputProps}
      tabIndex={-1}
      ref={ref}
      style={{
        ...props.style,
        ...controlSize,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
      }}
    />
  );
};

function getState(checked: boolean) {
  return checked ? "checked" : "unchecked";
}

const Root = Switch;
const Thumb = SwitchThumb;

export {
  createSwitchScope,
  //
  Switch,
  SwitchThumb,
  //
  Root,
  Thumb,
};
export type { SwitchProps, SwitchThumbProps };