"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Smartphone, Users } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Mobile Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <div className="relative">
              <Card className="p-8 bg-white border-border shadow-xl max-w-xs mx-auto">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Smartphone className="w-12 h-12 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-4">Select & Pay Token</h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Branch Selected</p>
                      <p className="font-semibold text-foreground">Dr. Sharma Clinic</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Token Amount</p>
                      <p className="font-bold text-lg text-foreground">₹20</p>
                    </div>
                    <button className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                      Pay with UPI
                    </button>
                  </div>
                  <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                    <p className="text-xs text-secondary font-semibold">✓ You are #3 in queue</p>
                  </div>
                </motion.div>
              </Card>
            </div>
          </motion.div>

          {/* Right - Transformation Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <Card className="p-6 bg-white border-border shadow-lg overflow-hidden">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="flex items-center justify-center gap-2 mb-4"
                >
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Long waiting lines</span>
                </motion.div>
                <motion.div
                  animate={{ scaleX: [1, 0, 1] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 origin-left"
                />
                <p className="text-sm font-semibold text-foreground text-center">
                  Skip the line. Arrive only when it's your turn.
                </p>
              </Card>
            </div>

            <div className="space-y-3">
              {["Reduce no-shows by 70%", "Guaranteed faster check-ins", "No physical waiting required"].map(
                (bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    <p className="text-base text-foreground font-medium">{bullet}</p>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
