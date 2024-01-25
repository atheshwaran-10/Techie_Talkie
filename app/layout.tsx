
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});



export const metadata: Metadata = {
  title: "Dump.place",
  description: "A minimal place to dump your thoughts.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Dump.place",
    description: "A minimal place to dump your thoughts.",
    images: [
      {
        url: "https://dump.place/preview.png",
        width: 796,
        height: 682,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          defer
          data-website-id="ecec2b13-0f08-416d-921b-94a601eb414f"
          src="https://u.dhr.wtf/umami.js"
        ></script>
      </head>
      <body
        className={`dark overflow-y-auto overflow-x-hidden font-sans ${inter.variable} `}
      >
        <div className="loader" />
  
          {children}
      </body>
    </html>
  );
}
