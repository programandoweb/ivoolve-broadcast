'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import {generateUniqueId} from "@/utils/fuctions";
import { clearDispatchEmit, setStatus, setEventDinamic } from '@/store/Slices/socketSlice';

export const SocketContext    =   createContext();
export const url              =   process.env.NEXT_PUBLIC_SOCKET2;
export const options          =   { transports: ["websocket"], withCredentials: true, reconnection: true}

let dispatch;
let reduxSocket;


export const SocketProvider       =   ({ children }) => {  
  dispatch                        =   useDispatch();
  const storageUniqueId           =   "uniqueId";
  const userStorage               =   "user";
  reduxSocket                     =   useSelector((state) => state.socket) || {};
  const [socket, setSocket]       =   useState(null);
  const storedData                =   typeof window !== 'undefined' ? localStorage.getItem(storageUniqueId) : null;
  const storedUser                =   typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(userStorage)) : null;  
  const domain                    =   typeof window !== 'undefined' ? document.location.hostname : null;
  const [uniqueId, setUniqueId]   =   useState(storedData);
  let uniqueId_                   =   uniqueId;
  const socketInstance            =   io(url, options);
  useEffect(() => {
    
    try {
      if(!uniqueId_){
        uniqueId_     =   generateUniqueId();
        setUniqueId(uniqueId_);      
        localStorage.setItem(storageUniqueId,uniqueId_)      
      }
  
      setSocket(socketInstance);
      
      dispatch(setStatus(true))  
      
      socketInstance.on('orderPlacedAccept', (data) => {
        dispatch(setEventDinamic({...data,request:"orderPlacedAccept",label:"Orden asignada"}))         
      });

      socketInstance.on('connect', () => {        
        console.log("CONECTADO")          
      });
  
      socketInstance.on('disconnect', () => {
        dispatch(setStatus(null))                    
      });
  
      return () => {
        socketInstance.disconnect();
      };
    } catch (error) {
        console.log(error,"aqui")
    }
    

  }, []);

  useEffect(()=>{

    if(reduxSocket.dispatchEmit){
      socket.emit("order",{...reduxSocket.dispatchEmit});
      console.log(" El emit en socketComponent")    
      dispatch(clearDispatchEmit())            
    }

  },[reduxSocket.dispatchEmit])


  useEffect(()=>{

    let rol   =   ""   
    if(storedUser&&
      storedUser.roles&&
      storedUser.roles[0]){
      rol     =   storedUser.roles[0]
    }
    socketInstance.emit("reduxSocket",{...reduxSocket,domain,uniqueId:uniqueId_,user:storedUser?.user,rol:rol})

  },[reduxSocket])


  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );




};



export const useSocket = () => {
  
  const socket = useContext(SocketContext);
  
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return socket;

};
