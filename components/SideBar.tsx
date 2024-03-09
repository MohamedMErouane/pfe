"use client"
import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiVideoOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdDashboard,  MdSettings, MdExitToApp } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { IoMdSchool } from "react-icons/io";
import NavItem from "./NavItem";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white">
      <Disclosure as="nav" className="h-full flex flex-col">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center p-4">
              <IoMdSchool size={60} />
              <Disclosure.Button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring"
              >
                <GiHamburgerMenu className="h-6 w-6" />
              </Disclosure.Button>
            </div>
            <Disclosure.Panel className={`flex flex-col ${isOpen ? 'block' : 'hidden'}`}>
              <NavItem icon={<MdDashboard />} label="Dashboard" href="/Home" />
              <NavItem icon={<CgProfile />} label="Profile" href="/Profile" />
              <NavItem icon={<CiVideoOn  />} label="Video Rooms" href="/Video" />
              <NavItem icon={<FaComments />} label="Chat Rooms" href="/Chat" />
              <NavItem icon={<BiMessageSquareDots />} label="Study Goals" href="/Todo" />
              <NavItem icon={<MdSettings />} label="Settings" href="/settings" />
              <NavItem icon={<MdExitToApp />} label="Logout" />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default SideBar;
