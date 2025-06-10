"use client";

import Image from "next/legacy/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Hero = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const weddingDate = new Date("June 28, 2025 18:00:00").getTime();

  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(interval);
        console.log("To'y boshlandi!");
        return;
      }

      setDays(String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"));
      setHours(
        String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
      );
      setMinutes(String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"));
      setSeconds(String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"));
    };

    const interval = setInterval(updateCountdown, 1000);

    updateCountdown(); // Call it once immediately to avoid delay

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [weddingDate]);

  return (
    <div className="w-full min-h-screen flex md:flex-row flex-col">
      <div className="md:w-1/2 w-full h-screen justify-center p-5 bg-white/60">
        <div className="invitation-card w-full flex items-center flex-col h-full justify-center">
          <Image src={"/shape.svg"} alt="" width={250} height={100} />
          <p className="text-2xl text-center mt-4 p-2 md:w-[60%]">
            Assalomu aleykum! <br />
            Hurmatli <u>{name ? name : "mehmonimiz"}</u>! <br />
            Sizni <span className="text-primary font-semibold">Muhsinjon & Mubinaxon</span> <br />{" "}
            larning nikoh to&apos;ylari munosabati bilan <br />
            <span className="font-semibold">2025-yil 28-iyun</span> kuni soat{" "}
            <span className="font-semibold">18:00</span> da bo&apos;lib o&apos;tadigan &quot;Visol
            oqshomiga&quot; taklif etamiz! <br />
            <br />
            Manzil: Farg'ona viloyati O'zbekiston tumani{" "}
            <span className="font-semibold">
              <Link
                className="text-[#5b5bf5]"
                href="https://maps.app.goo.gl/D1BhcUkwFBGdJqKv9"
                target="_blank"
              >
                UMID
              </Link>
            </span>{" "}
            to&apos;yxonasi
          </p>
        </div>
      </div>

      <div className="md:w-1/2 w-full relative h-screen">
        <div className="w-full h-full bg-black/60 absolute z-20">
          <div className="border-inherit p-2 backdrop-blur-sm rounded-md absolute left-10 right-10 bottom-5 flex items-center justify-around">
            <div className="text-white text-center font-bold">
              <p className="md:text-5xl text-3xl">{days}</p>
              <span className="font-medium text-sm">kun</span>
            </div>
            <div className="text-white text-center font-bold">
              <p className="md:text-5xl text-3xl">{hours}</p>
              <span className="font-medium text-sm">soat</span>
            </div>
            <div className="text-white text-center font-bold">
              <p className="md:text-5xl text-3xl">{minutes}</p>
              <span className="font-medium text-sm">minut</span>
            </div>
            <div className="text-white text-center font-bold">
              <p className="md:text-5xl text-3xl">{seconds}</p>
              <span className="font-medium text-sm">sekund</span>
            </div>
          </div>
        </div>
        <Image
          src={"/wedding2.png"}
          alt=""
          objectFit="cover"
          layout="fill"
          sizes="w-100vw"
          className="absolute z-10"
          priority={true}
        />
      </div>
    </div>
  );
};
