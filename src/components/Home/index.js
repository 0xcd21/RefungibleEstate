import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import './style.css';


const items = [
  {
    src: require('../../assets/images/carousel-1.jpeg'),
    altText: 'Marketmake image',
    caption: 'Buy and sell properties'
  },
  {
    src: require('../../assets/images/carousel-2.jpeg'),
    altText: 'Marketmake image',
    caption: 'Open business in properties'
  },
  {
    src: require('../../assets/images/carousel-3.jpeg'),
    altText: 'Marketmake image',
    caption: 'Lend and earn profits'
  }
];


function Home(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;

    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;

    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;

    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;

    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;

    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="caption"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        {/* <div className="carouselText">
          <div id="container">
            <h2>{item.caption}</h2>
          </div>
        </div> */}
        <div className="">
          <CarouselCaption
            captionText={item.caption} 
            captionHeader={item.caption}
            // className="text-danger"
          />
        </div>
      </CarouselItem>
    );
  });

  return (
    <div>
      <div id="mainContainer" className="container-fluid">
        <div className="row">
          <main role="main" className="col-12 d-flex p-0 main text-center">
            <div id="titleContent" className="content">
              <h1>Welcome to MarketMake</h1>
              <p>
                With new games and updates, join one of the most amazing community and
                start crafting today.
              </p>
            </div>
          </main>
        </div>
        <div id="gallery" className="row mt-5 p-5 gallery">
          <br />
          <h3>Gallery</h3>
          <br />
          <main role="main" className="col-12 d-flex p-0 gallery-main text-center">
            <div className="content">
              <Carousel
                className="carousel"
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators
                  items={items} activeIndex={activeIndex}
                  onClickHandler={goToIndex}
                />
                {slides}
                <CarouselControl
                  className="controls"
                  direction="prev"
                  directionText="Previous"
                  onClickHandler={previous}
                />
                <CarouselControl
                  className="controls"
                  direction="next"
                  directionText="Next"
                  onClickHandler={next}
                />
              </Carousel>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


export default Home;
