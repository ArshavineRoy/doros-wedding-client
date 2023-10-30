import React from 'react';
import HeroSlider, { Slide } from 'hero-slider';

const wed1 =
'https://images.pexels.com/photos/3585798/pexels-photo-3585798.jpeg?auto=compress&cs=tinysrgb&w=600'
const wed2 =
'https://media.istockphoto.com/id/1334542509/photo/elopement-wedding.webp?b=1&s=170667a&w=0&k=20&c=NUvuNML13hhpyWrKsfuHbe1EKXc1sMtiqlcsEFvorc4='

const Home = () => {
  return (
    <div className="h-screen relative">
      <HeroSlider
        slidingAnimation="left_to_right"
        orientation="horizontal"
        initialSlide={1}
        onBeforeChange={(previousSlide, nextSlide) =>
          console.log('onBeforeChange', previousSlide, nextSlide)
        }
        onChange={(nextSlide) => console.log('onChange', nextSlide)}
        onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.33)',
        }}
        settings={{
          slidingDuration: 300,
          slidingDelay: 100,
          shouldAutoplay: true,
          shouldDisplayButtons: true,
          autoplayDuration: 5000,
          height: '100vh',
          width: '100vw',
        }}
      >
        <Slide
          background={{
            backgroundImage: `url(${wed1})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <p className="text-4xl font-semibold font-poppins">
              Let’s Plan Your<br /> Perfect{' '}
              <span className="text-[#73332D] font-merienda">Wedding</span> With Us
            </p>
            <button className="bg-[#73332D] text-white font-merienda text-lg px-6 py-2 mt-4 rounded-full">Create Event</button>
          </div>
        </Slide>
        <Slide
          background={{
            backgroundImage: `url(${wed2})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <p className="text-4xl font-semibold font-poppins">
              Let’s Plan Your<br /> Perfect{' '}
              <span className="text-[#73332D] font-merienda">Wedding</span> With Us
            </p><br/><br/>
            
            <button className="bg-[#73332D] text-white font-merienda text-lg px-6 py-2 mt-4 rounded-full">Create Event</button>
          </div>
        </Slide>
        <Slide
          background={{
            backgroundColor: 'black',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <p className="text-4xl font-bold font-merienda">
              Happily Ever After!!!...
            </p>
            <button className="bg-[#73332D] text-white font-merienda text- px-6 py-2 mt-4 rounded-full">Create Event</button>
          </div>
        </Slide>
      </HeroSlider>
    </div>
  );
};

export default Home;
