# T-Shirts That Talk — Qualicum Beach, BC

Simple static website for the local custom t-shirt shop. Includes:

- **Landing page** – Hero banner with background image
- **About section** – Shop description  
- **Gallery** – Display your best work (6 image slots)
- **Contact form** – Visitors can send messages
- **Responsive design** – Mobile-friendly

## Setup

1. Place your logo image as `background.png` in the root folder (for hero section)
2. Add gallery photos in `images/gallery1.jpg` through `gallery6.jpg` (or update `index.html` with your own filenames)
3. Open `index.html` in a browser or host on GitHub Pages / Netlify

## Files

- `index.html` – Main landing page
- `styles.css` – Styling and layout
- `contact.js` – Contact form handling (currently shows alert; upgrade to email backend later)
- `images/` – Gallery image folder
- `background.png` – Optional hero background

## Contact Info

**Owner:** Jambo  
**Phone:** 250-951-8869  
**Location:** Qualicum Beach, BC

## Future Enhancements

- Connect contact form to email service (Formspree, SendGrid, etc.)
- Add online store / shopping cart when ready
- Integrate with Facebook / Instagram APIs to auto-populate gallery

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/             # Utilities and helpers
├── store/           # Zustand state management
├── types/           # TypeScript types
└── styles/          # CSS modules and globals
```

## Key Technologies

- **Next.js 14** - React framework with API routes
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management for cart
- **Fabric.js** - Canvas-based design editor
- **Stripe** - Payment processing (optional)

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Architecture

### Frontend

- Home page with featured products
- Product listing with filters
- Product detail page with size/color options
- Custom design editor (canvas-based)
- Shopping cart sidebar
- Checkout flow

### Backend (API Routes)

- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product details
- `POST /api/cart` - Add/update cart items
- `POST /api/orders` - Create orders
- `GET /api/orders` - List user orders

### State Management

- Cart state managed with Zustand (`src/store/cartStore.ts`)
- Design canvas state in component-level React state
- Persist cart to localStorage

## Customization

Edit `src/data/products.ts` to add your t-shirt designs and colors.
Update `tailwind.config.ts` to customize brand colors.

## License

MIT
