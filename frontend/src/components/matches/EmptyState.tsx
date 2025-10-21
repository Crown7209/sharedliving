import { Heart } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const EmptyState = ({
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Heart className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      <button
        onClick={onButtonClick}
        className="px-6 py-3 bg-white border border-black text-gray-900 rounded-lg hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        {buttonText}
      </button>
    </div>
  );
};
