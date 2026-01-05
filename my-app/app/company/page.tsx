// app/company/page.tsx
import { CompanyOverviewCard } from "@/components/company/company-overview-card";
import { CompanyStats } from "@/components/company/company-stats";
import { CompanyCustomerTracking } from "@/components/company/company-customer-tracking";

export default function CompanyDashboardPage() {
  return (
    <div className="space-y-10">
      <CompanyOverviewCard />
      <CompanyStats />
      <CompanyCustomerTracking />
    </div>
  );
}
