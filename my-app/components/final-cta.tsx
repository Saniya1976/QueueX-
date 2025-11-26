"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function FinalCta() {
  return (
    <section className="py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-12 md:p-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
            Ready to eliminate waiting lines?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
            Start free today. No credit card required. Join hundreds of businesses already using QueueX.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white h-12 px-8 text-base">
              Start Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="h-12 px-8 text-base border-border text-foreground hover:bg-muted bg-transparent"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
