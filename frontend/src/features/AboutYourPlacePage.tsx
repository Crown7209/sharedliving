"use client";

import { Header } from "@/components/navigations";
import { useGetPropertyQuery } from "@/generated/graphql";
import { useParams } from "next/navigation";

export const AboutYourPlacePage = () => {
  const { id } = useParams();

  const { data } = useGetPropertyQuery({
    variables: { getPropertyId: id as string },
    skip: !id,
  });

  const property = data?.getProperty?.property;

  if (!property)
    return <p className="text-center py-10">Property not found.</p>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <Header />

      <h1 className="text-3xl font-semibold mb-6 text-gray-900">
        About your place
      </h1>

      <div className="space-y-4 text-gray-700">
        <p>
          <strong>ID:</strong> {property.id}
        </p>
        <p>
          <strong>Title:</strong> {property.title}
        </p>
        <p>
          <strong>Description:</strong> {property.description}
        </p>
        <p>
          <strong>Location:</strong> {property.location.city},{" "}
          {property.location.district}
        </p>
        <p>
          <strong>Price per month:</strong> ${property.pricePerMonth}
        </p>
        <p>End user propertygoo nemeh ystoi</p>
        <p>Eniig uneheer amjsangui</p>
      </div>
    </div>
  );
};
