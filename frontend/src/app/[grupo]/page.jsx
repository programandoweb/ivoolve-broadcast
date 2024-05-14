'use client'
import { useEffect, useState } from "react";
import Header from "../Header";
import styles from "../page.module.css";
import io from 'socket.io-client';
const url                     =   process.env.NEXT_PUBLIC_SOCKET2;
const options                 =   { transports: ["websocket"], withCredentials: true, reconnection: true}
const socketInstance          =   io(url, options);

const Remoto=({params})=>{
    const [state,setState]    =     useState({})
    useEffect(()=>{
        socketInstance.on('connect', () => {        
          console.log("CONECTADO")          
        });

        socketInstance.on('orderByGroup', ({grupo,value,type}) => {        
            console.log(grupo,value,type)
            //https://www.youtube.com/embed/NNS5Piu-EII
            let src=false
            if(params?.grupo!==grupo){
                return;
            }

            if(type==="youtube" && value){
                console.log("recibí señal video youtube",params)
                let replaces    =   value.replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/")
                replaces        =   replaces+"?autoplay=1&mute=1&loop=1&controls=0"
                src     =       {
                    src:replaces,
                    resource:"youtube"
                }
            }
            setState(src)
            //console.log(src, grupo,value,"orderByGroup")          
        });
    
        socketInstance.on('disconnect', () => {
          console.log("DESCONECTADO")          
        });
        
    },[])

    return  <main className={styles.main}>
                <Header params={params} title="Soy el dispositivo remoto"/>
                <div className={styles.center}>
                    <iframe width={"100%"} 
                            muted 
                            height={500} 
                            src={state.src||"https://www.youtube.com/embed/NNS5Piu-EII?autoplay=1&mute=1&loop=1&controls=0"} 
                            title="YouTube video player" 
                            frameborder="0" 
                            volume="0"
                            autoplay={true}
                            allow="autoplay; encrypted-media" 
                            allowfullscreen 
                            data-autoplay
                            referrerpolicy="strict-origin-when-cross-origin">
                    </iframe>                                
                    
                    URL video a reproducir: <b>{ state.src }</b>
                    {
                        /*
                        state&&state?.resource&&
                        state?.resource==="youtube"&&(
                        <div style={{marginTop:"10px"}}>
                            <div style={{height:"300px", width:"800px", background:"#000"}}>
                                
                            </div>
                        </div>
                        )
                        */
                    }
                    
                </div>
                
            </main>
}
export default Remoto;