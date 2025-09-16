import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Github } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  department?: string;
  image: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Conference Chair",
    role: "Conference Chair",
    department: "Computer Science & Engineering",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
    githubUrl: "#",
  },
  {
    name: "Dr. Technical Committee Head",
    role: "Technical Committee Head",
    department: "Cybersecurity Department",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
    githubUrl: "#",
  },
  {
    name: "Prof. Organizing Committee",
    role: "Organizing Committee",
    department: "Information Technology",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
    githubUrl: "#",
  },
  {
    name: "Dr. Publication Chair",
    role: "Publication Chair",
    department: "Computer Applications",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
    githubUrl: "#",
  },
  {
    name: "Dr. Finance Committee",
    role: "Finance Committee",
    department: "Administration",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
    githubUrl: "#",
  },
  {
    name: "Prof. Registration Head",
    role: "Registration Head",
    department: "Computer Science",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
    githubUrl: "#",
  },
];

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
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
            src={member.image}
            alt={member.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/150?text=${member.name.charAt(
                0
              )}`;
            }}
          />
          {/* Subtle image glow on hover */}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-30 blur-md transition-all duration-300" />
        </div>

        <h4 className="text-lg font-semibold text-white/95 leading-tight mb-3">
          {member.name}
        </h4>
        <p className="text-base font-medium text-white/70 mb-2">
          {member.role}
        </p>
        <p className="text-sm text-white/50 italic">{member.department}</p>

        {/* Social Links */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white/90 transition-all duration-200"
              aria-label={`${member.name}'s LinkedIn Profile`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {member.githubUrl && (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white/90 transition-all duration-200"
              aria-label={`${member.name}'s GitHub Profile`}
            >
              <Github size={16} className="text-current" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <div
      className="px-5 py-20 text-white relative"
      style={{
        background: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      {/* Title Section */}
      <div className="text-center mb-16">
        <h2
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Team
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Meet the dedicated professionals behind CyberTea 2025
        </p>
      </div>

      {/* Team Carousel */}
      <div className="w-full max-w-7xl mx-auto relative">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
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
            {teamMembers.map((member, index) => (
              <CarouselItem
                key={index}
                className="pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-2 h-full">
                  <TeamCard member={member} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 border-white/30 text-white backdrop-blur-sm transition-all duration-200" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 border-white/30 text-white backdrop-blur-sm transition-all duration-200" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Team;
