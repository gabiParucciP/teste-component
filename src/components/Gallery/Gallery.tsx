import React from "react";
import { useState } from "react";
import { SliderList } from "../SliderList";
import clsx from "clsx";
import "./gallery.css";

interface Props {
  images: string[];
}

export const Gallery = ({ images }: Props) => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      <div className="w-[318px] h-[318px]">
        <img
          src={images[current]}
          alt=""
          width={318}
          height={318}
          className="rounded-lg h-[318px]"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[269px]" id="slider-gallery">
          <SliderList
            slidesToScroll={2}
            slidesToShow={5}
            responsive={[
              {
                breakpoint: 2000,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 2,
                  infinite: false,
                  dots: false,
                },
              },
            ]}
          >
            {images.map((item, index) => {
              return (
                <div
                  id="gallery-div"
                  className={clsx(
                    {
                      ["border border-rose-700"]: current == index,
                    },
                    "rounded-lg cursor-pointer"
                  )}
                  onClick={() => setCurrent(index)}
                >
                  <img
                    src={item}
                    alt=""
                    width={47}
                    height={47}
                    className="rounded-lg h-[47px]"
                  />
                </div>
              );
            })}
          </SliderList>
        </div>
      </div>
    </div>
  );
};
