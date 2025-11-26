import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import TrustedBy from "@/components/trusted-by"
import Features from "@/components/features"
import About from "@/components/about"
import HowItWorks from "@/components/how-it-works"
import Pricing from "@/components/pricing"
import DashboardPreview from "@/components/dashboard-preview"
import Testimonials from "@/components/testimonials"
import FinalCta from "@/components/final-cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <About />
      <HowItWorks />
      <Pricing />
      <DashboardPreview />
      <Testimonials />
      <FinalCta />
      <Footer />
    </main>
  )
}
