"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Activity, CreditCard, Brain, BarChart3 } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Activity,
      title: "Real-time Queue Tracking",
      description: "Live updates on queue movement and customer position with instant notifications.",
    },
    {
      icon: CreditCard,
      title: "UPI Token Payments",
      description: "Secure ₹20 token payments, fully reimbursed at checkout to reduce no-shows.",
    },
    {
      icon: Brain,
      title: "ML Wait-Time Prediction",
      description: "AI-powered ETA predictions based on service duration and historical patterns.",
    },
    {
      icon: BarChart3,
      title: "Branch Analytics Dashboard",
      description: "Comprehensive insights into revenue, queue patterns, and customer behavior.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            Powerful Features for Modern Businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground text-balance"
          >
            Everything you need to streamline operations and delight customers
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white border-border">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
