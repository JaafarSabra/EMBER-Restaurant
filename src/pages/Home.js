import React, { useState, useEffect, useRef } from "react";
import { photo, money, dish } from "../data/menu.js";
import { Icon, Link, Brush, Hero, Product } from "../components/UI.js";
function Home({ onSelect, onAdd }) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Hero, {
      kind: "home",
      title: React.createElement(
        React.Fragment,
        null,
        "Not your",
        React.createElement("br", null),
        "usual.",
      ),
      label: "",
      link: "Find your flavor",
    }),
    React.createElement(
      "section",
      { className: "favorites section" },
      React.createElement(
        "div",
        { className: "favorites-intro" },
        React.createElement(
          "span",
          { className: "eyebrow" },
          "Today's selections",
        ),
        React.createElement(
          "h2",
          null,
          "Fresh",
          React.createElement("br", null),
          "favorites.",
        ),
        React.createElement(
          "p",
          null,
          "Bold plates, seasonal ingredients,",
          React.createElement("br", null),
          "all made to order.",
        ),
        React.createElement(Brush, null),
      ),
      [
        ["tacos", "home-tacos"],
        ["pizza", "home-pizza"],
        ["bowl", "home-bowl"],
      ].map(([id, im]) =>
        React.createElement(Product, {
          key: id,
          product: dish(id),
          imageOverride: im,
          onSelect,
          onAdd,
          className: "tilted",
        }),
      ),
    ),
    React.createElement(
      "section",
      { className: "kitchen section ruled" },
      React.createElement("img", {
        loading: "lazy",
        src: photo("home-chef"),
        alt: "Chef carefully finishing a freshly prepared dish",
      }),
      React.createElement(
        "div",
        null,
        React.createElement("span", { className: "eyebrow" }, "Our kitchen"),
        React.createElement("h2", null, "Made with soul."),
        React.createElement(Link, { to: "about" }, "Our story"),
      ),
    ),
    React.createElement(
      "section",
      { className: "home-treats section ruled" },
      [
        ["lazy", "home-lazy"],
        ["berry", "home-berry"],
      ].map(([id, im]) =>
        React.createElement(
          "div",
          { className: "treat", key: id },
          React.createElement(
            "button",
            {
              onClick: () => onSelect(dish(id)),
              "aria-label": "View " + dish(id).name,
            },
            React.createElement("img", {
              loading: "lazy",
              src: photo(im),
              alt: dish(id).name,
            }),
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              {
                className: "treat-title",
                onClick: () => onSelect(dish(id)),
              },
              dish(id).name,
            ),
            React.createElement(
              "div",
              { className: "product-bottom" },
              React.createElement("b", null, money(dish(id).price)),
              React.createElement(
                "button",
                {
                  className: "circle-btn",
                  "aria-label": "Customize " + dish(id).name,
                  onClick: () => onSelect(dish(id)),
                },
                React.createElement(Icon, { name: "plus", size: 18 }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
export { Home as default };
