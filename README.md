# EMBER — Worth the craving.

An original responsive restaurant frontend for CSCI426 Advanced Web Programming, Phase 1.

**Student:** Jaafar Sabra  
**ID:** 72230515  
**Instructor:** Ghadir Khalil  
**University:** Lebanese International University (LIU)  
**Mode:** Individual project

## Run locally

Requires Node.js 20+.

```
npm install
npm run dev
npm run build
```

`npm run build` produces `dist/`. Deploy this directory to Vercel. The Vite source uses hash navigation, so individual pages do not require server rewrites.

## Pages

- Home: cinematic pasta hero, curated dishes, kitchen introduction, individual dessert and drink.
- Our Story: chef hero, restaurant introduction, ingredient/craft/serve sequence.
- Experience: interactive dine-in, pickup and delivery tabs, ordering steps, pairings and FAQs.
- Menu: 12 dishes across 9 categories, combined search and category filtering.
- Contact: validated form and locally saved confirmation, concept hours and an interactive Beirut city map.
- Bag & Checkout: item quantities, removal, delivery/pickup pricing, validated contact fields and order notes.
- Tracking: saved order summary and four simulated stages that advance every 20 seconds.

## Interactions and data

Tap a dish or its + control to open the centered customization panel. Choose dish-specific options, multiple extras, preferences and special requests, adjust quantity, enlarge its photograph and add to the bag. All option and add-on fees are included in line totals and retained in checkout and tracking. A centered scroll-to-top control appears after scrolling. Cart, latest demo order and latest demo contact message persist in browser localStorage. Delivery adds $3; pickup is free. React state renders totals from item quantity and unit price; checkout saves an immutable order snapshot before clearing the cart.

This is a frontend demonstration. No order, email, reservation or payment is transmitted. Contact details are placeholders. The Contact page embeds a real Beirut city map; an exact restaurant address has not been provided. Ingredient/allergen descriptions are sample content, not verified food-safety advice.

## Technology and structure

React 19, Vite 6, CSS. `src/` separates the catalog, customization data, reusable UI, application state and seven page components. `style.css` defines shared design tokens, desktop/tablet/mobile layouts and reduced-motion styles. `public/assets` holds locally served images; no external image URL is required at runtime. Google Fonts supplies Barlow Condensed, DM Sans and Libre Caslon Display, with system fallbacks.

Accessibility includes keyboard-operable controls, modal focus management and Escape dismissal, labeled forms, visible focus styles, skip navigation, status feedback and mobile navigation.

## Design and asset attribution

The EMBER visual direction was approved page by page before implementation. Original flame wordmark and vector icons are authored in source. Hero and selected editorial/product images were generated with OpenAI image generation; other food/editorial photographs are sourced from Unsplash and served locally. No third-party website template was used. The project was created with AI assistance; understand and disclose assistance according to course policy.

## Assignment handoff

Student details, six UI screenshots and the PDF report are included. Complete an individual statement only if required by the instructor; describe actual work honestly. Push to your own GitHub repository with real commit history and deploy to an instructor-approved host. The private ChatGPT Site is a review preview, not the required GitHub submission.

## Motion and gallery

Page transitions use progressive View Transitions support with a CSS entrance fallback. Dialogs animate on open/close, products fly to the sticky header bag, and the bag responds on arrival. The fullscreen gallery supports zoom, reset, drag-to-pan and keyboard Escape to return. All motion respects prefers-reduced-motion.

## External map

The Contact page embeds Google Maps centered on Beirut and includes an external Open in Google Maps link. It does not claim an exact restaurant location. The embedded map requires internet access and Google Maps availability.

## Interface screenshots

Screenshots below were supplied by Jaafar Sabra on 8 November 2026 from the working application. They show actual usage, not design mockups.

| Home                                       | Menu                                       |
| ------------------------------------------ | ------------------------------------------ |
| ![Home](docs/screenshots/home-desktop.png) | ![Menu](docs/screenshots/menu-desktop.png) |

| Customize a dish                                             | Bag and checkout                                   |
| ------------------------------------------------------------ | -------------------------------------------------- |
| ![Customization](docs/screenshots/customization-desktop.png) | ![Checkout](docs/screenshots/checkout-desktop.jpg) |

| Contact                                          | Order tracking                                     |
| ------------------------------------------------ | -------------------------------------------------- |
| ![Contact](docs/screenshots/contact-desktop.png) | ![Tracking](docs/screenshots/tracking-desktop.png) |

Mobile breakpoints are implemented. Add current phone screenshots and finish physical-device checks before submission.

| Our Story | Experience |
| --- | --- |
| ![Our Story](docs/screenshots/story-desktop.png) | ![Experience](docs/screenshots/experience-desktop.png) |

## Source layout

```text
src/
  main.jsx                 React entry point
  App.jsx                  Navigation, cart state, order creation, dialogs
  components/UI.jsx        Shared UI, gallery, motion, map and modal behavior
  data/menu.js             Product catalog and formatting helpers
  data/customization.js    Dish-specific choices and prices
  pages/                   Seven individual page components
style.css                  Design tokens, layouts, motion and breakpoints
public/assets/             Local images
```

## Submission documents

- [Deployment and submission checklist](docs/SUBMISSION.md)
- [Presentation script and questions](docs/PRESENTATION.md)
- [Contribution statement template](docs/CONTRIBUTION_TEMPLATE.md)

**GitHub repository:** TO COMPLETE after manual publication.

**Vercel deployment:** TO COMPLETE after deployment. The private review preview is not the instructor-approved hosting submission.
