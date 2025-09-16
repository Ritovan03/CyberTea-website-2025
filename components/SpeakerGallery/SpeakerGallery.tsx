import React from "react";
import CircularGallery from "./CircularGallery";
import type { Speaker } from "./types.ts";
import type { SpeakerCategory } from "./types.ts";

interface SpeakerGalleryProps {
  speakers: Speaker[];
}

const SpeakerGallery: React.FC<SpeakerGalleryProps> = ({ speakers }) => {
  // Add custom styles for the pulse effect and mobile adjustments
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse-subtle {
        0%, 100% {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        50% {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.2),
                      0 0 20px rgba(255, 255, 255, 0.15); /* Subtle white glow */
        }
      }

      .speaker-card-hover:hover {
        animation: pulse-subtle 2s infinite;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 255, 255, 0.1) !important; /* Consistent hover shadow */
      }

      /* No specific filter on the image itself, the 'before' element handles the border */

      @media (max-width: 768px) {
        .speaker-gallery-mobile .gallery-title {
          font-size: 2rem;
        }
        
        .speaker-gallery-mobile .category-title {
          font-size: 1.5rem;
        }
        
        .speaker-gallery-mobile .organizer-card {
          max-width: 100%;
        }
        
        .speaker-gallery-mobile .organizer-image-container {
          width: 120px;
          height: 120px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  const categories: Record<string, SpeakerCategory> = {
    "chief-patron": { title: "Chief Patron", speakers: [] },
    "workshop-conveners": { title: "Workshop Conveners", speakers: [] },
    speakers: { title: "Speakers", speakers: [] },
  };

  speakers.forEach((speaker) => {
    if (categories[speaker.category]) {
      categories[speaker.category].speakers.push(speaker);
    }
  });

  const chiefPatronSpeakers = categories["chief-patron"].speakers;
  const workshopConvener =
    categories["workshop-conveners"].speakers.length > 0
      ? categories["workshop-conveners"].speakers[0]
      : null;
  const allSpeakers = categories.speakers.speakers;

  const hasSpeakersForGallery = allSpeakers.length > 0;
  const hasChiefPatron = chiefPatronSpeakers.length > 0;
  const hasWorkshopConvener = workshopConvener !== null;

  const circularGalleryItems = hasSpeakersForGallery
    ? allSpeakers.map((speaker) => ({
        name: speaker.name,
        role: speaker.role,
        affiliation: speaker.affiliation || " ",
        image: speaker.image,
      }))
    : [];

  return (
    <div
      className="px-5 min-h-screen text-white" // Changed text-black/87 to text-white for overall dark theme
      style={{
        background:
          "linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 60%, #1a1a1a 100%)",
      }}
    >
      <h2
        className="text-center text-4xl mb-10 font-bold" // Added font-bold and removed black/95
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Speakers
      </h2>

      {/* Chief Patron Section */}
      {hasChiefPatron && (
        <div className="mb-16">
          {" "}
          {/* Increased margin bottom */}
          <h3 className="text-3xl mb-8 text-white/90 text-center font-semibold">
            {" "}
            {/* Added font-semibold */}
            Chief Patron
          </h3>
          <div className="flex gap-10 justify-center flex-wrap max-w-4xl mx-auto p-5">
            {chiefPatronSpeakers.map((speaker) => (
              <div
                key={speaker.name}
                className="speaker-card-hover relative w-full max-w-[260px] p-6 pb-4 flex flex-col items-center rounded-2xl overflow-hidden border border-white/10 // Subtle border
                           transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                           hover:-translate-y-2 hover:border-white/30 // White border on hover
                           after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] 
                           after:bg-gradient-to-r after:from-white/50 after:to-white/80 after:opacity-0 // Subtle white gradient bar
                           after:transition-opacity after:duration-300 hover:after:opacity-100"
                style={{
                  background: "linear-gradient(145deg, #1e1e1e, #262626)",
                  boxShadow:
                    "0 15px 35px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.2)", // Base shadow
                  // Removed inline animation here as it's now handled by CSS class
                }}
              >
                <div
                  className="w-32 h-32 rounded-full overflow-hidden mb-5 relative
                               shadow-[0_8px_20px_rgba(0,0,0,0.4),0_0_0_4px_rgba(40,40,40,0.8)]
                               before:content-[''] before:absolute before:inset-0 before:rounded-full before:p-[2px]
                               before:bg-gradient-to-br before:from-white/80 before:to-white/40 // Subtle white-to-light-grey gradient
                               before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                               before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]"
                >
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x300?text=Speaker+Image";
                    }}
                  />
                </div>
                <div className="px-5 pb-4 text-center w-full">
                  <h4
                    className="text-lg mb-2 font-semibold leading-tight"
                    style={{
                      background: "linear-gradient(to right, #ffffff, #e0e0e0)", // White gradient
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {speaker.name}
                  </h4>
                  <p
                    className="text-sm m-0 mb-2 font-semibold tracking-wide"
                    style={{
                      background: "linear-gradient(to right, #8c93ff, #5e7cff)", // Original blue/purple gradient for role
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {speaker.role}
                  </p>
                  {speaker.affiliation && (
                    <p className="text-white/65 text-xs m-0 italic leading-relaxed">
                      {speaker.affiliation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workshop Convener Section */}
      {hasWorkshopConvener && (
        <div className="mb-16">
          {" "}
          {/* Increased margin bottom */}
          <h3 className="text-3xl mb-8 text-white/90 text-center font-semibold">
            {" "}
            {/* Added font-semibold */}
            Workshop Convener
          </h3>
          <div className="flex gap-10 justify-center flex-wrap max-w-4xl mx-auto p-5">
            <div
              className="speaker-card-hover relative w-full max-w-[260px] p-6 pb-4 flex flex-col items-center rounded-2xl overflow-hidden border border-white/10 // Subtle border
                           transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                           hover:-translate-y-2 hover:border-white/30 // White border on hover
                           after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] 
                           after:bg-gradient-to-r after:from-white/50 after:to-white/80 after:opacity-0 // Subtle white gradient bar
                           after:transition-opacity after:duration-300 hover:after:opacity-100"
              style={{
                background: "linear-gradient(145deg, #1e1e1e, #262626)",
                boxShadow:
                  "0 15px 35px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.2)", // Base shadow
              }}
            >
              <div
                className="w-32 h-32 rounded-full overflow-hidden mb-5 relative
                               shadow-[0_8px_20px_rgba(0,0,0,0.4),0_0_0_4px_rgba(40,40,40,0.8)]
                               before:content-[''] before:absolute before:inset-0 before:rounded-full before:p-[2px]
                               before:bg-gradient-to-br before:from-white/80 before:to-white/40 // Subtle white-to-light-grey gradient
                               before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                               before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]"
              >
                <img
                  src={workshopConvener?.image} // Use optional chaining
                  alt={workshopConvener?.name || "Workshop Convener"}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x300?text=Speaker+Image";
                  }}
                />
              </div>
              <div className="px-5 pb-4 text-center w-full">
                <h4
                  className="text-lg mb-2 font-semibold leading-tight"
                  style={{
                    background: "linear-gradient(to right, #ffffff, #e0e0e0)", // White gradient
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {workshopConvener?.name}
                </h4>
                <p
                  className="text-sm m-0 mb-2 font-semibold tracking-wide"
                  style={{
                    background: "linear-gradient(to right, #8c93ff, #5e7cff)", // Original blue/purple gradient for role
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {workshopConvener?.role}
                </p>
                {workshopConvener?.affiliation && (
                  <p className="text-white/65 text-xs m-0 italic leading-relaxed">
                    {workshopConvener.affiliation}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {hasSpeakersForGallery && (
        <div className="mb-15">
          <h3 className="text-3xl mb-5 text-white/90 text-center font-semibold">
            Academic & Industry Speakers
          </h3>

          <div className="w-full mb-5">
            <CircularGallery
              items={circularGalleryItems}
              bend={4}
              galleryId="gallery-main"
              scrollSpeed={1.5}
            />
          </div>
        </div>
      )}

      {!hasSpeakersForGallery && !hasChiefPatron && !hasWorkshopConvener && (
        <div className="text-center py-10 text-white/60 text-lg">
          <p>No speakers found. Please check your data.</p>
        </div>
      )}
    </div>
  );
};

export default SpeakerGallery;
