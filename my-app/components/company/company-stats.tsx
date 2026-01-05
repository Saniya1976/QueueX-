export function CompanyStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Stat label="Total Queues" />
      <Stat label="Active Customers" />
      <Stat label="Avg Wait Time" />
    </div>
  );
}

function Stat({ label }: { label: string }) {
  return (
    <div className="rounded-xl bg-card border p-6">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="text-3xl font-bold">—</p>
    </div>
  );
}
