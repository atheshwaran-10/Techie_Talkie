"use client";
import Header from "./components/Header";
import Form from "./components/Form";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Inter } from "next/font/google";
import { User } from "@prisma/client";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Home = () => {
  const { data }: { data?: { currentUser?: User } } = useCurrentUser();

  return (
    <div className={`${inter.className}`}>
      <Header user={data?.currentUser} />
      <Form />
    </div>
  );
};

export default Home;
