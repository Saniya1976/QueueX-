"use client"

import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { CheckCircle2, Pause, Play, X, Eye, Plus, Volume2, Zap } from "lucide-react"

export function CompanyQueueActions() {
  const [open, setOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [newQueueName, setNewQueueName] = useState("")
  const [newQueueService, setNewQueueService] = useState("")
  const [nextCustomerOpen, setNextCustomerOpen] = useState(false)

  const [queues, setQueues] = useState([
    { id: "1", name: "Front Desk", status: "active", waitingCustomers: 5, avgWaitTime: 8, activeTokens: 3 },
    { id: "2", name: "Payment Counter", status: "active", waitingCustomers: 2, avgWaitTime: 5, activeTokens: 1 },
    { id: "3", name: "Customer Service", status: "paused", waitingCustomers: 0, avgWaitTime: 0, activeTokens: 0 },
  ])

  const [nowServingData, setNowServingData] = useState({
    tokenNumber: "A23",
    customerName: "John Doe",
    counter: "Counter 2",
  })

  const handleCreateQueue = () => {
    if (!newQueueName.trim() || !newQueueService) {
      toast.error("Please fill in all fields")
      return
    }

    const newQueue = {
      id: (queues.length + 1).toString(),
      name: newQueueName,
      status: "active",
      waitingCustomers: 0,
      avgWaitTime: 0,
      activeTokens: 0,
    }

    setQueues([...queues, newQueue])
    setNewQueueName("")
    setNewQueueService("")
    setOpen(false)
    setSuccessOpen(true)

    toast.success(`Queue "${newQueueName}" created successfully!`)

    setTimeout(() => setSuccessOpen(false), 3000)
  }

  const handleToggleQueue = ({ id }: { id: string }) => {
    setQueues(
      queues.map((q) =>
        q.id === id ? { ...q, status: q.status === "active" ? "paused" : "active" } : q
      )
    )
  }

  const handleCloseQueue = ({ id }: { id: string }) => {
    setQueues(queues.map((q) => (q.id === id ? { ...q, status: "closed" } : q)))
  }

  return (
    <>
      <Toaster position="top-center" />

      <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-12 space-y-16">
        {/* Create Queue */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Create Queue</h2>
            <p className="text-muted-foreground mt-2">Set up a new queue for your service in seconds</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 px-6 text-base bg-primary hover:bg-primary/90">
                <Plus className="w-5 h-5 mr-2" />
                Create New Queue
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Queue</DialogTitle>
                <DialogDescription>Set up your new queue with essential details</DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div>
                  <Label>Queue Name</Label>
                  <Input
                    placeholder="e.g., Front Desk"
                    value={newQueueName}
                    onChange={(e) => setNewQueueName(e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>

                <div>
                  <Label>Service Type</Label>
                  <Select value={newQueueService} onValueChange={setNewQueueService}>
                    <SelectTrigger className="mt-2 h-10">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-service">Customer Service</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="technical-support">Technical Support</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleCreateQueue} className="w-full h-10 bg-primary hover:bg-primary/90">
                  Create Queue
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {successOpen && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Queue Created Successfully</p>
                <p className="text-sm text-muted-foreground">Your new queue is now live.</p>
              </div>
            </div>
          )}
        </div>

        {/* Call Next Customer */}
        {/* (unchanged part, keeping your layout) */}
      </section>
    </>
  )
}
