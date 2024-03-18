"use client"
import React, { useState, useRef, useEffect } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';
import SideBar from '@/components/SideBar';

interface Message {
  text?: string;
  sender: string;
  image?: File;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [displayedImage, setDisplayedImage] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() !== '' || image) {
      if (image) {
        setMessages([...messages, { image, sender: 'Me' }]);
        setImage(null);
      } else {
        setMessages([...messages, { text: newMessage, sender: 'Me' }]);
      }
      setNewMessage('');
    }
  };

  const simulateOtherUserMessage = () => {
    const randomMessage = 'Watakidayr!';
    setMessages([...messages, { text: randomMessage, sender: 'Ismail' }]);
  };

  const handleImageClick = (img: string | null) => {
    if (img) {
      setDisplayedImage(img);
    }
  };

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 h-screen flex flex-col justify-center items-center bg-gray-900">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-screen-md flex flex-col flex-grow mx-auto">
          <h1 className="text-white text-3xl mb-4">Chat App</h1>
          <div className="flex-1 overflow-y-auto" ref={chatRef} style={{ maxHeight: '70vh', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'Me' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-center space-x-2 ${message.sender === 'Me' ? 'flex-row-reverse' : ''}`}>
                  {message.sender !== 'Me' && (
                    <div className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-md">
                      {message.sender}
                    </div>
                  )}
                  {message.text && (
                    <div className={`rounded-lg px-4 py-2 max-w-md ${message.sender === 'Me' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
                      {message.text}
                    </div>
                  )}
                  {message.image && (
                    <img
                      src={message.image ? URL.createObjectURL(message.image) : ''}
                      alt="Sent"
                      className="rounded-lg max-w-xs cursor-pointer"
                      onClick={() => handleImageClick(message.image ? URL.createObjectURL(message.image) : null)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {displayedImage && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <img
                src={displayedImage}
                alt="Displayed"
                className="max-w-full max-h-full cursor-pointer"
                onClick={() => setDisplayedImage(null)}
              />
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex items-center mt-4">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              className="bg-gray-700 text-white flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <label htmlFor="imageUpload" className="cursor-pointer ml-2">
              <CameraIcon className="w-6 h-6 text-gray-400 hover:text-gray-300" />
            </label>
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-2"
            >
              Send
            </button>
          </form>
        </div>
        <button onClick={simulateOtherUserMessage} className="text-white mt-4">Simulate Other User Message</button>
      </div>
    </div>
  );
};

export default ChatPage;
