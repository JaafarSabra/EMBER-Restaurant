import React, { useState, useEffect, useRef } from "react";
import { menu, photo, money } from "../data/menu.js";
import { Icon, Link, Brush } from "../components/UI.jsx";

export default function Tracking({ order }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!order)
    return (
      <section className="section">
        <h1 className="editorial-title">Your next good meal awaits.</h1>
        <Brush />
        <div className="empty">
          <h2>No order yet.</h2>
          <p>Place a demo order to follow its journey here.</p>
          <a href="#menu" className="outline-btn">
            Explore the menu <Icon />
          </a>
        </div>
      </section>
    );
  const stage = Math.min(3, Math.floor(Math.max(0, now - order.time) / 20000)),
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
  return (
    <section className="section tracking-page">
      <h1 className="editorial-title">Good things are on the way.</h1>
      <Brush />
      <div className="tracking-intro">
        <span className="eyebrow">Your order</span>
        <h2>#{order.id}</h2>
        <p>Thanks, {order.name}. Your dinner is in good hands.</p>
        <p className="fine">
          Demo order · tracking is simulated. Stages advance every 20 seconds.
        </p>
      </div>
      <div className="tracking-grid">
        <div>
          <span className="eyebrow">
            {stage === 3
              ? "All done"
              : order.mode === "Pickup"
                ? "Estimated collection"
                : "Estimated arrival"}
          </span>
          <h2 className="eta">
            {stage === 3
              ? "Enjoy!"
              : stage === 2 && order.mode === "Pickup"
                ? "Ready now"
                : "20–30 min"}
          </h2>
          <h3 className="current-status">
            {["Order confirmed", "In the kitchen", labels[2], labels[3]][stage]}
          </h3>
          <ol className="timeline">
            {labels.map((l, i) => (
              <li
                className={i <= stage ? "complete" : ""}
                aria-current={i === stage ? "step" : undefined}
                key={l}
              >
                <span>
                  <Icon
                    name={
                      i < stage
                        ? "check"
                        : [
                            "check",
                            "chef",
                            order.mode === "Pickup" ? "bag" : "truck",
                            "box",
                          ][i]
                    }
                    size={25}
                  />
                </span>
                <b>{l}</b>
              </li>
            ))}
          </ol>
          <div className="tracking-message" aria-live="polite">
            {messages[stage]}
          </div>
          <div className="delivery-details">
            <span className="eyebrow">{order.mode} details</span>
            <div>
              <Icon name="person" size={35} />
              <p>
                <strong>
                  {order.mode === "Pickup" ? "Pickup for" : "Delivery to"}{" "}
                  {order.name}
                </strong>
                <br />
                {order.mode === "Delivery"
                  ? order.address
                  : "Ember · concept kitchen"}
                {order.apartment && (
                  <>
                    <br />
                    {order.apartment}
                  </>
                )}
                {order.notes && (
                  <>
                    <br />
                    {order.notes}
                  </>
                )}
              </p>
            </div>
            <Link to="contact">Contact us</Link>
          </div>
        </div>
        <aside className="tracking-summary">
          <span className="eyebrow">Order summary</span>
          {order.items.map((p) => (
            <div className="summary-item" key={p.key}>
              <img src={photo(p.image)} alt={p.name} />
              <div>
                {p.qty} × {p.name}
                <small>{p.option}</small>
              </div>
              <b>{money(p.unitPrice * p.qty)}</b>
            </div>
          ))}
          <div className="total-row">
            <span>Subtotal</span>
            <span>{money(order.subtotal)}</span>
          </div>
          <div className="total-row">
            <span>{order.mode}</span>
            <span>{order.fee ? money(order.fee) : "Free"}</span>
          </div>
          <div className="total-row total">
            <span>Total</span>
            <span>{money(order.total)}</span>
          </div>
        </aside>
      </div>
      <div className="tracking-end">
        <a href="#menu" className="outline-btn">
          Back to menu <Icon />
        </a>
        <div>
          <h2>A question about your order?</h2>
          <p>
            We're here to help.{" "}
            <a className="inline-link" href="#contact">
              Contact us.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
