# EMBER Phase 1 presentation notes

Suggested length: 5-6 minutes. Adapt to the lecturer's time limit.

## Opening - 30 seconds

Hello. My project is EMBER, a restaurant ordering website built with React. The slogan is Worth the craving. The goal is to let a customer browse food, customize a dish, add it to a bag, choose pickup or delivery, and follow the order. This is Phase 1, so the ordering and tracking are frontend demonstrations.

## Design and pages - 45 seconds

The website has seven pages: Home, Our Story, Experience, Menu, Contact, Checkout and Order Tracking. I used charcoal, warm ivory and burnt orange for a consistent restaurant identity. Large photographs introduce the main pages. The lower sections are simpler so the food and actions stay clear. The header, footer, buttons and typography are shared across pages. CSS media queries adapt the layout and navigation for smaller screens.

## Customer flow - 90 seconds

On the menu, a customer can filter by category or search by name and description. Clicking a product or its plus button opens customization, rather than adding it immediately. Different dishes have different choices, such as bread, sauce, heat level or milk. Extras have clear prices. The customer can also add a note and change the quantity. The enlarged image has zoom and drag controls. After adding the dish, a thumbnail flies to the bag and the bag count updates.

In checkout, each line shows its selected options and quantity. Delivery costs three dollars. Pickup removes that fee. The form checks the required information before placing a demo order. Checkout then opens tracking with the saved order summary. The tracker advances through four demonstration stages every twenty seconds. The contact page also has a validated form and a real Beirut city map. The map does not claim an exact restaurant address.

## Implementation - 60 seconds

The application uses React components and state. The menu and customization options are stored in separate data files. Each page has its own file, and reusable elements are in a shared components file. The URL hash selects the current page, which works on a static host without special route rewrites. The cart and latest order are saved in localStorage so they remain after a refresh. When checkout completes, the app saves an order snapshot before clearing the bag. Prices are calculated from the base price, selected extras and quantity.

## Validation and limits - 45 seconds

I checked the build and browser interactions, including filters, customization pricing, image enlargement, pickup fees, checkout, tracking, contact confirmation and the map. The design also supports reduced-motion preferences. No real payment is taken, and no order or contact message is sent to a server. I will follow the next phase's brief before adding those features.

## Closing - 15 seconds

The project demonstrates a complete frontend restaurant journey with responsive design, reusable React components and clear interactions. Thank you. I can now show the ordering flow.

## Live demo sequence

1. Home: explain visual identity; navigate to Menu.
2. Search and filter; open a product using its plus button.
3. Choose two extras, increase quantity and show the updated price.
4. Enlarge the image, zoom, then return to customization.
5. Add to bag; show the flying thumbnail and bag count.
6. Checkout: change Delivery to Pickup and point out the fee change.
7. Fill fictional test details; place a demo order and show tracking.
8. Contact: show the map. Do not type private information in the demo.

## Likely questions

- Why React? Components reuse UI and state updates the cart without reloading the page.
- What is dynamic? Search results, category filters, customization, totals, cart quantities, confirmation and tracking.
- Why localStorage? It is simple browser persistence for Phase 1. It is not a shared database or a secure place for sensitive data.
- How is the total calculated? Unit price is base price plus paid choices and extras. Line total is unit price times quantity; delivery adds $3.
- What prevents different customizations merging? The cart key includes the product, option summary and special note.
- Is tracking live? No. It is simulated from the order timestamp and advances every 20 seconds.
- Does Contact send email? No. It validates the fields and saves a local demonstration message.
- How does routing work? Hash changes select the React page component, so static hosting does not need route rewrites.

- Was AI used? Yes, for assistance with implementation, design assets and documentation. Explain your own work accurately and follow the lecturer's policy.
