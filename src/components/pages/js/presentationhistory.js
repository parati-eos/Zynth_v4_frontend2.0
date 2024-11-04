import React, { useState, useEffect } from 'react'
import HistoryNavbar from '../../shared/js/HistoryNavbar'
import HistoryCard from '../cards/historycard'
import '../css/presentationhistory.css'

function History() {
  const [userID, setUserID] = useState(localStorage.getItem('userEmail'))
  const [historyData, setHistoryData] = useState([])

  const fetchData = async () => {
    try {
      const serverurl = process.env.REACT_APP_SERVER_URL
      const response = await fetch(`${serverurl}/history`, {
        headers: {
          'x-userid': userID,
        },
      })
      // console.log(`${serverurl}/history`);
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setHistoryData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userID])
  return (
    <div className="bg-[#001B28] min-h-screen">
      <HistoryNavbar />

      <div className="px-3vw mt-5">
        <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-8 text-center tracking-wide">
          History
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20">
          {historyData.map((card, index) => (
            <HistoryCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default History
