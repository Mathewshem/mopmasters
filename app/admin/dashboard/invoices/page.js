import AdminShell from "@/components/admin/AdminShell";
import InvoicesDashboard from "@/components/admin/InvoicesDashboard";

export const metadata = {
  title: "Invoices | MopMasters Admin",
  robots: { index: false, follow: false },
};

export default function AdminInvoicesPage() {
  return (
    <AdminShell>
      <InvoicesDashboard />
    </AdminShell>
  );
}
