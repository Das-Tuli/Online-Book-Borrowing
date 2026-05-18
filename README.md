# ReadSphere – Your Modern Natural Digital Library

## Live URL
https://read-sphere-digital.vercel.app

## Purpose
ReadSphere is a seamless and elegant digital library management system designed to digitize the traditional library experience. Users can explore various books, filter by categories, authenticate securely, and borrow books digitally with a premium, classic warm ivory and forest green editorial user interface.

## Key Features
- **Premium Editorial UI/UX**: Warm paper/ivory background (`#fbfbf9`) paired with deep stone typography and rich forest green brand indicators. Zero slow neon glows or backdrop repaint lag.
- **Fast & Efficient**: Lightweight design without heavy Framer Motion runtime packages or complex repaints—resulting in instant catalog speeds and mobile responsiveness.
- **Dual-Mode Secure Authentication**: Built-in credential and Google social login using BetterAuth. Integrates a smart Mock Mode fallback that runs seamlessly client-side if a database is offline, ensuring 100% testability.
- **Dynamic Catalog Sidebar & Search**: A fully responsive sidebar to filter books by *Story*, *Tech*, and *Science*, paired with a live title-search filter bar.
- **Real-Time Borrowing Engine**: Direct dynamic inventory tracking that decrements available copies in real-time, backed by local persistent cache fallbacks.
- **Profile Dashboard & Updates**: Allows logged-in readers to view and dynamically update their profile credentials (name and avatar photo URL).
- **Responsive SwiperJS Testimonials**: Elegant, custom-bullet carousel displaying reviews from active readers.
- **Page Guards (Middleware)**: Secure route shielding that redirects unauthorized sessions to the login view.
- **Two Custom Sections**:
  - **New Arrivals Marquee Ticker**: Scrolling editorial news ticker showcasing discounts and new arrivals.
  - **Editorial Book Mockup Grid**: Highly refined interactive hero component displaying popular publications with smooth CSS scaling.

## NPM Packages Used
- `next` (App Router)
- `tailwindcss` (v4 Engine)
- `daisyui` (v5 Plugin)
- `better-auth`
- `@better-auth/mongo-adapter`
- `mongodb`
- `mongoose`
- `swiper`
- `react-hot-toast`
- `lucide-react`

## Environment Variables
Create a `.env.local` file in the root directory and add the following keys:
```env
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Running Locally
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env.local` file.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.
