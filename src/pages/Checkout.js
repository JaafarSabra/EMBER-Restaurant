import React, { useState, useEffect, useRef } from "react";
import { menu, photo, money } from "../data/menu.js";
import { Icon, Link, Brush, Quantity } from "../components/UI.js";
function Checkout({ cart, setCart, placeOrder, mode, setMode }) {
  const subtotal = cart.reduce((a, p) => a + p.unitPrice * p.qty, 0),
    fee = mode === "Delivery" ? 3 : 0;
  const change = (key, n) =>
    setCart((c) =>
      c
        .map((x) =>
          x.key === key ? { ...x, qty: Math.min(99, x.qty + n) } : x,
        )
        .filter((x) => x.qty > 0),
    );
  return React.createElement(
    "section",
    { className: "section checkout-page" },
    React.createElement(
      "h1",
      { className: "editorial-title" },
      "Your next good meal.",
    ),
    React.createElement(Brush, null),
    !cart.length
      ? React.createElement(
          "div",
          { className: "empty" },
          React.createElement(Icon, { name: "bag", size: 45 }),
          React.createElement("h2", null, "Your bag is waiting."),
          React.createElement("p", null, "Find something worth the craving."),
          React.createElement(
            "a",
            { className: "outline-btn", href: "#menu" },
            "Explore the menu ",
            React.createElement(Icon, null),
          ),
        )
      : React.createElement(
          "form",
          {
            id: "checkout-form",
            onSubmit: (e) => {
              e.preventDefault();
              placeOrder(Object.fromEntries(new FormData(e.target)));
            },
          },
          React.createElement(
            "div",
            { className: "checkout-grid" },
            React.createElement(
              "div",
              null,
              React.createElement("h2", { className: "eyebrow" }, "Your bag"),
              React.createElement(
                "div",
                { className: "cart-list" },
                cart.map((p) =>
                  React.createElement(
                    "article",
                    { className: "cart-item", key: p.key },
                    React.createElement("img", {
                      src: photo(p.image),
                      alt: p.name,
                    }),
                    React.createElement(
                      "div",
                      { className: "cart-item-name" },
                      React.createElement("h3", null, p.name),
                      React.createElement("p", null, p.option),
                    ),
                    React.createElement(
                      "div",
                      { className: "cart-controls" },
                      React.createElement(Quantity, {
                        value: p.qty,
                        minus: () => change(p.key, -1),
                        plus: () => change(p.key, 1),
                        label: p.name,
                      }),
                      React.createElement(
                        "button",
                        {
                          type: "button",
                          className: "remove",
                          onClick: () =>
                            setCart((c) => c.filter((x) => x.key !== p.key)),
                        },
                        "Remove",
                      ),
                    ),
                    React.createElement("b", null, money(p.unitPrice * p.qty)),
                  ),
                ),
              ),
              React.createElement(
                Link,
                { to: "menu" },
                "Continue exploring menu",
              ),
              React.createElement(
                "div",
                { className: "delivery-form" },
                React.createElement("h2", null, "How would you like it?"),
                React.createElement(Brush, null),
                React.createElement(
                  "div",
                  { className: "fulfillment" },
                  ["Delivery", "Pickup"].map((m) =>
                    React.createElement(
                      "button",
                      {
                        type: "button",
                        key: m,
                        "aria-pressed": mode === m,
                        className: mode === m ? "active" : "",
                        onClick: () => setMode(m),
                      },
                      React.createElement(Icon, {
                        name: m === "Delivery" ? "truck" : "box",
                      }),
                      m,
                    ),
                  ),
                ),
                React.createElement(
                  "p",
                  { className: "fine" },
                  mode === "Delivery"
                    ? "Choose Pickup to collect your order and remove the delivery fee."
                    : "Collect your meal from our concept kitchen. No delivery fee.",
                ),
                React.createElement(
                  "div",
                  { className: "field-grid" },
                  React.createElement(
                    "label",
                    null,
                    "Full name",
                    React.createElement("input", {
                      name: "name",
                      required: true,
                      autoComplete: "name",
                      placeholder: "Enter your full name",
                    }),
                  ),
                  React.createElement(
                    "label",
                    null,
                    "Phone number",
                    React.createElement("input", {
                      name: "phone",
                      required: true,
                      type: "tel",
                      autoComplete: "tel",
                      placeholder: "Enter your phone number",
                      pattern: "[+0-9() .-]{7,20}",
                      title: "Enter a phone number with at least 7 digits",
                    }),
                  ),
                ),
                mode === "Delivery" &&
                  React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                      "label",
                      null,
                      "Delivery address",
                      React.createElement("input", {
                        required: true,
                        name: "address",
                        autoComplete: "street-address",
                        placeholder: "Enter your delivery address",
                      }),
                    ),
                    React.createElement(
                      "label",
                      null,
                      "Apartment / floor (optional)",
                      React.createElement("input", {
                        name: "apartment",
                        placeholder: "E.g., Apt 4B, 3rd floor",
                      }),
                    ),
                  ),
                React.createElement(
                  "label",
                  null,
                  "Order notes (optional)",
                  React.createElement("textarea", {
                    name: "notes",
                    rows: "3",
                    placeholder: "Special requests or allergies",
                  }),
                ),
              ),
            ),
            React.createElement(
              "aside",
              { className: "order-total" },
              React.createElement("h2", null, "The good part."),
              React.createElement(Brush, null),
              React.createElement(
                "div",
                { className: "total-row" },
                React.createElement("span", null, "Subtotal"),
                React.createElement("span", null, money(subtotal)),
              ),
              React.createElement(
                "div",
                { className: "total-row" },
                React.createElement(
                  "span",
                  null,
                  mode === "Delivery" ? "Delivery" : "Pickup",
                ),
                React.createElement("span", null, fee ? money(fee) : "Free"),
              ),
              React.createElement(
                "div",
                { className: "total-row total" },
                React.createElement("span", null, "Total"),
                React.createElement("span", null, money(subtotal + fee)),
              ),
              React.createElement(
                "p",
                null,
                "Demo checkout \xB7 no payment required",
              ),
              React.createElement(
                "button",
                { className: "primary-btn checkout-submit", type: "submit" },
                "Place demo order \u2014 ",
                money(subtotal + fee),
                " ",
                React.createElement(Icon, null),
              ),
              React.createElement(
                "a",
                { href: "#contact", className: "inline-link" },
                "Questions? Contact us",
              ),
            ),
          ),
        ),
  );
}
export { Checkout as default };
