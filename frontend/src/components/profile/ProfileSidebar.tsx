interface Tab {
  id: string;
  label: string;
}

interface ProfileSidebarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const ProfileSidebar = ({
  tabs,
  activeTab,
  onTabChange,
}: ProfileSidebarProps) => {
  return (
    <div className="lg:w-[280px] flex-shrink-0">
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
