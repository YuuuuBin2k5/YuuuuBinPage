import React from "react";
import { FONT_BITCOUNT, FONT_COINY, FONT_SONO } from "../utils/fonts";

function BaiTap() {
  return (
    <div
      className="flex flex-col ml-20 mr-20 p-10 items-center justify-center border border-purple-900 rounded-3xl"
      style={FONT_COINY}
    >
      <p className="flex logo-glow justify-center uppercase text-3xl w-100 m-10">
        Danh Sách Bài Tập
      </p>
      <div className="w-full mb-5">
        <h2 className="text-3xl font-bold mb-5 ml-2">Tuần 1</h2>
        <ul className="p-10 border border-x-blue-600 border-y-violet-900 rounded-2xl">
          <li>
            <a href="https://webbaitap2.onrender.com" target="_blank">
              CREATE MAIL WEB
            </a>
          </li>
        </ul>
        <br />
        <h2 className="text-3xl font-bold mb-5 ml-2">Tuần 2</h2>
        <ul className="p-10 border border-x-blue-600 border-y-violet-900 rounded-2xl">
          <li className="mb-5">
            <a href="https://baitapbuoi3.onrender.com" target="_blank">
              HTML5 and CSS3
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BaiTap;
