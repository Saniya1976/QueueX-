"use client"

import { CompanyHero } from "@/components/company/company-hero"
import { CompanyQueueActions } from "@/components/company/company-queue-actions"
import { CompanyQrSection } from "@/components/company/company-qr-section"
import { CompanyCustomerTracking } from "@/components/company/company-customer-tracking"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Features from "@/components/features"
import Pricing from "@/components/pricing"
import About from "@/components/about"

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      <Navbar />
      <main className="flex flex-col">
        <CompanyHero />
        <CompanyQueueActions />
        <CompanyQrSection />
        <CompanyCustomerTracking />

        <Features/>
        <Pricing />
        <About />
      </main>
      <Footer />
    </div>
  )
}
