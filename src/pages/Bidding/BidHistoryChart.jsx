import React from 'react'
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useBidHistory } from './useBidHistory'

export function BidHistoryChart() {
  const bidHistory = useBidHistory()

  return (
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
  )
}
