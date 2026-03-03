# Noor Crochets - Frontend

Modern, animated React frontend for Noor Crochets e-commerce platform.

## Features

- 🎨 Beautiful pastel design with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🛒 Shopping cart with localStorage persistence
- 🔐 User authentication
- 👤 User profile and order history
- ✨ Custom order requests
- 👑 Admin dashboard

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- React Hot Toast

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs on http://localhost:3000

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── context/         # React Context (Auth, Cart)
├── pages/           # Page components
├── utils/           # Utility functions and API calls
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Pages

- **Home** - Hero, featured collections, about, testimonials
- **Shop** - Product listing with filters
- **Product Details** - Detailed product view
- **Cart** - Shopping cart management
- **Login/Register** - Authentication
- **Profile** - User dashboard
- **Custom Order** - Request custom pieces
- **About** - Brand story
- **Admin Dashboard** - Admin panel (admin only)

## Animations

- Floating elements
- Parallax scrolling
- Page transitions
- Button ripple effects
- Hover animations
- Scroll-triggered animations

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Color Palette

- Cream: #FFF8F0
- Beige: #F5E6D3
- Blush Pink: #FFD1DC
- Sage Green: #C8D5B9
- Lavender: #E6E6FA
- Gold: #D4AF37
- Dark Brown: #4A4238

## Fonts

- Headings: Playfair Display (Serif)
- Body: Inter (Sans-serif)
