import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faFacebook, faFacebookMessenger, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { trackShareEvent } from "../utils/analytics"; // Import trackShareEvent

const BASE_URL = "https://lasprendashablan.tejer.red/indicio/"; // Define BASE_URL

const ShareButtonAside = ({ indicio, customStyles = {} }) => {
  const shareUrl = `${BASE_URL}/${indicio}`; // Use BASE_URL for absolute URL

  const handleShare = (platform) => {
    console.log(`Sharing on ${platform}: ${shareUrl}`); // Log the share action
    trackShareEvent(platform, indicio); // Track share event
  };

  const defaultButtonStyle = {
    display: "inline-block",
    width: "32px",
    height: "32px",
    margin: "0.5rem",
    background: "#fff", // White background
    color: "#000", // Black icon
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "32px",
    fontSize: "20px",
  };

const containerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    background: "#000",
    color: "#fff"
}

  return (
    <div className="share-buttons-aside" style={{ ...containerStyle }}>
        <p style={{margin:0, color: "#fff"}}>Compartir:</p>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...defaultButtonStyle }}
        className="share-button whatsapp"
        onClick={() => handleShare("WhatsApp")}
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...defaultButtonStyle}}
        className="share-button facebook"
        onClick={() => handleShare("Facebook")}
      >
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a
        href={`fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...defaultButtonStyle }}
        className="share-button messenger"
        onClick={() => handleShare("Messenger")}
      >
        <FontAwesomeIcon icon={faFacebookMessenger} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...defaultButtonStyle}}
        className="share-button twitter"
        onClick={() => handleShare("Twitter")}
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </div>
  );
};

export default ShareButtonAside;
