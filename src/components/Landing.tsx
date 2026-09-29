import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>An</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Electronics Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">AI & Software Enthusiast</div>
            </h2>
          </div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <div className="mobile-photo">
            <picture>
              <source media="(max-width: 768px)" srcSet="/images/dilip_standing_mobile.webp" type="image/webp" />
              <source srcSet="/images/dilip_standing.webp" type="image/webp" />
              <img
                src="/images/dilip_standing_mobile.webp"
                alt={config.developer.fullName}
                width="260"
                height="462"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
