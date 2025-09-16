"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

interface ScheduleDay {
  date: string; // e.g., "December 10, 2025"
  dayLabel: string; // e.g., "Day 1"
  events: ScheduleItem[];
}

// Sample schedule data - commented out for reference
/*
const sampleScheduleData: ScheduleDay[] = [
  {
    date: "December 10, 2025",
    dayLabel: "Day 1",
    events: [
      {
        time: "09:00 - 09:30",
        title: "Welcome & Opening Ceremony",
        description:
          "Introduction to CyberTEA 3.0 and overview of the 5-day workshop agenda.",
        speaker: "Workshop Organizers",
      },
      {
        time: "09:30 - 11:00",
        title: "Keynote: The Future of Cybersecurity",
        description:
          "An in-depth look at emerging cybersecurity threats and the technologies being developed to combat them.",
        speaker: "Dr. Security Expert",
      },
      {
        time: "11:15 - 12:30",
        title: "AI in Cybersecurity",
        description:
          "Exploring how artificial intelligence is revolutionizing threat detection and response mechanisms.",
        speaker: "AI Security Specialist",
      },
    ],
  },
  {
    date: "December 11, 2025",
    dayLabel: "Day 2",
    events: [
      {
        time: "09:00 - 10:30",
        title: "Cloud Security Fundamentals",
        description:
          "Understanding the unique security challenges and solutions in cloud computing environments.",
        speaker: "Cloud Security Expert",
      },
      {
        time: "10:45 - 12:15",
        title: "Zero Trust Architecture",
        description:
          "Implementing zero trust principles in modern enterprise security frameworks.",
        speaker: "Enterprise Security Architect",
      },
    ],
  },
  {
    date: "December 12, 2025",
    dayLabel: "Day 3",
    events: [
      {
        time: "09:00 - 10:30",
        title: "Incident Response & Forensics",
        description:
          "Best practices for handling security incidents and conducting digital forensics investigations.",
        speaker: "Forensics Expert",
      },
      {
        time: "10:45 - 12:15",
        title: "IoT Security Challenges",
        description:
          "Securing the Internet of Things: from smart homes to industrial systems.",
        speaker: "IoT Security Researcher",
      },
    ],
  },
  {
    date: "December 13, 2025",
    dayLabel: "Day 4",
    events: [
      {
        time: "09:00 - 10:30",
        title: "Blockchain & Cryptocurrency Security",
        description:
          "Security implications and best practices in blockchain technology and digital currencies.",
        speaker: "Blockchain Security Expert",
      },
      {
        time: "10:45 - 12:15",
        title: "Social Engineering & Human Factors",
        description:
          "Understanding and mitigating human-centered security vulnerabilities.",
        speaker: "Social Engineering Specialist",
      },
    ],
  },
  {
    date: "December 14, 2025",
    dayLabel: "Day 5",
    events: [
      {
        time: "09:00 - 10:30",
        title: "Future Trends Panel Discussion",
        description:
          "Industry leaders discuss emerging trends and future directions in cybersecurity.",
        speaker: "Industry Panel",
      },
      {
        time: "10:45 - 11:30",
        title: "Closing Ceremony & Networking",
        description:
          "Wrap-up of the workshop with final thoughts and networking opportunities.",
        speaker: "Workshop Organizers",
      },
    ],
  },
];
*/

// Actual schedule data - To be announced soon!
const defaultScheduleData: ScheduleDay[] = [
  {
    date: "December 10, 2025",
    dayLabel: "Day 1",
    events: [
      {
        time: "TBA",
        title: "To be announced soon!",
        description:
          "Detailed schedule with exciting sessions, workshops, and keynotes will be announced soon. Stay tuned for updates!",
        speaker: "Various Expert Speakers",
      },
    ],
  },
  {
    date: "December 11, 2025",
    dayLabel: "Day 2",
    events: [
      {
        time: "TBA",
        title: "To be announced soon!",
        description:
          "Detailed schedule with exciting sessions, workshops, and keynotes will be announced soon. Stay tuned for updates!",
        speaker: "Various Expert Speakers",
      },
    ],
  },
  {
    date: "December 12, 2025",
    dayLabel: "Day 3",
    events: [
      {
        time: "TBA",
        title: "To be announced soon!",
        description:
          "Detailed schedule with exciting sessions, workshops, and keynotes will be announced soon. Stay tuned for updates!",
        speaker: "Various Expert Speakers",
      },
    ],
  },
  {
    date: "December 13, 2025",
    dayLabel: "Day 4",
    events: [
      {
        time: "TBA",
        title: "To be announced soon!",
        description:
          "Detailed schedule with exciting sessions, workshops, and keynotes will be announced soon. Stay tuned for updates!",
        speaker: "Various Expert Speakers",
      },
    ],
  },
  {
    date: "December 14, 2025",
    dayLabel: "Day 5",
    events: [
      {
        time: "TBA",
        title: "To be announced soon!",
        description:
          "Detailed schedule with exciting sessions, workshops, and keynotes will be announced soon. Stay tuned for updates!",
        speaker: "Various Expert Speakers",
      },
    ],
  },
];

interface EventScheduleProps {
  scheduleData?: ScheduleDay[];
}

export default function EventSchedule({
  scheduleData = defaultScheduleData,
}: EventScheduleProps) {
  return (
    <section
      className="relative w-full overflow-hidden text-white py-20"
      style={{
        background: "#1a1a1a",
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4 tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 12px rgba(255,255,255,0.4)",
            }}
          >
            Workshop Schedule
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.7)",
              textShadow: "0 0 8px rgba(0,0,0,0.3)",
            }}
          >
            Explore our comprehensive lineup of sessions, workshops, and
            activities scheduled over the 5-day virtual event.
          </p>
        </div>

        <Accordion.Root
          className="w-full space-y-4"
          type="single"
          defaultValue={scheduleData[0]?.dayLabel}
          collapsible
        >
          {scheduleData.map((day, index) => (
            <Accordion.Item
              key={day.dayLabel}
              value={day.dayLabel}
              className="rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)] group focus-within:ring-2 focus-within:ring-white/20 transition-all duration-300"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex flex-1 items-center justify-between px-6 py-5 text-left font-semibold text-lg hover:bg-white/5 transition-all duration-200">
                  <span className="flex items-baseline gap-3">
                    <span
                      className="text-sm font-medium px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(0,0,0,0.5)",
                        color: "rgba(255,255,255,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {day.dayLabel}
                    </span>
                    <span
                      className="text-white font-medium"
                      style={{
                        textShadow: "0 0 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      {day.date}
                    </span>
                  </span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white/60 group-data-[state=open]:rotate-180 transition-transform duration-300 ease-in-out"
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                <div
                  className="px-6 py-6 border-t"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    borderColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="space-y-6">
                    {day.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="pb-6 last:pb-0 border-b border-white/10 last:border-b-0"
                      >
                        <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {event.time}
                        </div>
                        <h3
                          className="text-xl font-semibold mb-2"
                          style={{
                            color: "rgba(255,255,255,0.95)",
                            textShadow: "0 0 8px rgba(0,0,0,0.3)",
                          }}
                        >
                          {event.title}
                        </h3>
                        {event.speaker && (
                          <p
                            className="text-sm mb-3 font-medium"
                            style={{
                              color: "rgba(255,255,255,0.6)",
                            }}
                          >
                            Speaker: {event.speaker}
                          </p>
                        )}
                        <p
                          className="text-base leading-relaxed"
                          style={{
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          {event.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {/* View Full Schedule Button */}
        <div className="flex justify-center mt-12">
          <button
            className="flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(0,0,0,0.5)",
              color: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            Download Full Schedule
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
