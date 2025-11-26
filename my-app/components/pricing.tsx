"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Badge } from "lucide-react"

export default function Pricing() {
  const businessPlans = [
    {
      name: "Free Plan",
      price: "₹0",
      period: "/month",
      description: "Perfect for small stores",
      features: [
        "Handle up to 100 customers/month",
        "After 100 customers, pay-as-you-go",
        "Basic queue management",
        "Email support",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Pay-As-You-Go",
      price: "₹2",
      period: "/token issued",
      description: "Scale as you grow",
      features: [
        "After free 100 customers",
        "Unlimited queue management",
        "Real-time analytics",
        "Priority support",
        "Multiple branches",
      ],
      cta: "Choose Plan",
      highlighted: true,
    },
    {
      name: "Unlimited Business",
      price: "Custom",
      period: "pricing",
      description: "Enterprise solution",
      features: [
        "Unlimited tokens",
        "Multiple branches",
        "Advanced analytics",
        "Dedicated support",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  const customerInfo = {
    name: "QueueX Token",
    price: "₹20",
    period: "per token",
    description: "Paid by customer, fully reimbursed at the counter",
    features: [
      "Paid by customer upfront",
      "Fully refunded at shop counter",
      "Reduces no-shows significantly",
      "Reduces waiting time drastically",
      "Secure UPI payments",
    ],
  }

  return (
    <section id="pricing" className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground text-balance"
          >
            For businesses and customers alike
          </motion.p>
        </div>

        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-12">
            <TabsTrigger value="business">For Businesses</TabsTrigger>
            <TabsTrigger value="customer">For Customers</TabsTrigger>
          </TabsList>

          {/* Business Plans */}
          <TabsContent value="business" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {businessPlans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Badge className="w-3 h-3" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  <Card
                    className={`h-full p-8 flex flex-col ${
                      plan.highlighted
                        ? "bg-white border-2 border-primary shadow-xl"
                        : "bg-white border-border shadow-lg"
                    }`}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                    <div className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                          : "border-border"
                      }`}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Customer Info */}
          <TabsContent value="customer" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto"
            >
              <Card className="p-8 bg-white border-border shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-2">{customerInfo.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{customerInfo.description}</p>
                <div className="mb-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <span className="text-4xl font-bold text-foreground">{customerInfo.price}</span>
                  <span className="text-sm text-muted-foreground ml-2">{customerInfo.period}</span>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge className="w-4 h-4" />
                    <span className="text-xs font-semibold text-secondary">100% refunded at the counter</span>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  {customerInfo.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
                  Learn More
                </Button>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
