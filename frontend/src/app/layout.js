import { Inter } from "next/font/google";
import "./globals.css";
import Providers from '@/store/provider';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Demo programandoweb.net - +573115000926",
  description: "Transmisión de datos a dispositivos",
};

export default function RootLayout({ children }) {
  return (
    
      <Providers> 
        <html lang="es">
            <body className={inter.className}>{children}</body>          
        </html>
      </Providers> 
    
  );
}
