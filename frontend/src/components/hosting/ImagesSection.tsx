"use client";

import { Button } from "@/components/ui/button";
import { FormSectionProps } from "./types";
import { Trash2, Plus } from "lucide-react";
import { AddImage } from "./AddImage";

const FormSection = ({ title, children }: FormSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    {children}
  </div>
);

interface ImagesSectionProps {
  images: string[];
  setImages: (images: string[]) => void;
  errors: Record<string, string>;
  isSubmitted?: boolean;
}

export const ImagesSection = ({
  images,
  setImages,
  errors,
  isSubmitted = false,
}: ImagesSectionProps) => {
  const addImage = () => {
    setImages([...images, ""]);
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const removeImage = (index: number) => {
    // Prevent removing the last image
    if (images.length <= 1) {
      return;
    }

    // Check if removing this image would leave no non-empty images
    const wouldLeaveNonEmptyImages = images
      .filter((_, i) => i !== index)
      .some((image) => image.trim() !== "");

    if (!wouldLeaveNonEmptyImages) {
      return;
    }

    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <FormSection title="Images">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Upload images to showcase your property. You can add multiple images.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => {
            // Check if removing this image would leave no non-empty images
            const wouldLeaveNonEmptyImages = images
              .filter((_, i) => i !== index)
              .some((img) => img.trim() !== "");

            const canRemove = images.length > 1 && wouldLeaveNonEmptyImages;

            return (
              <div key={index} className="relative">
                <AddImage
                  image={image}
                  setImage={(value) => updateImage(index, value)}
                  isSubmitted={isSubmitted}
                />
                {canRemove && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer z-10"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={addImage}
          className="cursor-pointer w-full border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        >
          <Plus size={16} className="mr-2" />
          Add Another Image
        </Button>

        {errors.images && (
          <p className="text-red-500 text-sm">{errors.images}</p>
        )}
      </div>
    </FormSection>
  );
};
