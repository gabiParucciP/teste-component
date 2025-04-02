import React from "react";
import { ReactNode } from "react";
import Slider from "react-slick";

interface SliderProps {
  children: ReactNode;
  slidesToShow: number;
  slidesToScroll: number;
  responsive?: any;
}

export const SliderList = ({
  children,
  slidesToShow,
  slidesToScroll,
  responsive,
}: SliderProps) => {
  return (
    <Slider
      dots={false}
      infinite={false}
      speed={500}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      nextArrow={<ArrowButtonRight />}
      prevArrow={<ArrowButtonLeft />}
      responsive={
        responsive || [
          {
            breakpoint: 2000,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 2,
              infinite: false,
              dots: false,
            },
          },
          {
            breakpoint: 1900,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 2,
              infinite: false,
              dots: false,
            },
          },
          {
            breakpoint: 1700,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 2,
              infinite: false,
              dots: false,
            },
          },
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 2,
              infinite: false,
              dots: false,
            },
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              infinite: false,
              dots: false,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              dots: false,
            },
          },
        ]
      }
    >
      {children}
    </Slider>
  );
};

function ArrowButtonRight(props) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "white",
        border: "1px solid var(--dark-blue-300)",
        height: "24px",
        width: "24px",
      }}
      className={`${className} rounded-lg`}
      onClick={onClick}
    >
      <i className="uil uil-angle-right text-dark-blue-400 mr-0 text-base"></i>
    </div>
  );
}

function ArrowButtonLeft(props) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "white",
        border: "1px solid var(--dark-blue-300)",
        height: "24px",
        width: "24px",
        zIndex: 9,
      }}
      className={`${className} rounded-lg`}
      onClick={onClick}
    >
      <i className="uil uil-angle-left text-dark-blue-400 mr-0 text-base"></i>
    </div>
  );
}
