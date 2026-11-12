import React, { useState, useEffect, useRef } from "react";
import { photo, money } from "../data/menu.js";
function ScrollTop() {
  const [visible, setVisible] = useState(window.scrollY > 350);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 350);
    addEventListener("scroll", h, { passive: true });
    return () => removeEventListener("scroll", h);
  }, []);
  return (
    visible &&
    React.createElement(
      "button",
      {
        className: "scroll-top",
        "aria-label": "Scroll to top",
        title: "Back to top",
        onClick: () =>
          window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          }),
      },
      React.createElement(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.6",
          "aria-hidden": "true",
        },
        React.createElement("path", { d: "M12 20V4M5 11l7-7 7 7" }),
      ),
    )
  );
}
function Icon({ name = "arrow", size = 20, ...props }) {
  const paths = {
    arrow: React.createElement(
      React.Fragment,
      null,
      React.createElement("path", { d: "M4 12h15M13 6l6 6-6 6" }),
    ),
    bag: React.createElement(
      React.Fragment,
      null,
      React.createElement("path", { d: "M5 7h14l1 14H4L5 7Z" }),
      React.createElement("path", { d: "M8 8V6a4 4 0 0 1 8 0v2" }),
    ),
    close: React.createElement("path", { d: "m6 6 12 12M6 18 18 6" }),
    plus: React.createElement("path", { d: "M5 12h14M12 5v14" }),
    minus: React.createElement("path", { d: "M5 12h14" }),
    search: React.createElement(
      React.Fragment,
      null,
      React.createElement("circle", { cx: "10.5", cy: "10.5", r: "6.5" }),
      React.createElement("path", { d: "m16 16 5 5" }),
    ),
    expand: React.createElement("path", {
      d: "M9 3H3v6m12 12h6v-6M3 3l7 7m11 11-7-7M15 3h6v6M21 3l-7 7M3 15v6h6m-6 0 7-7",
    }),
    truck: React.createElement(
      React.Fragment,
      null,
      React.createElement("path", { d: "M2 5h12v12H2zM14 10h4l4 4v3h-8" }),
      React.createElement("circle", { cx: "6", cy: "18", r: "2" }),
      React.createElement("circle", { cx: "18", cy: "18", r: "2" }),
    ),
    check: React.createElement("path", { d: "m5 12 4 4L19 6" }),
    chef: React.createElement(
      React.Fragment,
      null,
      React.createElement("path", {
        d: "M7 17V9C1 9 3 2 8 4c2-4 6-4 8 0 5-2 7 5 1 5v8zM7 21h10M7 17h10",
      }),
    ),
    box: React.createElement(
      React.Fragment,
      null,
      React.createElement("path", {
        d: "m3 7 9-4 9 4v13l-9 3-9-3zM3 7l9 4 9-4M12 11v12M7 5l10 4",
      }),
    ),
    person: React.createElement(
      React.Fragment,
      null,
      React.createElement("circle", { cx: "12", cy: "6", r: "4" }),
      React.createElement("path", { d: "M4 22v-3a8 8 0 0 1 16 0v3" }),
    ),
    plate: React.createElement(
      React.Fragment,
      null,
      React.createElement("path", {
        d: "M3 18h18M5 18a7 7 0 0 1 14 0M12 8V6M7 5V2M12 3V1M17 5V2",
      }),
    ),
    sliders: React.createElement(
      React.Fragment,
      null,
      React.createElement("path", { d: "M2 5h20M2 12h20M2 19h20" }),
      React.createElement("circle", {
        cx: "8",
        cy: "5",
        r: "2",
        fill: "currentColor",
      }),
      React.createElement("circle", {
        cx: "16",
        cy: "12",
        r: "2",
        fill: "currentColor",
      }),
      React.createElement("circle", {
        cx: "9",
        cy: "19",
        r: "2",
        fill: "currentColor",
      }),
    ),
    cutlery: React.createElement("path", {
      d: "M6 2v6m-3-6v6a3 3 0 0 0 6 0V2M6 11v11M18 2c-4 4-4 9 0 10v10M18 2v10",
    }),
    pin: React.createElement(
      React.Fragment,
      null,
      React.createElement("path", {
        d: "M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 0 1 14 0Z",
      }),
      React.createElement("circle", { cx: "12", cy: "9", r: "2" }),
    ),
    menu: React.createElement("path", { d: "M3 6h18M3 12h18M3 18h18" }),
  };
  return React.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      ...props,
    },
    paths[name] || paths.arrow,
  );
}
function Logo() {
  return React.createElement(
    "span",
    { className: "wordmark" },
    "EM",
    React.createElement(
      "span",
      { className: "flame-letter" },
      "B",
      React.createElement(
        "svg",
        { viewBox: "0 0 18 30", "aria-hidden": "true" },
        React.createElement("path", {
          d: "M8 1c9 10 9 16 4 22-1-6-6-5-4-13-7 8-9 15-1 19C-5 25-1 15 8 1Z",
          fill: "currentColor",
        }),
      ),
    ),
    "ER",
  );
}
function Link({ to, children, className = "" }) {
  return React.createElement(
    "a",
    { className: "text-link " + className, href: "#" + to },
    children,
    React.createElement(Icon, null),
  );
}
function Brush() {
  return React.createElement("span", {
    className: "brush",
    "aria-hidden": "true",
  });
}
function Hero({ kind, title, label, link, compact = false }) {
  return React.createElement(
    "section",
    {
      className: "pagehero " + kind + (compact ? " compact" : ""),
      style: { backgroundImage: `url(${photo(kind + "-hero")})` },
    },
    React.createElement(
      "div",
      { className: "hero-inner" },
      React.createElement("span", { className: "eyebrow light" }, label),
      React.createElement("h1", null, title),
      React.createElement(Brush, null),
      link && React.createElement(Link, { to: "menu" }, link),
    ),
    kind === "home" &&
      React.createElement(
        "div",
        { className: "hero-note" },
        "Handcrafted plates",
        React.createElement("br", null),
        "with a fiery twist.",
      ),
  );
}
function Modal({ children, label, onClose, className = "" }) {
  const ref = useRef(),
    timer = useRef(),
    [closing, setClosing] = useState(false);
  const dismiss = () => {
    if (closing) return;
    setClosing(true);
    timer.current = setTimeout(
      onClose,
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180,
    );
  };
  useEffect(() => {
    const before = document.activeElement,
      old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const h = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        dismiss();
      }
      if (e.key === "Tab") {
        const items = [
          ...ref.current.querySelectorAll(
            'button,a[href],input,textarea,select,[tabindex="0"]',
          ),
        ].filter((x) => !x.disabled);
        if (!items.length) return;
        if (e.shiftKey && document.activeElement === items[0]) {
          e.preventDefault();
          items.at(-1).focus();
        } else if (!e.shiftKey && document.activeElement === items.at(-1)) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener("keydown", h);
    return () => {
      clearTimeout(timer.current);
      document.body.style.overflow = old;
      document.removeEventListener("keydown", h);
      before?.focus();
    };
  }, []);
  return React.createElement(
    "div",
    {
      className: "modal-backdrop" + (closing ? " is-closing" : ""),
      onClick: dismiss,
    },
    React.createElement(
      "section",
      {
        className: "modal " + className,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": label,
        tabIndex: "-1",
        ref,
        onClick: (e) => e.stopPropagation(),
      },
      React.createElement(
        "button",
        {
          className: "close",
          onClick: dismiss,
          "aria-label": "Close " + label,
        },
        React.createElement(Icon, { name: "close" }),
      ),
      typeof children === "function" ? children(dismiss) : children,
    ),
  );
}
function ProductViewer({ product, onClose }) {
  const [zoom, setZoom] = useState(1),
    [pan, setPan] = useState({ x: 0, y: 0 }),
    drag = useRef(null);
  const changeZoom = (z) => {
    setZoom(Math.max(1, Math.min(3, z)));
    setPan({ x: 0, y: 0 });
  };
  return React.createElement(
    Modal,
    {
      label: product.name + " full photo",
      onClose,
      className: "photo-modal modern-viewer",
    },
    (dismiss) =>
      React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { className: "viewer-bar" },
          React.createElement(
            "div",
            null,
            React.createElement("span", { className: "viewer-brand" }, "EMBER"),
            React.createElement("span", { className: "viewer-divider" }),
            React.createElement(
              "span",
              { className: "viewer-label" },
              "A CLOSER LOOK",
            ),
          ),
          React.createElement(
            "div",
            { className: "viewer-tools" },
            React.createElement(
              "button",
              {
                onClick: () => changeZoom(zoom - 0.5),
                disabled: zoom <= 1,
                "aria-label": "Zoom out",
              },
              React.createElement(Icon, { name: "minus", size: 17 }),
            ),
            React.createElement(
              "button",
              {
                className: "zoom-value",
                onClick: () => changeZoom(1),
                "aria-label": "Reset photo zoom",
              },
              Math.round(zoom * 100),
              "%",
            ),
            React.createElement(
              "button",
              {
                onClick: () => changeZoom(zoom + 0.5),
                disabled: zoom >= 3,
                "aria-label": "Zoom in",
              },
              React.createElement(Icon, { name: "plus", size: 17 }),
            ),
          ),
        ),
        React.createElement(
          "div",
          {
            className: "viewer-stage" + (zoom > 1 ? " zoomed" : ""),
            onPointerDown: (e) => {
              if (zoom <= 1) return;
              drag.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
              e.currentTarget.setPointerCapture(e.pointerId);
            },
            onPointerMove: (e) => {
              if (!drag.current) return;
              setPan({
                x: Math.max(-400, Math.min(400, e.clientX - drag.current.x)),
                y: Math.max(-350, Math.min(350, e.clientY - drag.current.y)),
              });
            },
            onPointerUp: () => (drag.current = null),
            onPointerCancel: () => (drag.current = null),
          },
          React.createElement("img", {
            src: photo(product.image),
            alt: product.name,
            draggable: "false",
            style: {
              transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
            },
          }),
        ),
        React.createElement(
          "div",
          { className: "viewer-caption" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "span",
              { className: "viewer-label" },
              product.category,
            ),
            React.createElement("h2", null, product.name),
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "span",
              { className: "viewer-price" },
              money(product.price),
            ),
            React.createElement(
              "button",
              { className: "viewer-return", onClick: dismiss },
              "Back to customize ",
              React.createElement(Icon, { size: 17 }),
            ),
          ),
        ),
        React.createElement(
          "span",
          { className: "viewer-hint" },
          zoom > 1
            ? "Drag to explore \xB7 Reset to fit"
            : "Zoom in for the details \xB7 Esc to return",
        ),
      ),
  );
}
function FlyingProduct({ flight, onDone }) {
  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const target = document.querySelector(".bag-link")?.getBoundingClientRect();
    const rect = flight.rect,
      size = 90;
    const startX = Math.max(
        55,
        Math.min(innerWidth - 55, rect.left + rect.width / 2),
      ),
      startY = Math.max(
        110,
        Math.min(innerHeight - 70, rect.top + rect.height / 2),
      ),
      endX = target ? target.left + target.width / 2 : innerWidth - 40,
      endY = target && target.bottom > 0 ? target.top + target.height / 2 : 35;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const middleX = startX + (endX - startX) * 0.52,
      middleY = Math.max(95, (startY + endY) / 2 - 65);
    const frames = reduced
      ? [
          {
            transform: `translate(${endX - size / 2}px,${endY - size / 2}px) scale(.65)`,
            opacity: 1,
          },
          {
            transform: `translate(${endX - size / 2}px,${endY - size / 2}px) scale(.35)`,
            opacity: 0,
          },
        ]
      : [
          {
            transform: `translate(${startX - size / 2}px,${startY - size / 2}px) scale(1.05) rotate(-7deg)`,
            opacity: 1,
            offset: 0,
          },
          {
            transform: `translate(${startX - size / 2}px,${startY - size / 2 - 18}px) scale(1.12) rotate(-7deg)`,
            opacity: 1,
            offset: 0.15,
          },
          {
            transform: `translate(${middleX - size / 2}px,${middleY - size / 2}px) scale(.78) rotate(5deg)`,
            opacity: 1,
            offset: 0.6,
          },
          {
            transform: `translate(${endX - size / 2}px,${endY - size / 2}px) scale(.18) rotate(0deg)`,
            opacity: 0.8,
            offset: 0.94,
          },
          {
            transform: `translate(${endX - size / 2}px,${endY - size / 2}px) scale(.05)`,
            opacity: 0,
            offset: 1,
          },
        ];
    const anim = node.animate(frames, {
      duration: reduced ? 180 : 1150,
      easing: "cubic-bezier(.24,.15,.28,1)",
      fill: "forwards",
    });
    anim.finished.then(onDone).catch(() => {});
    return () => anim.cancel();
  }, []);
  return React.createElement(
    "div",
    { ref, className: "flying-product", "aria-hidden": "true" },
    React.createElement("img", { src: photo(flight.image), alt: "" }),
    React.createElement(
      "span",
      null,
      React.createElement(Icon, { name: "check", size: 13 }),
    ),
  );
}
function Product({ product, onSelect, onAdd, imageOverride, className = "" }) {
  return React.createElement(
    "article",
    { className: "product " + className },
    React.createElement(
      "button",
      {
        className: "product-image",
        onClick: () => onSelect(product),
        "aria-label": "View " + product.name,
      },
      React.createElement("img", {
        loading: "lazy",
        src: photo(imageOverride || product.image),
        alt: product.name,
      }),
      React.createElement(
        "span",
        { className: "image-hint" },
        "View dish ",
        React.createElement(Icon, { name: "expand", size: 15 }),
      ),
    ),
    React.createElement(
      "button",
      { className: "product-title", onClick: () => onSelect(product) },
      product.name,
    ),
    React.createElement("p", null, product.description),
    React.createElement(
      "div",
      { className: "product-bottom" },
      React.createElement("b", null, money(product.price)),
      React.createElement(
        "button",
        {
          className: "circle-btn",
          "aria-label": "Customize " + product.name,
          onClick: () => onSelect(product),
        },
        React.createElement(Icon, { name: "plus", size: 18 }),
      ),
    ),
  );
}
function LocationMap() {
  return React.createElement(
    "div",
    { className: "location-map real-map" },
    React.createElement(
      "div",
      { className: "map-frame" },
      React.createElement("iframe", {
        title: "Map of Beirut, Lebanon",
        src: "https://www.google.com/maps?q=Beirut%2C%20Lebanon&z=13&output=embed",
        loading: "lazy",
        referrerPolicy: "strict-origin-when-cross-origin",
        allowFullScreen: true,
      }),
      React.createElement(
        "a",
        {
          className: "map-open",
          href: "https://www.google.com/maps/search/?api=1&query=Beirut%2C%20Lebanon",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        "Open in Google Maps ",
        React.createElement(Icon, { size: 16 }),
      ),
    ),
    React.createElement(
      "div",
      { className: "map-caption" },
      React.createElement("span", null, "Beirut, Lebanon"),
      React.createElement(
        "span",
        null,
        "City view \xB7 exact address to be confirmed",
      ),
    ),
  );
}
function Quantity({ value, minus, plus, label }) {
  return React.createElement(
    "div",
    { className: "quantity" },
    React.createElement(
      "button",
      { type: "button", onClick: minus, "aria-label": "Decrease " + label },
      React.createElement(Icon, { name: "minus", size: 15 }),
    ),
    React.createElement("span", { "aria-live": "polite" }, value),
    React.createElement(
      "button",
      { type: "button", onClick: plus, "aria-label": "Increase " + label },
      React.createElement(Icon, { name: "plus", size: 15 }),
    ),
  );
}
export {
  Brush,
  FlyingProduct,
  Hero,
  Icon,
  Link,
  LocationMap,
  Logo,
  Modal,
  Product,
  ProductViewer,
  Quantity,
  ScrollTop,
};
