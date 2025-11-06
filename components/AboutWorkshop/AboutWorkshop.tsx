import React from 'react';
import { CardSpotlight } from '@/components/ui/card-spotlight';

const AboutWorkshop: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background: "#1a1a1a",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 12px rgba(255,255,255,0.4)",
            }}
          >
            About the Workshop
          </h2>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-8 sm:p-10 lg:p-14 border border-white/10 shadow mb-12">
          <div className="space-y-6 text-center">
            <p className="text-white text-lg sm:text-xl leading-relaxed">
              In today's digitally connected world, cybersecurity has become a <span className="font-semibold">paramount concern</span>. As technology evolves, so do the threats that exploit it.
            </p>
            <p className="text-white text-lg sm:text-xl leading-relaxed">
              To address this ever-changing landscape, the <span className="font-bold">Third Edition of the Workshop on "Cybersecurity Trends and Emerging Applications"</span> aims to provide participants with insights into the latest trends, challenges, and emerging applications in the field of cybersecurity.
            </p>
            <p className="text-white text-lg sm:text-xl leading-relaxed">
              This workshop will foster a <span className="font-semibold">collaborative environment</span> for participants to learn, discuss, and explore innovative solutions to safeguard digital assets.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Learn Card */}
          <CardSpotlight
            radius={200}
            color="#d5d5dc"
            className="shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.9)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <h3
                className="text-lg font-semibold"
                style={{
                  color: "white",
                  textShadow: "0 0 8px rgba(0,0,0,0.3)",
                }}
              >
                Learn
              </h3>
            </div>
            <p
              className="leading-relaxed text-sm"
              style={{
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Gain insights into the latest cybersecurity trends and challenges
            </p>
          </CardSpotlight>
          {/* Discuss Card */}
          <CardSpotlight
            radius={200}
            color="#d5d5dc"
            className="shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.9)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3
                className="text-lg font-semibold"
                style={{
                  color: "white",
                  textShadow: "0 0 8px rgba(0,0,0,0.3)",
                }}
              >
                Discuss
              </h3>
            </div>
            <p
              className="leading-relaxed text-sm"
              style={{
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Engage in meaningful conversations with experts and peers
            </p>
          </CardSpotlight>
          {/* Explore Card */}
          <CardSpotlight
            radius={200}
            color="#d5d5dc"
            className="shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.9)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <h3
                className="text-lg font-semibold"
                style={{
                  color: "white",
                  textShadow: "0 0 8px rgba(0,0,0,0.3)",
                }}
              >
                Explore
              </h3>
            </div>
            <p
              className="leading-relaxed text-sm"
              style={{
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Discover innovative solutions and practical approaches to safeguard digital assets
            </p>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
};


export default AboutWorkshop;