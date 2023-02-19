/* eslint-disable @next/next/no-img-element */
import { GithubIcon, TwitterIcon } from "@/components/icons";
import { z } from "zod";

const responseSchema = z.object({
  name: z.string(),
  username: z.string(),
  avatar: z.string(),
  twitter: z.string().nullable(),
  github: z.string().nullable(),
  summary: z.string().nullable(),
  articles: z
    .array(
      z.object({
        title: z.string(),
        url: z.string(),
        reading_time: z.number(),
        reactions: z.number(),
      })
    )
    .default([]),
});

export default async function Panel({ params }: { params: { slug: string } }) {
  const res = await fetch(`https://deb.asrvd.me/api?user=${params.slug}`);
  const dev = responseSchema.safeParse(await res.json());

  if (!dev.success) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <h2 className="text-2xl font-bold text-zinc-800">
          User not found or invalid username
        </h2>
      </div>
    );
  }

  return (
    <main className="font-sans">
      <div className="w-full lg:w-[30rem] md:w-[30rem] h-1/2 rounded-2xl p-6 bg-zinc-200 overflow-y-hidden">
        <section className="flex w-full flex-col items-center divide-y divide-zinc-500 gap-4">
          <div className="flex flex-col justify-center items-center w-full">
            <img
              src={dev.data.avatar}
              alt="avatar"
              className="rounded-full w-[6rem] h-[6rem] shadow-md border-2 border-zinc-300"
            ></img>
            <h2 className="mt-2 text-lg text-zinc-800 font-bold leading-none">
              {dev.data.name}
            </h2>
            <a
              className="text-xs text-zinc-800 mb-1"
              href={`https://dev.to/${dev.data.username}`}
              target="_blank"
              rel="noreferrer"
            >
              @{dev.data.username}
            </a>
            <h2 className="text-sm text-center text-zinc-800 leading-tight">
              {dev.data.summary}
            </h2>
            <div className="flex gap-4 mt-2">
              {dev.data.twitter && (
                <a
                  className="text-xs text-zinc-800 inline-flex items-center gap-1"
                  href={`https://twitter.com/${dev.data.twitter}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterIcon />@{dev.data.twitter}
                </a>
              )}
              {dev.data.github && (
                <a
                  className="text-xs text-zinc-800 inline-flex items-center gap-1"
                  href={`https://github.com/${dev.data.github}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon />@{dev.data.github}
                </a>
              )}
            </div>
          </div>
          <div className="w-full pt-4 grid grid-cols-1 gap-2">
            <h2 className="w-full leading-none font-semibold text-lg pb-2 text-center text-zinc-800">
              Recent Posts
            </h2>
            {dev.data.articles?.map((article, index) => (
              <div
                key={index}
                className="flex justify-center items-center p-2 rounded-lg pl-6 shadow-xl hover:-translate-y-[0.15rem] text-gray-300 cursor-pointer duration-200 bg-zinc-800"
              >
                <a
                  className="w-full h-full flex flex-col justify-start gap-4"
                  href={article?.url}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <h3 className="font-semibold text-sm lg:text-lg md:text-lg leading-tight lg:leading-tight md:leading-tight">
                    {article?.title}
                  </h3>
                  <div className="flex gap-4 justify-start">
                    <p className="text-xs">
                      {article?.reading_time}{" "}
                      {article?.reading_time == 1 ? "minute" : "minutes"} read
                    </p>
                    <p className="text-xs">
                      {article?.reactions}{" "}
                      {article?.reactions == 1 ? "reaction" : "reactions"}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="w-full pt-6 grid grid-cols-1 gap-2 text-center">
            <h2 className="text-xs text-zinc-700">
              made with {`<3`} using{" "}
              <a
                className="text-rose-700"
                href="https://devembed.asrvd.me"
                target={"_blank"}
                rel="noreferrer"
              >
                devembed
              </a>
            </h2>
          </div>
        </section>
      </div>
    </main>
  );
}
