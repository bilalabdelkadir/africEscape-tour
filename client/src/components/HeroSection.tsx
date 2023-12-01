import Image from 'next/image';
import React from 'react';
import HeroImage from '../../public/HeroImage.jpg';

const HeroSection = () => {
  return (
    <div className="w-full relative">
      <div className="bg-green-600">
        <Image
          src={HeroImage}
          alt="Hero section image"
          className="object-cover w-screen h-[90vh] md:h-[80vh] lg:h-[70vh] xl:h-[60vh] 2xl:h-[50vh]"
        />
      </div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center
            md:w-[80%] w-[90%]  h-[70%] bg-black bg-opacity-50 
         border-gray-100 border-opacity-30 border  rounded-lg py-5 px-5
         text-gray-100
      "
      >
        <h1
          className="text-4xl text-center  font-medium tracking-tighter
          font-jost"
        >
          Visit More With AfricEscape
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
