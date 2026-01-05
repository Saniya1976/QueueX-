import { CompanySidebar } from "@/components/company/company-sidebar";
import { CompanyHeader } from "@/components/company/company-header";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />
      <div className="flex-1 flex flex-col">
        <CompanyHeader />
        <main className="p-8 space-y-8">{children}</main>
      </div>
    </div>
  );
}
