import { useState } from "react";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import "./styles/AboutMediaPreview.css";

interface MediaPreviewProps {
  instagramReelId?: string;
  youtubeVideoId?: string;
}

const AboutMediaPreview = ({
  instagramReelId = "Dd2zTxdTwjX",
  youtubeVideoId = "xpucrdxCBIs",
}: MediaPreviewProps) => {
  const [activeTab, setActiveTab] = useState<"youtube" | "instagram">("youtube");

  return (
    <div className="about-media-card">
      {/* Clean Minimal Switcher */}
      <div className="about-media-tabs">
        <button
          type="button"
          className={`about-media-tab ${activeTab === "youtube" ? "active yt" : ""}`}
          onClick={() => setActiveTab("youtube")}
        >
          <FaYoutube className="tab-icon yt" />
          <span>YouTube</span>
        </button>
        <button
          type="button"
          className={`about-media-tab ${activeTab === "instagram" ? "active ig" : ""}`}
          onClick={() => setActiveTab("instagram")}
        >
          <FaInstagram className="tab-icon ig" />
          <span>Instagram</span>
        </button>
      </div>

      {/* Video Display Area */}
      <div className="about-media-player">
        {activeTab === "youtube" ? (
          <div className="youtube-player-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="youtube-iframe"
            ></iframe>
          </div>
        ) : (
          <div className="instagram-player-wrap">
            <iframe
              src={`https://www.instagram.com/reel/${instagramReelId}/embed`}
              title="Instagram Reel"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              loading="lazy"
              className="instagram-iframe"
            ></iframe>
          </div>
        )}
      </div>

      {/* External Link */}
      <div className="about-media-footer">
        {activeTab === "youtube" ? (
          <a
            href={`https://youtu.be/${youtubeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="media-link"
          >
            Watch on YouTube <MdArrowOutward />
          </a>
        ) : (
          <a
            href={`https://www.instagram.com/reel/${instagramReelId}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="media-link"
          >
            Watch on Instagram <MdArrowOutward />
          </a>
        )}
      </div>
    </div>
  );
};

export default AboutMediaPreview;
