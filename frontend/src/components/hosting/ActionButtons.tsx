"use client";

import { Button } from "@/components/ui/button";
import { Save, Upload } from "lucide-react";

interface ActionButtonsProps {
  isSubmitting: boolean;
  onSave: () => void;
  onPublish: () => void;
}

export const ActionButtons = ({
  isSubmitting,
  onSave,
  onPublish,
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
      <Button
        onClick={onSave}
        disabled={isSubmitting}
        variant="outline"
        className="cursor-pointer flex-1 h-12 border-gray-300 hover:bg-gray-50"
      >
        <Save size={16} className="mr-2" />
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>

      <Button
        onClick={onPublish}
        disabled={isSubmitting}
        className="cursor-pointer flex-1 h-12 bg-black hover:bg-gray-800 text-white"
      >
        <Upload size={16} className="mr-2" />
        {isSubmitting ? "Publishing..." : "Publish Property"}
      </Button>
    </div>
  );
};
