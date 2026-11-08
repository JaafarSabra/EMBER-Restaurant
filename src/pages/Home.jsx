import React, { useState, useEffect, useRef } from "react";
import { photo, money, dish } from "../data/menu.js";
import { Icon, Link, Brush, Hero, Product } from "../components/UI.jsx";

export default function Home({ onSelect, onAdd }) {
  return (
    <>
      <Hero
        kind="home"
        title={
          <>
            Not your
            <br />
            usual.
          </>
        }
        label=""
        link="Find your flavor"
      />
      <section className="favorites section">
        <div className="favorites-intro">
          <span className="eyebrow">Today's selections</span>
          <h2>
            Fresh
            <br />
            favorites.
          </h2>
          <p>
            Bold plates, seasonal ingredients,
            <br />
            all made to order.
          </p>
          <Brush />
        </div>
        {[
          ["tacos", "home-tacos"],
          ["pizza", "home-pizza"],
          ["bowl", "home-bowl"],
        ].map(([id, im]) => (
          <Product
            key={id}
            product={dish(id)}
            imageOverride={im}
            onSelect={onSelect}
            onAdd={onAdd}
            className="tilted"
          />
        ))}
      </section>
      <section className="kitchen section ruled">
        <img
          loading="lazy"
          src={photo("home-chef")}
          alt="Chef carefully finishing a freshly prepared dish"
        />
        <div>
          <span className="eyebrow">Our kitchen</span>
          <h2>Made with soul.</h2>
          <Link to="about">Our story</Link>
        </div>
      </section>
      <section className="home-treats section ruled">
        {[
          ["lazy", "home-lazy"],
          ["berry", "home-berry"],
        ].map(([id, im]) => (
          <div className="treat" key={id}>
            <button
              onClick={() => onSelect(dish(id))}
              aria-label={"View " + dish(id).name}
            >
              <img loading="lazy" src={photo(im)} alt={dish(id).name} />
            </button>
            <div>
              <button
                className="treat-title"
                onClick={() => onSelect(dish(id))}
              >
                {dish(id).name}
              </button>
              <div className="product-bottom">
                <b>{money(dish(id).price)}</b>
                <button
                  className="circle-btn"
                  aria-label={"Customize " + dish(id).name}
                  onClick={() => onSelect(dish(id))}
                >
                  <Icon name="plus" size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
