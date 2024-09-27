// hero.tsx

import React from "react";
import { HeroParallax } from "./hero-parallax.tsx";

export function HeroParallaxDemo() {
  const products = [
    {
      title: "Facebook",
      link: "https://zynth.ai/share?submissionId=Parati-1713502679562",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Facebook+Team+5.png",
    },
    {
      title: "Delhivery",
      link: "https://zynth.ai/share?submissionId=Parati-1713430410967",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Delhivery+Product+5.png",
    },
    {
      title: "Tesla",
      link: "https://zynth.ai/share?submissionId=Parati-1713506221153",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Tesla+GTM+3.png",
    },
    {
       title: "Apple",
      link: "https://zynth.ai/share?submissionId=Parati-1713424380332",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Apple+Product+6.png",
    },
    {
      title: "Nykaa",
      link: "https://zynth.ai/share?submissionId=Parati-1713426656376",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Nykaa+business+model+4.png",
    },
    {
      title: "Duolingo",
      link: "https://zynth.ai/share?submissionId=Parati-1713521432288",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Duolingo+Financials+Use+of+Funds.png",
    },
    {
       title: "Blinkit",
      link: "https://zynth.ai/share?submissionId=Parati-1713510136883",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Blinkit+Track+Record.png",
    },
    {
       title: "Open AI",
      link: "https://zynth.ai/share?submissionId=Parati-1713450564562",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Open+AI+Problem+5.png",
    },
    {
      title: "Paytm",
      link: "https://zynth.ai/share?submissionId=Parati-1713877444343",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Paytm+Mobile+App+screenshots+3.png",
    },
    {
      title: "NVIDIA",
      link: "https://zynth.ai/share?submissionId=Parati-1713523086905",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/NVIDIA+Product+RoadMap.png",
    },
    {
     title: "DailyHunt",
      link: "https://zynth.ai/share?submissionId=Parati-1713511811562",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/DailyHunt+Solutions+4.png",
    },
    {
      title: "Cred",
      link: "https://zynth.ai/share?submissionId=Parati-1713509226838",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Cred+About+5.png",
    },
    {
      title: "Zerodha",
      link: "https://zynth.ai/share?submissionId=Parati-1713873123080",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Zerodha+GTM+5.png",
    },
    {
      title: "Paytm",
      link: "https://zynth.ai/share?submissionId=Parati-1713877444343",
      thumbnail:
        "https://d2zu6flr7wd65l.cloudfront.net/uploads/Paytm+Product+Architecture.png",
    },
    {
     title: "Duolingo",
      link: "https://zynth.ai/share?submissionId=Parati-1713521432288",
      thumbnail:
      "https://d2zu6flr7wd65l.cloudfront.net/uploads/Duolingo+Case+Study.png",
    },


  ];

  return <HeroParallax products={products} />;
}
