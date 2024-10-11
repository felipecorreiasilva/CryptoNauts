import type { Metadata } from "next";
import "./globals.css";
import ScrollSolution from "@/components/scrollSolution";
import { AuthProvider } from "@/context/AuthContext";
import MainContainer from "@/components/MainContainer";
import Footer from "@/components/Footer";

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
    <html className='scroll-smooth' lang="en">
      <body
        className={`container mx-auto bg-primary-950`}
      >
        
        <ScrollSolution />

        <AuthProvider>
          

          <MainContainer>
          {children}
          </MainContainer>
          <Footer/>
          
        </AuthProvider>
             
      </body>
    </html>
  );
}
