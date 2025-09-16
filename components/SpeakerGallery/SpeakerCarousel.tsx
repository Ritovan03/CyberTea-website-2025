// components/SpeakerGallery/SpeakerCarousel.tsx
import React, { useEffect } from "react";
import type { Speaker } from "./types";
import { SpeakerCard } from "./SpeakerCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface SpeakerCarouselProps {
  items: Pick<
    Speaker,
    "name" | "role" | "affiliation" | "image" | "linkedinUrl"
  >[];
}

const SpeakerCarousel: React.FC<SpeakerCarouselProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative w-full"
      >
        {/* Fading Mask Effect */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#1a1a1a] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#1a1a1a] to-transparent z-20 pointer-events-none" />

        <CarouselContent className="-ml-6 py-6">
          {items.map((speaker, index) => (
            <CarouselItem
              key={index}
              className="pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-2 h-full">
                <SpeakerCard speaker={speaker} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons with better positioning */}
        <div className="hidden md:block">
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 border-white/30 text-white backdrop-blur-sm transition-all duration-200" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 border-white/30 text-white backdrop-blur-sm transition-all duration-200" />
        </div>
      </Carousel>
    </div>
  );
};

export default SpeakerCarousel;
