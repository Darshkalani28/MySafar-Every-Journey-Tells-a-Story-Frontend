import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  BookOpen,
  Compass,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Globe,
  Users,
  Camera,
} from "lucide-react";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Handle scroll for parallax and animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Featured destinations data
  const destinations = [
    {
      id: 1,
      title: "Santorini",
      location: "Greece",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=500&fit=crop",
    },
    {
      id: 2,
      title: "Bali",
      location: "Indonesia",
      image:
        "https://images.unsplash.com/photo-1537225228614-b8c0ca7a672f?w=500&h=500&fit=crop",
    },
    {
      id: 3,
      title: "Tokyo",
      location: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959375944-7049f642e9f1?w=500&h=500&fit=crop",
    },
    {
      id: 4,
      title: "Swiss Alps",
      location: "Switzerland",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Sahara",
      location: "Morocco",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop",
    },
    {
      id: 6,
      title: "Machu Picchu",
      location: "Peru",
      image:
        "https://images.unsplash.com/photo-1571335814519-c4b4dc6390c7?w=500&h=500&fit=crop",
    },
  ];

  // Features data
  const features = [
    {
      icon: MapPin,
      title: "Track Destinations",
      description:
        "Pin every place you visit and build your travel map across the globe.",
    },
    {
      icon: BookOpen,
      title: "Tell Your Stories",
      description:
        "Write day-by-day journals with photos and memories from each adventure.",
    },
    {
      icon: Compass,
      title: "Dream & Plan",
      description:
        "Curate your wishlist of future trips and a bucket list of life experiences.",
    },
  ];

  // Stats data
  const stats = [
    { number: "50K+", label: "Stories Shared" },
    { number: "100+", label: "Countries" },
    { number: "1M+", label: "Travelers" },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero-section">
        <div
          className="landing-hero-background"
          style={{
            backgroundImage:
              "url('travel.jpg')",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>

        {/* <div className="landing-hero-overlay"></div> */}

        <div className="landing-hero-content">
          <div className="landing-hero-content-inner">
            <div className="landing-hero-label" data-aos="fadeInUp">
              YOUR JOURNEY BEGINS HERE
            </div>

            <h1 className="landing-hero-title" data-aos="fadeInUp" data-aos-delay="100">
              Every Journey <br />
              <span className="landing-highlight">Tells a Story</span>
            </h1>

            <p className="landing-hero-subtitle" data-aos="fadeInUp" data-aos-delay="200">
              Document your travels, share your stories, and inspire the world
              with MySafar — your personal travel companion.
            </p>

            <div
              className="landing-hero-buttons"
              data-aos="fadeInUp"
              data-aos-delay="300"
            >
              <button
                className="landing-cta-btn landing-cta-primary"
                onClick={() => navigate("/signup")}
              >
                Start Your Journey <ArrowRight size={20} />
              </button>
              <button
                className="landing-cta-btn landing-cta-secondary"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>

            <div className="landing-scroll-indicator" data-aos="fadeInUp" data-aos-delay="400">
              <ChevronDown size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing-stats-section">
        <div className="landing-container">
          <div className="landing-stats-grid">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="landing-stat-card"
                data-aos="fadeInUp"
                data-aos-delay={index * 100}
              >
                <div className="landing-stat-number">{stat.number}</div>
                <div className="landing-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MySafar Section */}
      <section className="landing-why-mysafar">
        <div className="landing-container">
          <div className="landing-section-header" data-aos="fadeInUp">
            <span className="landing-section-label">WHY MYSAFAR</span>
            <h2 className="landing-section-title">Your Travel, Beautifully Organized</h2>
          </div>

          <div className="landing-features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="landing-feature-card"
                  data-aos="fadeInUp"
                  data-aos-delay={index * 100}
                >
                  <div className="landing-feature-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="landing-feature-title">{feature.title}</h3>
                  <p className="landing-feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="landing-featured-destinations">
        <div className="landing-container">
          <div className="landing-section-header" data-aos="fadeInUp">
            <span className="landing-section-label">EXPLORE</span>
            <h2 className="landing-section-title">Featured Destinations</h2>
          </div>

          <div className="landing-destinations-grid">
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className="landing-destination-card"
                data-aos="fadeInUp"
                data-aos-delay={index * 50}
              >
                <div
                  className="landing-destination-image"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                >
                  <div className="landing-destination-overlay"></div>
                </div>
                <div className="landing-destination-content">
                  <h3 className="landing-destination-name">{destination.title}</h3>
                  <div className="landing-destination-location">
                    <MapPin size={14} />
                    <span>{destination.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="landing-how-it-works">
        <div className="landing-container">
          <div className="landing-section-header" data-aos="fadeInUp">
            <span className="landing-section-label">GETTING STARTED</span>
            <h2 className="landing-section-title">Three Simple Steps</h2>
          </div>

          <div className="landing-steps-container">
            {[
              {
                number: "01",
                title: "Create Your Account",
                description:
                  "Sign up in seconds and start documenting your travels.",
                icon: Users,
              },
              {
                number: "02",
                title: "Share Your Stories",
                description:
                  "Upload photos, write descriptions, and capture memories.",
                icon: Camera,
              },
              {
                number: "03",
                title: "Inspire The World",
                description:
                  "Connect with travelers and inspire others to explore.",
                icon: Globe,
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="landing-step-card"
                  data-aos="fadeInUp"
                  data-aos-delay={index * 100}
                >
                  <div className="landing-step-number">{step.number}</div>
                  <div className="landing-step-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="landing-step-title">{step.title}</h3>
                  <p className="landing-step-description">{step.description}</p>
                  {index < 2 && <div className="landing-step-connector"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta-section">
        <div className="landing-cta-background">
          <div className="landing-cta-blob landing-blob-1"></div>
          <div className="landing-cta-blob landing-blob-2"></div>
        </div>

        <div className="landing-container landing-cta-container">
          <div className="landing-cta-content" data-aos="fadeInUp">
            <div className="landing-cta-icon">
              <Sparkles size={48} />
            </div>
            <h2 className="landing-cta-title">Ready to Document Your Adventures?</h2>
            <p className="landing-cta-subtitle">
              Join thousands of travelers sharing their stories on MySafar.
            </p>
            <button
              className="landing-cta-btn landing-cta-large"
              onClick={() => navigate("/signup")}
            >
              Start Your Journey <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-content">
            <div className="landing-footer-brand">
              <h3>MySafar</h3>
              <p>Your personal travel companion</p>
            </div>
            <div className="landing-footer-links">
              <div className="landing-footer-column">
                <h4>Product</h4>
                <ul>
                  <li>
                    <a href="#features">Features</a>
                  </li>
                  <li>
                    <a href="#pricing">Pricing</a>
                  </li>
                  <li>
                    <a href="#security">Security</a>
                  </li>
                </ul>
              </div>
              <div className="landing-footer-column">
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#blog">Blog</a>
                  </li>
                  <li>
                    <a href="#careers">Careers</a>
                  </li>
                </ul>
              </div>
              <div className="landing-footer-column">
                <h4>Legal</h4>
                <ul>
                  <li>
                    <a href="#privacy">Privacy</a>
                  </li>
                  <li>
                    <a href="#terms">Terms</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="landing-footer-bottom">
            <p>© 2026 MySafar. Crafted with wanderlust.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
