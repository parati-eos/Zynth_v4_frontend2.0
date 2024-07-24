import React, { useState, useEffect } from "react";
import "./gph.css";
import loadingImage from "../helper/loading";
import { Grid } from "react-loader-spinner";

const Googleslides = () => {
  const userId = localStorage.getItem("userEmail");
  var formId = localStorage.getItem("submissionId");
  const [slidesData, setSlidesData] = useState([]);
  const [slidesId, setSlidesId] = useState("");
  const [loading, setLoading] = useState(true); // Change to boolean
  const [progress, setProgress] = useState(0);



  useEffect(() => {
    const fetchSlidesData = async () => {
      try {
        const url = `https://v4-server.onrender.com/slides?userId=${userId}&formId=${formId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch slides data");
        }
        const data = await response.json();

        setSlidesId(data.id);
        setSlidesData(data.data);
        setLoading(data.data.length < 1);

    let isContactSlide = slidesData.some(slide => slide[1] === "Contact");
      console.log(progress)
      if (isContactSlide) {
      setProgress(100);
      console.log("progress set to 100")
    }
    if (progress!==100){
          setProgress(data.data.length * 4.5)
    };
      } catch (error) {
        console.error("Error fetching slides data:", error.message);
      }
    };
    const intervalId = setInterval(fetchSlidesData, 5000);
    return () => clearInterval(intervalId);
  }, [userId, formId]);

  if (loading) {
    // Use strict equality
    return (
      <div className="loadingIcon">
        {/* <loadingImage /> */}
        {/* <img src={loadingImage} alt="Loading..." /> */}
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#E6A500"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  }
  console.log(slidesData.length);
  try {
    return (
      <div style={{ position: "relative" }}>
        {slidesData.length < 1 ? (
          <div>No slides to display</div>
        ) : (
          <>
            {/* <div
              className="progress-bar"
              style={{ padding: "5px", position: "relative" }}
            >
              <div
                className="progress-bar-outer"
                style={{
                  position: "fixed",
                  top: "11vh",
                  left: "10",
                  height: "10px",
                  width: "53vw",
                  backgroundColor: "#004264",
                  borderRadius: "50px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: "#e6a500",
                    borderRadius: "inherit",
                    transition: "width .2s ease-in",
                  }}
                />
              </div>
            </div> */}

            {slidesData.map((slideId, index) => (
              <div key={slideId}>
                <iframe
                  key={index}
                  className="slides-iframe"
                  title="Google Slides Embed"
                  src={`https://docs.google.com/presentation/d/${slidesId}/embed?rm=minimal&start=false&loop=false&slide=id.${slideId[0]}`}
                ></iframe>
              </div>
            ))}
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error rendering slides:", error);
    return (
      <div className="error-txt">
        No slides to display....
        <p>click on generate pitch deck button</p>
      </div>
    );
  }
};

export default Googleslides;
