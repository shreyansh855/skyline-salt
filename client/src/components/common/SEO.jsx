import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  productData,
  schemaType = 'WebPage'
}) {
  const { settings } = useSettings();
  const location = useLocation();

  const finalTitle = title 
    ? `${title} | ${settings.companyName}` 
    : `${settings.companyName} | Industrial Salt, Bentonite & Kaolin Manufacturer Gujarat`;

  const finalDescription = description || settings.seo?.metaDescription || 
    "Premier manufacturer and supplier of Refined Industrial Salt, Edible Salt, API Drilling Bentonite, China Clay, and Calcined Kaolin based in Gandhidham and Bhuj-Kutch, Gujarat.";

  const finalKeywords = keywords || settings.seo?.metaKeywords || 
    "industrial salt, edible salt, bentonite manufacturer, china clay, kaolin powder, silica ramming mass, gandhidham, kutch";

  const finalOgImage = ogImage || settings.seo?.ogImage || "/skyline-solar-salt-mountains.jpg";

  useEffect(() => {
    document.title = finalTitle;

    // Track pageview for visitor analytics
    const trackPageView = async () => {
      try {
        const devType = window.innerWidth < 768 ? 'Mobile' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop';
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: location.pathname,
            referrer: document.referrer || 'direct',
            productSlug: productData ? productData.slug : null,
            deviceType: devType
          })
        });
      } catch (e) {
        // Silent analytics error
      }
    };
    trackPageView();
  }, [finalTitle, location.pathname, productData]);

  // Structured Data Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": settings.companyName,
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "description": settings.tagline,
    "address": [
      {
        "@type": "PostalAddress",
        "name": "Head Office",
        "streetAddress": "Plot No. 92, Near Fateh Mamad Hajira, Lalshah Burhanshah Dargah",
        "addressLocality": "Bhuj-Kutch",
        "postalCode": "370001",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "name": "Manufacturing Facility",
        "streetAddress": "Plot No. D-35, Jawahar Nagar",
        "addressLocality": "Gandhidham, Kutch",
        "postalCode": "370201",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      }
    ],
    "telephone": [settings.phonePrimary, settings.phoneSecondary],
    "email": [settings.emailInfo, settings.emailSupport]
  };

  const productSchema = productData ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productData.name,
    "image": productData.images,
    "description": productData.shortDescription || productData.description,
    "brand": {
      "@type": "Brand",
      "name": settings.companyName
    },
    "category": productData.categorySlug,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "price": "On Request",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  return (
    <>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content={productData ? "product" : "website"} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
    </>
  );
}

