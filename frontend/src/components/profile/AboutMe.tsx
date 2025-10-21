import { User } from "../../types/auth";
import Image from "next/image";

interface AboutMeProps {
  user: User | null;
}

export const AboutMe = ({ user }: AboutMeProps) => {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-semibold text-foreground">About me</p>

      <div className="flex flex-col gap-6">
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src={
              user?.image ||
              "https://msrealtors.org/wp-content/uploads/2018/11/no-user-image.gif"
            }
            alt={user?.name || "User image"}
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Personal Info Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            <input
              type="text"
              defaultValue={user?.name?.split(" ")[0] || ""}
              className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Last name
            </label>
            <input
              type="text"
              defaultValue={user?.name?.split(" ").slice(1).join(" ") || ""}
              className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.email || ""}
              className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone number
            </label>
            <input
              type="tel"
              defaultValue={user?.phone || ""}
              className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date of birth
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Gender
            </label>
            <select className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};
