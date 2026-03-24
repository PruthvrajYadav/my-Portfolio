import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type }) => {
    const siteTitle = title ? `${title} | Pruthviraj Yadav` : 'Pruthviraj Yadav | Full Stack Developer';
    const siteDescription = description || 'Portfolio of Pruthviraj Yadav - Full Stack Web Developer specializing in MERN stack, GSAP animations, and modern UI/UX design.';
    const siteName = name || 'Pruthviraj Yadav';
    const siteType = type || 'website';

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{siteTitle}</title>
            <meta name='description' content={siteDescription} />
            
            {/* Facebook tags */}
            <meta property="og:type" content={siteType} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:site_name" content={siteName} />
            
            {/* Twitter tags */}
            <meta name="twitter:creator" content={siteName} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />

            {/* Additional SEO tags */}
            <meta name="keywords" content="Pruthviraj Yadav, Portfolio, Full Stack Developer, MERN Stack, React Developer, Web Developer, GSAP Animations, UI/UX Design" />
            <meta name="author" content="Pruthviraj Yadav" />
            <meta name="robots" content="index, follow" />
        </Helmet>
    );
};

export default SEO;
