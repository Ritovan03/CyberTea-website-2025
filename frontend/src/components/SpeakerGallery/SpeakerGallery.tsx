import React from "react";
import CircularGallery from "./CircularGallery";
import type { Speaker } from "./types.ts";
import type { SpeakerCategory } from "./types.ts";
import "./SpeakerGallery.css";

interface SpeakerGalleryProps {
  speakers: Speaker[];
}

const SpeakerGallery: React.FC<SpeakerGalleryProps> = ({ speakers }) => {
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
    <div className="speaker-gallery">
      <h2 className="gallery-title">Speakers</h2>

      {/* Chief Patron Section */}
      {hasChiefPatron && (
        <div className="speaker-category">
          <h3 className="category-title">Chief Patron</h3>
          <div className="speaker-grid">
            {chiefPatronSpeakers.map((speaker) => (
              <div key={speaker.name} className="organizer-card">
                <div className="organizer-image-container">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="organizer-image"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x300?text=Speaker+Image";
                    }}
                  />
                </div>
                <div className="organizer-info">
                  <h4 className="organizer-name">{speaker.name}</h4>
                  <p className="organizer-role">{speaker.role}</p>
                  {speaker.affiliation && (
                    <p className="organizer-affiliation">
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
        <div className="speaker-category">
          <h3 className="category-title">Workshop Convener</h3>
          <div className="speaker-grid">
            <div className="organizer-card">
              <div className="organizer-image-container">
                <img
                  src={workshopConvener.image}
                  alt={workshopConvener.name}
                  className="organizer-image"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x300?text=Speaker+Image";
                  }}
                />
              </div>
              <div className="organizer-info">
                <h4 className="organizer-name">{workshopConvener.name}</h4>
                <p className="organizer-role">{workshopConvener.role}</p>
                {workshopConvener.affiliation && (
                  <p className="organizer-affiliation">
                    {workshopConvener.affiliation}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {hasSpeakersForGallery && (
        <div className="speaker-category">
          <h3 className="category-title">Academic & Industry Speakers</h3>

          <div className="circular-gallery-row">
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
        <div className="no-speakers-message">
          <p>No speakers found. Please check your data.</p>
        </div>
      )}
    </div>
  );
};

export default SpeakerGallery;
