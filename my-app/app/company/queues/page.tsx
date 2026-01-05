import { CompanyQueueCard } from "@/components/company/company-queue-card";

export default function QueuesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Queues</h1>
      <CompanyQueueCard />
    </section>
  );
}
