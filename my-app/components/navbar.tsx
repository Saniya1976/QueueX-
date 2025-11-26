"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ]

  // Same green you used for text: oklch(0.527 0.154 150)
  const brandGreen = "oklch(0.527 0.154 150)"

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border shadow-lg"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.527 0.154 150), oklch(0.48 0.13 150))",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="
              w-8 h-8 rounded-lg 
              bg-white/10 border border-white/30 
              flex items-center justify-center 
              text-white font-bold text-sm
              shadow-[0_0_18px_rgba(0,0,0,0.35)]
            "
          >
            Q
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            QueueX
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                relative text-sm font-bold text-white/90 
                transition-all duration-200 
                hover:text-white
                after:content-[''] after:absolute after:left-0 after:-bottom-1 
                after:h-[2px] after:w-0 after:bg-white after:rounded-full
                after:transition-all after:duration-300
                hover:after:w-full
                hover:scale-105
              "
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="
              text-sm font-bold text-white/90 
              hover:text-white hover:bg-white/10
              transition-all duration-200
              hover:scale-105
            "
          >
            Login
          </Button>
          <Button
            className="
              text-sm font-bold text-[color:oklch(0.25_0.09_150)]
              bg-white
              hover:bg-[color:oklch(0.93_0.04_150)]
              transition-all duration-200
              hover:scale-105
              shadow-[0_0_20px_rgba(255,255,255,0.55)]
            "
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="
                text-white hover:bg-white/10 
                transition-all duration-200
                hover:scale-105
              "
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="
              w-[250px]
              border-l border-white/20
              text-white
              px-4
            "
            style={{
              background: `linear-gradient(180deg, ${brandGreen}, oklch(0.35 0.08 150))`,
            }}
          >
            <div className="flex flex-col gap-6 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="
                    text-sm font-bold text-white/90
                    transition-all duration-200
                    hover:text-white
                    hover:translate-x-1
                  "
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/20 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="
                    w-full bg-transparent border-white/60 text-white font-bold
                    hover:bg-white/10 hover:border-white
                    transition-all duration-200
                    hover:scale-105
                  "
                >
                  Login
                </Button>
                <Button
                  className="
                    w-full font-bold text-[color:oklch(0.25_0.09_150)]
                    bg-white
                    hover:bg-[color:oklch(0.93_0.04_150)]
                    transition-all duration-200
                    hover:scale-105
                    shadow-[0_0_20px_rgba(255,255,255,0.55)]
                  "
                >
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
