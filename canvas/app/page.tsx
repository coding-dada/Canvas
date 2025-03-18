"use client";

// this is a client component
import { useEffect } from "react";
import Link from "next/link";
import { renderCanvas } from "@/components/ui/canvas"
import { DIcons } from "dicons";

import { Button } from "@/components/ui/button";

export default function Page() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <div className="animation-delay-8 animate-fadeIn flex flex-col items-center justify-center px-4 py-4 sm:py-6 md:py-8 text-center sm:px-6 md:px-8 lg:px-10">
        <div className="z-10 mb-5 mt-6 sm:mb-6 sm:mt-8 md:mt-12 lg:mt-16">
          <div className="relative flex items-center whitespace-nowrap rounded-full border bg-popover px-3 py-2 text-sm leading-6 text-primary/60 sm:px-3 sm:py-1 sm:text-xs">
            <DIcons.Shapes className="h-5 p-1 sm:h-4 sm:p-0.5" /> 
            <span className="mr-1">Introducing Dicons.</span>
            <a
              href="/products/dicons"
              rel="noreferrer"
              className="hover:text-ali flex items-center font-semibold"
            >
              <div className="absolute inset-0 flex" aria-hidden="true" />
              <span className="flex items-center">
                Explore
                <DIcons.ArrowRight className="ml-1 h-4 w-4 sm:h-3 sm:w-3" />
              </span>
            </a>
          </div>
        </div>

        <div className="w-full max-w-7xl px-2 sm:px-4">
          <div className="border-ali relative mx-auto h-full border p-5 sm:p-4 md:p-6 lg:p-10 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)]">
            <h1 className="flex select-none flex-col px-1 py-3 text-center text-4xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">
              <DIcons.Plus
                strokeWidth={4}
                className="text-ali absolute -left-3 -top-3 h-8 w-8 sm:h-8 sm:w-8 md:-left-4 md:-top-4 md:h-10 md:w-10"
              />
              <DIcons.Plus
                strokeWidth={4}
                className="text-ali absolute -bottom-3 -left-3 h-8 w-8 sm:h-8 sm:w-8 md:-bottom-4 md:-left-4 md:h-10 md:w-10"
              />
              <DIcons.Plus
                strokeWidth={4}
                className="text-ali absolute -right-3 -top-3 h-8 w-8 sm:h-8 sm:w-8 md:-right-4 md:-top-4 md:h-10 md:w-10"
              />
              <DIcons.Plus
                strokeWidth={4}
                className="text-ali absolute -bottom-3 -right-3 h-8 w-8 sm:h-8 sm:w-8 md:-bottom-4 md:-right-4 md:h-10 md:w-10"
              />
              Your complete platform for the Design.
            </h1>
            <div className="flex items-center justify-center gap-1 mt-3">
              <span className="relative flex h-3 w-3 sm:h-3 sm:w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 sm:h-2 sm:w-2 rounded-full bg-green-500"></span>
              </span>
              <p className="text-sm text-green-500 sm:text-xs">Available Now</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mt-7 sm:mt-8 md:mt-10">
          <h1 className="text-2xl sm:text-2xl md:text-3xl text-white">
            Welcome to our coding sanctuary! We are{" "}
            <span className="font-bold text-green-500">Coding Tutor </span>
          </h1>

          <p className="mx-auto mt-3 mb-8 sm:mb-10 md:mb-12 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl px-4 sm:px-6 text-sm sm:text-sm md:text-base lg:text-lg text-gray-400">
            We transform aspiring developers into coding maestros through expert guidance, hands-on projects, and cutting-edge resources.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 pb-6 sm:pb-0">
            <Link href={"/dashboard"} className="w-full sm:w-auto">
              <Button variant="default" size="lg" className="w-full h-12 sm:h-11 sm:w-auto text-base sm:text-sm cursor-pointer">
                Start Project
              </Button>
            </Link>
            <Link href={"https://cal.com/aliimam/designali"} target="_blank" className="w-full sm:w-auto mt-3 sm:mt-0">
              <Button variant="outline" size="lg" className="w-full h-12 sm:h-11 sm:w-auto text-base sm:text-sm cursor-pointer">
                Book a call
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 -z-10 mx-auto"
        id="canvas"
      ></canvas>
    </section>
  );
}

 
