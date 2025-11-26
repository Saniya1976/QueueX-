"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Clock } from "lucide-react"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="pt-20 pb-32 px-4 md:pt-32 md:pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight"
            >
              Smart Queues. Faster Payments. Zero Waiting.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed"
            >
              QueueX eliminates physical waiting lines with digital queue management, instant token payments, and live
              ETA updates. Designed for clinics, salons, and service businesses.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white h-12 px-8 text-base">
                Start Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="h-12 px-8 text-base border-border bg-transparent">
                Book Demo
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Rated 4.9</span> by 120+ businesses
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[500px]"
          >
            {/* Gradient Blob Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-3xl" />

            {/* Cards Container */}
            <div className="relative h-full flex flex-col gap-4 p-4">
              {/* Revenue Widget */}
              <motion.div variants={floatVariants} initial="initial" animate="animate" className="flex-1">
                <Card className="h-full p-6 bg-white border-border shadow-lg">
                  <p className="text-xs text-muted-foreground mb-2">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-foreground mb-2">₹45,200</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-secondary font-semibold">+12% this week</span>
                  </div>
                </Card>
              </motion.div>

              {/* Live Queue Widget */}
              <motion.div
                variants={floatVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
                className="flex-1"
              >
                <Card className="h-full p-6 bg-white border-border shadow-lg">
                  <p className="text-xs text-muted-foreground mb-2">Live Queue</p>
                  <p className="text-3xl font-bold text-foreground mb-4">12 customers</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Avg wait time</span>
                      <span className="font-semibold text-foreground">8 min</span>
                    </div>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-primary to-secondary" />
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* ETA Progress Bar */}
              <motion.div
                variants={floatVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
                className="flex-1"
              >
                <Card className="h-full p-6 bg-white border-border shadow-lg flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-2">Your Position</p>
                    <p className="text-2xl font-bold text-foreground mb-3">#3 in queue</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Est. time</span>
                        <span className="font-semibold text-foreground">5 min</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                      </div>
                    </div>
                  </div>
                  <Clock className="w-6 h-6 text-secondary flex-shrink-0" />
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
