import Carousel from "../../utils/Carousel";
import EncyclopediaPageContent from "../../components/EncyclopediaPageContent"

import image1 from '../../assets/encyclopedia-page-images/slide-1.webp';
import image2 from '../../assets/encyclopedia-page-images/slide-2.webp';
import image3 from '../../assets/encyclopedia-page-images/slide-3.webp';
import image4 from '../../assets/encyclopedia-page-images/slide-4.webp';

import style from './index.module.scss'

const carouselImages = [image1, image2, image3, image4];

const EncyclopediaPage = () => {
  return (
    <>
      <section className={style.ep_greeting}>
        <div className={style.ep_greeting__wrapper}>
          <h1 className={style.ep_greeting__title}>Welcome to the Plant Encyclopedia!</h1>
          <div className={style.ep_greeting__wrapper__infoBlock}>
            <p className={style.ep_greeting__text}>Here, you'll find a comprehensive collection of plant species, each with detailed descriptions, photos, and essential care information. Whether you're a gardening enthusiast, a student, or simply curious about the plant kingdom, this encyclopedia is your go - to resource for exploring the world of plants.</p>
            <div className={style.ep_greeting__slider}>
              <Carousel images={carouselImages} imageClassName={style.carouselImage} />
            </div>
          </div>
        </div>
      </section>
      <div className={style.epContainer}>
        <EncyclopediaPageContent />
      </div>
    </>
  )
}

export default EncyclopediaPage