import Link from "next/link";

export function CompanySidebar() {
  return (
    <aside className="w-64 border-r bg-sidebar p-6 space-y-6">
      <h2 className="text-lg font-bold">QueueX</h2>

      <nav className="space-y-3">
        <Link href="/company">Dashboard</Link>
        <Link href="/company/queues">Queues</Link>
        <Link href="/company/customers">Customers</Link>
        <Link href="/company/settings">Settings</Link>
      </nav>
    </aside>
  );
}
