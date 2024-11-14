import { useEffect, useRef, useMemo } from "react";
import emailjs from '@emailjs/browser'
function Contact() {
    function copie() {
        const email = document.getElementById('mail');
        const icone = document.getElementById('iconeCopie');
        navigator.clipboard.writeText(email.innerText);
        email.innerText = "Copié dans le presse-papies";
        email.style.color = "#036300";
        email.style.fontWeight = "500";
        icone.classList.remove('fa-regular');
        icone.classList.remove('fa-clipboard');
        icone.classList.add('fa-solid');
        icone.classList.add('fa-clipboard-check');
        icone.style.color = "#036300";
        setTimeout(()=> {
            email.innerText = "mahmoudouabdoul@gmail.com";
            email.style.color = "#430199";
            email.style.fontWeight = "300";
            icone.classList.add('fa-regular');
            icone.classList.add('fa-clipboard');
            icone.classList.remove('fa-solid');
            icone.classList.remove('fa-clipboard-check');
            icone.style.color = "#430199";
        },5000)
    }

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
                entry.target.classList.add('visible-contact');
                observer.unobserve(entry.target);
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containRef.current
        if (containRef.current) {
            observer.observe(contain);
            observer.observe(contain.querySelector('.title-contact-h2'));
            observer.observe(contain.querySelector('.ligne-contact1'));
            observer.observe(contain.querySelector('.paragraphe-contact-p'));
            observer.observe(contain.querySelector('.ligne-contact2'));
            observer.observe(contain.querySelector('.my-mail-title'));
            observer.observe(contain.querySelector('.my-mail-copie'));
            observer.observe(contain.querySelector('.ligne-important'));
            observer.observe(contain.querySelector('.title-form'));
            observer.observe(contain.querySelector('.formulaire'));
        }
        return () => {
            observer.unobserve(contain);
            observer.unobserve(contain.querySelector('.title-contact-h2'));
            observer.unobserve(contain.querySelector('.ligne-contact1'));
            observer.unobserve(contain.querySelector('.paragraphe-contact-p'));
            observer.unobserve(contain.querySelector('.ligne-contact2'));
            observer.unobserve(contain.querySelector('.my-mail-title'));
            observer.unobserve(contain.querySelector('.my-mail-copie'));
            observer.unobserve(contain.querySelector('.ligne-important'));
            observer.unobserve(contain.querySelector('.title-form'));
            observer.unobserve(contain.querySelector('.formulaire'));
        }
    }, [containRef, options]);

    const form = useRef(); 
    const sendEmail = (e) => { 
        e.preventDefault(); 
        emailjs.sendForm('service_contact_portfoli', 'template_contact', form.current, 'BKhUj8nCOzHnCW6a7')
        .then((result) => { 
            alert('message sent successfully...'); 
            console.log(result.text); 
            e.target.reset();
        }, 
        (error) => { 
            console.log(error.text); 
        },); 
    };

    return (
        <article ref={containRef} className="contact">
            <h2 className="title-contact-h2">CONTACT</h2>
            <div className="ligne ligne-contact1"></div>
            <p className="paragraphe-contact-p">Feel free to Contact me by mail or by submitting the form below and I will get back to you as soon as possible</p>
            <div className="ligne ligne-contact2"></div>
            <h3 className="my-mail-title">My Email</h3>
            <a className="my-mail-copie" onClick={()=>copie()}href="mailto:mahmoudouaboul@gmail.com">
                <div className="adresse-mail">
                    <p id="mail">mahmoudouabdoul@gmail.com</p>
                    <i id="iconeCopie" className="fa-regular fa-clipboard"></i>
                </div>
            </a>
            <div className="ligne ligne-important"></div>
            <h3 className="title-form">Form to submit</h3>
            <form ref={form} onSubmit={sendEmail} className="formulaire">
                <div className="label-et-input">
                    <label htmlFor="name">Name</label>
                    <input name="name" id="name" type="text" placeholder="Enter your name" />
                </div>
                <div className="label-et-input">
                    <label htmlFor="email">Email</label>
                    <input name="email" id="email" type="mail" placeholder="Enter your email" />
                </div>
                <div className="label-et-input">
                    <label htmlFor="title">Title of your project</label>
                    <input name="title" id="title" type="text" placeholder="Enter the title of your project" />
                </div>
                <div className="label-et-input">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" placeholder="Enter your message"></textarea>
                </div>
                <input id="submit" type="submit" />
            </form>
        </article>
    )
}

export default Contact