"use client";

import { Header } from "@/components/navigations";
import { PropertyEditForm } from "@/components/hosting";
import { useGetPropertyQuery } from "@/generated/graphql";
import { useParams } from "next/navigation";

export const AboutYourPlacePage = () => {
  const { id } = useParams();

  const { data, refetch } = useGetPropertyQuery({
    variables: { getPropertyId: id as string },
    fetchPolicy: "cache-first",
  });

  const property = data?.getProperty?.property;

  const handleSuccess = () => {
    refetch();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <Header />

      <div className="w-full max-w-4xl">
        {property && (
          <PropertyEditForm property={property} onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
};
