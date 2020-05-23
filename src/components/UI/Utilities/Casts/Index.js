import React, { useState, useRef, useEffect } from 'react';
import Casts from "./Casts";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from "react-slick";
import classes from "./Casts.module.scss";



const IconStyle = {
    display: "block",
    height: "4rem",
}


const CastSection = ({cast}) => {
    const [totalShow, setTotalShow] = useState(null);

    const sliderElement = useRef();
  
    // Set amount of items to show on slider based on the width of the element
    const changeTotalShow = () => {
      let totalItems = Math.round(sliderElement.current.offsetWidth / 70);
      if ( cast && totalItems > cast.length) {
        totalItems = cast.length;
      }
      setTotalShow(totalItems);
    };

    useEffect(() => {
        changeTotalShow();
        window.addEventListener('resize', changeTotalShow);
        return () => window.removeEventListener('resize', changeTotalShow);
    }, [cast]);

    console.log(totalShow)
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: totalShow,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
      };


    
    return(
      <div className={classes.Slider} ref={sliderElement}>
          {totalShow >= 1 ? <p className={classes.Slider__Heading}>Starring</p> : null }
          <Slider {...settings}>
              {
                  cast && cast.map(({profile_path, name, id, original_title}) => {
                      return(
                          <Casts name={name} key={id} img={profile_path} title={original_title}/>
                      )
                  })
              }
          </Slider>
      </div>
    )
    
}




function NextArrow({ onClick }) {
    return (
      <FontAwesomeIcon
        style={{
          right: '-5px',
          position: 'absolute',
          top: '50%',
          display: 'block',
          width: '12px',
          height: '12px',
          padding: '0',
          transform: 'translate(0, -50%)',
          cursor: 'pointer',
        }}
        onClick={onClick}
        icon={faChevronRight}
        size="1x"
      />
    );
  }
  
  function PrevArrow({ onClick }) {
    return (
      <FontAwesomeIcon
        style={{
          left: '-15px',
          position: 'absolute',
          top: '50%',
          display: 'block',
          width: '12px',
          height: '12px',
          padding: '0',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
        }}
        onClick={onClick}
        icon={faChevronLeft}
        size="1x"
      />
    );
  }

export default CastSection;