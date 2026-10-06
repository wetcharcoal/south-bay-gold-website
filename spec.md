# South Bay Gold Website

## Overview
A website for South Bay Gold, a gold store, featuring live precious metals pricing, gold buying rates, and company information across multiple pages.

## Pages

### Home Page

#### Market Spot Price Grid
- Display live market prices per ounce for:
  - Gold
  - Silver
  - Platinum
  - Palladium
- Prices should be fetched from Metalpriceapi.com
- If API fails, display fallback prices:
  - Gold: "$4,267.30"
  - Silver: "$52.18 USD"
  - Palladium: "$1,505.20 USD"
  - Platinum: "$1,629.50 USD"

#### Gold Buy Price Grid
- Display gold buying prices for different purities:
  - 24 karat
  - 20 karat
  - 18 karat
  - 14 karat
- Show prices in two units:
  - Per penny weight
  - Per gram

#### Informational Sections
- South Bay Gold as the biggest gold dealer, buyer, and refiner in Southern California
- South Bay Gold as the #1 diamond buyer and dealer
- South Bay Gold's expertise in buying and selling estate and vintage jewelry
- SBG Luxury Watches as California's premier exchange for vintage and pre-owned watches

#### What We Buy Section
- Include existing boxes for various items
- Add a "Diamonds" box styled consistently with other boxes in this section

#### Fine Jewelry Section
- Use lion.png image for this section

#### South Bay's Premier Gold & Jewelry Buyer Section
- Include existing content
- Add a large "BUY/SELL NOW" button prominently displayed

#### BUY/SELL NOW Modal
- When the "BUY/SELL NOW" button is clicked, display a popup modal
- Modal should contain a form for booking an appointment with:
  - Store location selection dropdown (Manhattan Beach, Torrance, Redondo Beach)
  - Text area for description of what they want to sell or buy
  - Submit button to book the appointment

#### Visual Assets Integration
- Use provided image assets (excluding screenshots):
  - 10-zoom.gif
  - 301722240677_1.gif
  - Rolex-Mens-Oyster-Perpetual-Milgauss-Black-116400-Southbay-SoCal.png
  - South-Bay-Gold-Logo-new.png
  - diamond-5.jpg
  - finleys-Jewelry-Store-button.jpg
  - lion.png (for Fine Jewelry section)

### Locations Page
- Display three store locations with their respective storefront images:
  - Manhattan Beach (using StoreFront-SBG-Manhattan.png)
  - Torrance (using StoreFront-SBG-Torrance.png)
  - Redondo Beach (using FinleysJewelersRedondoBeach.png)
- Show store addresses for each location

## Navigation
- Main navigation menu or header with links to:
  - Home page
  - Locations page

## Layout and Design
- Match the visual design from the provided screenshots
- Responsive layout suitable for desktop and mobile
- Professional appearance appropriate for a gold store
- Consistent navigation across all pages
- Remove all mentions of "Caffeine.ai" from the website, including the footer

## Technical Requirements

### Frontend
- Multi-page application with routing
- Fetch live precious metals prices from Metalpriceapi.com on home page with fallback prices
- Display pricing data in organized grids
- Integrate provided image assets appropriately
- Implement responsive design matching screenshot references
- Modal functionality for appointment booking form

### Backend
- Store appointment booking requests with:
  - Store location
  - Description of items to buy/sell
  - Timestamp of request
- No user authentication needed
