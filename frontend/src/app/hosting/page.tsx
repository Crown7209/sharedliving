import { HostingPage } from "@/features/HostingPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Hosting() {
  return (
    <ProtectedRoute requiredRole="landlord">
      <HostingPage />
    </ProtectedRoute>
  );
}
