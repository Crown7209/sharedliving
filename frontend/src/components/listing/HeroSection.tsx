"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSectionProps } from "./types";

export const HeroSection = ({ images, title }: HeroSectionProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedImage((prev) =>
                  prev > 0 ? prev - 1 : images.length - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-lg cursor-pointer transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setSelectedImage((prev) =>
                  prev < images.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-lg cursor-pointer transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-background/80 text-foreground px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-16 h-12 flex-shrink-0 rounded-md overflow-hidden cursor-pointer transition-all ${
                selectedImage === index
                  ? "ring-2 ring-foreground"
                  : "hover:opacity-80"
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
