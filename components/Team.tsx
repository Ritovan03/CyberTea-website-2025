import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  department?: string;
  image: string;
  linkedinUrl?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Conference Chair",
    role: "Conference Chair",
    department: "Computer Science & Engineering",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
  },
  {
    name: "Dr. Technical Committee Head",
    role: "Technical Committee Head",
    department: "Cybersecurity Department",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
  },
  {
    name: "Prof. Organizing Committee",
    role: "Organizing Committee",
    department: "Information Technology",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
  },
  {
    name: "Dr. Publication Chair",
    role: "Publication Chair",
    department: "Computer Applications",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
  },
  {
    name: "Dr. Finance Committee",
    role: "Finance Committee",
    department: "Administration",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
  },
  {
    name: "Prof. Registration Head",
    role: "Registration Head",
    department: "Computer Science",
    image: "/placeholder-user.jpg",
    linkedinUrl: "#",
  },
];

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-gray-500 transition-all duration-300 group overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Image Container */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-600 group-hover:border-white/50 transition-all duration-300">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Member Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-blue-400 font-medium text-sm">{member.role}</p>
            {member.department && (
              <p className="text-gray-400 text-sm">{member.department}</p>
            )}
          </div>

          {/* LinkedIn Link */}
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors duration-300 group-hover:scale-110"
            >
              <Linkedin size={20} className="text-white" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
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
