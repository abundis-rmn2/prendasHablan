const isMobile = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 768; // Check if screen width is 768px or less
  }
  return false; // Default to false if window is undefined (e.g., during SSR)
};

export default isMobile;
