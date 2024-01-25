"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost =()=>{
    console.log("CREATED")
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
       
      >
        {"Submit"}
      </button>
    </form>
  );
}
