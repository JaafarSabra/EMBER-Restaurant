import React, { useState, useEffect, useRef } from "react";
import { menu, photo, money } from "../data/menu.js";
import { Icon, Link, Brush } from "../components/UI.js";
function Tracking({ order }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(t);
  }, []);
  if (!order)
    return React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "h1",
        { className: "editorial-title" },
        "Your next good meal awaits.",
      ),
      React.createElement(Brush, null),
      React.createElement(
        "div",
        { className: "empty" },
        React.createElement("h2", null, "No order yet."),
        React.createElement(
          "p",
          null,
          "Place a demo order to follow its journey here.",
        ),
        React.createElement(
          "a",
          { href: "#menu", className: "outline-btn" },
          "Explore the menu ",
          React.createElement(Icon, null),
        ),
      ),
    );
  const stage = Math.min(3, Math.floor(Math.max(0, now - order.time) / 2e4)),
    labels = [
      "Confirmed",
      "Preparing",
      order.mode === "Pickup" ? "Ready to collect" : "On the way",
      order.mode === "Pickup" ? "Collected" : "Delivered",
    ],
    messages = [
      "Your order is confirmed. The kitchen will get started shortly.",
      "The kitchen is preparing your order.",
      order.mode === "Pickup"
        ? "Your order is ready to collect."
        : "Your order is on its way through our demo delivery flow.",
      order.mode === "Pickup"
        ? "Enjoy your meal. Thanks for choosing Ember."
        : "Your demo order has arrived. Enjoy your meal.",
    ];
  return React.createElement(
    "section",
    { className: "section tracking-page" },
    React.createElement(
      "h1",
      { className: "editorial-title" },
      "Good things are on the way.",
    ),
    React.createElement(Brush, null),
    React.createElement(
      "div",
      { className: "tracking-intro" },
      React.createElement("span", { className: "eyebrow" }, "Your order"),
      React.createElement("h2", null, "#", order.id),
      React.createElement(
        "p",
        null,
        "Thanks, ",
        order.name,
        ". Your dinner is in good hands.",
      ),
      React.createElement(
        "p",
        { className: "fine" },
        "Demo order \xB7 tracking is simulated. Stages advance every 20 seconds.",
      ),
    ),
    React.createElement(
      "div",
      { className: "tracking-grid" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "span",
          { className: "eyebrow" },
          stage === 3
            ? "All done"
            : order.mode === "Pickup"
              ? "Estimated collection"
              : "Estimated arrival",
        ),
        React.createElement(
          "h2",
          { className: "eta" },
          stage === 3
            ? "Enjoy!"
            : stage === 2 && order.mode === "Pickup"
              ? "Ready now"
              : "20\u201330 min",
        ),
        React.createElement(
          "h3",
          { className: "current-status" },
          ["Order confirmed", "In the kitchen", labels[2], labels[3]][stage],
        ),
        React.createElement(
          "ol",
          { className: "timeline" },
          labels.map((l, i) =>
            React.createElement(
              "li",
              {
                className: i <= stage ? "complete" : "",
                "aria-current": i === stage ? "step" : void 0,
                key: l,
              },
              React.createElement(
                "span",
                null,
                React.createElement(Icon, {
                  name:
                    i < stage
                      ? "check"
                      : [
                          "check",
                          "chef",
                          order.mode === "Pickup" ? "bag" : "truck",
                          "box",
                        ][i],
                  size: 25,
                }),
              ),
              React.createElement("b", null, l),
            ),
          ),
        ),
        React.createElement(
          "div",
          { className: "tracking-message", "aria-live": "polite" },
          messages[stage],
        ),
        React.createElement(
          "div",
          { className: "delivery-details" },
          React.createElement(
            "span",
            { className: "eyebrow" },
            order.mode,
            " details",
          ),
          React.createElement(
            "div",
            null,
            React.createElement(Icon, { name: "person", size: 35 }),
            React.createElement(
              "p",
              null,
              React.createElement(
                "strong",
                null,
                order.mode === "Pickup" ? "Pickup for" : "Delivery to",
                " ",
                order.name,
              ),
              React.createElement("br", null),
              order.mode === "Delivery"
                ? order.address
                : "Ember \xB7 concept kitchen",
              order.apartment &&
                React.createElement(
                  React.Fragment,
                  null,
                  React.createElement("br", null),
                  order.apartment,
                ),
              order.notes &&
                React.createElement(
                  React.Fragment,
                  null,
                  React.createElement("br", null),
                  order.notes,
                ),
            ),
          ),
          React.createElement(Link, { to: "contact" }, "Contact us"),
        ),
      ),
      React.createElement(
        "aside",
        { className: "tracking-summary" },
        React.createElement("span", { className: "eyebrow" }, "Order summary"),
        order.items.map((p) =>
          React.createElement(
            "div",
            { className: "summary-item", key: p.key },
            React.createElement("img", { src: photo(p.image), alt: p.name }),
            React.createElement(
              "div",
              null,
              p.qty,
              " \xD7 ",
              p.name,
              React.createElement("small", null, p.option),
            ),
            React.createElement("b", null, money(p.unitPrice * p.qty)),
          ),
        ),
        React.createElement(
          "div",
          { className: "total-row" },
          React.createElement("span", null, "Subtotal"),
          React.createElement("span", null, money(order.subtotal)),
        ),
        React.createElement(
          "div",
          { className: "total-row" },
          React.createElement("span", null, order.mode),
          React.createElement(
            "span",
            null,
            order.fee ? money(order.fee) : "Free",
          ),
        ),
        React.createElement(
          "div",
          { className: "total-row total" },
          React.createElement("span", null, "Total"),
          React.createElement("span", null, money(order.total)),
        ),
      ),
    ),
    React.createElement(
      "div",
      { className: "tracking-end" },
      React.createElement(
        "a",
        { href: "#menu", className: "outline-btn" },
        "Back to menu ",
        React.createElement(Icon, null),
      ),
      React.createElement(
        "div",
        null,
        React.createElement("h2", null, "A question about your order?"),
        React.createElement(
          "p",
          null,
          "We're here to help.",
          " ",
          React.createElement(
            "a",
            { className: "inline-link", href: "#contact" },
            "Contact us.",
          ),
        ),
      ),
    ),
  );
}
export { Tracking as default };
