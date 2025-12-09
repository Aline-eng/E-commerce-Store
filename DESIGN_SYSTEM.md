# ShopEasy Design System

## 🎨 Color Palette

### Primary Colors
```
Primary Blue:    #0D6EFD
Primary Dark:    #083B8A
Primary Light:   #3D8BFF
Primary Hover:   #0B5ED7
```

### Neutral Colors
```
White:           #FFFFFF
Gray 50:         #F8F9FA
Gray 100:        #F1F3F5
Gray 200:        #E9ECEF
Gray 300:        #DEE2E6
Gray 600:        #6C757D
Gray 700:        #495057
Gray 900:        #212529
```

### Semantic Colors
```
Success:         #28A745
Error:           #DC3545
Warning:         #FFC107
```

### Dark Mode
```
Dark Background: #1A1A1A
Dark Card:       #2D2D2D
Dark Border:     #404040
```

## 📏 Spacing System (8px Grid)

```
xs:    4px
sm:    8px
md:    16px
lg:    24px
xl:    32px
xxl:   48px
xxxl:  64px
```

## 🔤 Typography

### Font Family
```
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

### Font Sizes
```
xs:    12px
sm:    14px
base:  16px
lg:    18px
xl:    20px
2xl:   24px
3xl:   30px
4xl:   36px
```

### Font Weights
```
Normal:    400
Medium:    500
Semibold:  600
Bold:      700
```

## 🎯 Component Specifications

### Navbar
- Height: 64px (h-16)
- Background: White / Dark Gray 900
- Border: Bottom 1px Gray 200
- Shadow: Subtle on scroll
- Logo: 36px rounded square with blue background
- Active indicator: 2px blue underline
- Sticky positioning

### Product Cards
- Layout: 3 columns on desktop
- Border: 1px Gray 200
- Border Radius: 8px (rounded-lg)
- Image Height: 224px (h-56)
- Padding: 16px (p-4)
- Hover: Shadow lift
- Category Badge: Top-left, blue text, white bg
- Rating Badge: Top-right, yellow star

### Buttons
- Primary: Blue 600, hover Blue 700
- Height: 40px (py-2.5 or py-3)
- Border Radius: 8px (rounded-lg)
- Font: 14px medium
- Full width on cards

### Filters Sidebar
- Width: 256px (w-64)
- Background: White card
- Border: 1px Gray 200
- Border Radius: 8px
- Padding: 16px
- Sections separated by borders

### Footer
- Border Top: 4px Blue 600
- Background: White / Dark Gray 900
- Padding: 48px vertical
- 4 columns on desktop
- Social icons: 24px

### Forms
- Input Height: 48px (py-3)
- Border: 1px Gray 300
- Border Radius: 8px
- Focus: 2px Blue 600 ring
- Label: 14px medium, Gray 700
- Spacing: 20px between fields

## 🎭 Shadows

```
Small:   0 1px 2px rgba(0,0,0,0.05)
Medium:  0 4px 6px rgba(0,0,0,0.1)
Large:   0 10px 15px rgba(0,0,0,0.1)
```

## 📱 Breakpoints

```
sm:   640px
md:   768px
lg:   1024px
xl:   1280px
2xl:  1536px
```

## 🎨 Design Principles

1. **Clean & Minimal**: No heavy shadows, balanced whitespace
2. **Professional**: Enterprise-grade appearance
3. **Consistent**: 8px spacing grid throughout
4. **Accessible**: WCAG AA compliant colors
5. **Modern**: Contemporary e-commerce aesthetic

## 🖼️ Layout Guidelines

### Product Grid
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px (gap-6)

### Container
- Max Width: 1280px (max-w-7xl)
- Padding: 16px (px-4)

### Sidebar + Content
- Sidebar: 256px fixed
- Content: Flex 1
- Gap: 32px (gap-8)

## ✨ Interaction States

### Hover
- Links: Blue 600
- Buttons: Blue 700
- Cards: Shadow lift

### Focus
- Ring: 2px Blue 600
- Outline: None

### Active
- Tab: Blue underline
- Button: Slightly darker

### Disabled
- Background: Gray 300
- Cursor: not-allowed
- Opacity: 0.6

## 🎯 Usage Examples

### Product Card
```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
  <img className="w-full h-56 object-cover" />
  <div className="p-4">
    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
    <p className="text-sm text-gray-600 dark:text-gray-400">
    <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg">
  </div>
</div>
```

### Button
```tsx
<button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
```

### Input
```tsx
<input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" />
```

---

**Design System Version**: 1.0
**Last Updated**: 2024
**Status**: Production Ready
