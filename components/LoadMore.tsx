"use client";
import { fetchAnime } from "@/app/action";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

let page = 2;

export type AnimeCard = JSX.Element;

const LoadMore = () => {
  const { ref, inView } = useInView();

  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    //if in view, increase the page to present the user with all the data resulting in infinite scrolling
    if (inView) {
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data}
      </section>
      <section className="flex items-center justify-center w-full">
        <div ref={ref}>
          <Image
            src={"/spinner.svg"}
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
};

export default LoadMore;
