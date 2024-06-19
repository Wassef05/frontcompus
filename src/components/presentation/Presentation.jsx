    import React, { useState,useEffect } from 'react';
    import './presentation.css'; 
    import image1 from '../../assets/fac5.webp';
    import image2 from '../../assets/fac1.webp';
    import image3 from '../../assets/fac2.webp'
    import image4 from '../../assets/fac3.webp'

    import Back from '../common/back/Back';
  
    import { AiOutlineArrowRight } from "react-icons/ai";

    import Carousel from "react-multi-carousel";
    import "react-multi-carousel/lib/styles.css";
    import { TiSocialGooglePlus } from "react-icons/ti";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import {HiOutlineStatusOnline} from "react-icons/hi"
import AOS from "aos";
import "aos/dist/aos.css";

const AnimatedCounter = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 1000 / 100);

    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 100);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{Math.round(count)}</span>;
};
    const Presentation  = () => {
        useEffect(() => {
            AOS.init({
              duration: 1000,
            });
          }, []);

        const responsive = {
            superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3,
            },
            desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            },
            tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            },
            module: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            },
        };



    return (
        <>
        <Back title='PRESENTATION' />
        <div className="parcours-univ-container">
            <div className="header-content">
            <div className="header-line"></div>
            <span className="header-title" >PRÉPARATOIRE ICCS</span>
            <div className="header-dot"> </div>
           
        
           


            </div>
            <div className="carousel-wrapper">
            <Carousel
                    swipeable
                    draggable={false}
                    responsive={responsive}
                    ssr // Server-side rendering
                    infinite
                    autoPlay={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    className="carousel-container" 
                >
            <img src={image1} alt="Image 1" className="carr" />
            <img src={image2} alt="Image 2" className="carr" />
            <img src={image3} alt="Image 3" className="carr" />
            <img src={image4} alt="Image 4" className="carr2" />
            </Carousel>
            </div>
        

            <div className="content-section">
            <div className="text-content">
            <strong>
                <p>
                Le cycle préparatoire intégré ICCS (Ingénierie de Construction, des Composants et des Systèmes) est ouvert à l’ensemble des bacheliers de sections scientifiques :
                </p>
                <ul  className="specialities-list" >
                <li>Mathématiques</li>
                <li>Sciences Techniques</li>
                <li>Sciences Expérimentales</li>
                <li>Sciences Informatiques</li>
                </ul>
                <p>
                L’admission au CPI se fait par voie de concours (sur dossier et/ou test) avec entretien de motivation.
                Les candidats doivent justifier de bonnes notes au Bac et en Classe Terminale.
                </p>
                </strong>
                <p>
                Les candidats doivent justifier de bonnes notes au Bac et en Classe Terminale.  Ce cycle dure deux ans et permet aux bacheliers d’accéder à l’une des spécialités proposées par EPI-Polytechnique. Le passage se fait sur la base du contrôle continu.
                </p>
            </div>
            <img src={image1} alt="Description" className="content-image" />
            </div>
            <section id="subscribe">
      <div className="container subscribe" data-aos="fade-up">
        <h2 style={{color:"white"}}>STAT 
          <HiOutlineStatusOnline style={{paddingLeft:'1rem'}}/>
        </h2>
 
    <div className="stats-row">
      <div className="stat">
        <AnimatedCounter end={2011} duration={2.5} />
        <p>Lancement</p>
      </div>
      <div className="stat">
        <AnimatedCounter end={4} duration={2.5} />
        <p>Écoles</p>
      </div>
      <div className="stat">
        <AnimatedCounter end={42} duration={2.5} />
        <p>Formations</p>
      </div>
      <div className="stat">
        <AnimatedCounter end={2500} duration={2.5} />
        <p>Étudiants</p>
      </div>
    </div>

   
    <div className="stats-row">
      <div className="stat">
        <AnimatedCounter end={50} duration={2.5} />
        <p>Laboratoires</p>
      </div>
      <div className="stat">
        <AnimatedCounter end={15000} duration={2.5} />
        <p>Bâtiments (m²)</p>
      </div>
      <div className="stat">
        <AnimatedCounter end={3000} duration={2.5} />
        <p>Espace vert (m²)</p>
      </div>
      <div className="stat">
        <AnimatedCounter end={2000} duration={2.5} />
        <p>Diplômés</p>
      </div>
    </div>

 


        {/* <div className="social-icons">
          <div className="social-icon">
            <TiSocialGooglePlus />
          </div>
          <div className="social-icon">
            <FaFacebookF />
          </div>
          <div className="social-icon">
            <FaTwitter />
          </div>
          <div className="social-icon">
            <FaInstagram />
          </div>
        </div> */}
      </div>
    </section>

            {/* <div className="content-section">
            <img src={image2} alt="Description" className="content-image" />
            <div className="text-content">
                <p>La préparation dans le parcours ICCS se fait en une première année commune à tous les étudiants et une deuxième année de pré-orientation où des dominantes sont prévues en fonction des spécialités offertes à EPI-Polytechnique : Electrique, Electromécanique, Civil et Industriel.
                Le contenu des enseignements et les méthodes pédagogiques du CPI permettent aux étudiants de développer progressivement et sereinement des compétences dans un environnement d’une Ecole d’Ingénieurs..
                </p>
                <p className="additional-info">
                    <strong>Pour plus d’informations, contacter <span className="contact-name">M. MBAREK MOKHLES</span>.</strong>
                    </p>
            </div>
            </div> */}
            {/* <div className="header-content">
            <div className="header-line"></div>
            <span className="header-title" > PLAN D'ÉTUDE </span>
            <div className="header-dot"></div>
           
            </div> */}

            
        </div>
        </>
    );
    };

    export default Presentation ;
