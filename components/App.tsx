"use client"
import React, { useState } from 'react';
import { ArrowRightIcon, ArchiveBoxIcon, Battery0Icon, BellIcon } from '@heroicons/react/24/outline';
import PomodoroApp from './Pomodoro'; // Check the path to PomodoroApp component
import Video from './Video'; // Check the path to Video component
import BackgroundImage from '../public/th8.jpg'; // Import the background image
import Image from 'next/image';
import { FaPhoneSlash } from 'react-icons/fa'; // Importing the icon

const App = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [clientStreams, setClientStreams] = useState<string[]>([]);
  const [confirmDialog, setConfirmDialog] = useState(false); // State for confirmation dialog
 
  const tabs = [
    {
      id: 1,
      title: "Background",
      icon: <ArrowRightIcon className='w-5' />,
    },
    {
      id: 2,
      title: "Sound",
      icon: <ArchiveBoxIcon className='w-5' />,
    },
    {
      id: 3,
      title: "Motivational",
      icon: <Battery0Icon className='w-5' />,
    },
    {
      id: 4,
      title: "Test",
      icon: <BellIcon className='w-5' />,
    },
  ];

  const addClientStream = (stream: string) => {
    setClientStreams(prevStreams => [...prevStreams, stream]);
  };

  const handleLeaveCall = () => {
    setConfirmDialog(true);
  };

  const handleConfirmLeave = () => {
    setConfirmDialog(false);
    window.location.href = '/Home';
  };

  const handleCancelLeave = () => {
    setConfirmDialog(false);
  };

  return (
    <div className="relative">
      {/* Confirmation dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-8 rounded shadow-md">
            <p className="mb-4">Are you sure you want to leave the call?</p>
            <div className="flex justify-end">
              <button onClick={handleConfirmLeave} className="mr-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Yes</button>
              <button onClick={handleCancelLeave} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="text-white flex w-screen h-screen bg-black bg-opacity-50 relative">
        {/* Background Image */}
        <Image
          src={BackgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-75"
        />

        <div className="w-1/4 h-full flex flex-col justify-between z-10">
          {/* Pomodoro Component */}
          <div className="h-1/2 p-3 flex items-center justify-center  ">
            <PomodoroApp />
          </div>

          {/* My camera stream */}
          <div className="h-1/2 p-3 flex items-center justify-center w-52 ml-10 mt-40 ">
            <Video />
          </div>
        </div>

        <div className="flex-1 h-full flex flex-col relative z-10">
          <div className="h-16 flex space-x-2 items-center justify-end pr-3 ">
            {tabs.map(tab => (
              <div className={`p-2 rounded-md ${selectedTab === tab.id ? 'bg-gray-600' : ''}`} key={tab.id} onClick={() => setSelectedTab(tab.id)}>
                {tab.icon}
              </div>
            ))}
            {/* Leave button */}
            <div className="p-2 rounded-md bg-red-500 hover:bg-red-600" onClick={handleLeaveCall}>
              <FaPhoneSlash className="w-5" />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center ">
            {/* My Video Component */}
            <div className="p-2 flex justify-center w-full mt-50">
              <Video />
              <Video />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
