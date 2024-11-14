import { useEffect, useRef, useMemo } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function Caroussel(props) {
    const containRef = useRef(null);
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: .1
        };
    }, [])
     
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.1) {
                entry.target.classList.add('visible-carousel');
                observer.unobserve(entry.target);
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = document.querySelector('.carousel-root');
        observer.observe(contain);
        return () => {
            observer.unobserve(contain);
        }
    }, [containRef, options]);
    return (
        <Carousel autoPlay interval={3000} infiniteLoop showStatus={false} showThumbs={false}>
            {props.pictures.map((picture, i) =>
                <img key={i} className='pictures' src={picture} alt="apperçus du projet" />
            )}
        </Carousel>
    );
}

export default Caroussel