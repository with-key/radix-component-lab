import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
// import { violet, blackA, mauve, green } from "@radix-ui/colors";
// import { Cross2Icon } from "@radix-ui/react-icons";
import { SlotButton } from "../slot";

/**
 *
 * asChild : asChild가 없으면 Dialog.Trigger의 button 속성이 사라진다.
 *
 *  If you decide to change the underlying node rendered by Radix
 *  (e.g. change a button to a div) then it is up to you to ensure
 *  the correct accessibility and functionality of your chosen node type.
 *
 *  asChild === ture이면, Radix 기본 노드를 사용하지 않고,
 *  사용자가 사용하고자하는 노드를 사용할 수 있다. Dialog.Trigger은 기본적으로 button 이지만,
 *  asChild === ture이면 button 속성을 잃고, child 안에 있는 요소가 해당 api의 노드가 된다.
 *
 *  결과적으로 트리거 안에서 커스텀 버튼을 사용하고자 한다면, asChild === true 여야 하고
 *  해당 버튼은 ref 를 받아야 한다.
 */

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button>버튼</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <Dialog.Close asChild>닫기</Dialog.Close>
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: "#000",
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const DialogContent = styled(Dialog.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  "&:focus": { outline: "none" },
});

const Flex = styled("div", { display: "flex" });

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: "Violet",
        boxShadow: `0 2px 10px black`,
        "&:hover": { backgroundColor: "Violet" },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: "green",
        color: "green",
        "&:hover": { backgroundColor: "green" },
        "&:focus": { boxShadow: `0 0 0 2px green` },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "Violet",
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: "Violet" },
  "&:focus": { boxShadow: `0 0 0 2px Violet` },
});

const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  gap: 20,
  alignItems: "center",
  marginBottom: 15,
});

const Label = styled("label", {
  fontSize: 15,
  color: "Violet",
  width: 90,
  textAlign: "right",
});

const Input = styled("input", {
  all: "unset",
  width: "100%",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: "Violet",
  boxShadow: `0 0 0 1px Violet`,
  height: 35,

  "&:focus": { boxShadow: `0 0 0 2px Violet` },
});

export default DialogDemo;
