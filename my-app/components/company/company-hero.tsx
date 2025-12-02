export type CompanyHeroProps = {}

export function CompanyHero({}: CompanyHeroProps) {
  return (
    <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24">
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Queue <span className="text-primary">Management</span> Simplified
          </h1>
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            Real-time queue operations, instant customer tracking, and seamless code distribution. Everything you need
            to manage customer flow efficiently.
          </p>
        </div>
      </div>
    </section>
  )
}
