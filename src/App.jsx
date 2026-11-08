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
} from "./components/UI.jsx";
import Home from "./pages/Home.jsx";
import Story from "./pages/Story.jsx";
import Experience from "./pages/Experience.jsx";
import Menu from "./pages/Menu.jsx";
import Contact from "./pages/Contact.jsx";
import Checkout from "./pages/Checkout.jsx";
import Tracking from "./pages/Tracking.jsx";

export default function App() {
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
        ? "EMBER — Worth the craving."
        : ({
            menu: "Menu",
            about: "Our Story",
            services: "The Experience",
            contact: "Contact",
            checkout: "Your Bag",
            tracking: "Track Order",
          }[page] || "Page not found") + " — EMBER";
  }, [page]);
  useEffect(() => {
    if (toast) {
      let t = setTimeout(() => setToast(""), 3000);
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
    add = (p, opt, n, extraPrice = 0, note = "", origin = null) => {
      const key = p.id + "-" + opt + "-" + note,
        unitPrice = p.price + extraPrice;
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
                option: opt + (note ? " · Note: " + note : ""),
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
        .join(" · ")
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
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <header>
        <a href="#home" className="brand" aria-label="Ember home">
          <Logo />
          <span>Worth the craving.</span>
        </a>
        <nav aria-label="Main navigation" className={navOpen ? "open" : ""}>
          {[
            ["home", "Home"],
            ["menu", "Menu"],
            ["about", "Our Story"],
            ["services", "Experience"],
            ["contact", "Contact"],
          ].map(([p, l]) => (
            <a
              href={"#" + p}
              aria-current={page === p ? "page" : undefined}
              className={page === p ? "active" : ""}
              key={p}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className={"bag-link" + (bagPulse ? " bag-celebrate" : "")}
            href="#checkout"
            aria-label={"Your bag, " + count + " items"}
          >
            <Icon name="bag" size={25} />
            {count > 0 && <span>{count}</span>}
          </a>
          <button
            className="nav-toggle"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen(!navOpen)}
          >
            <Icon name={navOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <main ref={mainRef} id="main-content" tabIndex="-1">
        <div className="page-transition" key={page}>
          {page === "home" ? (
            <Home onSelect={select} onAdd={add} />
          ) : page === "about" ? (
            <Story />
          ) : page === "services" ? (
            <Experience />
          ) : page === "menu" ? (
            <Menu onSelect={select} onAdd={add} />
          ) : page === "contact" ? (
            <Contact notify={setToast} />
          ) : page === "checkout" ? (
            <Checkout
              cart={cart}
              setCart={setCart}
              placeOrder={placeOrder}
              mode={mode}
              setMode={setMode}
            />
          ) : page === "tracking" ? (
            <Tracking order={order} />
          ) : (
            <section className="section empty">
              <h1 className="editorial-title">A little off the menu.</h1>
              <a href="#home" className="outline-btn">
                Back home <Icon />
              </a>
            </section>
          )}
        </div>
      </main>
      <footer>
        <a href="#home" className="brand" aria-label="Ember home">
          <Logo />
          <span>Worth the craving.</span>
        </a>
        <nav aria-label="Footer navigation">
          {[
            ["home", "Home"],
            ["menu", "Menu"],
            ["about", "Our Story"],
            ["services", "Experience"],
            ["contact", "Contact"],
            ["tracking", "Track order"],
          ].map(([p, l]) => (
            <a key={p} href={"#" + p}>
              {l}
            </a>
          ))}
        </nav>
        <small>© 2026 EMBER</small>
      </footer>
      <ScrollTop />
      {flight && (
        <FlyingProduct
          key={flight.id}
          flight={flight}
          onDone={() => {
            setFlight(null);
            setBagPulse(true);
            setTimeout(() => setBagPulse(false), 600);
          }}
        />
      )}
      {toast && (
        <div role="status" className="toast">
          <Icon name="check" size={18} />
          {toast}
          {toast.includes("added to your bag") && (
            <a href="#checkout" onClick={() => setToast("")}>
              View bag
            </a>
          )}
        </div>
      )}
      {selected && !lightbox && (
        <Modal
          label={selected.name + " details"}
          onClose={() => setSelected(null)}
          className="product-modal"
        >
          <div className="detail-photo">
            <img src={photo(selected.image)} alt={selected.name} />
            <button
              className="expand-photo"
              onClick={() => setLightbox(true)}
              aria-label={"Enlarge " + selected.name + " photo"}
            >
              <Icon name="expand" />
            </button>
          </div>
          <div className="detail-content">
            <span className="eyebrow">{selected.category}</span>
            <h2>{selected.name}</h2>
            <b className="detail-price">{money(selected.price + extraPrice)}</b>
            <p>{selected.description}</p>
            <h3>Ingredients</h3>
            <p className="ingredient-copy">{selected.ingredients}</p>
            <p className="fine">
              Contains: {selected.allergens}. Ask the restaurant about
              cross-contact.
            </p>
            <div className="customization">
              <h3>Make it yours.</h3>
              {config.groups.map((g) => (
                <fieldset key={g.name}>
                  <legend>
                    {g.name}
                    <small>Choose one</small>
                  </legend>
                  <div className="option-buttons">
                    {g.options.map((o) => (
                      <button
                        type="button"
                        aria-pressed={choices[g.name] === o.label}
                        className={choices[g.name] === o.label ? "active" : ""}
                        onClick={() =>
                          setChoices((c) => ({ ...c, [g.name]: o.label }))
                        }
                        key={o.label}
                      >
                        {o.label}
                        {o.price > 0 && <span> +{money(o.price)}</span>}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}
              <fieldset>
                <legend>
                  Add something extra<small>Choose any</small>
                </legend>
                <div className="addon-list">
                  {config.extras.map((o) => (
                    <label key={o.label}>
                      <input
                        type="checkbox"
                        checked={extras.includes(o.label)}
                        onChange={() => toggle(setExtras, o.label)}
                      />
                      <span>{o.label}</span>
                      <b>+{money(o.price)}</b>
                    </label>
                  ))}
                </div>
              </fieldset>
              {config.removals.length > 0 && (
                <fieldset>
                  <legend>
                    Preferences<small>Optional</small>
                  </legend>
                  <div className="option-buttons">
                    {config.removals.map((o) => (
                      <button
                        type="button"
                        aria-pressed={removals.includes(o)}
                        className={removals.includes(o) ? "active" : ""}
                        onClick={() => toggle(setRemovals, o)}
                        key={o}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
              <label className="dish-note">
                Special requests
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  maxLength={250}
                  rows="2"
                  placeholder="Anything else? Tell the kitchen here."
                />
              </label>
              <p className="fine">
                Preferences do not guarantee removal of allergens or
                cross-contact. Confirm allergy requirements with the restaurant.
              </p>
            </div>
            <div className="detail-actions">
              <div>
                <label>Quantity</label>
                <Quantity
                  value={qty}
                  minus={() => setQty(Math.max(1, qty - 1))}
                  plus={() => setQty(Math.min(99, qty + 1))}
                  label={selected.name}
                />
              </div>
              <button
                className="primary-btn"
                onClick={(e) => {
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
                }}
              >
                Add to bag — {money((selected.price + extraPrice) * qty)}
                <Icon />
              </button>
            </div>
          </div>
        </Modal>
      )}
      {selected && lightbox && (
        <ProductViewer
          key={selected.id}
          product={selected}
          onClose={() => setLightbox(false)}
        />
      )}
    </>
  );
}
