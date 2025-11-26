"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react"

export default function DashboardPreview() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance leading-tight">
              Run your entire queue on one dashboard.
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <p className="text-base text-muted-foreground">Real-time revenue tracking and customer insights</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <p className="text-base text-muted-foreground">Live queue management across all branches</p>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <p className="text-base text-muted-foreground">Token pricing and payment reconciliation</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
              View Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Right - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden bg-white border-border shadow-2xl">
              <div className="h-80 bg-gradient-to-br from-muted to-muted/50 p-6 flex flex-col gap-4">
                {/* Header Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <Card className="p-3 bg-white border-border shadow-sm">
                    <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                    <p className="text-lg font-bold text-foreground">₹45.2K</p>
                  </Card>
                  <Card className="p-3 bg-white border-border shadow-sm">
                    <p className="text-xs text-muted-foreground mb-1">In Queue</p>
                    <p className="text-lg font-bold text-foreground">24</p>
                  </Card>
                  <Card className="p-3 bg-white border-border shadow-sm">
                    <p className="text-xs text-muted-foreground mb-1">Avg Time</p>
                    <p className="text-lg font-bold text-foreground">8 min</p>
                  </Card>
                </div>

                {/* Chart Placeholder */}
                <div className="flex-1 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-border flex items-end justify-around p-4">
                  {[2, 4, 3, 5, 4, 3, 5].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 h-12 bg-gradient-to-t from-primary to-secondary rounded-t-lg mx-1"
                      style={{ height: `${height * 20}%` }}
                    />
                  ))}
                </div>

                {/* Live Queue List */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Live Queue</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-foreground font-semibold">#1 - Rajesh Kumar</span>
                    <span className="text-secondary">Serving</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
