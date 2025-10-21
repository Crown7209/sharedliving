"use client";

import { Header } from "@/components/navigations";
import { useCreatePropertyForm } from "@/hooks/useCreatePropertyForm";

const steps = [
  {
    number: 1,
    title: "Tell us about your place",
    description:
      "Share some basic info, like where it is and how many guests can stay.",
  },
  {
    number: 2,
    title: "Make it stand out",
    description:
      "Add 5 or more photos plus a title and description we'll help you out.",
  },
  {
    number: 3,
    title: "Finish up and publish",
    description:
      "Choose a starting price, verify a few details, then publish your listing.",
  },
];

export const HostingPage = () => {
  const { handleCreateProperty } = useCreatePropertyForm();

  return (
    <div className="w-full h-screen flex flex-col items-center bg-white">
      <Header />

      <div className="max-w-[1280px] w-full h-full flex items-center justify-between px-4">
        <div className="flex flex-col">
          <p className="text-6xl font-medium text-gray-900">
            It&apos;s easy to get
          </p>
          <p className="text-6xl font-medium text-gray-900">started on Sera</p>
        </div>

        <div className="flex flex-col gap-8 max-w-[520px]">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col gap-12">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 text-black rounded-full flex items-center justify-center font-semibold text-xl">
                  {step.number}
                </div>
                <div className="text-left flex flex-col gap-2">
                  <p className="text-2xl font-medium text-gray-900">
                    {step.title}
                  </p>
                  <p className="text-gray-500 leading-relaxed text-lg font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="w-full h-[1px] bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-end bg-neutral-50 border-t border-gray-300 px-4 sm:px-8 lg:px-12 py-4">
        <button
          onClick={handleCreateProperty}
          className="bg-red-500 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-red-600 font-normal text-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
