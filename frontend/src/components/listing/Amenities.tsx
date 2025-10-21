import type { AmenitiesProps } from "./types";

const amenityIcons: Record<string, string> = {
  WiFi: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
  Heating:
    "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  Kitchen:
    "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2zM8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z",
  Washer:
    "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  "Air Conditioning":
    "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  Balcony:
    "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2zM8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z",
  Parking:
    "M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2",
  Pool: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  Gym: "M13 10V3L4 14h7v7l9-11h-7z",
  Elevator:
    "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M9 9h6M9 13h6M9 17h6",
};

export const Amenities = ({ amenities }: AmenitiesProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        What this place offers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-6 h-6 flex-shrink-0">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={amenityIcons[amenity] || "M5 13l4 4L19 7"}
                />
              </svg>
            </div>
            <span className="text-gray-700">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
