import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faFacebook, faFacebookMessenger, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { trackShareEvent } from "../utils/analytics"; // Import trackShareEvent

const BASE_URL = "https://lasprendashablan.tejer.red/indicio/"; // Define BASE_URL

const ShareButtons = ({ indicio }) => {
  const shareUrl = `${BASE_URL}/${indicio}`; // Use BASE_URL for absolute URL

  const handleShare = (platform) => {
    console.log(`Sharing on ${platform}: ${shareUrl}`); // Log the share action
    trackShareEvent(platform, indicio); // Track share event
  };

  const buttonStyle = {
    display: "inline-block",
    margin: "0.5rem",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "1.2rem",
    textDecoration: "none",
    textAlign: "center",
    width: "68px",
    height: "68px",
    padding: "4px",
  };
  const iconStyle = {
    height: "64px",
    width: "64px",
  }
  return (
    <div className="share-buttons" style={{ textAlign: "center" }}>
      <p>Compartir:</p>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...buttonStyle, backgroundColor: "#25D366" }} // WhatsApp green
        className="share-button whatsapp"
        onClick={() => handleShare("WhatsApp")}
      >
        <FontAwesomeIcon style={iconStyle} icon={faWhatsapp} /> 
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...buttonStyle, backgroundColor: "#1877F2" }} // Facebook blue
        className="share-button facebook"
        onClick={() => handleShare("Facebook")}
      >
        <FontAwesomeIcon style={iconStyle} icon={faFacebook} /> 
      </a>
      <a
        href={`fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...buttonStyle, backgroundColor: "#0084FF" }} // Messenger blue
        className="share-button messenger"
        onClick={() => handleShare("Messenger")}
      >
        <FontAwesomeIcon style={iconStyle} icon={faFacebookMessenger} /> 
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...buttonStyle, backgroundColor: "#1DA1F2" }} // Twitter blue
        className="share-button twitter"
        onClick={() => handleShare("Twitter")}
      >
        <FontAwesomeIcon style={iconStyle} icon={faTwitter} />
      </a>
    </div>
  );
};

export default ShareButtons;
