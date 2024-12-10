import { useState, useEffect } from 'react'



export function useBidHistory() {
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

  return bidHistory
}

