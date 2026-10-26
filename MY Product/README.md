# 🛒 Vich Shop - Modern Fresh Mart & Grocery

Welcome to **Vich Shop**, an interactive web application designed for a neighborhood small mart with dedicated entry indexes for **Customers / Other Users** and **Administrators**, tied together by a central **Portal Gateway Hub**.

---

## 🏛️ Multi-Index Architecture Overview

| Page | URL / Filename | Target Audience | Primary Features |
| :--- | :--- | :--- | :--- |
| **🏠 Portal Gateway Hub** | [index.html](file:///c:/Users/nasa/Documents/My%20Product/index.html) | All Visitors & Staff | Interactive role switcher cards, real-time mart statistics, quick aisle jumps, and operational status. |
| **🛍️ Customer Storefront** | [user.html](file:///c:/Users/nasa/Documents/My%20Product/user.html) | Customers & Shoppers ("Other User") | Browse 6 fresh aisles, live search, sort & filters, slide-over cart, coupon code `VICH10`, checkout modal, and printable receipts. |
| **⚙️ Administrator Portal** | [admin.html](file:///c:/Users/nasa/Documents/My%20Product/admin.html) | Store Managers & Inventory Staff | PIN-protected access (Default PIN: `1234`), live stock value metrics, input/edit product form with image previews, stock steppers, and JSON backup. |

---

## ✨ Features Breakdown

### 🛍️ 1. Customer Storefront (`user.html`)
- **6 Core Mart Aisles / Categories (2 Products per Menu with Real Custom Photography)**:
  - 🥤 **Drink**: Fresh Cold-Pressed Orange Juice & Organic Ceremonial Iced Matcha Latte.
  - 🍪 **Cookie**: Artisan Dark Chocolate Chunk Cookies & Salted Caramel Butter Wafers.
  - 🍺 **Beer**: European Silver Cold Lager Beer & Hazy Mountain Juicy Craft IPA.
  - 🥦 **Vegetable**: Organic Crisp Romaine Lettuce Hearts & Sweet Ruby Vine Cherry Tomatoes.
  - 🥩 **Beef**: Australian Prime Ribeye Steak Cut & A5 Japanese Wagyu Sirloin Slices.
  - 🍱 **Food**: Fresh Salmon Sashimi Poke Rice Bowl & Golden Rotisserie Herb Roast Chicken.
- **Dynamic Category Filtering & Deep Links**:
  - Filter pills with live counts.
  - Supports direct category query params (e.g. `user.html?category=Beef` or `user.html?search=matcha`).
- **Instant Live Search**: Live search across product titles, descriptions, units, and categories.
- **Interactive Product Cards & Quick View**:
  - Status badges (*Fresh Today*, *Best Seller*, *Special Offer*, *Organic*, *Imported*, *Halal*).
  - Quick View details modal with nutritional and serving information.
  - In-card quantity stepper when an item is added to the cart.
- **Shopping Basket & Checkout**:
  - Slide-over cart drawer with live subtotal and quantity updates.
  - Promo discount code system (try code: `VICH10` for 10% off).
  - Checkout modal with payment options (COD, KHQR/ABA, Visa/MasterCard).
  - Thermal-style printable order receipt with automatic stock deduction.

---

### ⚙️ 2. Administrator Portal (`admin.html`)
- **Passcode Security Screen**:
  - Protected with a sleek PIN screen (Default Staff PIN: `1234`).
  - Interactive on-screen keypad and keyboard input support.
  - "Remember on this device" option and lock button.
- **+ Input New Product Form**:
  - Product Title / Name
  - Category Selection (*Drink*, *Cookie*, *Beer*, *Vegetable*, *Beef*, *Food*, or *+ Custom Category*)
  - Unit Size / Measure (e.g., `330ml can`, `500g tray`, `1 pack`)
  - Retail Unit Price ($ USD)
  - Initial Stock Quantity
  - Tag / Badge selection (*Fresh*, *Best Seller*, *Organic*, etc.)
  - Image URL with **Live Image Preview** and 1-click category image presets
  - Product Description
- **Live Inventory Dashboard & Metrics**:
  - Total Mart Products count.
  - Total Retail Inventory Value (auto-calculated from stock × price).
  - Low Stock Alerts (warns when items reach $\le 5$ units).
  - Active Categories count.
- **Inventory Management Table**:
  - Filter by category, stock status (*Healthy*, *Low Stock*, *Out of Stock*), and search.
  - Quick Stock Increment/Decrement (`＋` / `－`) buttons directly inside the table.
  - Full **Edit Product** action (prefills modal for modifications).
  - **Delete Product** with confirmation.
  - **Export JSON** button to backup product catalog.
  - **Restore Sample Data** button to quickly refresh sample mart products.

---

### 🔄 3. Real-Time Synchronization Across Pages
- Both `user.html` and `admin.html` share the same `localStorage` dataset (`vich_shop_products_data_v2`).
- Changes made in the Administrator Portal (e.g., adding a product, deleting an item, or updating stock) are immediately reflected in the Customer Storefront via the `storage` event listener across browser tabs.
- Customer purchases automatically reduce inventory counts in the Administrator Portal in real time!

---

## 🚀 How to Run Locally

### Option 1: Directly Open in Any Web Browser
Simply double-click [index.html](file:///c:/Users/nasa/Documents/My%20Product/index.html) to open the portal in Chrome, Edge, Safari, or Firefox.

### Option 2: Run with Local HTTP Server
Run with Python or Node.js:

```powershell
# Using Python
python -m http.server 8080

# Or using npx
npx -y serve -l 8080
```

Then visit:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 📁 File Structure
- [index.html](file:///c:/Users/nasa/Documents/My%20Product/index.html) - Portal Gateway Hub with role selector cards and live mart stats.
- [user.html](file:///c:/Users/nasa/Documents/My%20Product/user.html) - Dedicated Customer / Other User Storefront.
- [admin.html](file:///c:/Users/nasa/Documents/My%20Product/admin.html) - Dedicated Administrator Portal with PIN security (`1234`).
- [style.css](file:///c:/Users/nasa/Documents/My%20Product/style.css) - Living aurora background, 4 themes, role cards, PIN lock modal, store layout, and printable receipt.
- [app.js](file:///c:/Users/nasa/Documents/My%20Product/app.js) - Shared logic for state management, interactive constellation canvas, theme studio controller, and cross-tab sync.
- [README.md](file:///c:/Users/nasa/Documents/My%20Product/README.md) - Project documentation and usage guide.

---

## 🎨 Living Dynamic Background & Theme Studio

Vich Shop features an interactive background suite accessible on all pages via the floating **🎨 Theme & FX** pill (or press `Ctrl+B` / `Alt+T`):

1. **🌟 4 Visual Themes with Instant Cross-Tab Sync**:
   - 🌿 **Emerald Aurora** (Default): Fresh Mart signature glow with mint and golden accents.
   - 🌌 **Cyber Obsidian**: Ultra-sleek OLED dark mode with glowing neon emerald and cyber cyan matrix particles.
   - 🌅 **Sunset Citrus**: Warm sunlit golden amber, peach cream, and ruby coral hues.
   - ❄️ **Frost Glass**: Crisp Nordic ice blue, crystal glassmorphism, and lavender reflections.
2. **✨ Interactive Particle & Constellation Canvas**:
   - GPU-accelerated HTML5 canvas with retina/4K DPR scaling.
   - Proximity-based dynamic glowing constellation lines.
   - Mouse attraction & dispersion physics: particles gently part around the cursor.
   - Click Shockwave Ripples: clicking any empty area radiates an expansive luminous wave.
3. **🌊 Aurora Wave Velocity Control**:
   - Adjust morphing fluid aurora speed between **Relaxed**, **Normal**, and **Vibrant**.
4. **🎲 Surprise Me**:
   - Randomizes theme, particle velocity, and triggers celebratory stardust confetti!


