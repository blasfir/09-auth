import Footer from "../components/Footer/Footer";
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: `NoteHub`,
  description: `NoteHub - your smart workspace for capturing, organizing, and finding notes instantly.`,
  openGraph: {
    title: `NoteHub`,
    description: `NoteHub - your smart workspace for capturing, organizing, and finding notes instantly.`,
    url: `https://08-zustand-phi-seven.vercel.app/`,
    images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub`,
        },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
         <AuthProvider>
          <Header />
          {children}
          {modal}
          <Footer />
         </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}

