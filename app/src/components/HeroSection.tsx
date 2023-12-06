import HeroImage from '../assets/HeroImage.jpg';
import { buttonVariants } from './ui/button';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="w-full relative">
      <div className="bg-gray-600 absolute inset-0 opacity-80"></div>
      <div className="bg-green-600">
        <img
          src={HeroImage}
          alt="Hero section image"
          className="object-cover w-screen h-[70vh] md:h-[80vh]
           lg:h-[80vh] xl:h-[70vh] 2xl:h-[50vh]
           "
        />
      </div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center
          md:w-[70%] w-[90%] h-[70%] 
      "
      >
        <h1
          className="text-4xl md:text-7xl text-center font-semibold
          font-jost text-white  leading-10"
        >
          Discover The Most Beautiful Places In Africa With Us
        </h1>
        <p
          className="text-sm md:text-lg text-center font-medium
          font-jost text-white my-5 shadow-2xl"
        >
          We are committed to providing you with the best experience
        </p>
        <NavLink
          to="/register"
          className={buttonVariants({
            variant: 'default',
            size: 'lg',
            className:
              'rounded-full py-0 px-5 text-gray-200 font-semibold  bg-gradient-to-r from-teal-800 to-green-600 hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-800',
          })}
        >
          Explore Now
        </NavLink>
      </div>
    </div>
  );
};

export default HeroSection;
