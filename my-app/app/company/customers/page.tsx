import { CompanyCustomerTracking } from "@/components/company/company-customer-tracking";

export default function CustomersPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Customers</h1>
      <CompanyCustomerTracking />
    </section>
  );
}
