"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import BiddingPageWithSidebar from './BiddingPageWithSidebar'

export default function BiddingPage() {
  const [bidAmount, setBidAmount] = useState('')
  const [bidTime, setBidTime] = useState('')
  const [bidDate, setBidDate] = useState('')
  const [bidHistory, setBidHistory] = useState([])

  useEffect(() => {
    // Simulating fetching bid history data
    const mockData = [
      { time: '10:00', amount: 5000 },
      { time: '11:00', amount: 6000 },
      { time: '12:00', amount: 7500 },
      { time: '13:00', amount: 8200 },
      { time: '14:00', amount: 9000 },
      { time: '15:00', amount: 9500 },
      { time: '16:00', amount: 10000 },
    ]
    setBidHistory(mockData)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Bid submitted:', { bidAmount, bidTime, bidDate })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden border-t-4 border-green-500">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-t-lg">
         
            <h1 className="text-3xl font-bold text-center">Bidifinity-X</h1>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="bidAmount" className="text-lg font-semibold text-gray-700 block">Bid Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <input
                      id="bidAmount"
                      type="number"
                      placeholder="Enter bid amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="pl-10 w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bidTime" className="text-lg font-semibold text-gray-700 block">Bid Time</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <input
                      id="bidTime"
                      type="time"
                      value={bidTime}
                      onChange={(e) => setBidTime(e.target.value)}
                      className="pl-10 w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bidDate" className="text-lg font-semibold text-gray-700 block">Bid Date</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <input
                      id="bidDate"
                      type="date"
                      value={bidDate}
                      onChange={(e) => setBidDate(e.target.value)}
                      className="pl-10 w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
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
                  <p className="text-lg font-semibold text-gray-700">Highest Bid: $10,000</p>
                  <p className="text-lg font-semibold text-gray-700">Time Remaining: 2h 30m</p>
                </div>
                <div className="w-full shadow-md rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-t-lg">
                    <h3 className="text-xl font-bold">Bid History</h3>
                  </div>
                  <div className="p-4 bg-white">
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
  )
}

