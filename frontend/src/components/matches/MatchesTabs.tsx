interface MatchesTabsProps {
  activeTab: "matches" | "sent" | "received";
  onTabChange: (tab: "matches" | "sent" | "received") => void;
  matchesCount: number;
  sentCount: number;
  receivedCount: number;
}

export const MatchesTabs = ({
  activeTab,
  onTabChange,
  matchesCount,
  sentCount,
  receivedCount,
}: MatchesTabsProps) => {
  return (
    <div className="mb-8">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => onTabChange("matches")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "matches"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Matches ({matchesCount})
        </button>
        <button
          onClick={() => onTabChange("sent")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "sent"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Sent ({sentCount})
        </button>
        <button
          onClick={() => onTabChange("received")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "received"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Received ({receivedCount})
        </button>
      </div>
    </div>
  );
};
