export const Security = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-8">
        <p className="text-3xl font-semibold text-foreground">Security</p>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-border">
            <div>
              <h3 className="font-medium text-foreground">Password</h3>
              <p className="text-sm text-muted-foreground">
                Last changed 3 months ago
              </p>
            </div>
            <button className="text-sm font-medium text-primary hover:text-primary/80">
              Change password
            </button>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-border">
            <div>
              <h3 className="font-medium text-foreground">
                Two-factor authentication
              </h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>
            <button className="text-sm font-medium text-primary hover:text-primary/80">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-border">
            <div>
              <h3 className="font-medium text-foreground">Login activity</h3>
              <p className="text-sm text-muted-foreground">
                Review recent login activity
              </p>
            </div>
            <button className="text-sm font-medium text-primary hover:text-primary/80">
              View activity
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-medium text-foreground text-destructive">
                Delete account
              </h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <button className="text-sm font-medium text-destructive hover:text-destructive/80">
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
