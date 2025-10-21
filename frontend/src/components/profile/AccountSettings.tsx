import { User } from "../../types/auth";

interface AccountSettingsProps {
  user: User | null;
}

export const AccountSettings = ({ user }: AccountSettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-8">
        <p className="text-3xl font-semibold text-foreground">
          Account Settings
        </p>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-border">
            <div>
              <h3 className="font-medium text-foreground">Account type</h3>
              <p className="text-sm text-muted-foreground">
                {user?.role === "landlord" ? "Landlord" : "Renter"}
              </p>
            </div>
            <button className="text-sm font-medium text-primary hover:text-primary/80">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-border">
            <div>
              <h3 className="font-medium text-foreground">Language</h3>
              <p className="text-sm text-muted-foreground">English</p>
            </div>
            <button className="text-sm font-medium text-primary hover:text-primary/80">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-border">
            <div>
              <h3 className="font-medium text-foreground">Currency</h3>
              <p className="text-sm text-muted-foreground">USD ($)</p>
            </div>
            <button className="text-sm font-medium text-primary hover:text-primary/80">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-medium text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Manage your notification preferences
              </p>
            </div>
            <button className="text-sm font-medium text-primary hover:text-primary/80">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
