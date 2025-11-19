# SaShop - Premium NEON LED Store

A complete, production-ready e-commerce store for selling NEON LED decorations. Built with Next.js and Tailwind CSS with no backend required.

## Features

- Complete e-commerce store interface with product catalog and filtering
- Individual product detail pages with order forms
- Contact forms and customer reviews section
- Mobile-responsive design with smooth animations and neon effects
- Google Forms/Sheets integration for order collection
- Cash on delivery support with WhatsApp-friendly contact system
- Zero server infrastructure needed

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Icons:** Lucide React + React Icons
- **Forms:** Google Forms integration
- **Hosting:** Vercel / GitHub Pages / Netlify

## Quick Start

### Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your store.

### Setup (45 minutes)

1. **Configure Google Forms** (15 min)
   - Create two Google Forms (Orders + Contact)
   - Get your Form IDs
   - Update code with your IDs
   - See `SETUP_GOOGLE_FORMS.md` for detailed instructions

2. **Add Products** (15 min)
   - Edit `lib/products.ts`
   - Update product names, prices, descriptions
   - Add your images to `/public/`

3. **Deploy** (5 min)
   ```bash
   git push origin main
   ```
   Then deploy via Vercel, GitHub Pages, or Netlify

## Project Structure

```
sashop/
├── app/
│   ├── page.tsx              # Home page
│   ├── products/             # Product catalog & details
│   ├── about/                # About page
│   └── contact/              # Contact page
├── components/               # Reusable components
├── lib/
│   ├── products.ts           # Product data & reviews
│   └── google-forms.ts       # Forms utility
└── public/                   # Images & assets
```

## Customization

### Change Brand Colors

Edit `app/globals.css`:

```css
--color-primary: #00d9ff;
--color-secondary: #ff006e;
--color-accent: #8338ec;
```

### Update Contact Information

Edit `app/contact/page.tsx` with your phone, email, and address.

### Add Products

Edit `lib/products.ts`:

```typescript
{
  id: '7',
  name: 'Your Product Name',
  price: 50,
  category: 'Your Category',
  image: '/your-image.png',
  description: 'Product description',
  features: ['Feature 1', 'Feature 2'],
  inStock: true,
}
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import repo on vercel.com
3. Deploy automatically

### GitHub Pages
1. Add `output: 'export'` to `next.config.js`
2. Run `npm run build`
3. Enable Pages in repository settings

### Netlify
1. Connect repository on netlify.com
2. Build command: `npm run build`
3. Publish directory: `.next`

## Documentation

- **START_HERE.md** — Getting started guide
- **SETUP_GOOGLE_FORMS.md** — Forms integration
- **DEPLOYMENT_GUIDE.md** — Deployment options
- **QUICK_REFERENCE.md** — Quick lookup guide

## What's Included

### Components
- Navbar with mobile menu
- Footer with links
- Product cards and review cards
- Order and contact forms

### Pages
- Home page with hero section
- Products catalog with filtering
- Product detail pages
- About and contact pages
- Error pages (404, error boundary)

### Features
- Category filtering and product search
- Form validation and success messages
- Dark theme with neon glow effects
- Smooth animations and transitions
- 6 sample products with multiple categories

## Build for Production

```bash
npm run build
npm start
```

## Prerequisites

- Node.js 16 or higher
- npm or yarn

## Support

- Check included documentation files
- Review code comments
- Refer to [Next.js Documentation](https://nextjs.org/docs)
- Open GitHub issues for bugs

---

**Built with ❤️ for NEON lovers**
