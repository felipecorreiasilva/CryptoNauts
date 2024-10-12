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

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ScrollSolution />

      <AuthProvider>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
        <Footer />
      </AuthProvider>
    </>
  );
}
