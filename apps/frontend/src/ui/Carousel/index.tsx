import { useEffect, useState } from 'react';

import style from './index.module.scss'

type CarouselProps = {
    images: string[];
    imageClassName?: string;
};

const Carousel = ({ images, imageClassName }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 7500);

        return () => clearInterval(interval);
    }, [images.length]);


    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex === images.length - 1 ? 0 : prevIndex + 1
    //     );
    // };

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex === 0 ? images.length - 1 : prevIndex - 1
    //     );
    // };

    return (
        <div className={style.carousel}>          
            <div className={style.carousel__container}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`${style.carouselImage} ${index === currentIndex ? style.active : ''} ${imageClassName}`}
                    />
                ))}
            </div>
            {/* <button onClick={prevSlide}>Previous</button> */}
            {/* <button onClick={nextSlide}>Next</button> */}
        </div>
    );
};

export default Carousel;
