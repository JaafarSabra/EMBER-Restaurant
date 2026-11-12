import React, { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { menu, photo, money, dish, read } from "./data/menu.js";
import { customization } from "./data/customization.js";
import {
  ScrollTop,
  Icon,
  Logo,
  Modal,
  ProductViewer,
  FlyingProduct,
  Quantity,
} from "./components/UI.js";
import Home from "./pages/Home.js";
import Story from "./pages/Story.js";
import Experience from "./pages/Experience.js";
import Menu from "./pages/Menu.js";
import Contact from "./pages/Contact.js";
import Checkout from "./pages/Checkout.js";
import Tracking from "./pages/Tracking.js";
function App() {
  const [page, setPage] = useState(location.hash.slice(1) || "home"),
    [navOpen, setNavOpen] = useState(false),
    [cart, setCart] = useState(() => read("ember-cart", [])),
    [order, setOrder] = useState(() => read("ember-order", null)),
    [mode, setMode] = useState("Delivery"),
    [selected, setSelected] = useState(null),
    [choices, setChoices] = useState({}),
    [extras, setExtras] = useState([]),
    [removals, setRemovals] = useState([]),
    [customNote, setCustomNote] = useState(""),
    [qty, setQty] = useState(1),
    [lightbox, setLightbox] = useState(false),
    [toast, setToast] = useState(""),
    [flight, setFlight] = useState(null),
    [bagPulse, setBagPulse] = useState(false);
  const mainRef = useRef();
  useEffect(() => {
    const h = () => {
      const update = () => {
        setPage(location.hash.slice(1) || "home");
        setNavOpen(false);
        setSelected(null);
        setLightbox(false);
      };
      if (
        document.startViewTransition &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        document.startViewTransition(() => {
          flushSync(update);
          window.scrollTo(0, 0);
        });
      } else {
        update();
        window.scrollTo(0, 0);
      }
      mainRef.current?.focus({ preventScroll: true });
    };
    addEventListener("hashchange", h);
    return () => removeEventListener("hashchange", h);
  }, []);
  useEffect(() => {
    localStorage.setItem("ember-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    document.title =
      page === "home"
        ? "EMBER \u2014 Worth the craving."
        : ({
            menu: "Menu",
            about: "Our Story",
            services: "The Experience",
            contact: "Contact",
            checkout: "Your Bag",
            tracking: "Track Order",
          }[page] || "Page not found") + " \u2014 EMBER";
  }, [page]);
  useEffect(() => {
    if (toast) {
      let t = setTimeout(() => setToast(""), 3e3);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const select = (p) => {
      setSelected(p);
      setChoices(
        Object.fromEntries(
          customization(p).groups.map((g) => [g.name, g.options[0].label]),
        ),
      );
      setExtras([]);
      setRemovals([]);
      setCustomNote("");
      setQty(1);
    },
    add = (p, opt, n, extraPrice2 = 0, note = "", origin = null) => {
      const key = p.id + "-" + opt + "-" + note,
        unitPrice = p.price + extraPrice2;
      setCart((c) =>
        c.some((x) => x.key === key)
          ? c.map((x) =>
              x.key === key ? { ...x, qty: Math.min(99, x.qty + n) } : x,
            )
          : [
              ...c,
              {
                ...p,
                key,
                unitPrice,
                option: opt + (note ? " \xB7 Note: " + note : ""),
                qty: n,
              },
            ],
      );
      const imageRect = document
        .querySelector(".product-modal .detail-photo")
        ?.getBoundingClientRect();
      const imageVisible =
        imageRect &&
        imageRect.top >= 80 &&
        imageRect.bottom <= innerHeight - 20;
      const source = imageVisible
        ? imageRect
        : origin || {
            left: innerWidth / 2 - 45,
            top: innerHeight / 2 - 45,
            width: 90,
            height: 90,
          };
      setFlight({
        id: Date.now(),
        image: p.image,
        rect: {
          left: source.left,
          top: source.top,
          width: source.width,
          height: source.height,
        },
      });
      setToast(p.name + " added to your bag");
    },
    count = cart.reduce((a, x) => a + x.qty, 0);
  const config = selected ? customization(selected) : null;
  const extraPrice = config
    ? config.groups.reduce(
        (sum, g) =>
          sum +
          (g.options.find((o) => o.label === choices[g.name])?.price || 0),
        0,
      ) +
      config.extras
        .filter((x) => extras.includes(x.label))
        .reduce((sum, x) => sum + x.price, 0)
    : 0;
  const selectionSummary = config
    ? [...config.groups.map((g) => choices[g.name]), ...extras, ...removals]
        .filter(Boolean)
        .join(" \xB7 ")
    : "";
  const toggle = (set, value) =>
    set((current) =>
      current.includes(value)
        ? current.filter((x) => x !== value)
        : [...current, value],
    );
  const placeOrder = (data) => {
    const subtotal = cart.reduce((a, x) => a + x.qty * x.unitPrice, 0),
      fee = mode === "Delivery" ? 3 : 0,
      newOrder = {
        ...data,
        id: "EM" + String(Date.now()).slice(-6),
        time: Date.now(),
        mode,
        subtotal,
        fee,
        total: subtotal + fee,
        items: cart,
      };
    localStorage.setItem("ember-order", JSON.stringify(newOrder));
    setOrder(newOrder);
    setCart([]);
    location.hash = "tracking";
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "a",
      {
        className: "skip-link",
        href: "#main-content",
        onClick: (e) => {
          e.preventDefault();
          mainRef.current?.focus();
        },
      },
      "Skip to content",
    ),
    React.createElement(
      "header",
      null,
      React.createElement(
        "a",
        { href: "#home", className: "brand", "aria-label": "Ember home" },
        React.createElement(Logo, null),
        React.createElement("span", null, "Worth the craving."),
      ),
      React.createElement(
        "nav",
        { "aria-label": "Main navigation", className: navOpen ? "open" : "" },
        [
          ["home", "Home"],
          ["menu", "Menu"],
          ["about", "Our Story"],
          ["services", "Experience"],
          ["contact", "Contact"],
        ].map(([p, l]) =>
          React.createElement(
            "a",
            {
              href: "#" + p,
              "aria-current": page === p ? "page" : void 0,
              className: page === p ? "active" : "",
              key: p,
            },
            l,
          ),
        ),
      ),
      React.createElement(
        "div",
        { className: "header-actions" },
        React.createElement(
          "a",
          {
            className: "bag-link" + (bagPulse ? " bag-celebrate" : ""),
            href: "#checkout",
            "aria-label": "Your bag, " + count + " items",
          },
          React.createElement(Icon, { name: "bag", size: 25 }),
          count > 0 && React.createElement("span", null, count),
        ),
        React.createElement(
          "button",
          {
            className: "nav-toggle",
            "aria-label": navOpen ? "Close navigation" : "Open navigation",
            "aria-expanded": navOpen,
            onClick: () => setNavOpen(!navOpen),
          },
          React.createElement(Icon, { name: navOpen ? "close" : "menu" }),
        ),
      ),
    ),
    React.createElement(
      "main",
      { ref: mainRef, id: "main-content", tabIndex: "-1" },
      React.createElement(
        "div",
        { className: "page-transition", key: page },
        page === "home"
          ? React.createElement(Home, { onSelect: select, onAdd: add })
          : page === "about"
            ? React.createElement(Story, null)
            : page === "services"
              ? React.createElement(Experience, null)
              : page === "menu"
                ? React.createElement(Menu, { onSelect: select, onAdd: add })
                : page === "contact"
                  ? React.createElement(Contact, { notify: setToast })
                  : page === "checkout"
                    ? React.createElement(Checkout, {
                        cart,
                        setCart,
                        placeOrder,
                        mode,
                        setMode,
                      })
                    : page === "tracking"
                      ? React.createElement(Tracking, { order })
                      : React.createElement(
                          "section",
                          { className: "section empty" },
                          React.createElement(
                            "h1",
                            { className: "editorial-title" },
                            "A little off the menu.",
                          ),
                          React.createElement(
                            "a",
                            { href: "#home", className: "outline-btn" },
                            "Back home ",
                            React.createElement(Icon, null),
                          ),
                        ),
      ),
    ),
    React.createElement(
      "footer",
      null,
      React.createElement(
        "a",
        { href: "#home", className: "brand", "aria-label": "Ember home" },
        React.createElement(Logo, null),
        React.createElement("span", null, "Worth the craving."),
      ),
      React.createElement(
        "nav",
        { "aria-label": "Footer navigation" },
        [
          ["home", "Home"],
          ["menu", "Menu"],
          ["about", "Our Story"],
          ["services", "Experience"],
          ["contact", "Contact"],
          ["tracking", "Track order"],
        ].map(([p, l]) =>
          React.createElement("a", { key: p, href: "#" + p }, l),
        ),
      ),
      React.createElement("small", null, "\xA9 2026 EMBER"),
    ),
    React.createElement(ScrollTop, null),
    flight &&
      React.createElement(FlyingProduct, {
        key: flight.id,
        flight,
        onDone: () => {
          setFlight(null);
          setBagPulse(true);
          setTimeout(() => setBagPulse(false), 600);
        },
      }),
    toast &&
      React.createElement(
        "div",
        { role: "status", className: "toast" },
        React.createElement(Icon, { name: "check", size: 18 }),
        toast,
        toast.includes("added to your bag") &&
          React.createElement(
            "a",
            { href: "#checkout", onClick: () => setToast("") },
            "View bag",
          ),
      ),
    selected &&
      !lightbox &&
      React.createElement(
        Modal,
        {
          label: selected.name + " details",
          onClose: () => setSelected(null),
          className: "product-modal",
        },
        React.createElement(
          "div",
          { className: "detail-photo" },
          React.createElement("img", {
            src: photo(selected.image),
            alt: selected.name,
          }),
          React.createElement(
            "button",
            {
              className: "expand-photo",
              onClick: () => setLightbox(true),
              "aria-label": "Enlarge " + selected.name + " photo",
            },
            React.createElement(Icon, { name: "expand" }),
          ),
        ),
        React.createElement(
          "div",
          { className: "detail-content" },
          React.createElement(
            "span",
            { className: "eyebrow" },
            selected.category,
          ),
          React.createElement("h2", null, selected.name),
          React.createElement(
            "b",
            { className: "detail-price" },
            money(selected.price + extraPrice),
          ),
          React.createElement("p", null, selected.description),
          React.createElement("h3", null, "Ingredients"),
          React.createElement(
            "p",
            { className: "ingredient-copy" },
            selected.ingredients,
          ),
          React.createElement(
            "p",
            { className: "fine" },
            "Contains: ",
            selected.allergens,
            ". Ask the restaurant about cross-contact.",
          ),
          React.createElement(
            "div",
            { className: "customization" },
            React.createElement("h3", null, "Make it yours."),
            config.groups.map((g) =>
              React.createElement(
                "fieldset",
                { key: g.name },
                React.createElement(
                  "legend",
                  null,
                  g.name,
                  React.createElement("small", null, "Choose one"),
                ),
                React.createElement(
                  "div",
                  { className: "option-buttons" },
                  g.options.map((o) =>
                    React.createElement(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": choices[g.name] === o.label,
                        className: choices[g.name] === o.label ? "active" : "",
                        onClick: () =>
                          setChoices((c) => ({ ...c, [g.name]: o.label })),
                        key: o.label,
                      },
                      o.label,
                      o.price > 0 &&
                        React.createElement("span", null, " +", money(o.price)),
                    ),
                  ),
                ),
              ),
            ),
            React.createElement(
              "fieldset",
              null,
              React.createElement(
                "legend",
                null,
                "Add something extra",
                React.createElement("small", null, "Choose any"),
              ),
              React.createElement(
                "div",
                { className: "addon-list" },
                config.extras.map((o) =>
                  React.createElement(
                    "label",
                    { key: o.label },
                    React.createElement("input", {
                      type: "checkbox",
                      checked: extras.includes(o.label),
                      onChange: () => toggle(setExtras, o.label),
                    }),
                    React.createElement("span", null, o.label),
                    React.createElement("b", null, "+", money(o.price)),
                  ),
                ),
              ),
            ),
            config.removals.length > 0 &&
              React.createElement(
                "fieldset",
                null,
                React.createElement(
                  "legend",
                  null,
                  "Preferences",
                  React.createElement("small", null, "Optional"),
                ),
                React.createElement(
                  "div",
                  { className: "option-buttons" },
                  config.removals.map((o) =>
                    React.createElement(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": removals.includes(o),
                        className: removals.includes(o) ? "active" : "",
                        onClick: () => toggle(setRemovals, o),
                        key: o,
                      },
                      o,
                    ),
                  ),
                ),
              ),
            React.createElement(
              "label",
              { className: "dish-note" },
              "Special requests",
              React.createElement("textarea", {
                value: customNote,
                onChange: (e) => setCustomNote(e.target.value),
                maxLength: 250,
                rows: "2",
                placeholder: "Anything else? Tell the kitchen here.",
              }),
            ),
            React.createElement(
              "p",
              { className: "fine" },
              "Preferences do not guarantee removal of allergens or cross-contact. Confirm allergy requirements with the restaurant.",
            ),
          ),
          React.createElement(
            "div",
            { className: "detail-actions" },
            React.createElement(
              "div",
              null,
              React.createElement("label", null, "Quantity"),
              React.createElement(Quantity, {
                value: qty,
                minus: () => setQty(Math.max(1, qty - 1)),
                plus: () => setQty(Math.min(99, qty + 1)),
                label: selected.name,
              }),
            ),
            React.createElement(
              "button",
              {
                className: "primary-btn",
                onClick: (e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  add(
                    selected,
                    selectionSummary,
                    qty,
                    extraPrice,
                    customNote.trim(),
                    {
                      left: r.left,
                      top: r.top,
                      width: r.width,
                      height: r.height,
                    },
                  );
                  setSelected(null);
                },
              },
              "Add to bag \u2014 ",
              money((selected.price + extraPrice) * qty),
              React.createElement(Icon, null),
            ),
          ),
        ),
      ),
    selected &&
      lightbox &&
      React.createElement(ProductViewer, {
        key: selected.id,
        product: selected,
        onClose: () => setLightbox(false),
      }),
  );
}
export { App as default };
