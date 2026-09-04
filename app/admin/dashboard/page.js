import AdminShell from "@/components/admin/AdminShell";
import ClientsDashboard from "@/components/admin/ClientsDashboard";

export const metadata = {
  title: "Admin Dashboard | MopMasters Cleaning Services",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <ClientsDashboard />
    </AdminShell>
  );
}
