// components/company/company-sidebar.tsx
import Link from "next/link";
import { LayoutDashboard, Users, List, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/company", icon: LayoutDashboard },
  { label: "Queues", href: "/company/queues", icon: List },
  { label: "Customers", href: "/company/customers", icon: Users },
  { label: "Settings", href: "/company/settings", icon: Settings },
];

export function CompanySidebar() {
  return (
    <aside className="w-64 border-r bg-sidebar px-6 py-8 flex flex-col gap-8">
      {/* Logo */}
      <div className="text-xl font-bold text-primary">
        QueueX
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              flex items-center gap-3 rounded-lg px-3 py-2
              text-sm font-medium
              text-foreground/80
              hover:bg-sidebar-accent hover:text-foreground
              transition
            "
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
