"use client"
// components/SideBar.tsx

import React, { ReactNode, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard, MdAnalytics, MdSettings, MdExitToApp } from "react-icons/md";
import { CgProfile, CgNotes } from "react-icons/cg";
import { FaComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { IoMdSchool } from "react-icons/io";

interface NavItemProps {
  icon: ReactNode;
  label: string;
}

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
              <NavItem icon={<MdDashboard />} label="Dashboard" />
              <NavItem icon={<CgProfile />} label="Profile" />
              <NavItem icon={<FaComments />} label="Comments" />
              <NavItem icon={<MdAnalytics />} label="Analytics" />
              <NavItem icon={<BiMessageSquareDots />} label="Messages" />
              <NavItem icon={<CgNotes />} label="Integration" />
              <div className="border-t border-gray-700 mt-auto">
                <NavItem icon={<MdSettings />} label="Settings" />
                <NavItem icon={<MdExitToApp />} label="Logout" />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

const NavItem: React.FC<NavItemProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center py-2 px-4 text-gray-400 hover:text-white cursor-pointer">
      {icon}
      <span className="ml-2">{label}</span>
    </div>
  );
};

export default SideBar;
