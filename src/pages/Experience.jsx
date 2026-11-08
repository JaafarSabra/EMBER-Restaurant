import React, { useState, useEffect, useRef } from "react";
import { menu, photo, dish } from "../data/menu.js";
import { Icon, Link, Brush, Hero } from "../components/UI.jsx";

const experienceTabs = {
  "Dine in": {
    image: "experience-table",
    title: "Stay a little longer.",
    text: "Settle in, take it all in, and enjoy a meal made to be savored.",
    link: "Plan your visit",
    to: "contact",
  },
  Pickup: {
    image: "experience-pickup",
    title: "Fresh food. Your schedule.",
    text: "Order ahead, follow your progress, and collect your favorites from the counter.",
    link: "Start your order",
    to: "menu",
  },
  Delivery: {
    image: "experience-delivery",
    title: "A good night in.",
    text: "Your favorite seat is already at home. Build your meal and we’ll take it from there.",
    link: "Explore the menu",
    to: "menu",
  },
};
export default function Experience() {
  const [tab, setTab] = useState("Dine in"),
    t = experienceTabs[tab];
  return (
    <>
      <Hero
        kind="experience"
        title={
          <>
            Make a<br />
            night of it.
          </>
        }
        label="The Ember experience"
        link="Explore the menu"
      />
      <section className="section experience-options">
        <h2>Your table. Your way.</h2>
        <Brush />
        <div
          className="experience-tabs"
          role="tablist"
          aria-label="Dining options"
        >
          {Object.keys(experienceTabs).map((x) => (
            <button
              key={x}
              role="tab"
              aria-selected={tab === x}
              aria-controls="dining-panel"
              onClick={() => setTab(x)}
              className={tab === x ? "active" : ""}
            >
              {x}
            </button>
          ))}
        </div>
        <div
          className="dining-panel"
          id="dining-panel"
          role="tabpanel"
          key={tab}
        >
          <img src={photo(t.image)} alt={t.title} loading="lazy" />
          <div>
            <h2>{t.title}</h2>
            <p>{t.text}</p>
            <Link to={t.to}>{t.link}</Link>
          </div>
        </div>
      </section>
      <section className="steps section">
        <h2>A simple way to order.</h2>
        <Brush />
        <div>
          {[
            ["plate", "Choose your favorites."],
            ["sliders", "Make it yours."],
            ["cutlery", "Enjoy."],
          ].map(([icon, title], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <Icon name={icon} size={44} />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="pairings section">
        <h2>Better together.</h2>
        <Brush />
        <div>
          {[
            ["experience-skewer", "Chicken skewer."],
            ["experience-citrus", "Citrus mocktail."],
          ].map(([im, title]) => (
            <figure key={im}>
              <img src={photo(im)} alt={title} loading="lazy" />
              <figcaption>
                {title}
                <span />
              </figcaption>
            </figure>
          ))}
        </div>
        <Link to="menu">Explore the menu</Link>
      </section>
      <section className="faq section">
        <h2>FAQ.</h2>
        <div>
          {[
            [
              "Can I order for pickup?",
              "Yes. Choose Pickup at checkout. The delivery fee is removed and the tracker shows when your meal is ready to collect.",
            ],
            [
              "Do you offer delivery?",
              "Delivery is available in this demonstration. Enter your address at checkout to try the simulated delivery flow.",
            ],
            [
              "Can I customize my meal?",
              "Tap a dish to choose an option, adjust the quantity, or add a note at checkout.",
            ],
            [
              "What about allergies?",
              "Ingredient and allergen notes are listed in each dish. For a real order, contact the restaurant directly to confirm suitability and cross-contact risks.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Icon name="plus" size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
