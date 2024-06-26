import React, { useState, useEffect} from "react";
import HistoryNavbar from "../../shared/js/HistoryNavbar";
import HistoryCard from "../cards/historycard";
import "../css/presentationhistory.css";

function History() {
  const [userID, setUserID] = useState(localStorage.getItem("userEmail"));
  const [historyData, setHistoryData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://zynth.ai/api/history",
        {
          headers: {
            "x-userid": userID,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log();
      setHistoryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [userID]);
  return (
    <div className="historypage">
      <HistoryNavbar/>

      <div className="history-component">
      <h2>History</h2>
      <div className="HistoryCards">
        {historyData.map((card, index) => (
          <HistoryCard key={index} {...card} />
        ))}
      </div>
      </div>
    </div>
  );
}

export default History;
