import React from "react";
import { PrimitiveButton } from "../components/button";
import DialogDemo from "../components/dialog";
import { styled } from "../styles/stitches.config";

const Home = () => {
  return (
    <div>
      {/* <DialogDemo></DialogDemo> */}
      <PrimitiveButton
        onClick={() => {
          console.log("hjdd");
        }}
      >
        버튼
      </PrimitiveButton>
    </div>
  );
};

export default Home;

const Flex = styled("div", {});
