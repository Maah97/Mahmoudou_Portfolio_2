import { useEffect, useRef, useMemo } from "react";
import imgTwitter1 from '../assets/logo-twitter.svg';

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    const containRef = useRef(null);
    const ratio = 0.1
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: ratio
        };
    }, [])
     
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > ratio) {
                entry.target.classList.add('visible-footer');
                observer.unobserve(entry.target);
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containRef.current
        if (containRef.current) {
            observer.observe(contain);
            observer.observe(contain.querySelector('.svg-curve-footer'));
            observer.observe(contain.querySelector('.contact-reseaux'));
            observer.observe(contain.querySelector('.droit-reserve'));
        }
        return () => {
            observer.unobserve(contain);
            observer.unobserve(contain.querySelector('.svg-curve-footer'));
            observer.unobserve(contain.querySelector('.contact-reseaux'));
            observer.unobserve(contain.querySelector('.droit-reserve'));
        }
    }, [containRef, options]);
    return (
        <footer ref={containRef}>
            <svg id="curve" className="svg-curve svg-curve-footer" viewBox="0 0 1440 79" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 79C-100 79 218.416 23.165 693.5 23.165C1168.58 23.165 1487 79 1487 79V0H-100V79Z"></path>
            </svg>
            <div className="contact-reseaux">
                <a href="mailto:mahmoudouaboul@gmail.com">
                    <i className="fa-solid fa-envelope"></i>
                </a>
                <a href="https://linkedin.com/in/mahmoudou-abdoul-nganiyyou-2b805a180" rel='noreferrer' target='_blank'>
                    <i id='linkedin' className="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://github.com/Maah97" rel='noreferrer' target='_blank'>
                    <i id='github' className="fa-brands fa-github"></i>
                </a>
                <a href="https://x.com/mahmoudouabdoul" id='ImgTwitter' rel='noreferrer' target='_blank'>
                    <img id='twitter' src={imgTwitter1} alt="X anciennement twitter" />
                </a>
            </div>
            <p className="droit-reserve">
                <i className="fa-regular fa-copyright"></i>{" " + year + " Mahmoudou Abdoul Nganiyyou, all rights reserved"}
            </p>
        </footer>
    )
};

export default Footer;