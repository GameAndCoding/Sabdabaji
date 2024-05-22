import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const whatsappNumber = "919836873687";
    return (
        <div className="footer">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>
            <a href="https://www.facebook.com/shabdabaaji" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.instagram.com/shabdabaaji?igsh=MXV0bTJiNTVrYmh5ZQ==" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://youtube.com/@shabdabaaji?si=0WH2DLfGTX5GOQw1" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
        </div>
    );
}

export default Footer;
