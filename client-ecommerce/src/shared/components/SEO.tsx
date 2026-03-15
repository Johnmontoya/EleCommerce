import { Helmet } from 'react-helmet-async';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  name?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical, type = 'website', name = 'EleCommerce' }) => {
  const fullTitle = title ? `${title} | ${name}` : name;
  const defaultDescription = 'Tu depósito en línea verificado para adquirir equipos y mercancías avanzadas.';
  const metaDescription = description || defaultDescription;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph tags (Facebook) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content="@elecommerce" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
};

export default SEO;
