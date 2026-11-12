import React, { useState, useEffect, useRef } from "react";
import { photo } from "../data/menu.js";
import { Icon, Brush, Hero, LocationMap } from "../components/UI.js";
function Contact({ notify }) {
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
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Hero, {
      kind: "contact",
      title: React.createElement(
        React.Fragment,
        null,
        "Come say",
        React.createElement("br", null),
        "hello.",
      ),
      compact: true,
    }),
    React.createElement(
      "section",
      { className: "section contact-section" },
      React.createElement("h2", null, "Good conversations start here."),
      React.createElement(Brush, null),
      React.createElement(
        "div",
        { className: "contact-columns" },
        React.createElement(
          "div",
          { className: "contact-info" },
          React.createElement("span", { className: "eyebrow" }, "Visit us"),
          React.createElement("h3", null, "Beirut, Lebanon"),
          React.createElement("span", { className: "eyebrow" }, "Hours"),
          React.createElement("h3", null, "Daily \xB7 12 PM \u2013 2 AM"),
          React.createElement("span", { className: "eyebrow" }, "Get in touch"),
          React.createElement("h3", null, "hello@ember.example"),
          React.createElement(
            "p",
            { className: "fine" },
            "Concept restaurant \xB7 details shown for demonstration.",
            React.createElement("br", null),
            "Messages stay in your browser; no email is sent.",
          ),
        ),
        React.createElement(
          "form",
          { onSubmit: submit },
          sent
            ? React.createElement(
                "div",
                { className: "form-success", role: "status" },
                React.createElement(Icon, { name: "check", size: 36 }),
                React.createElement("h3", null, "Message saved."),
                React.createElement(
                  "p",
                  null,
                  "Thanks for trying our contact form. This demonstration stores your message in this browser.",
                ),
                React.createElement(
                  "button",
                  {
                    type: "button",
                    className: "outline-btn",
                    onClick: () => setSent(false),
                  },
                  "Write another message ",
                  React.createElement(Icon, null),
                ),
              )
            : React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "label",
                  null,
                  "Your name",
                  React.createElement("input", {
                    name: "name",
                    required: true,
                    autoComplete: "name",
                    placeholder: "Your name",
                  }),
                ),
                React.createElement(
                  "label",
                  null,
                  "Email address",
                  React.createElement("input", {
                    name: "email",
                    type: "email",
                    required: true,
                    autoComplete: "email",
                    placeholder: "Email address",
                  }),
                ),
                React.createElement(
                  "label",
                  null,
                  "Subject",
                  React.createElement(
                    "select",
                    { name: "subject", defaultValue: "", required: true },
                    React.createElement(
                      "option",
                      { value: "", disabled: true },
                      "Select a subject",
                    ),
                    React.createElement("option", null, "General question"),
                    React.createElement("option", null, "Order question"),
                    React.createElement("option", null, "Group visit"),
                    React.createElement("option", null, "Feedback"),
                  ),
                ),
                React.createElement(
                  "label",
                  null,
                  "Your message",
                  React.createElement("textarea", {
                    name: "message",
                    required: true,
                    rows: "4",
                    placeholder: "Your message",
                  }),
                ),
                React.createElement(
                  "button",
                  { className: "primary-btn" },
                  "Save demo message ",
                  React.createElement(Icon, null),
                ),
              ),
        ),
      ),
    ),
    React.createElement(
      "section",
      { className: "section find-us ruled" },
      React.createElement("h2", null, "Find your way."),
      React.createElement(Brush, null),
      React.createElement(
        "div",
        null,
        React.createElement(LocationMap, null),
        React.createElement("img", {
          src: photo("contact-detail"),
          alt: "A warm light beside the restaurant doorway",
          loading: "lazy",
        }),
      ),
    ),
    React.createElement(
      "section",
      { className: "section contact-faq ruled" },
      [
        [
          "Questions about an order?",
          "Visit Track order in the footer to see your latest demo order. You can also choose Order question in the form above.",
        ],
        [
          "Planning a group visit?",
          "Choose Group visit in the form above and tell us your plans. This is a concept restaurant; submissions are saved locally only.",
        ],
      ].map(([q, a]) =>
        React.createElement(
          "details",
          { key: q },
          React.createElement(
            "summary",
            null,
            q,
            React.createElement(Icon, { name: "plus" }),
          ),
          React.createElement("p", null, a),
        ),
      ),
    ),
  );
}
export { Contact as default };
