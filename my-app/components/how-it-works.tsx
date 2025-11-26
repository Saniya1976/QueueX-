"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CreditCard, Clock, Gift } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: CreditCard,
      number: "1",
      title: "Select & Pay Token",
      description: "Customer pays ₹20 (fully reimbursed at shop)",
    },
    {
      icon: Clock,
      number: "2",
      title: "Get Live Updates & ETA",
      description: "Real-time queue movement and estimated arrival time",
    },
    {
      icon: Gift,
      number: "3",
      title: "Arrive, Pay, Earn Rewards",
      description: "Seamless checkout & loyalty points for next visit",
    },
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            How QueueX Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground text-balance"
          >
            Three simple steps to eliminate waiting lines
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-white border-border shadow-lg relative h-full">
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="pt-8">
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
