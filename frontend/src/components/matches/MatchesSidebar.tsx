interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface MatchesSidebarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: "matches" | "sent" | "received") => void;
}

export const MatchesSidebar = ({
  tabs,
  activeTab,
  onTabChange,
}: MatchesSidebarProps) => {
  return (
    <div className="lg:w-[280px] flex-shrink-0">
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              onTabChange(tab.id as "matches" | "sent" | "received")
            }
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-xs bg-gray-200 text-gray-600 w-6 h-6 rounded-full flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};
