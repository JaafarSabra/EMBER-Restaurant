import React, { useState, useEffect, useRef } from "react";
import { menu, photo } from "../data/menu.js";
import { Icon, Link, Brush, Hero } from "../components/UI.jsx";

export default function Story() {
  return (
    <>
      <Hero
        kind="story"
        title={
          <>
            Good food.
            <br />
            Real soul.
          </>
        }
        label="The story behind Ember"
      />
      <section className="story-start section">
        <div>
          <span className="eyebrow">How it started</span>
          <h2>
            A simple idea.
            <br />A lasting impression.
          </h2>
          <p>
            A neighborhood restaurant built on
            <br />
            honest ingredients and a love of great food.
          </p>
        </div>
        <img
          src={photo("story-entrance")}
          alt="Ember's warm and inviting restaurant entrance"
          loading="lazy"
        />
      </section>
      <section className="craft section">
        <h2>From the first ingredient.</h2>
        <Brush />
        <div className="craft-grid">
          {[
            ["Choose.", "story-tomatoes", "Fresh ripe tomatoes and herbs"],
            ["Craft.", "story-dough", "Hands kneading fresh dough"],
            ["Serve.", "story-plate", "A freshly plated meal"],
          ].map(([title, im, alt], i) => (
            <article key={im}>
              <img src={photo(im)} alt={alt} loading="lazy" />
              <div>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <i />
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="care">
        <img
          src={photo("story-embers")}
          alt="Glowing wood embers"
          loading="lazy"
        />
        <div>
          <h2>
            A little patience.
            <br />A lot of care.
          </h2>
          <Brush />
          <p>Great food takes time, and we think you can taste it.</p>
          <Link to="services">Explore the experience</Link>
        </div>
      </section>
      <section className="invitation">
        <h2>Come hungry. Feel at home.</h2>
        <a className="outline-btn" href="#menu">
          Explore the menu <Icon />
        </a>
      </section>
    </>
  );
}
