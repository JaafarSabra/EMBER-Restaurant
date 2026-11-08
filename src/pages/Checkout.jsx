import React, { useState, useEffect, useRef } from "react";
import { menu, photo, money } from "../data/menu.js";
import { Icon, Link, Brush, Quantity } from "../components/UI.jsx";

export default function Checkout({ cart, setCart, placeOrder, mode, setMode }) {
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
  return (
    <section className="section checkout-page">
      <h1 className="editorial-title">Your next good meal.</h1>
      <Brush />
      {!cart.length ? (
        <div className="empty">
          <Icon name="bag" size={45} />
          <h2>Your bag is waiting.</h2>
          <p>Find something worth the craving.</p>
          <a className="outline-btn" href="#menu">
            Explore the menu <Icon />
          </a>
        </div>
      ) : (
        <form
          id="checkout-form"
          onSubmit={(e) => {
            e.preventDefault();
            placeOrder(Object.fromEntries(new FormData(e.target)));
          }}
        >
          <div className="checkout-grid">
            <div>
              <h2 className="eyebrow">Your bag</h2>
              <div className="cart-list">
                {cart.map((p) => (
                  <article className="cart-item" key={p.key}>
                    <img src={photo(p.image)} alt={p.name} />
                    <div className="cart-item-name">
                      <h3>{p.name}</h3>
                      <p>{p.option}</p>
                    </div>
                    <div className="cart-controls">
                      <Quantity
                        value={p.qty}
                        minus={() => change(p.key, -1)}
                        plus={() => change(p.key, 1)}
                        label={p.name}
                      />
                      <button
                        type="button"
                        className="remove"
                        onClick={() =>
                          setCart((c) => c.filter((x) => x.key !== p.key))
                        }
                      >
                        Remove
                      </button>
                    </div>
                    <b>{money(p.unitPrice * p.qty)}</b>
                  </article>
                ))}
              </div>
              <Link to="menu">Continue exploring menu</Link>
              <div className="delivery-form">
                <h2>How would you like it?</h2>
                <Brush />
                <div className="fulfillment">
                  {["Delivery", "Pickup"].map((m) => (
                    <button
                      type="button"
                      key={m}
                      aria-pressed={mode === m}
                      className={mode === m ? "active" : ""}
                      onClick={() => setMode(m)}
                    >
                      <Icon name={m === "Delivery" ? "truck" : "box"} />
                      {m}
                    </button>
                  ))}
                </div>
                <p className="fine">
                  {mode === "Delivery"
                    ? "Choose Pickup to collect your order and remove the delivery fee."
                    : "Collect your meal from our concept kitchen. No delivery fee."}
                </p>
                <div className="field-grid">
                  <label>
                    Full name
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Enter your full name"
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      name="phone"
                      required
                      type="tel"
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      pattern="[+0-9() .-]{7,20}"
                      title="Enter a phone number with at least 7 digits"
                    />
                  </label>
                </div>
                {mode === "Delivery" && (
                  <>
                    <label>
                      Delivery address
                      <input
                        required
                        name="address"
                        autoComplete="street-address"
                        placeholder="Enter your delivery address"
                      />
                    </label>
                    <label>
                      Apartment / floor (optional)
                      <input
                        name="apartment"
                        placeholder="E.g., Apt 4B, 3rd floor"
                      />
                    </label>
                  </>
                )}
                <label>
                  Order notes (optional)
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="Special requests or allergies"
                  />
                </label>
              </div>
            </div>
            <aside className="order-total">
              <h2>The good part.</h2>
              <Brush />
              <div className="total-row">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="total-row">
                <span>{mode === "Delivery" ? "Delivery" : "Pickup"}</span>
                <span>{fee ? money(fee) : "Free"}</span>
              </div>
              <div className="total-row total">
                <span>Total</span>
                <span>{money(subtotal + fee)}</span>
              </div>
              <p>Demo checkout · no payment required</p>
              <button className="primary-btn checkout-submit" type="submit">
                Place demo order — {money(subtotal + fee)} <Icon />
              </button>
              <a href="#contact" className="inline-link">
                Questions? Contact us
              </a>
            </aside>
          </div>
        </form>
      )}
    </section>
  );
}
