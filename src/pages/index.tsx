import React from "react";
import * as RenderProp from "../pattern/RenderProp";
import * as Select from "../pattern/compound/Select";
import { Primitive } from "@radix-ui/react-primitive";
import { styled } from "@styles/stitches.config";
import {
  AlertRoot,
  AlertTrigger,
  DialogRoot,
  DialogTrigger,
} from "../pattern/scopeContext/Dialog";

const App = () => {
  return (
    <>
      <AlertRoot open={false} value="alert">
        <DialogRoot open={true} value="dialog">
          <AlertTrigger />
          <DialogTrigger />
        </DialogRoot>
      </AlertRoot>
    </>
  );
};

export default App;
