import React, { useState } from "react";
import * as Outter from "../components/context/Outter";
import * as Inner from "../components/context/Inner";

import * as Compose from "../components/context/Outter";

import * as Core from "../components/solution/Core";
import * as Branch from "../components/solution/Branch";

const ComposeOutter = Compose;
const ComposeInner = Compose;

const App = () => {
  return (
    <>
      {/* 케이스 1 : 각각의 Provider가 따로 */}
      <Outter.Root text="outter">
        <div>
          기대값: ouuter vs <Outter.Trigger />
        </div>
        <Inner.Root>
          <div>
            기대값 : outter vs <Outter.Trigger />
          </div>
          <div>
            기대값 : inner vs <Inner.Trigger />
          </div>
        </Inner.Root>
      </Outter.Root>
      <div>-----------------------</div>
      {/* 케이스 2 : Provider는 1개, 컴포넌트를 추상화해서 사용함 -> 문제발생*/}
      <ComposeOutter.Root text="outter">
        <div>
          기대값 : ouuter vs <ComposeOutter.Trigger />
        </div>
        <ComposeInner.Root text="inner">
          <div>
            기대값 : outter vs <ComposeOutter.Trigger /> : 문제 발생
          </div>
          <div>
            기대값 : inner vs <ComposeInner.Trigger />
          </div>
        </ComposeInner.Root>
      </ComposeOutter.Root>
      <div>-----------------------</div>
      {/* 케이스 3 : 케이스 1을 추상화함 -> 문제해결 */}
      <Core.Root text="outter">
        <div>
          기대값 : outter vs <Core.Trigger />
        </div>
        <Branch.BranchRoot text="inner">
          <div>
            기대값: outter vs <Core.Trigger />
          </div>
          <div>
            기대값: inner vs <Branch.BranchTrigger />
          </div>
        </Branch.BranchRoot>
      </Core.Root>
    </>
  );
};

export default App;
