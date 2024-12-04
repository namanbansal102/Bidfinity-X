
export default function AboutSection() {
  const partners = [
    {
      name: "StackBlitz",
      logo: "https://vite.dev/stackblitz.svg",
    },
    {
      name: "Labs",
      logo: "https://vite.dev/stackblitz.svg",
    },
    {
      name: "Astro",
      logo: "https://vite.dev/stackblitz.svg",
    },
  ]

  const platinumSponsors = [
    {
      name: "Storyblok",
      logo: "https://vite.dev/stackblitz.svg",
    },
    {
      name: "Bit",
      logo: "https://vite.dev/stackblitz.svg",
    },
  ]

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <div
              className="w-16 h-16 rounded-full mb-4 mx-auto flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
              }}
            >
              <span className="text-2xl">❤️</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Free & open source</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform is MIT Licensed and will always be free and open source.
            This is made possible by our contributors and these companies:
          </p>
        </div>

        <div className="space-y-16">
          {/* Main Sponsor */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-6">Brought to you by</p>
            <div className="inline-block">
              <div className="group relative overflow-hidden rounded-2xl  transition-all duration-300 hover:scale-105">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 
                />
              <h1 className="text-6xl font-bold">void(0)</h1>
              </div>
            </div>
          </div>

          {/* Partners */}
          <div>
            <p className="text-center text-sm text-gray-500 mb-6">in partnership with</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:scale-105 shadow-md shadow-green-50"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, rgb(45, 206, 137, 0.1) 0%, rgb(0, 147, 233, 0.1) 100%)",
                    }}
                  />
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 w-auto mx-auto relative z-10"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Platinum Sponsors */}
          <div>
            <p className="text-center text-sm text-gray-500 mb-6">Platinum Sponsors</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto shadow-md shadow-green-50">
              {platinumSponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:scale-105"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, rgb(45, 206, 137, 0.1) 0%, rgb(0, 147, 233, 0.1) 100%)",
                    }}
                  />
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-8 w-auto mx-auto relative z-10"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}