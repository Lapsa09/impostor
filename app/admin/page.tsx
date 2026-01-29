import { Suspense } from "react";
import AdminClient from "./admin-client";

export default function AdminPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <AdminClient />
    </Suspense>
  );
}
