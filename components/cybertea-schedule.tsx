"use client"

export function CyberTeaSchedule() {
  const scheduleData = [
    {
      time: "9:30–10:00",
      sessions: [
        { title: "Keynote Talk", subtitle: "(TBD)" },
        { title: "Session", subtitle: "(TBD)" },
        { title: "Panel Discussion", subtitle: "(TBD)" },
        { title: "Hands-on", subtitle: "(TBD)" },
        { title: "Keynote Talk", subtitle: "(TBD)" },
      ],
    },
    {
      time: "10:00–11:00",
      sessions: [
        { title: "Session", subtitle: "(TBD)" },
        { title: "Keynote Talk", subtitle: "(TBD)" },
        { title: "Hands-on", subtitle: "(TBD)" },
        { title: "Panel Discussion", subtitle: "(TBD)" },
        { title: "Session", subtitle: "(TBD)" },
      ],
    },
    {
      time: "11:15–12:45",
      sessions: [
        { title: "Hands-on", subtitle: "(TBD)" },
        { title: "Session", subtitle: "(TBD)" },
        { title: "Keynote Talk", subtitle: "(TBD)" },
        { title: "Hands-on", subtitle: "(TBD)" },
        { title: "Panel Discussion", subtitle: "(TBD)" },
      ],
    },
    {
      time: "1:45–3:15",
      sessions: [
        { title: "Panel Discussion", subtitle: "(TBD)" },
        { title: "Hands-on", subtitle: "(TBD)" },
        { title: "Session", subtitle: "(TBD)" },
        { title: "Keynote Talk", subtitle: "(TBD)" },
        { title: "Hands-on", subtitle: "(TBD)" },
      ],
    },
    {
      time: "3:30–5:00",
      sessions: [
        { title: "Keynote Talk", subtitle: "(TBD)" },
        { title: "Panel Discussion", subtitle: "(TBD)" },
        { title: "Hands-on", subtitle: "(TBD)" },
        { title: "Session", subtitle: "(TBD)" },
        { title: "Closing Ceremony", subtitle: "" },
      ],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4">
      {/* Schedule Section */}
      <div className="space-y-6">
        <h1 className="text-2xl md:text-4xl text-center text-black mb-8 font-black font-mono">CyberTEA 3.0 Schedule</h1>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-2 md:gap-4 mb-2">
              <div className="bg-black text-white p-2 md:p-4 font-bold text-center rounded-lg text-xs md:text-sm font-mono">
                Time/Date
              </div>
              <div className="bg-black text-white p-2 md:p-4 text-center rounded-lg text-xs md:text-sm font-extrabold font-mono">
                {"10-12-2025"}
              </div>
              <div className="bg-black text-white p-2 md:p-4 text-center rounded-lg text-xs md:text-sm font-extrabold font-mono">
                {"11-12-2025"}
              </div>
              <div className="bg-black text-white p-2 md:p-4 text-center rounded-lg text-xs md:text-sm font-extrabold font-mono">
                {"12-12-2025"}
              </div>
              <div className="bg-black text-white p-2 md:p-4 text-center rounded-lg text-xs md:text-sm font-mono font-extrabold">
                {"13-12-2025"}
              </div>
              <div className="bg-black text-white p-2 md:p-4 text-center rounded-lg text-xs md:text-sm font-mono font-extrabold">
                {"14-12-2025"}
              </div>
            </div>

            {/* Schedule Rows */}
            {scheduleData.map((timeSlot, index) => (
              <div key={index} className="grid grid-cols-6 gap-2 md:gap-4 mb-2">
                {/* Time Column */}
                <div className="bg-gray-100 border-2 border-black p-2 md:p-4 font-bold text-center rounded-lg flex items-center justify-center">
                  <span className="text-black text-xs md:text-sm leading-tight">{timeSlot.time}</span>
                </div>

                {/* Session Columns */}
                {timeSlot.sessions.map((session, sessionIndex) => {
                  return (
                    <div
                      key={sessionIndex}
                      className="bg-white border-2 border-black p-2 md:p-4 rounded-lg min-h-[80px] md:min-h-[120px] flex flex-col items-center justify-center text-center space-y-1 hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="font-bold text-black text-xs md:text-sm leading-tight">{session.title}</div>
                        {session.subtitle && (
                          <div className="text-gray-600 text-xs mt-1 leading-tight">{session.subtitle}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
