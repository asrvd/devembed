"use client";

import Head from "next/head";
import { useState } from "react";
import Script from "next/script";
import ArrowSVG from "@/components/arrow";

export default function Home() {
  const [username, setUsername] = useState("asheeshh");
  const [slug, setSlug] = useState("asheeshh");
  const [copied, setCopied] = useState(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const copyScript = () => {
    navigator.clipboard.writeText(
      `<script src="https://devembed.asrvd.me/scripts/embed.min.js" data-username="${slug}" async></script>`
    );
    setCopied(true);
    sleep(2000).then(() => setCopied(false));
  };

  return (
    <>
      <main
        className="font-sans min-w-screen min-h-screen flex flex-col justify-start items-center p-2 gap-10"
        style={{
          backgroundColor: "rgb(239, 162, 244)",
          backgroundImage: `radial-gradient(at 0% 23%, rgb(210, 219, 235) 0px, transparent 50%), radial-gradient(at 89% 67%, rgb(196, 164, 229) 0px, transparent 50%), radial-gradient(at 82% 58%, rgb(217, 190, 229) 0px, transparent 50%), radial-gradient(at 42% 82%, rgb(249, 207, 198) 0px, transparent 50%), radial-gradient(at 99% 95%, rgb(202, 240, 237) 0px, transparent 50%), radial-gradient(at 13% 73%, rgb(254, 247, 220) 0px, transparent 50%), radial-gradient(at 47% 8%, rgb(239, 239, 201) 0px, transparent 50%)`,
        }}
      >
        <section className="flex flex-col justify-center items-center w-full lg:w-2/3 p-2">
          <h2
            className="text-zinc-50 text-[3rem] lg:text-[5rem] font-black leading-tight"
            style={{
              textShadow: "0 2px 4px rgba(164, 167, 170, 0.5)",
            }}
          >
            DevEmbed
          </h2>
          <p
            className="text-zinc-100 text-center text-lg lg:text-2xl font-bold tracking-tight"
            style={{
              textShadow: "0 2px 4px rgba(164, 167, 170, 0.5)",
            }}
          >
            embed and showcase your{" "}
            <span className="underline underline-offset-4 decoration-wavy">
              dev.to
            </span>{" "}
            profile anywhere!
          </p>
        </section>
        <section className="flex flex-col justify-center items-center w-full lg:w-2/3 p-2 gap-4">
          <div className="min-w-full flex justify-start items-center gap-4">
            <input
              placeholder="Enter your dev.to username"
              className="bg-zinc-100/50 rounded-lg shadow-xl p-3 w-[70%] text-zinc-800 placeholder:text-zinc-800 outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="bg-zinc-100/50 rounded-lg shadow-xl w-[30%] text-zinc-800 hover:bg-zinc-100/60 duration-200 p-3"
              onClick={() => setSlug(username)}
            >
              Generate
            </button>
          </div>
          <div className="w-full overflow-x-scroll overflow-y-scroll lg:overflow-hidden h-[800px] rounded-lg shadow-xl bg-zinc-100/50 flex flex-col justify-center items-center">
            <iframe
              src={`http://localhost:3000/widget/panel/${slug}`}
              className="flex flex-col justify-center items-center w-[500px] h-[600px] rounded-lg max-h-auto scrollbar-thin shadow-xl scrollbar-track-transparent scrollbar-thumb-zinc-500"
            ></iframe>
            <button
              className="bg-zinc-100/50 rounded-lg my-2 shadow-xl text-zinc-800 hover:bg-zinc-100/70 duration-200 p-3 max-w-max"
              onClick={() => copyScript()}
            >
              {copied ? "Copied!" : "Copy Script"}
            </button>
            <p className="text-xs text-zinc-800">
              ( Paste the script code inside your HTML to embed your widget )
            </p>
          </div>
        </section>
        <ArrowSVG />
        <footer
          className="mb-4 text-zinc-50 "
          style={{
            textShadow: "0 2px 4px rgba(164, 167, 170, 0.5)",
          }}
        >
          made with {"<3"} by{" "}
          <a
            href="https://github.com/asrvd"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline decoration-wavy underline-offset-2"
          >
            ashish
          </a>
        </footer>
      </main>
      <Script
        // strategy="afterInteractive"
        src="http://localhost:3000/scripts/embed.min.js"
        data-username="ben"
        async
      />
    </>
  );
}
