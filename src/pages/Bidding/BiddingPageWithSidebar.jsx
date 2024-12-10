"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'


export default function BiddingPageWithSidebar() {
  const [bidAmount, setBidAmount] = useState('')
  const [bidTime, setBidTime] = useState('')
  const [bidDate, setBidDate] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Mock auction details
  const auctionDetails = {
    title: "Vintage Collector's Watch",
    image: "/placeholder.svg?height=200&width=200",
    description: "A rare vintage timepiece from the 1950s, featuring intricate mechanical craftsmanship and original leather strap.",
    minimumBid: 5000,
    currentBid: 10000,
    endTime: "2h 30m"
  }

  const bidHistory = [
    { time: '10:00', amount: 5000 },
    { time: '11:00', amount: 6000 },
    { time: '12:00', amount: 7500 },
    { time: '13:00', amount: 8200 },
    { time: '14:00', amount: 9000 },
    { time: '15:00', amount: 9500 },
    { time: '16:00', amount: 10000 },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Bid submitted:', { bidAmount, bidTime, bidDate })
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        className="w-80 bg-white border-r border-gray-200 fixed h-full overflow-y-auto"
      >
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{auctionDetails.title}</h2>
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={auctionDetails.image} 
                alt={auctionDetails.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Minimum Bid</h3>
                <p className="text-2xl font-bold text-green-600">${auctionDetails.minimumBid.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Current Bid</h3>
                <p className="text-2xl font-bold text-blue-600">${auctionDetails.currentBid.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Time Remaining</h3>
                <p className="text-2xl font-bold text-gray-800">{auctionDetails.endTime}</p>
              </div>
            </div>
          </div>
          <div className="prose prose-sm">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{auctionDetails.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed left-80 top-4 z-10 p-2 bg-white rounded-r-lg shadow-md hover:bg-gray-50"
      >
        <svg
          className={`w-6 h-6 transform transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-80' : 'ml-0'} transition-margin duration-300`}>
        <div className="min-h-screen p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden border-t-4 border-green-500">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6">
                <h1 className="text-3xl font-bold text-center">Bidifinity-X</h1>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="bidAmount" className="text-lg font-semibold text-gray-700 block">
                        Bid Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          id="bidAmount"
                          type="number"
                          placeholder="Enter bid amount"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="pl-8 w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="bidTime" className="text-lg font-semibold text-gray-700 block">
                        Bid Time
                      </label>
                      <input
                        id="bidTime"
                        type="time"
                        value={bidTime}
                        onChange={(e) => setBidTime(e.target.value)}
                        className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="bidDate" className="text-lg font-semibold text-gray-700 block">
                        Bid Date
                      </label>
                      <input
                        id="bidDate"
                        type="date"
                        value={bidDate}
                        onChange={(e) => setBidDate(e.target.value)}
                        className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Place Bid
                    </motion.button>
                  </form>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Current Auction Status</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-lg font-semibold text-gray-700">Highest Bid: ${auctionDetails.currentBid.toLocaleString()}</p>
                      <p className="text-lg font-semibold text-gray-700">Time Remaining: {auctionDetails.endTime}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4">
                        <h3 className="text-xl font-bold">Bid History</h3>
                      </div>
                      <div className="p-4">
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={bidHistory}>
                            <XAxis dataKey="time" stroke="#4B5563" />
                            <YAxis stroke="#4B5563" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '0.375rem',
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="amount"
                              stroke="#10B981"
                              strokeWidth={2}
                              dot={{ fill: '#10B981', strokeWidth: 2 }}
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

