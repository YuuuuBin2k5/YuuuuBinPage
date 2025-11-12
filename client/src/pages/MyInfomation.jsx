import React from "react";
import { FONT_COINY } from "../utils/fonts";

function MyInfomation() {
  return (
    <div
      className="flex flex-col ml-20 mr-20 p-5 items-center justify-center border border-purple-900 rounded-3xl"
      style={FONT_COINY}
    >
      <div className="flex">
        <div className="flex w-200">hello</div>
        <div className="flex w-full">hello</div>
      </div>
    </div>
  );
}

export default MyInfomation;
