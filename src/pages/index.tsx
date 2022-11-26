import React from "react";
import { PrimitiveButtonImple } from "../components/button";
import DialogDemo from "../components/dialog";
import { styled } from "../styles/stitches.config";

const Home = () => {
  return (
    <div>
      <DialogDemo></DialogDemo>
    </div>
  );
};

export default Home;

const Flex = styled("div", {});
