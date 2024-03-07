// pages/index.tsx

import MainContent from "@/components/MainContent";
import SideBar from "@/components/SideBar";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex">
      <SideBar />
      <MainContent />
    </div>
  );
};

export default HomePage;
