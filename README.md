# ReadSphere – Your Modern Natural Digital Library

> A seamless and elegant digital library management system designed to digitize the traditional library experience. Users can explore various books, filter by categories, authenticate securely, and borrow books digitally with a premium, classic warm ivory and forest green editorial user interface.

## 🌐 Live URL
[https://read-sphere-digital.vercel.app](https://read-sphere-digital.vercel.app)

## ✨ Key Features
- **Premium Editorial UI/UX**: Warm paper/ivory background paired with deep stone typography and rich forest green brand indicators.
- **Dual-Mode Secure Authentication**: Built-in credential login utilizing BetterAuth, backed by a robust fallback mock system for seamless local testing without database credentials.
- **Dynamic Catalog Sidebar & Search**: A fully responsive sidebar to filter books by *Story*, *Tech*, and *Science*, paired with a live title-search filter bar.
- **Real-Time Borrowing Engine**: Direct dynamic inventory tracking that decrements available copies in real-time, backed by local persistent cache fallbacks.
- **Profile Dashboard & Updates**: Allows logged-in readers to view and dynamically update their profile credentials.
- **Responsive SwiperJS Testimonials**: Elegant, custom-bullet carousel displaying reviews from active readers.
- **Page Guards (Middleware)**: Secure route shielding that redirects unauthorized sessions to the login view.

## 📦 NPM Packages Used
- `next` (v16.2.6) - App Router Framework
- `tailwindcss` (v4 Engine) & `daisyui` (v5 Plugin) - Core styling and components
- `better-auth` & `@better-auth/mongo-adapter` - Robust Authentication
- `mongodb` & `mongoose` - Database schema and modeling
- `swiper` - Touch-enabled carousels and sliders
- `react-hot-toast` - Elegant notification toasts
- `lucide-react` - Crisp vector icons
- `framer-motion` - Animation libraries

## ⚡ Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up `.env.local`:**
   ```env
   MONGODB_URI=your_mongodb_uri
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
