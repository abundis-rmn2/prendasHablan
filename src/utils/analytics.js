let geoDataCache = null;

export const fetchGeoData = async () => { // Ensure this is a named export
  if (!geoDataCache) {
    try {
      const response = await fetch('https://ipapi.co/json/');
      geoDataCache = await response.json();
      console.log('Geolocation data fetched:', geoDataCache);
    } catch (error) {
      console.warn('Failed to fetch geolocation data:', error);
      geoDataCache = { city: 'Unknown', country_name: 'Unknown' };
    }
  }
  return geoDataCache;
};

export const initGTM = () => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'gtm.js', 'gtm.start': new Date().getTime() });
    console.log('Google Tag Manager initialized');
  }
};

export const trackEvent = async (eventName, category, label, value) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    const geoData = await fetchGeoData();
    const { city, country_name: country } = geoData;

    console.log(`Tracking event: event=${eventName}, category=${category}, label=${label}, value=${value}, city=${city}, country=${country}`);

    window.dataLayer.push({
      event: eventName,
      category: category,
      label: label,
      value: value,
      city: city || 'Unknown',
      country: country || 'Unknown',
    });
  } else {
    console.warn('Google Tag Manager is not initialized. Event not tracked.');
  }
};

export const trackShareEvent = async (platform, indicioId) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    const geoData = await fetchGeoData();
    const { city, country_name: country } = geoData;

    console.log(`Tracking share event: platform=${platform}, indicioId=${indicioId}, city=${city}, country=${country}`);

    window.dataLayer.push({
      event: 'share',
      platform: platform,
      indicioId: indicioId,
      city: city || 'Unknown',
      country: country || 'Unknown',
    });
  } else {
    console.warn('Google Tag Manager is not initialized. Share event not tracked.');
  }
};
