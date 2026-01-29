import { Suspense } from "react";
import AdminClient from "./admin-client";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh flex items-center justify-center">
          <p>Cargando...</p>
        </div>
      }
    >
      <AdminClient />
    </Suspense>
  );
}
