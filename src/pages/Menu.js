import React, { useState, useEffect, useRef } from "react";
import { menu } from "../data/menu.js";
import { Icon, Brush, Hero, Product } from "../components/UI.js";
function Menu({ onSelect, onAdd }) {
  const [cat, setCat] = useState("All"),
    [search, setSearch] = useState("");
  const cats = ["All", ...new Set(menu.map((x) => x.category))],
    filtered = menu.filter(
      (x) =>
        (cat === "All" || x.category === cat) &&
        (x.name + " " + x.description)
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
    );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Hero, {
      kind: "menu",
      title: React.createElement(
        React.Fragment,
        null,
        "Find your",
        React.createElement("br", null),
        "flavor.",
      ),
      label: "The Ember menu",
      compact: true,
    }),
    React.createElement(
      "section",
      { className: "menu-section section" },
      React.createElement("h2", null, "Our Menu."),
      React.createElement(Brush, null),
      React.createElement(
        "div",
        { className: "menu-tools" },
        React.createElement(
          "div",
          { className: "categories", "aria-label": "Menu categories" },
          cats.map((c) =>
            React.createElement(
              "button",
              {
                "aria-pressed": cat === c,
                className: cat === c ? "active" : "",
                key: c,
                onClick: () => setCat(c),
              },
              c,
            ),
          ),
        ),
        React.createElement(
          "label",
          { className: "search" },
          React.createElement(Icon, { name: "search", size: 18 }),
          React.createElement("input", {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search the menu\u2026",
            "aria-label": "Search the menu",
          }),
        ),
      ),
      React.createElement(
        "div",
        { className: "product-grid" },
        filtered.map((p) =>
          React.createElement(Product, {
            key: p.id,
            product: p,
            onSelect,
            onAdd,
          }),
        ),
      ),
      !filtered.length &&
        React.createElement(
          "div",
          { className: "empty" },
          React.createElement("h3", null, "No dishes found."),
          React.createElement("p", null, "Try a different search or category."),
          React.createElement(
            "button",
            {
              className: "outline-btn",
              onClick: () => {
                setCat("All");
                setSearch("");
              },
            },
            "See the full menu ",
            React.createElement(Icon, null),
          ),
        ),
    ),
  );
}
export { Menu as default };
