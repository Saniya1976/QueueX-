"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, LogIn, Users } from "lucide-react"

export type CompanyCustomerTrackingProps = {}

interface CustomerEvent {
  timestamp: string
  type: "joined" | "called" | "served" | "noshow"
  description: string
}

interface Customer {
  id: string
  name: string
  tokenNumber: string
  status: "in-queue" | "called" | "served" | "noshow"
  events: CustomerEvent[]
}

export function CompanyCustomerTracking({}: CompanyCustomerTrackingProps) {
  const liveCustomers: Customer[] = [
    {
      id: "1",
      name: "Alice Johnson",
      tokenNumber: "A20",
      status: "served",
      events: [
        { timestamp: "10:05", type: "joined", description: "Joined queue" },
        { timestamp: "10:12", type: "called", description: "Called to Counter 1" },
        { timestamp: "10:18", type: "served", description: "Service completed" },
      ],
    },
    {
      id: "2",
      name: "Bob Smith",
      tokenNumber: "A22",
      status: "called",
      events: [
        { timestamp: "10:08", type: "joined", description: "Joined queue" },
        { timestamp: "10:20", type: "called", description: "Called to Counter 2" },
      ],
    },
    {
      id: "3",
      name: "Carol White",
      tokenNumber: "A21",
      status: "in-queue",
      events: [{ timestamp: "10:10", type: "joined", description: "Joined queue" }],
    },
  ]

  const stats = {
    inQueue: liveCustomers.filter((c) => c.status === "in-queue").length,
    servedToday: liveCustomers.filter((c) => c.status === "served").length,
    noShows: liveCustomers.filter((c) => c.status === "noshow").length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-queue":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "called":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "served":
        return "bg-green-100 text-green-800 border-green-200"
      case "noshow":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
  }

  return (
    <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-12 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Live Customer Tracking</h2>
        <p className="text-muted-foreground mt-2">Monitor customer journeys in real-time</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              In Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{stats.inQueue}</div>
            <p className="text-xs text-muted-foreground mt-2">Waiting for service</p>
          </CardContent>
        </Card>
        <Card className="border-border hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Served Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{stats.servedToday}</div>
            <p className="text-xs text-muted-foreground mt-2">Successfully completed</p>
          </CardContent>
        </Card>
        <Card className="border-border hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">No-shows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{stats.noShows}</div>
            <p className="text-xs text-muted-foreground mt-2">Did not appear</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {liveCustomers.map((customer) => (
          <Card key={customer.id} className="border-border overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 bg-muted/30">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-primary">{customer.tokenNumber}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">Token: {customer.tokenNumber}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(customer.status)} border`} variant="secondary">
                  {getStatusLabel(customer.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {customer.events.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          event.type === "joined"
                            ? "bg-blue-100"
                            : event.type === "called"
                              ? "bg-amber-100"
                              : event.type === "served"
                                ? "bg-green-100"
                                : "bg-red-100"
                        }`}
                      >
                        {event.type === "joined" ? (
                          <LogIn className="w-4 h-4 text-blue-600" />
                        ) : event.type === "called" ? (
                          <Clock className="w-4 h-4 text-amber-600" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      {index < customer.events.length - 1 && <div className="w-0.5 h-6 bg-border mt-1" />}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm font-medium text-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
