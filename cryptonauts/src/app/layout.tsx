import type { Metadata } from "next";
import "./globals.css";
import ScrollSolution from "@/components/scrollSolution";
import { AuthProvider } from "@/context/AuthContext";
import MainContainer from "@/components/MainContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export const metadata: Metadata = {
  title: "Crypto Nauts",
  description: "Crypto Nauts",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html className='scroll-smooth overflow-x-hidden' lang="en">
      <body
        className={`container mx-auto bg-primary-950 `}
      >
        
        <ScrollSolution />

        <AuthProvider>
          <ToastContainer/>
          <Header/>
          
          <MainContainer>
          {children}
          </MainContainer>
          
          <Footer/>
          
        </AuthProvider>
             
      </body>
    </html>
  );
}
