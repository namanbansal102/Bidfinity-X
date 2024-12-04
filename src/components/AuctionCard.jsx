
import { Clock, Users, TrendingUp, ArrowRight } from "lucide-react"

export default function AuctionCard() {
  return (
    <div className="p-8 bg-white">
      <div className="max-w-sm mx-auto">
        <div 
          className="group relative rounded-2xl p-[2px] transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
          }}
        >
          <div className="relative rounded-2xl bg-white p-4 transition-all">
            {/* Product Image */}
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Product Name"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Time Left Badge */}
              <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-white" />
                  <span className="text-sm text-white">22h 39m</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Limited Edition Collectible</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  Rare digital collectible featuring unique artwork. Limited release with certificate of authenticity.
                </p>
              </div>

              {/* Bid Stats */}
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="text-xs text-gray-500">Current Bid</p>
                  <p className="font-semibold">2.5 ETH</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Min Bid</p>
                  <p className="font-semibold">0.1 ETH</p>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <p className="font-semibold">28</p>
                  </div>
                  <p className="text-xs text-gray-500">Bids</p>
                </div>
              </div>

              {/* Bid History */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400" />
                    <span className="font-medium">@highest_bidder</span>
                  </div>
                  <p className="font-semibold">2.5 ETH</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-400/30 to-blue-400/30" />
                    <span>@previous_bidder</span>
                  </div>
                  <p>2.3 ETH</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="relative w-full overflow-hidden rounded-lg p-4 transition-all hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
                }}
              >
                <div className="relative z-10 flex items-center justify-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold">Place Bid</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-20"
                  style={{
                    background: "linear-gradient(135deg, white 0%, white 100%)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}