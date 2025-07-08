import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { StyledSwiper, StyledSwiperSlide } from "@/styles/discover/containers";
import { StyledDetailsImage } from "@/styles/discover/images";

export default function EventGallery({ image = "", title = "" }) {
  if (!image) {
    return null;
  }
  return (
    <StyledSwiper>
      <StyledDetailsImage alt={title} src={image} />
      {/* {images.map((item, index) => (
        <StyledSwiperSlide
          key={`${title.toLowerCase().replaceAll(' ', '-')}-${index}`}
        >
          <StyledDetailsImage alt={`${title} ${index}`} src={item} />
        </StyledSwiperSlide>
      ))} */}
    </StyledSwiper>
  );
}
