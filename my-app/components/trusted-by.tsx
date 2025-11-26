"use client"

import { motion } from "framer-motion"
import { Building2, Briefcase, Zap, Users } from "lucide-react"

export default function TrustedBy() {
  const logos = [
    { name: "Enterprise Co", icon: Building2 },
    { name: "Business Hub", icon: Briefcase },
    { name: "Swift Services", icon: Zap },
    { name: "Community Plus", icon: Users },
  ]

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-12 font-medium">TRUSTED BY LEADING BUSINESSES</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          {logos.map((logo, i) => {
            const Icon = logo.icon
            return (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0.4 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center gap-3 cursor-pointer group"
              >
                <div className="p-3 rounded-lg bg-background group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors">
                  {logo.name}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
