import { useState } from "react";
import { FaInstagram, FaYoutube, FaPlay, FaTimes } from "react-icons/fa";
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
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
  };

  const handleTabChange = (tab: "youtube" | "instagram") => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setIsPlaying(false); // Reset player state on tab switch
    }
  };

  return (
    <div className="media-preview-container">
      {/* Top Header & Tab Switcher */}
      <div className="media-preview-header">
        <div className="media-live-tag">
          <span className="live-pulse"></span>
          <span>LIVE PREVIEW</span>
        </div>

        <div className="media-tabs" role="tablist">
          <button
            type="button"
            className={`media-tab ${activeTab === "youtube" ? "active youtube" : ""}`}
            onClick={() => handleTabChange("youtube")}
            aria-selected={activeTab === "youtube"}
          >
            <FaYoutube className="tab-icon yt" />
            <span>YouTube</span>
          </button>
          <button
            type="button"
            className={`media-tab ${activeTab === "instagram" ? "active instagram" : ""}`}
            onClick={() => handleTabChange("instagram")}
            aria-selected={activeTab === "instagram"}
          >
            <FaInstagram className="tab-icon ig" />
            <span>Insta Reel</span>
          </button>
        </div>
      </div>

      {/* Media Screen Area */}
      <div className={`media-screen ${activeTab === "instagram" ? "instagram-aspect" : "youtube-aspect"}`}>
        {/* YOUTUBE CONTENT */}
        {activeTab === "youtube" && (
          <>
            {isPlaying ? (
              <div className="media-iframe-wrapper">
                <button
                  type="button"
                  className="media-close-btn"
                  onClick={handleClosePlayer}
                  title="Close video"
                  aria-label="Close video player"
                >
                  <FaTimes />
                </button>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&mute=0&playsinline=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="media-iframe"
                  loading="lazy"
                ></iframe>
              </div>
            ) : (
              <div className="media-poster-wrapper" onClick={handlePlayClick}>
                <img
                  src="/images/yt_preview.webp"
                  alt="POV: Tum jis jagah ghumne ka plan bana rahe ho - College Vlog"
                  className="media-poster-img"
                  width="480"
                  height="270"
                  loading="lazy"
                  decoding="async"
                />
                <div className="media-overlay-gradient"></div>

                {/* Big Glowing Play Button */}
                <button
                  type="button"
                  className="media-play-button yt-glow"
                  aria-label="Play YouTube Video"
                >
                  <FaPlay className="play-icon" />
                </button>

                {/* Video Info Overlay */}
                <div className="media-info-overlay">
                  <div className="media-badge">
                    <FaYoutube className="badge-icon yt-red" />
                    <span>College Vlog • Patna-7</span>
                  </div>
                  <h4 className="media-title">
                    POV: Tum jis jagah ghumne ka plan bana rahe ho, wahi mera college hai…
                  </h4>
                  <div className="media-meta">
                    <span className="creator-tag">@di7xu</span>
                    <a
                      href={`https://youtu.be/${youtubeVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="media-external-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Watch on YouTube <MdArrowOutward />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* INSTAGRAM CONTENT */}
        {activeTab === "instagram" && (
          <>
            {isPlaying ? (
              <div className="media-iframe-wrapper instagram-frame">
                <button
                  type="button"
                  className="media-close-btn"
                  onClick={handleClosePlayer}
                  title="Close Reel"
                  aria-label="Close reel player"
                >
                  <FaTimes />
                </button>
                <iframe
                  src={`https://www.instagram.com/reel/${instagramReelId}/embed/`}
                  title="Instagram Reel"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  className="media-iframe instagram-iframe"
                  loading="lazy"
                ></iframe>
              </div>
            ) : (
              <div className="media-poster-wrapper instagram-poster" onClick={handlePlayClick}>
                <div className="instagram-card-backdrop">
                  <div className="instagram-avatar-row">
                    <img
                      src="/images/dilip_dp.webp"
                      alt="Dilip Kumar"
                      className="instagram-avatar"
                      width="38"
                      height="38"
                      loading="lazy"
                    />
                    <div className="instagram-user-text">
                      <span className="instagram-username">di7xu</span>
                      <span className="instagram-audio">Original audio • Trending Reel</span>
                    </div>
                    <span className="instagram-pill">Follow</span>
                  </div>

                  <div className="instagram-center-cue">
                    <button
                      type="button"
                      className="media-play-button ig-glow"
                      aria-label="Play Instagram Reel"
                    >
                      <FaPlay className="play-icon" />
                    </button>
                    <p className="instagram-tap-hint">Tap to play live Reel</p>
                  </div>

                  <div className="instagram-bottom-bar">
                    <div className="instagram-caption">
                      <span>Trending Reel by Dilip Kumar</span>
                    </div>
                    <a
                      href={`https://www.instagram.com/reel/${instagramReelId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="media-external-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Watch on Instagram <MdArrowOutward />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AboutMediaPreview;
