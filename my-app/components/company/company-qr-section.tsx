"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, QrCode } from "lucide-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

export type CompanyQrSectionProps = {}

interface QueueQR {
  id: string
  queueName: string
  joinCode: string
  qrCode: string
}

export function CompanyQrSection({}: CompanyQrSectionProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const queuesWithQR: QueueQR[] = [
    { id: "1", queueName: "Front Desk", joinCode: "4K9M2L", qrCode: "QR001" },
    { id: "2", queueName: "Payment Counter", joinCode: "7B3X5N", qrCode: "QR002" },
    { id: "3", queueName: "Customer Service", joinCode: "2J8W1P", qrCode: "QR003" },
  ]

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(`Copied join code: ${code}`)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-12 space-y-6">
      <Toaster position="top-right" />
      
      <div>
        <h2 className="text-3xl font-bold text-foreground">QR Codes & Join Codes</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Share these codes with customers. They can scan the QR code or enter the join code to join your queues
          instantly.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {queuesWithQR.map((queue) => (
          <Card key={queue.id} className="border-border overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-base text-foreground">{queue.queueName}</CardTitle>
              <CardDescription className="text-xs">Share with customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center aspect-square border border-border">
                <QrCode className="w-16 h-16 text-muted-foreground/40 mb-3" />
                <p className="text-xs text-muted-foreground text-center font-medium">QR Code</p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">Join Code</p>
                <p className="text-2xl font-bold text-primary font-mono tracking-wide">{queue.joinCode}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopyCode(queue.joinCode)}
                  className="flex-1 h-9"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="flex-1 h-9 bg-transparent">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
