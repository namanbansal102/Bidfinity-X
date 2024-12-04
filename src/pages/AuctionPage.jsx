
import { useState } from "react"
import { CheckCircle2, Grid, LayoutGrid, List, MoreHorizontal, Search, Twitter } from "lucide-react"

export default function Component() {
  const [view, setView] = useState('grid')
  const [activeTab, setActiveTab] = useState('items')
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with Side Image */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-sky-500">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative z-10 px-6 py-16 sm:px-8 lg:py-24">
            <div className="space-y-4 text-white">
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Winds of Yawanawa</h1>
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-xl opacity-90">by Yawanawa and Refik Anadol</p>
              <p className="max-w-xl text-lg">
                A first-of-its-kind space of co-creation between the Brazilian indigenous Yawanawa people and AI artist Refik Anadol.
              </p>
              <div className="flex flex-wrap gap-3">
                {['1,000 Items', 'Created Jul 2023', '10% Royalties', 'Ethereum'].map((info, i) => (
                  <span key={i} className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm transition-colors hover:bg-white/30">
                    {info}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/50 to-sky-500/50 mix-blend-multiply"></div>
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Featured NFT"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 p-4 sm:grid-cols-5">
          {[
            { label: 'Total Volume', value: '11,537 ETH' },
            { label: 'Floor Price', value: '5.498 ETH' },
            { label: 'Best Offer', value: '4.2966 WETH' },
            { label: 'Listed', value: '3%' },
            { label: 'Owners', value: '589 (59%)' }
          ].map((stat, i) => (
            <div key={i} className="group cursor-pointer rounded-lg p-3 transition-all hover:bg-gradient-to-br hover:from-emerald-50 hover:to-sky-50">
              <p className="text-sm text-gray-500 group-hover:text-gray-700">{stat.label}</p>
              <p className="text-xl font-bold tracking-tight group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-sky-600 group-hover:bg-clip-text group-hover:text-transparent">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Collection Info */}
      <div className="mx-auto max-w-7xl p-4">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="text-gray-600">
              Explore the unique blend of indigenous wisdom and cutting-edge AI artistry.{" "}
              <button className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent hover:from-emerald-600 hover:to-sky-600">
                Learn more
              </button>
            </p>
          </div>
          <div className="flex gap-2">
            {[Twitter, MoreHorizontal].map((Icon, i) => (
              <button
                key={i}
                className="rounded-lg border border-gray-200 p-2 transition-all hover:border-gray-300 hover:bg-gray-100 active:bg-gray-200"
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex overflow-x-auto">
              {['Items', 'Offers', 'Analytics', 'Activity'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`min-w-[100px] border-b-2 px-4 py-2 text-sm font-medium transition-all hover:text-gray-900
                    ${activeTab === tab.toLowerCase()
                      ? 'border-sky-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  placeholder="Search by name or trait"
                  className="w-full min-w-[240px] rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </div>
              <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
                {[
                  { icon: Grid, value: 'grid' },
                  { icon: LayoutGrid, value: 'large' },
                  { icon: List, value: 'list' }
                ].map(({ icon: Icon, value }) => (
                  <button
                    key={value}
                    onClick={() => setView(value)}
                    className={`rounded-md p-2 transition-all ${
                      view === value
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200"></span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">Live</span>
                <span className="text-sm text-gray-500">1,000 results</span>
              </div>
              <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200">
                <option>Price low to high</option>
                <option>Price high to low</option>
                <option>Recently listed</option>
              </select>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-sky-500/0 transition-all group-hover:from-emerald-500/10 group-hover:to-sky-500/10"></div>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src="/placeholder.svg?height=400&width=400"
                      alt={`NFT ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold tracking-tight group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-sky-600 group-hover:bg-clip-text group-hover:text-transparent">
                      Winds #{i + 1}
                    </h3>
                    <p className="text-sm text-gray-500">Floor: 5.498 ETH</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Make Collection Offer Button */}
      <div className="fixed bottom-6 right-6">
        <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-sky-200">
          <div className="absolute inset-0 bg-white/0 transition-all group-hover:bg-white/10"></div>
          <span className="relative">Make collection offer</span>
        </button>
      </div>
    </div>
  )
}