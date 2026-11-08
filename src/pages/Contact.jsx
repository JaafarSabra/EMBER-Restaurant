import React, { useState, useEffect, useRef } from "react";
import { photo } from "../data/menu.js";
import { Icon, Brush, Hero, LocationMap } from "../components/UI.jsx";

export default function Contact({ notify }) {
  const [sent, setSent] = useState(false);
  function submit(e) {
    e.preventDefault();
    localStorage.setItem(
      "ember-contact",
      JSON.stringify(Object.fromEntries(new FormData(e.target))),
    );
    setSent(true);
    notify("Your demo message has been saved.");
  }
  return (
    <>
      <Hero
        kind="contact"
        title={
          <>
            Come say
            <br />
            hello.
          </>
        }
        compact
      />
      <section className="section contact-section">
        <h2>Good conversations start here.</h2>
        <Brush />
        <div className="contact-columns">
          <div className="contact-info">
            <span className="eyebrow">Visit us</span>
            <h3>Beirut, Lebanon</h3>
            <span className="eyebrow">Hours</span>
            <h3>Daily · 12 PM – 2 AM</h3>
            <span className="eyebrow">Get in touch</span>
            <h3>hello@ember.example</h3>
            <p className="fine">
              Concept restaurant · details shown for demonstration.
              <br />
              Messages stay in your browser; no email is sent.
            </p>
          </div>
          <form onSubmit={submit}>
            {sent ? (
              <div className="form-success" role="status">
                <Icon name="check" size={36} />
                <h3>Message saved.</h3>
                <p>
                  Thanks for trying our contact form. This demonstration stores
                  your message in this browser.
                </p>
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() => setSent(false)}
                >
                  Write another message <Icon />
                </button>
              </div>
            ) : (
              <>
                <label>
                  Your name
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email address"
                  />
                </label>
                <label>
                  Subject
                  <select name="subject" defaultValue="" required>
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option>General question</option>
                    <option>Order question</option>
                    <option>Group visit</option>
                    <option>Feedback</option>
                  </select>
                </label>
                <label>
                  Your message
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Your message"
                  />
                </label>
                <button className="primary-btn">
                  Save demo message <Icon />
                </button>
              </>
            )}
          </form>
        </div>
      </section>
      <section className="section find-us ruled">
        <h2>Find your way.</h2>
        <Brush />
        <div>
          <LocationMap />
          <img
            src={photo("contact-detail")}
            alt="A warm light beside the restaurant doorway"
            loading="lazy"
          />
        </div>
      </section>
      <section className="section contact-faq ruled">
        {[
          [
            "Questions about an order?",
            "Visit Track order in the footer to see your latest demo order. You can also choose Order question in the form above.",
          ],
          [
            "Planning a group visit?",
            "Choose Group visit in the form above and tell us your plans. This is a concept restaurant; submissions are saved locally only.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Icon name="plus" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
