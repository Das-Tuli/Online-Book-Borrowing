import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReadSphere | Your Modern Digital Library",
  description: "A seamless and modern web application designed to digitize the traditional library experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} bg-[#fbfbf9] text-[#1c1917] antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e3f20',
              color: '#fff',
              border: '1px solid rgba(226, 232, 240, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#b45309',
                secondary: '#1e3f20',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
