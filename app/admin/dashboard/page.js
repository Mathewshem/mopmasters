import AdminShell from "@/components/admin/AdminShell";
import ClientsDashboard from "@/components/admin/ClientsDashboard";

export const metadata = {
  title: "Admin Dashboard | Antlar Elite Services",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <ClientsDashboard />
    </AdminShell>
  );
}
