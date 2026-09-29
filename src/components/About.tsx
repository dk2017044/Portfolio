import "./styles/About.css";
import { config } from "../config";
import AboutMediaPreview from "./AboutMediaPreview";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-container-wrapper">
        <div className="about-me">
          <h3 className="title">{config.about.title}</h3>
          <p className="para">
            {config.about.description}
          </p>
        </div>
        <AboutMediaPreview
          instagramReelId="Dd2zTxdTwjX"
          youtubeVideoId="xpucrdxCBIs"
        />
      </div>
    </div>
  );
};

export default About;
