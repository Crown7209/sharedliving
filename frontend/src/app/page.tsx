import { Suspense } from "react";
import { HomePage } from "../features/HomePage";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
