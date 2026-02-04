import React from "react";

const Our_story = () => {
  return (
    <section className="our-story-section">
      <div className="our-story-header">
        <h2>OUR STORY</h2>
      </div>
      <div className="our-story-container">

        <div className="our-story-grid">
          <div className="our-story-images">
            <div className="main-image">
              <img
                src="images/Our_story.jpeg"
                alt="ALIVE team group photo"
              />
            </div>
            <div className="small-image">
              <img
                src="images/Our_story1.jpeg"
                alt="Another photo of the ALIVE team"
              />
            </div>
          </div>

        </div>
        <div className="our-story-text">
          <p>
            ALIVE was born out of a simple but urgent reality, too many
            patients in Nigeria struggle to find blood when they need it most.
            The shortage is not because people don’t want to donate, but
            because there’s no easy bridge connecting willing donors to
            hospitals and blood banks.
          </p>
          <p>
            In April 2025, our team came together at a hackathon with one
            mission — to build that bridge. We designed ALIVE to connect
            donors, hospitals, and blood banks on one platform, making the
            donation process more transparent, reliable, and impactful.
          </p>
          <p>
            Today, we are growing step by step — from gathering feedback from
            hospitals in Lagos to building a waitlist of passionate donors and
            preparing for pilot partnerships. Our journey is just beginning,
            but our goal is clear: every drop of blood should find its way to
            save a life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Our_story;
