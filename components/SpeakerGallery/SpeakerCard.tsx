// components/SpeakerGallery/SpeakerCard.tsx
import React from "react";
import type { Speaker } from "./types";

// The data for each card is a subset of the main Speaker type
interface SpeakerCardProps {
  speaker: Pick<
    Speaker,
    "name" | "role" | "affiliation" | "image" | "linkedinUrl"
  >;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
  return (
    <div className="group relative h-full w-full">
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className="relative h-full flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300"
        style={{
          background: "rgba(26, 26, 26, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="relative mb-8">
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/150?text=${speaker.name.charAt(
                0
              )}`;
            }}
          />
          {/* Subtle image glow on hover */}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-30 blur-md transition-all duration-300" />
        </div>

        <h4 className="text-lg font-semibold text-white/95 leading-tight mb-3">
          {speaker.name}
        </h4>
        {speaker.role && (
          <p className="text-base font-medium text-white/70 mb-2">
            {speaker.role}
          </p>
        )}
        <p className="text-sm text-white/50 italic">{speaker.affiliation}</p>

        {speaker.linkedinUrl && speaker.linkedinUrl.trim() !== "" && (
          <a
            href={speaker.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white/90 transition-all duration-200 group/linkedin"
            aria-label={`${speaker.name}'s LinkedIn Profile`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};
