import React, { useState, useEffect, useRef } from "react";
import { menu } from "../data/menu.js";
import { Icon, Brush, Hero, Product } from "../components/UI.jsx";

export default function Menu({ onSelect, onAdd }) {
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
  return (
    <>
      <Hero
        kind="menu"
        title={
          <>
            Find your
            <br />
            flavor.
          </>
        }
        label="The Ember menu"
        compact
      />
      <section className="menu-section section">
        <h2>Our Menu.</h2>
        <Brush />
        <div className="menu-tools">
          <div className="categories" aria-label="Menu categories">
            {cats.map((c) => (
              <button
                aria-pressed={cat === c}
                className={cat === c ? "active" : ""}
                key={c}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="search">
            <Icon name="search" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the menu…"
              aria-label="Search the menu"
            />
          </label>
        </div>
        <div className="product-grid">
          {filtered.map((p) => (
            <Product key={p.id} product={p} onSelect={onSelect} onAdd={onAdd} />
          ))}
        </div>
        {!filtered.length && (
          <div className="empty">
            <h3>No dishes found.</h3>
            <p>Try a different search or category.</p>
            <button
              className="outline-btn"
              onClick={() => {
                setCat("All");
                setSearch("");
              }}
            >
              See the full menu <Icon />
            </button>
          </div>
        )}
      </section>
    </>
  );
}
