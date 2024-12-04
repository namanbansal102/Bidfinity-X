
import { Clock, Users, TrendingUp, ArrowRight } from "lucide-react"
import { PinataSDK } from "pinata";
import { useEffect, useState } from "react";
export default function AuctionCard({props}) {
  console.log("My Props Are:::::::",props.increment);
  
  console.log("My props are :::::",props);
  const [imageUrl, setimageUrl] = useState("");
  
const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOGIyM2U0MS1kZTg3LTRhYWYtOTVmNC1mNDBmZWQ2NjJlNzQiLCJlbWFpbCI6Im5hbWFuYmFuc2FsMTAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1OGQ1ODM1NWMwYTE2ZTc4MmEwOSIsInNjb3BlZEtleVNlY3JldCI6ImIxMjVkNGNkZGYyZmUzMTc4MWY0OTcyOGRiOTBlMzFmMjNkNTNmM2YzYTI3M2NiZTViZjY0Mjc1YjljYjFiYjIiLCJleHAiOjE3NjQ3NDEzNTR9.6dTuYSdS2GBexhtowWUM8r5h7UM4VoqoHdWEBPAe27o",
  pinataGateway: "example-gateway.mypinata.cloud",
});
const fetchImageUrl=async(cid)=>{
  try {

    const url = await pinata.gateways.createSignedURL({
       gateway:"jade-added-egret-280.mypinata.cloud",
       cid: cid,
    	expires: 1800000000000,
    })
    console.log(url)
    setimageUrl(url);

  } catch (error) {
    console.log(error);
  }

}

useEffect(() => {
  console.log("use Effect Running");
  fetchImageUrl(props.imgUrl);
  
}, [])

  
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
                  src={imageUrl}
                  alt="Product Name"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Time Left Badge */}
              <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-white" />
                  <span className="text-sm text-white">{props.endTime}</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{props.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                 {props.desc  }
                </p>
              </div>

              {/* Bid Stats */}
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="text-xs text-gray-500">Current Bid</p>
                  <p className="font-semibold">{String(props.minPayableBid)} ETH</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Min Bid</p>
                  <p className="font-semibold">{String(props.increment)} ETH</p>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <p className="font-semibold">XX</p>
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