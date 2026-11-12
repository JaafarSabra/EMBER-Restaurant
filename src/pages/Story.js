import React, { useState, useEffect, useRef } from "react";
import { menu, photo } from "../data/menu.js";
import { Icon, Link, Brush, Hero } from "../components/UI.js";
function Story() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Hero, {
      kind: "story",
      title: React.createElement(
        React.Fragment,
        null,
        "Good food.",
        React.createElement("br", null),
        "Real soul.",
      ),
      label: "The story behind Ember",
    }),
    React.createElement(
      "section",
      { className: "story-start section" },
      React.createElement(
        "div",
        null,
        React.createElement("span", { className: "eyebrow" }, "How it started"),
        React.createElement(
          "h2",
          null,
          "A simple idea.",
          React.createElement("br", null),
          "A lasting impression.",
        ),
        React.createElement(
          "p",
          null,
          "A neighborhood restaurant built on",
          React.createElement("br", null),
          "honest ingredients and a love of great food.",
        ),
      ),
      React.createElement("img", {
        src: photo("story-entrance"),
        alt: "Ember's warm and inviting restaurant entrance",
        loading: "lazy",
      }),
    ),
    React.createElement(
      "section",
      { className: "craft section" },
      React.createElement("h2", null, "From the first ingredient."),
      React.createElement(Brush, null),
      React.createElement(
        "div",
        { className: "craft-grid" },
        [
          ["Choose.", "story-tomatoes", "Fresh ripe tomatoes and herbs"],
          ["Craft.", "story-dough", "Hands kneading fresh dough"],
          ["Serve.", "story-plate", "A freshly plated meal"],
        ].map(([title, im, alt], i) =>
          React.createElement(
            "article",
            { key: im },
            React.createElement("img", {
              src: photo(im),
              alt,
              loading: "lazy",
            }),
            React.createElement(
              "div",
              null,
              React.createElement("span", null, "0", i + 1),
              React.createElement("h3", null, title),
              React.createElement("i", null),
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      "section",
      { className: "care" },
      React.createElement("img", {
        src: photo("story-embers"),
        alt: "Glowing wood embers",
        loading: "lazy",
      }),
      React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "A little patience.",
          React.createElement("br", null),
          "A lot of care.",
        ),
        React.createElement(Brush, null),
        React.createElement(
          "p",
          null,
          "Great food takes time, and we think you can taste it.",
        ),
        React.createElement(Link, { to: "services" }, "Explore the experience"),
      ),
    ),
    React.createElement(
      "section",
      { className: "invitation" },
      React.createElement("h2", null, "Come hungry. Feel at home."),
      React.createElement(
        "a",
        { className: "outline-btn", href: "#menu" },
        "Explore the menu ",
        React.createElement(Icon, null),
      ),
    ),
  );
}
export { Story as default };
