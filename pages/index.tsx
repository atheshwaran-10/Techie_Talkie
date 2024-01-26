import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image"
import logo from "@/public/images/logo2.png"
import {cn} from "@/common/utils/utils"
import style from "@/styles/landing.module.css"
import {useRef} from "react"
import { Inter } from "next/font/google";
import { FaGithub } from "react-icons/fa6";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});



export default function Home() {
  noStore();
  const session = useCurrentUser();
  //console.log(session.data)
 const ref = useRef(null);
 const isInView = useInView(ref) as boolean;

 const FADE_DOWN_ANIMATION_VARIANTS = {
   hidden: { opacity: 0, y: -10 },
   show: { opacity: 1, y: 0, transition: { type: "spring" } },
 };
  return (
    <main
      className={`${inter.variable}  flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#4b90ff] via-[#6ca4fc] to-[#aaaaaa] font-sans text-white`}
    >
      <div id="header" className="mb-auto flex w-full flex-row justify-between">
        <div className="flex flex-row gap-x-3">
          <div>
            <Link href={"/"}>
              <Image src={logo} height={80} width={80} alt="" />
            </Link>
          </div>
        </div>
        <div className="mr-3 mt-2 text-2xl font-bold">
          <span className="">Techie Talkie</span>
        </div>
      </div>
      <div className="container mb-[250px] flex flex-col items-center justify-center gap-8 px-4 ">
        <h1 className="-ml-[100px] text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <motion.div
            initial="hidden"
            className="max-w-2xl"
            ref={ref}
            animate={isInView ? "show" : "hidden"}
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.h1
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="font-headingAlt space-x-4 text-5xl font-bold tracking-tight sm:text-7xl"
            >
              <span className={cn(style.magicText, "inline")}>AnyOne</span>
              <span className="md:mx-1">from</span>
              <span className={cn(style.magicText, "inline")}>Anywhere</span>
            </motion.h1>
          </motion.div>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <motion.h1
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className=" space-x-4 text-xl tracking-tight "
          >
            Techie Talkie is Virtual Meeting App that helps folks to gather
            around and have a lot of fun
          </motion.h1>

          <div className="mt-5 flex flex-row items-center justify-center gap-4 gap-x-5">
            <Link
              href={session.data ? "/join" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Get Started
            </Link>
            <Link
              href={session.data ? "/join" : "/api/auth/signin"}
              className="rounded-full bg-[rgba(5,142,247,0.968)] px-10 py-3 font-semibold no-underline transition hover:bg-[rgba(5,142,247,0.868)] "
            >
              <div className="flex flex-row gap-x-2">
                Star on Github <FaGithub size={24} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}


