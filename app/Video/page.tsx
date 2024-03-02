"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';

const VideoCallPage: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    // Generate or retrieve the room ID
    const roomIdFromQuery = new URLSearchParams(window.location.search).get('roomId');
    if (roomIdFromQuery) {
      setRoomId(roomIdFromQuery);
    } else {
      const newRoomId = uuidv4();
      setRoomId(newRoomId);
      // Update the URL with the generated room ID
      window.history.replaceState({}, '', `?roomId=${newRoomId}`);
    }

    // Initialize socket connection
    const socket = io('/');
    const myPeer = new Peer();

    // Flag to track whether own video stream has been added
    let ownStreamAdded = false;

    // Get user's media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      const localVideo = document.createElement('video');
      localVideo.srcObject = stream;
      localVideo.autoplay = true;
      localVideo.muted = true;
      document.getElementById('video-grid')?.appendChild(localVideo);

      // Join the room
      myPeer.on('open', (userId) => {
        socket.emit('join-room', roomId, userId);
      });

      // When a new user joins, call them and send your stream
      socket.on('user-connected', (userId) => {
        setTimeout(() => {
          if (!ownStreamAdded) {
            ownStreamAdded = true; // Set flag to true
            return;
          }
          const call = myPeer.call(userId, stream);
          const video = document.createElement('video');
          call.on('stream', (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
          call.on('close', () => {
            video.remove();
          });
        }, 1000);
      });

      // When a user disconnects, remove their video stream
      socket.on('user-disconnected', (userId) => {
        const videoElement = document.getElementById(`video-${userId}`);
        if (videoElement) {
          videoElement.remove();
        }
      });
    });

    // Function to add video stream to the grid
    const addVideoStream = (video: HTMLVideoElement, stream: MediaStream) => {
      video.srcObject = stream;
      video.autoplay = true;
      video.muted = false; // Ensure new participants' streams are not muted
      video.id = `video-${myPeer.id}`; // Set a unique id for each video element
      document.getElementById('video-grid')?.appendChild(video);
    };

    return () => {
      socket.disconnect();
      myPeer.disconnect();
    };
  }, [roomId]);

  return (
    <div className="container">
      <div className="video-grid" id="video-grid"></div>
    </div>
  );
};

export default VideoCallPage;
