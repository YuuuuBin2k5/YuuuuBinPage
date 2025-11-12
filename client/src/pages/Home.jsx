import React, { useState } from "react";
import SideBar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";
import AppRoutes from "../routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function Home() {
  return (
    <ProfileCard
      name="Đào Nguyễn Nhật Anh"
      role="Full-stack Developer | Java & React"
      avatarSrc={[
        "/images/avatar.jpg",
        "/images/avatar2.jpg",
        "/images/avatar3.jpg",
        "/images/avatar4.jpg",
      ]}
      location="Nhơn Trạch - Đồng Nai"
      summary="Hello everyone. I study Information Technology and focus on modern web development."
      // Thêm các Props mới
      skills={["Java", "Spring Boot", "React", "Tailwind CSS", "C++", "Python"]}
      contact={{
        email: "daonguyennhatanh0910@gmail.com",
        github: "https://github.com/YuuuuBin2k5",
        linkedin: "https://www.linkedin.com/in/anh-nh%E1%BA%ADt-0b3ba0353/",
      }}
    />
  );
}

export default Home;
