import React, { ComponentPropsWithoutRef, forwardRef, Ref } from "react";
import { Primitive } from "@radix-ui/react-primitive";
import { styled } from "../../styles/stitches.config";

/**
 *  다행히 리액트는 컴포넌트의 프로퍼티 중에서 ref만 제외한 나머지 프로퍼티들 쉽게 타이핑할 수
 *  있도록 ComponentPropsWithoutRef라는 타입을 제공하고 있기 때문에 굳이 개발자가 Omit
 *  유틸리티 타입을 사용하여 ref 키를 직접 제거하지 않아도 된다.
 */

type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof StButton>;

/**
 * 커스텀 props 타입 명시
 */
type Props = {
  size?: "big" | "small";
} & PrimitiveButtonProps;

export const PrimitiveButton = forwardRef(
  (props: Props, ref: Ref<HTMLButtonElement>) => {
    return <StButton {...props} ref={ref} />;
  }
);

/**
 * default style button design
 */
const StButton = styled("button", {
  border: "1px solid #ddd",
  width: "200px",
  height: "37px",
});

PrimitiveButton.displayName = "PrimitiveButton";

/**
 * refer
 *
 * https://github.com/SoYoung210/Uing/blob/main/src/components/material/Button.tsx#L16
 * https://evan-moon.github.io/2020/11/28/making-your-components-extensible-with-typescript/#html-%EC%97%98%EB%A6%AC%EB%A8%BC%ED%8A%B8-%ED%9D%89%EB%82%B4%EB%82%B4%EA%B8%B0
 */
