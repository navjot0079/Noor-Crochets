# Images Folder

Store your image files here.

## Required Images for the Site

### About Section
- `crafting.jpg` - Image for the crafting/story section (Home page)
- `penguin.jpg` - Image for the About page story section

### Collections Page
- `collection-bags.jpg` - Bags & Totes collection cover image
- `collection-plushies.jpg` - Plushies & Toys collection cover image
- `collection-tops.jpg` - Tops & Clothing collection cover image
- `collection-blankets.jpg` - Blankets & Throws collection cover image
- `collection-accessories.jpg` - Accessories collection cover image
- `collection-wearables.jpg` - Wearables collection cover image
- `collection-home.jpg` - Home Decor collection cover image

### Instagram Gallery Section (Home Page)
- `gallery-1.jpg` through `gallery-8.jpg` - 8 images for the Instagram gallery grid

## Current Images
- `Rabbit.jpg` - Already added
- `penguin.jpg` - Already added

## How to Use Images

### Method 1: Direct Path (Recommended for Vite)
```jsx
<img src="/src/assets/images/your-image.jpg" alt="Description" />
```

### Method 2: Import (Better for optimization)
```jsx
import craftingImage from '@/assets/images/crafting.jpg';

<img src={craftingImage} alt="Crafting" />
```

## Supported Formats
- JPG/JPEG
- PNG
- SVG
- WebP
- GIF

## Best Practices
1. Optimize images before uploading (compress them)
2. Use descriptive filenames (e.g., `hero-background.jpg`)
3. Keep images under 500KB when possible
4. Use WebP format for better compression
5. Recommended image sizes:
   - Collection covers: 800x800px or larger
   - Gallery images: 400x400px or larger
   - Story/About images: 600x800px or larger
