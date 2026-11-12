import React, { useState, useEffect, useRef } from "react";
import { menu, photo, dish } from "../data/menu.js";
import { Icon, Link, Brush, Hero } from "../components/UI.js";
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
    text: "Your favorite seat is already at home. Build your meal and we\u2019ll take it from there.",
    link: "Explore the menu",
    to: "menu",
  },
};
function Experience() {
  const [tab, setTab] = useState("Dine in"),
    t = experienceTabs[tab];
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Hero, {
      kind: "experience",
      title: React.createElement(
        React.Fragment,
        null,
        "Make a",
        React.createElement("br", null),
        "night of it.",
      ),
      label: "The Ember experience",
      link: "Explore the menu",
    }),
    React.createElement(
      "section",
      { className: "section experience-options" },
      React.createElement("h2", null, "Your table. Your way."),
      React.createElement(Brush, null),
      React.createElement(
        "div",
        {
          className: "experience-tabs",
          role: "tablist",
          "aria-label": "Dining options",
        },
        Object.keys(experienceTabs).map((x) =>
          React.createElement(
            "button",
            {
              key: x,
              role: "tab",
              "aria-selected": tab === x,
              "aria-controls": "dining-panel",
              onClick: () => setTab(x),
              className: tab === x ? "active" : "",
            },
            x,
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          className: "dining-panel",
          id: "dining-panel",
          role: "tabpanel",
          key: tab,
        },
        React.createElement("img", {
          src: photo(t.image),
          alt: t.title,
          loading: "lazy",
        }),
        React.createElement(
          "div",
          null,
          React.createElement("h2", null, t.title),
          React.createElement("p", null, t.text),
          React.createElement(Link, { to: t.to }, t.link),
        ),
      ),
    ),
    React.createElement(
      "section",
      { className: "steps section" },
      React.createElement("h2", null, "A simple way to order."),
      React.createElement(Brush, null),
      React.createElement(
        "div",
        null,
        [
          ["plate", "Choose your favorites."],
          ["sliders", "Make it yours."],
          ["cutlery", "Enjoy."],
        ].map(([icon, title], i) =>
          React.createElement(
            "article",
            { key: title },
            React.createElement("span", null, "0", i + 1),
            React.createElement(Icon, { name: icon, size: 44 }),
            React.createElement("h3", null, title),
          ),
        ),
      ),
    ),
    React.createElement(
      "section",
      { className: "pairings section" },
      React.createElement("h2", null, "Better together."),
      React.createElement(Brush, null),
      React.createElement(
        "div",
        null,
        [
          ["experience-skewer", "Chicken skewer."],
          ["experience-citrus", "Citrus mocktail."],
        ].map(([im, title]) =>
          React.createElement(
            "figure",
            { key: im },
            React.createElement("img", {
              src: photo(im),
              alt: title,
              loading: "lazy",
            }),
            React.createElement(
              "figcaption",
              null,
              title,
              React.createElement("span", null),
            ),
          ),
        ),
      ),
      React.createElement(Link, { to: "menu" }, "Explore the menu"),
    ),
    React.createElement(
      "section",
      { className: "faq section" },
      React.createElement("h2", null, "FAQ."),
      React.createElement(
        "div",
        null,
        [
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
        ].map(([q, a]) =>
          React.createElement(
            "details",
            { key: q },
            React.createElement(
              "summary",
              null,
              q,
              React.createElement(Icon, { name: "plus", size: 18 }),
            ),
            React.createElement("p", null, a),
          ),
        ),
      ),
    ),
  );
}
export { Experience as default };
