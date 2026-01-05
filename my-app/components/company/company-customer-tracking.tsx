// components/company/company-customer-tracking.tsx
"use client";

export function CompanyCustomerTracking() {
  return (
    <section className="rounded-xl bg-card border p-6">
      <h2 className="text-xl font-semibold mb-4">
        Customer Tracking
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-muted-foreground border-b">
            <tr>
              <th className="py-2 text-left">Customer</th>
              <th className="py-2 text-left">Token</th>
              <th className="py-2 text-left">Queue</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* DATA COMES FROM PRISMA */}
          </tbody>
        </table>
      </div>
    </section>
  );
}
