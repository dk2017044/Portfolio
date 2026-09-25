import { useState, useEffect } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    contactTimeline.fromTo(
      ".contact-section h3",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    contactTimeline.fromTo(
      ".contact-box, .contact-form-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      contactTimeline.kill();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const endpoint = `https://formsubmit.co/ajax/${config.contact.email}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      const data = await response.json();

      if (response.ok || (data && data.success === "true")) {
        setStatus("success");
        setSuccessMessage(`Thank you, ${formData.name}! Your message was delivered directly to ${config.contact.email}.`);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 8000);
      } else if (data && data.message && data.message.includes("Activation")) {
        setStatus("success");
        setSuccessMessage("First-time setup: An activation email was sent to your inbox. Once clicked, all future messages deliver instantly!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (err: unknown) {
      console.error("Form submission error:", err);
      setStatus("error");
      setErrorMessage("Couldn't send message. Please send an email directly.");
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>
        <div className="contact-flex">
          {/* Contact Details & Social Links */}
          <div className="contact-info-column">
            <div className="contact-box">
              <h4>Email</h4>
              <p>
                <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                  {config.contact.email}
                </a>
              </p>
              <h4>Location</h4>
              <p>
                <span>{config.social.location}</span>
              </p>
            </div>

            <div className="contact-box">
              <h4>Social</h4>
              {config.contact.github && (
                <a
                  href={config.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                  className="contact-social"
                >
                  Github <MdArrowOutward />
                </a>
              )}
              {config.contact.linkedin && (
                <a
                  href={config.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                  className="contact-social"
                >
                  Linkedin <MdArrowOutward />
                </a>
              )}
              {config.contact.instagram && (
                <a
                  href={config.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                  className="contact-social"
                >
                  Instagram <MdArrowOutward />
                </a>
              )}
              {config.contact.youtube && (
                <a
                  href={config.contact.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                  className="contact-social"
                >
                  YouTube <MdArrowOutward />
                </a>
              )}
            </div>

            <div className="contact-box contact-copyright-box">
              <h2>
                Designed and Developed <br /> by <span>{config.developer.fullName}</span>
              </h2>
              <h5>
                <MdCopyright /> {new Date().getFullYear()}
              </h5>
            </div>
          </div>

          {/* Interactive Direct Message Form */}
          <div className="contact-form-container">
            <div className="form-header">
              <h4>Send a Message</h4>
              <p>Have a question or want to collaborate? Drop me a direct message!</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="form-name">Name</label>
                <input
                  type="text"
                  id="form-name"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  data-cursor="disable"
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-email">Email</label>
                <input
                  type="email"
                  id="form-email"
                  name="email"
                  required
                  placeholder="Your Email (for reply)"
                  value={formData.email}
                  onChange={handleChange}
                  data-cursor="disable"
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-message">Message</label>
                <textarea
                  id="form-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={handleChange}
                  data-cursor="disable"
                ></textarea>
              </div>

              <button
                type="submit"
                className={`submit-btn ${status === "success" ? "btn-success" : ""}`}
                disabled={status === "loading"}
                data-cursor="disable"
              >
                {status === "loading" && "Sending..."}
                {status === "success" && "Message Sent! 🎉"}
                {status === "error" && "Try Again"}
                {status === "idle" && (
                  <>
                    Send Message <MdArrowOutward style={{ marginLeft: "4px" }} />
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="form-alert success-alert">
                  ✓ {successMessage || `Thank you! Your message has been sent directly to ${config.contact.email}.`}
                </div>
              )}

              {status === "error" && (
                <div className="form-alert error-alert">
                  ⚠️ {errorMessage || "Could not send. Please email directly."}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
