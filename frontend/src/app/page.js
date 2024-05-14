'use client'
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "./Header";
import io from 'socket.io-client';


const url                     =   process.env.NEXT_PUBLIC_SOCKET2;
const options                 =   { transports: ["websocket"], withCredentials: true, reconnection: true}
const socketInstance          =   io(url, options);

export default function Home({params}) {
  
  useEffect(()=>{
    socketInstance.on('connect', () => {        
      console.log("CONECTADO")          
    });

    socketInstance.on('disconnect', () => {
      console.log("DESCONECTADO")          
    });
    
  },[])

  const [input,setInput]      =   useState({
                                              grupo1:"https://www.youtube.com/watch?v=NNS5Piu-EII",
                                              grupo2:"https://www.youtube.com/watch?v=x91MPoITQ3I",
                                            })
  
  const handleSubmit=(value,grupo,type)=>{
    socketInstance.emit("order",{value,grupo,type})
  }

  return (
    <main className={styles.main}>
      <Header  params={params} title="Dispositivo Principal"/>
      <div >
        
          URL video Grupo 1
          <input className="input" defaultValue={input.grupo1} required onChange={(e) => setInput({ grupo2:false,grupo1: e.target.value, type:"youtube" })}/>
          <button  onClick={()=>handleSubmit(input.grupo1,"grupo1","youtube")}>
            Enviar
          </button>
        
        
          URL video Grupo 2
          <input className="input" defaultValue={input.grupo2} required onChange={(e) => setInput({ grupo1:false, grupo2: e.target.value, type:"youtube" })}/>
          <button  onClick={()=>handleSubmit(input.grupo2,"grupo2","youtube")}>
            Enviar
          </button>
        
      </div>
      
    </main>
  );
}
