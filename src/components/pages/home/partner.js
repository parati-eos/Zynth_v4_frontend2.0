import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnerSection = () => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          autoplay: true,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          autoplay: true,
        },
      },
    ],
  };

  const partners = [
    {
      logo: " https://zynthimage.s3.amazonaws.com/uploads/184_images%20%283%29.png",
      url: "https://www.diwanhub.com",
    },
    {
      logo: "https://zynthimage.s3.amazonaws.com/uploads/375_vr90kaasazgk14pgxt8h%20%281%29.png",
      url: "https://www.marwaricatalysts.com",
    },
    {
      logo: " https://zynthimage.s3.amazonaws.com/uploads/320_Untitled%20design.png",
      url: "https://www.parati.in",
    },
  ];

  return (
    <div className="w-full pt-16 mx-auto py-8 bg-white h-[50vh]">
      <h4 className="text-4xl font-bold text-center mb-8 text-[#002d41]">
        Our Accelerator Partners
      </h4>
      <Slider {...settings} className="customer-logos">
        {partners.map((partner, index) => (
          <div key={index} className="slide px-4">
            <a href={partner.url} target="_blank" rel="noopener noreferrer">
              <img src={partner.logo} alt={`partner-${index}`} className={`w-52 mx-auto h-auto`} />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PartnerSection;
