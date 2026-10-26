/**
 * Vich Shop - Modern Fresh Mart & Grocery Application
 * Multi-Index Architecture Supporting:
 * 1. Portal Gateway Hub (index.html)
 * 2. Dedicated Customer Storefront (user.html)
 * 3. Dedicated Administrator Portal with PIN Security (admin.html)
 */

(function () {
  'use strict';

  // ===================================================================
  // 1. DEFAULT SEED INVENTORY (2 Products per Menu Category with Real Pictures)
  // ===================================================================
  const DEFAULT_PRODUCTS = [
    // --- DRINK (2 Products) ---
    {
      id: 'prod-drink-1',
      title: 'Fresh Cold-Pressed Orange Juice',
      category: 'Drink',
      price: 3.50,
      stock: 24,
      unit: '500ml bottle',
      badge: 'Fresh',
      imageUrl: 'images/drink_orange_juice.jpg',
      description: '100% freshly squeezed Valencia oranges. Rich in Vitamin C, no added preservatives or refined sugars.'
    },
    {
      id: 'prod-drink-2',
      title: 'Organic Ceremonial Iced Matcha Latte',
      category: 'Drink',
      price: 4.25,
      stock: 16,
      unit: '450ml glass',
      badge: 'Organic',
      imageUrl: 'images/drink_matcha_latte.jpg',
      description: 'Hand-whisked Uji Kyoto ceremonial green tea blended smoothly with creamy oat milk and ice.'
    },

    // --- COOKIE (2 Products) ---
    {
      id: 'prod-cookie-1',
      title: 'Artisan Dark Chocolate Chunk Cookies',
      category: 'Cookie',
      price: 4.80,
      stock: 18,
      unit: '220g box',
      badge: 'Best Seller',
      imageUrl: 'images/cookie_chocolate_chunks.jpg',
      description: 'Baked fresh daily with 70% Belgian dark chocolate morsels and creamy European cultured butter.'
    },
    {
      id: 'prod-cookie-2',
      title: 'Salted Caramel Butter Wafers',
      category: 'Cookie',
      price: 5.20,
      stock: 12,
      unit: '200g box',
      badge: 'Special',
      imageUrl: 'images/cookie_butter_wafers.jpg',
      description: 'Thin crispy Breton-style wafers drizzled with Guerande sea-salt caramel syrup and almond crunch.'
    },

    // --- BEER (2 Products) ---
    {
      id: 'prod-beer-1',
      title: 'European Silver Cold Lager Beer',
      category: 'Beer',
      price: 2.60,
      stock: 48,
      unit: '330ml can',
      badge: 'Best Seller',
      imageUrl: 'images/beer_silver_lager.jpg',
      description: 'Brewed at an ice-cold -1°C for an extra refreshing taste with a subtle, smooth finish. 5.0% ABV.'
    },
    {
      id: 'prod-beer-2',
      title: 'Hazy Mountain Juicy Craft IPA',
      category: 'Beer',
      price: 4.90,
      stock: 20,
      unit: '440ml can',
      badge: 'Special',
      imageUrl: 'images/beer_craft_ipa.jpg',
      description: 'Bursting with tropical Citra and Mosaic hops, juicy passionfruit aroma, and a silky smooth mouthfeel.'
    },

    // --- VEGETABLE (2 Products) ---
    {
      id: 'prod-veg-1',
      title: 'Organic Crisp Romaine Lettuce Hearts',
      category: 'Vegetable',
      price: 2.20,
      stock: 22,
      unit: 'Pack of 3',
      badge: 'Organic',
      imageUrl: 'images/veg_romaine_lettuce.jpg',
      description: 'Hydroponically grown crisp and sweet romaine hearts. Ideal for Caesar salads and fresh wraps.'
    },
    {
      id: 'prod-veg-2',
      title: 'Sweet Ruby Vine Cherry Tomatoes',
      category: 'Vegetable',
      price: 2.95,
      stock: 28,
      unit: '400g basket',
      badge: 'Fresh',
      imageUrl: 'images/veg_cherry_tomatoes.jpg',
      description: 'Intensely sweet, hand-harvested vine ripened cherry tomatoes. Bursting with fresh juice and flavor.'
    },

    // --- BEEF (2 Products) ---
    {
      id: 'prod-beef-1',
      title: 'Australian Prime Ribeye Steak Cut',
      category: 'Beef',
      price: 18.50,
      stock: 10,
      unit: '350g cut',
      badge: 'Best Seller',
      imageUrl: 'images/beef_ribeye_steak.jpg',
      description: 'Grain-fed 120-day Australian ribeye with generous marbling. Incredibly juicy, tender and rich.'
    },
    {
      id: 'prod-beef-2',
      title: 'A5 Japanese Wagyu Sirloin Slices',
      category: 'Beef',
      price: 29.00,
      stock: 6,
      unit: '200g cut',
      badge: 'Special',
      imageUrl: 'images/beef_wagyu_sirloin.jpg',
      description: 'Certified Kagoshima A5 Wagyu with snowflake intramuscular marbling. Melts delicately at room temperature.'
    },

    // --- FOOD (2 Products) ---
    {
      id: 'prod-food-1',
      title: 'Fresh Salmon Sashimi Poke Rice Bowl',
      category: 'Food',
      price: 9.50,
      stock: 14,
      unit: '1 bowl',
      badge: 'Fresh',
      imageUrl: 'images/food_salmon_poke.jpg',
      description: 'Norwegian salmon sashimi slices over seasoned sushi rice, avocado, edamame, and sesame shoyu sauce.'
    },
    {
      id: 'prod-food-2',
      title: 'Golden Rotisserie Herb Roast Chicken',
      category: 'Food',
      price: 11.00,
      stock: 8,
      unit: 'Whole chicken',
      badge: 'Best Seller',
      imageUrl: 'images/food_rotisserie_chicken.jpg',
      description: 'Slow-roasted on the mart spit with rosemary, thyme, garlic butter, and sea salt. Juicy and hot.'
    }
  ];

  // Preset Images for Administrator Modal (Using Real High-Resolution Assets)
  const PRESET_IMAGES = {
    Drink: [
      { name: 'Orange Juice', url: 'images/drink_orange_juice.jpg' },
      { name: 'Matcha Latte', url: 'images/drink_matcha_latte.jpg' }
    ],
    Cookie: [
      { name: 'Choc Cookies', url: 'images/cookie_chocolate_chunks.jpg' },
      { name: 'Butter Wafers', url: 'images/cookie_butter_wafers.jpg' }
    ],
    Beer: [
      { name: 'Silver Lager', url: 'images/beer_silver_lager.jpg' },
      { name: 'Craft IPA', url: 'images/beer_craft_ipa.jpg' }
    ],
    Vegetable: [
      { name: 'Romaine Lettuce', url: 'images/veg_romaine_lettuce.jpg' },
      { name: 'Cherry Tomatoes', url: 'images/veg_cherry_tomatoes.jpg' }
    ],
    Beef: [
      { name: 'Ribeye Steak', url: 'images/beef_ribeye_steak.jpg' },
      { name: 'A5 Wagyu', url: 'images/beef_wagyu_sirloin.jpg' }
    ],
    Food: [
      { name: 'Salmon Poke', url: 'images/food_salmon_poke.jpg' },
      { name: 'Roast Chicken', url: 'images/food_rotisserie_chicken.jpg' }
    ]
  };

  // ===================================================================
  // 2. STORAGE KEYS & APP STATE
  // ===================================================================
  const STORAGE_KEYS = {
    PRODUCTS: 'vich_shop_products_data_v5',
    CART: 'vich_shop_cart_data_v4',
    ADMIN_PIN: 'vich_shop_admin_pin',
    ADMIN_AUTH_SESSION: 'vich_shop_admin_authed_session',
    ADMIN_AUTH_LOCAL: 'vich_shop_admin_authed_local',
    THEME: 'vich_shop_theme',
    BG_FX: 'vich_shop_bg_fx'
  };

  const DEFAULT_PIN = '1234';

  const state = {
    products: [],
    cart: {}, // { [productId]: quantity }
    filterCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    stockFilter: 'all',
    viewMode: 'aisles', // 'aisles' (horizontal scroll per category) or 'grid' (multi-column)
    adminSearch: '',
    adminCategory: 'all',
    adminStock: 'all',
    promoDiscount: 0,
    appliedPromo: ''
  };

  // Safe DOM Event Helpers
  function safeListen(idOrEl, event, handler) {
    const el = typeof idOrEl === 'string' ? document.getElementById(idOrEl) : idOrEl;
    if (el) {
      el.addEventListener(event, handler);
    }
  }

  function safeText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Load from LocalStorage
  function loadInitialState() {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProducts) {
        state.products = JSON.parse(storedProducts);
      } else {
        state.products = [...DEFAULT_PRODUCTS];
        saveProducts();
      }

      const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (storedCart) {
        state.cart = JSON.parse(storedCart);
      }
    } catch (err) {
      console.warn('LocalStorage load error:', err);
      state.products = [...DEFAULT_PRODUCTS];
      state.cart = {};
    }
  }

  function saveProducts() {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
      const syncStr = 'Synced ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      safeText('adminLastSync', syncStr);
      safeText('portalSyncTime', syncStr);
    } catch (err) {
      console.error('Failed to save products:', err);
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
    } catch (err) {
      console.error('Failed to save cart:', err);
    }
  }

  // ===================================================================
  // 3. TOAST NOTIFICATION, FLY-TO-CART & CONFETTI ENGINE
  // ===================================================================
  function showToast(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${escapeHtml(message)}</span>
      </div>
      <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Interactive Confetti Explosion Engine
  function triggerConfetti(options = {}) {
    let canvas = document.getElementById('confettiCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confettiCanvas';
      canvas.className = 'confetti-canvas';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const count = options.count || 100;
    const colors = ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#ef4444', '#8b5cf6', '#3b82f6', '#ec4899', '#fde047'];
    const particles = [];

    const originX = options.x !== undefined ? options.x : width / 2;
    const originY = options.y !== undefined ? options.y : height * 0.42;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 6;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: (Math.sin(angle) * speed) - (Math.random() * 8 + 3),
        size: Math.random() * 9 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 16,
        drag: 0.955,
        gravity: 0.38,
        shape: Math.random() > 0.35 ? 'rect' : 'circle',
        opacity: 1
      });
    }

    const startTime = Date.now();
    const duration = options.duration || 3200;

    function renderFrame() {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      let alive = false;
      for (const p of particles) {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - (elapsed / duration));

        if (p.opacity > 0 && p.y < height + 40) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      if (alive && elapsed < duration) {
        requestAnimationFrame(renderFrame);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }

    renderFrame();
  }

  // World-Class Parabolic Arc Fly-To-Cart Animation
  function flyItemToCart(startEl, imgUrl) {
    const cartBtn = document.getElementById('cartTriggerBtn');
    if (!cartBtn || !startEl) return;

    const startRect = startEl.getBoundingClientRect();
    const endRect = cartBtn.getBoundingClientRect();

    const flyer = document.createElement('img');
    flyer.src = imgUrl || 'images/drink_orange_juice.jpg';
    flyer.className = 'flying-cart-item';
    flyer.style.width = '52px';
    flyer.style.height = '52px';
    flyer.style.left = `${startRect.left + startRect.width / 2 - 26}px`;
    flyer.style.top = `${startRect.top + startRect.height / 2 - 26}px`;
    document.body.appendChild(flyer);

    const targetX = endRect.left + endRect.width / 2 - 26;
    const targetY = endRect.top + endRect.height / 2 - 26;
    const deltaX = targetX - parseFloat(flyer.style.left);
    const deltaY = targetY - parseFloat(flyer.style.top);

    const animation = flyer.animate([
      {
        transform: 'translate(0, 0) scale(1) rotate(0deg)',
        opacity: 1
      },
      {
        transform: `translate(${deltaX * 0.45}px, ${deltaY * 0.25 - 75}px) scale(1.35) rotate(20deg)`,
        opacity: 0.95,
        offset: 0.4
      },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0.18) rotate(45deg)`,
        opacity: 0.2
      }
    ], {
      duration: 680,
      easing: 'cubic-bezier(0.2, 0.85, 0.25, 1)',
      fill: 'forwards'
    });

    animation.onfinish = () => {
      flyer.remove();
      // Elastic bounce on the cart button & count badge
      cartBtn.classList.remove('cart-bounce', 'cart-ring-ping');
      void cartBtn.offsetWidth; // Reflow
      cartBtn.classList.add('cart-bounce', 'cart-ring-ping');
      setTimeout(() => {
        cartBtn.classList.remove('cart-bounce', 'cart-ring-ping');
      }, 700);
    };
  }

  // Floating +1 Badge Animation
  function triggerFloatingPlusOne(originEl) {
    if (!originEl) return;
    const rect = originEl.getBoundingClientRect();
    const plusOne = document.createElement('div');
    plusOne.className = 'floating-plus-one';
    plusOne.textContent = '+1';
    plusOne.style.left = `${rect.left + rect.width / 2}px`;
    plusOne.style.top = `${rect.top}px`;
    document.body.appendChild(plusOne);
    setTimeout(() => plusOne.remove(), 850);
  }

  // Micro Sparkle Burst Particles
  function triggerSparkleBurst(originEl) {
    if (!originEl) return;
    const rect = originEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const colors = ['#10b981', '#34d399', '#f59e0b', '#38bdf8', '#fde047'];

    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      dot.className = 'btn-sparkle-dot';
      const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.4);
      const dist = Math.random() * 26 + 18;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      dot.style.setProperty('--dx', `${dx.toFixed(1)}px`);
      dot.style.setProperty('--dy', `${dy.toFixed(1)}px`);
      dot.style.backgroundColor = colors[i % colors.length];
      dot.style.boxShadow = `0 0 8px ${colors[i % colors.length]}`;
      dot.style.left = `${centerX}px`;
      dot.style.top = `${centerY}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 750);
    }
  }

  // 3D Perspective Card Tilt & Specular Glare System
  function init3DCardPhysics() {
    const cards = document.querySelectorAll('.product-card, .portal-role-card, .pro-poster-card, .metric-card, .portal-cat-card');
    cards.forEach(card => {
      if (!card.dataset.hasTilt) {
        card.dataset.hasTilt = 'true';

        if (!card.querySelector('.card-glare-effect')) {
          const glare = document.createElement('div');
          glare.className = 'card-glare-effect';
          card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = -((y - centerY) / centerY) * 8.5;
          const rotateY = ((x - centerX) / centerX) * 8.5;

          card.style.transition = 'none';
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02) translateZ(8px)`;
          card.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
          card.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
        });

        card.addEventListener('mouseleave', () => {
          card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)';
        });
      }
    });
  }

  // ===================================================================
  // LIVING DYNAMIC AURORA & INTERACTIVE PARTICLE CANVAS STUDIO
  // ===================================================================
  const BG_THEMES = {
    emerald: {
      name: 'emerald',
      label: 'Emerald Aurora',
      tagline: 'Fresh Mart Glow',
      particleColors: ['#10b981', '#34d399', '#6ee7b7', '#38bdf8', '#fbbf24', '#ffffff'],
      glowRgb: '16, 185, 129',
      lineRgb: '16, 185, 129'
    },
    cyber: {
      name: 'cyber',
      label: 'Cyber Obsidian',
      tagline: 'OLED Neon Matrix',
      particleColors: ['#00ff9d', '#00e5ff', '#a855f7', '#38bdf8', '#ffffff', '#f43f5e'],
      glowRgb: '0, 255, 157',
      lineRgb: '0, 255, 157'
    },
    sunset: {
      name: 'sunset',
      label: 'Sunset Citrus',
      tagline: 'Warm Amber Peach',
      particleColors: ['#ea580c', '#f97316', '#fbbf24', '#f43f5e', '#fb923c', '#ffffff'],
      glowRgb: '249, 115, 22',
      lineRgb: '249, 115, 22'
    },
    frost: {
      name: 'frost',
      label: 'Frost Glass',
      tagline: 'Nordic Crystal Ice',
      particleColors: ['#0284c7', '#38bdf8', '#818cf8', '#a5f3fc', '#c084fc', '#ffffff'],
      glowRgb: '56, 189, 248',
      lineRgb: '56, 189, 248'
    }
  };

  let bgCanvasEngine = null;

  function initLivingBackgroundAndThemeStudio() {
    let currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'emerald';
    if (!BG_THEMES[currentTheme]) currentTheme = 'emerald';

    let fxSettings = {
      particles: true,
      ripple: true,
      speed: 'normal'
    };

    try {
      const storedFx = localStorage.getItem(STORAGE_KEYS.BG_FX);
      if (storedFx) {
        fxSettings = Object.assign(fxSettings, JSON.parse(storedFx));
      }
    } catch (e) {}

    function applyTheme(themeKey, notify = false) {
      if (!BG_THEMES[themeKey]) themeKey = 'emerald';
      currentTheme = themeKey;
      document.documentElement.setAttribute('data-theme', themeKey);
      document.body.setAttribute('data-theme', themeKey);
      localStorage.setItem(STORAGE_KEYS.THEME, themeKey);

      const badge = document.querySelector('.studio-active-badge');
      if (badge) {
        badge.textContent = BG_THEMES[themeKey].label.split(' ')[0];
      }

      document.querySelectorAll('.studio-preset-card').forEach(card => {
        card.classList.toggle('is-active', card.dataset.theme === themeKey);
      });

      if (bgCanvasEngine) {
        bgCanvasEngine.updateTheme(BG_THEMES[themeKey]);
      }

      const orb = document.getElementById('cursorSpotlightOrb');
      if (orb) {
        orb.style.boxShadow = `0 0 35px rgba(${BG_THEMES[themeKey].glowRgb}, 0.55)`;
      }

      if (notify) {
        showToast(`Applied ${BG_THEMES[themeKey].label}!`, 'success', 2000);
      }
    }

    function applySpeed(speed) {
      fxSettings.speed = speed;
      document.body.classList.remove('aurora-speed-relaxed', 'aurora-speed-vibrant');
      if (speed === 'relaxed') {
        document.body.classList.add('aurora-speed-relaxed');
      } else if (speed === 'vibrant') {
        document.body.classList.add('aurora-speed-vibrant');
      }
      saveFx();

      document.querySelectorAll('.studio-speed-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.speed === speed);
      });
    }

    function saveFx() {
      try {
        localStorage.setItem(STORAGE_KEYS.BG_FX, JSON.stringify(fxSettings));
      } catch (e) {}
    }

    applyTheme(currentTheme);
    applySpeed(fxSettings.speed);

    // Setup Canvas Particle & Constellation Engine
    initBgCanvas();

    function initBgCanvas() {
      let canvas = document.getElementById('bgParticleCanvas');
      if (!canvas) {
        const wrapper = document.querySelector('.ambient-glow-wrapper');
        if (wrapper) {
          canvas = document.createElement('canvas');
          canvas.id = 'bgParticleCanvas';
          canvas.className = 'bg-particle-canvas';
          wrapper.prepend(canvas);
        }
      }
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = window.innerWidth;
      let height = window.innerHeight;
      let dpr = window.devicePixelRatio || 1;

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.scale(dpr, dpr);
      }
      resize();

      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 100);
      });

      const particles = [];
      const getParticleCount = () => {
        if (width < 768) return 26;
        if (width < 1200) return 44;
        return 58;
      };

      function createParticle(theme) {
        const palette = theme.particleColors;
        const color = palette[Math.floor(Math.random() * palette.length)];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() < 0.14 ? Math.random() * 2.2 + 2.2 : Math.random() * 1.5 + 1.1,
          baseAlpha: Math.random() * 0.4 + 0.35,
          alpha: 0.5,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          color: color,
          isStar: Math.random() < 0.18
        };
      }

      function initParticles() {
        particles.length = 0;
        const count = getParticleCount();
        const theme = BG_THEMES[currentTheme];
        for (let i = 0; i < count; i++) {
          particles.push(createParticle(theme));
        }
      }
      initParticles();

      let mouseX = -9999;
      let mouseY = -9999;
      let mouseActive = false;
      let mouseTimer = null;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseActive = true;
        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(() => { mouseActive = false; }, 3000);
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        mouseActive = false;
      });

      const ripples = [];
      window.addEventListener('click', (e) => {
        if (!fxSettings.ripple) return;
        if (e.target.closest('.bg-studio-panel, .cart-drawer, .modal-dialog, button, a, input, select')) return;

        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 6,
          maxRadius: Math.min(width, height) * 0.32,
          alpha: 0.65,
          color: BG_THEMES[currentTheme].glowRgb
        });
      }, { passive: true });

      let animId = null;
      let isTabHidden = false;

      document.addEventListener('visibilitychange', () => {
        isTabHidden = document.hidden;
        if (!isTabHidden && fxSettings.particles && !animId) {
          animId = requestAnimationFrame(render);
        }
      });

      function render() {
        if (!fxSettings.particles) {
          ctx.clearRect(0, 0, width, height);
          animId = null;
          return;
        }

        ctx.clearRect(0, 0, width, height);
        const theme = BG_THEMES[currentTheme];
        const maxDist = width < 768 ? 95 : 125;

        // 1. Mouse Ambient Radial Halo
        if (mouseActive && mouseX > 0 && mouseY > 0) {
          const haloGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 140);
          haloGrad.addColorStop(0, `rgba(${theme.glowRgb}, 0.16)`);
          haloGrad.addColorStop(0.5, `rgba(${theme.glowRgb}, 0.05)`);
          haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 140, 0, Math.PI * 2);
          ctx.fill();
        }

        // 2. Shockwave Ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += 5.5;
          r.alpha *= 0.95;

          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r.color}, ${r.alpha.toFixed(3)})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          for (let j = 0; j < particles.length; j++) {
            const p = particles[j];
            const dx = p.x - r.x;
            const dy = p.y - r.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (Math.abs(d - r.radius) < 25 && d > 0) {
              const push = (1 - Math.abs(d - r.radius) / 25) * 2.5;
              p.x += (dx / d) * push;
              p.y += (dy / d) * push;
              p.alpha = Math.min(1, p.alpha + 0.3);
            }
          }

          if (r.alpha < 0.02 || r.radius >= r.maxRadius) {
            ripples.splice(i, 1);
          }
        }

        // 3. Particles Update & Render
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.phase += p.pulseSpeed;
          p.alpha = p.baseAlpha + Math.sin(p.phase) * 0.22;

          if (mouseActive) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140 && dist > 0) {
              const force = (140 - dist) / 140;
              p.x += (dx / dist) * force * 1.8;
              p.y += (dy / dist) * force * 1.8;
              p.alpha = Math.min(1, p.alpha + force * 0.4);
            }
          }

          const pad = 20;
          if (p.x < -pad) p.x = width + pad;
          if (p.x > width + pad) p.x = -pad;
          if (p.y < -pad) p.y = height + pad;
          if (p.y > height + pad) p.y = -pad;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
          ctx.fill();

          if (p.isStar && p.alpha > 0.45) {
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.7;
            const starLen = p.radius * 2.2;
            ctx.beginPath();
            ctx.moveTo(p.x - starLen, p.y);
            ctx.lineTo(p.x + starLen, p.y);
            ctx.moveTo(p.x, p.y - starLen);
            ctx.lineTo(p.x, p.y + starLen);
            ctx.stroke();
          }
        }

        // 4. Proximity Constellation Lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const lineAlpha = (1 - dist / maxDist) * 0.26 * Math.min(p1.alpha, p2.alpha);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${theme.lineRgb}, ${lineAlpha.toFixed(3)})`;
              ctx.lineWidth = 0.85;
              ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = 1;

        if (!isTabHidden && fxSettings.particles) {
          animId = requestAnimationFrame(render);
        }
      }

      animId = requestAnimationFrame(render);

      bgCanvasEngine = {
        updateTheme: (newTheme) => {
          particles.forEach(p => {
            p.color = newTheme.particleColors[Math.floor(Math.random() * newTheme.particleColors.length)];
          });
        },
        toggleParticles: (enable) => {
          fxSettings.particles = enable;
          saveFx();
          canvas.classList.toggle('is-hidden', !enable);
          if (enable && !animId) {
            animId = requestAnimationFrame(render);
          }
        }
      };
    }

    // Inject Studio Widget into DOM
    injectStudioWidget();

    function injectStudioWidget() {
      if (document.getElementById('bgStudioTrigger')) return;

      const trigger = document.createElement('button');
      trigger.id = 'bgStudioTrigger';
      trigger.className = 'bg-studio-trigger';
      trigger.setAttribute('type', 'button');
      trigger.setAttribute('aria-label', 'Open Living Background & Theme Studio');
      trigger.title = 'Customize Background Visual Effects & Themes (Ctrl+B)';
      trigger.innerHTML = `
        <span class="studio-sparkle">🎨</span>
        <span>Theme & FX</span>
        <span class="studio-active-badge">${BG_THEMES[currentTheme].label.split(' ')[0]}</span>
      `;

      const panel = document.createElement('div');
      panel.id = 'bgStudioPanel';
      panel.className = 'bg-studio-panel';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.innerHTML = `
        <div class="studio-header">
          <div class="studio-title-group">
            <span style="font-size: 1.25rem;">✨</span>
            <div>
              <div class="studio-title">Living Background Studio</div>
              <div class="studio-subtitle">Dynamic reactive aurora & themes</div>
            </div>
          </div>
          <button class="studio-close-btn" id="studioCloseBtn" title="Close Studio (Esc)">✕</button>
        </div>

        <div class="studio-section-label">
          <span>🎨 Color Presets (4 Styles)</span>
        </div>
        <div class="studio-presets-grid">
          <button type="button" class="studio-preset-card ${currentTheme === 'emerald' ? 'is-active' : ''}" data-theme="emerald">
            <div class="preset-swatch emerald"></div>
            <div class="preset-info">
              <span class="preset-name">Emerald Aurora</span>
              <span class="preset-sub">Fresh Mart</span>
            </div>
            <span class="preset-check">✓</span>
          </button>

          <button type="button" class="studio-preset-card ${currentTheme === 'cyber' ? 'is-active' : ''}" data-theme="cyber">
            <div class="preset-swatch cyber"></div>
            <div class="preset-info">
              <span class="preset-name">Cyber Obsidian</span>
              <span class="preset-sub">OLED Dark Mode</span>
            </div>
            <span class="preset-check">✓</span>
          </button>

          <button type="button" class="studio-preset-card ${currentTheme === 'sunset' ? 'is-active' : ''}" data-theme="sunset">
            <div class="preset-swatch sunset"></div>
            <div class="preset-info">
              <span class="preset-name">Sunset Citrus</span>
              <span class="preset-sub">Warm Amber</span>
            </div>
            <span class="preset-check">✓</span>
          </button>

          <button type="button" class="studio-preset-card ${currentTheme === 'frost' ? 'is-active' : ''}" data-theme="frost">
            <div class="preset-swatch frost"></div>
            <div class="preset-info">
              <span class="preset-name">Frost Glass</span>
              <span class="preset-sub">Nordic Ice</span>
            </div>
            <span class="preset-check">✓</span>
          </button>
        </div>

        <div class="studio-section-label">
          <span>⚡ Canvas & Physics FX</span>
        </div>
        <div class="studio-toggles">
          <div class="studio-toggle-row">
            <div class="studio-toggle-label">
              <span>✨</span>
              <span>Constellations & Stardust</span>
            </div>
            <label class="studio-switch">
              <input type="checkbox" id="toggleParticlesCheck" ${fxSettings.particles ? 'checked' : ''}>
              <span class="studio-slider"></span>
            </label>
          </div>

          <div class="studio-toggle-row">
            <div class="studio-toggle-label">
              <span>💫</span>
              <span>Interactive Click Ripple</span>
            </div>
            <label class="studio-switch">
              <input type="checkbox" id="toggleRippleCheck" ${fxSettings.ripple ? 'checked' : ''}>
              <span class="studio-slider"></span>
            </label>
          </div>
        </div>

        <div class="studio-section-label">
          <span>🌊 Aurora Wave Velocity</span>
        </div>
        <div class="studio-speed-group">
          <button type="button" class="studio-speed-btn ${fxSettings.speed === 'relaxed' ? 'is-active' : ''}" data-speed="relaxed">Relaxed</button>
          <button type="button" class="studio-speed-btn ${fxSettings.speed === 'normal' ? 'is-active' : ''}" data-speed="normal">Normal</button>
          <button type="button" class="studio-speed-btn ${fxSettings.speed === 'vibrant' ? 'is-active' : ''}" data-speed="vibrant">Vibrant</button>
        </div>

        <div class="studio-actions">
          <button type="button" class="studio-btn-random" id="studioRandomBtn">
            <span>🎲</span>
            <span>Surprise Me</span>
          </button>
          <button type="button" class="studio-btn-reset" id="studioResetBtn" title="Reset defaults">
            <span>Reset</span>
          </button>
        </div>
      `;

      document.body.appendChild(trigger);
      document.body.appendChild(panel);

      function toggleStudio(open) {
        const isOpen = open !== undefined ? open : !panel.classList.contains('is-open');
        panel.classList.toggle('is-open', isOpen);
      }

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStudio();
      });

      const closeBtn = panel.querySelector('#studioCloseBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleStudio(false);
        });
      }

      document.addEventListener('click', (e) => {
        if (panel.classList.contains('is-open') && !panel.contains(e.target) && !trigger.contains(e.target)) {
          toggleStudio(false);
        }
      });

      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey && e.key.toLowerCase() === 'b') || (e.altKey && e.key.toLowerCase() === 't')) {
          e.preventDefault();
          toggleStudio();
        } else if (e.key === 'Escape' && panel.classList.contains('is-open')) {
          toggleStudio(false);
        }
      });

      panel.querySelectorAll('.studio-preset-card').forEach(card => {
        card.addEventListener('click', () => {
          const t = card.dataset.theme;
          applyTheme(t, true);
        });
      });

      const particlesCheck = panel.querySelector('#toggleParticlesCheck');
      if (particlesCheck) {
        particlesCheck.addEventListener('change', (e) => {
          if (bgCanvasEngine) bgCanvasEngine.toggleParticles(e.target.checked);
        });
      }

      const rippleCheck = panel.querySelector('#toggleRippleCheck');
      if (rippleCheck) {
        rippleCheck.addEventListener('change', (e) => {
          fxSettings.ripple = e.target.checked;
          saveFx();
        });
      }

      panel.querySelectorAll('.studio-speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          applySpeed(btn.dataset.speed);
        });
      });

      const randomBtn = panel.querySelector('#studioRandomBtn');
      if (randomBtn) {
        randomBtn.addEventListener('click', () => {
          const themes = Object.keys(BG_THEMES);
          const speeds = ['relaxed', 'normal', 'vibrant'];
          const pickedTheme = themes[Math.floor(Math.random() * themes.length)];
          const pickedSpeed = speeds[Math.floor(Math.random() * speeds.length)];

          applyTheme(pickedTheme);
          applySpeed(pickedSpeed);

          triggerConfetti();
          showToast(`Surprise: ${BG_THEMES[pickedTheme].label} (${pickedSpeed} flow)!`, 'success');
        });
      }

      const resetBtn = panel.querySelector('#studioResetBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          applyTheme('emerald');
          applySpeed('normal');
          if (particlesCheck) {
            particlesCheck.checked = true;
            if (bgCanvasEngine) bgCanvasEngine.toggleParticles(true);
          }
          if (rippleCheck) {
            rippleCheck.checked = true;
            fxSettings.ripple = true;
            saveFx();
          }
          showToast('Theme & FX restored to signature defaults!', 'info');
        });
      }
    }

    // Cross-tab sync for themes
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEYS.THEME && e.newValue) {
        applyTheme(e.newValue);
      } else if (e.key === STORAGE_KEYS.BG_FX && e.newValue) {
        try {
          const fx = JSON.parse(e.newValue);
          if (fx.speed) applySpeed(fx.speed);
          if (bgCanvasEngine && typeof fx.particles === 'boolean') {
            bgCanvasEngine.toggleParticles(fx.particles);
          }
        } catch (err) {}
      }
    });

    // Expose API on window
    window.VichThemeStudio = {
      setTheme: applyTheme,
      getTheme: () => currentTheme,
      setSpeed: applySpeed,
      toggleParticles: (enable) => { if (bgCanvasEngine) bgCanvasEngine.toggleParticles(enable); }
    };
  }

  // Pro Ambient Cursor Spotlight Orb
  function initProCursorSpotlight() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let orb = document.getElementById('cursorSpotlightOrb');
    if (!orb) {
      orb = document.createElement('div');
      orb.id = 'cursorSpotlightOrb';
      orb.className = 'cursor-spotlight-orb';
      document.body.appendChild(orb);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX;
    let orbY = mouseY;
    let isTracking = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isTracking) {
        isTracking = true;
        orb.classList.add('active');
      }

      const isInteractive = !!e.target.closest('button, a, .product-card, .pro-poster-card, .pin-key, input, select, .portal-cat-card');
      orb.classList.toggle('hovering-interactive', isInteractive);
    });

    window.addEventListener('mouseleave', () => {
      orb.classList.remove('active');
    });

    function renderOrb() {
      orbX += (mouseX - orbX) * 0.14;
      orbY += (mouseY - orbY) * 0.14;
      orb.style.transform = `translate3d(${orbX.toFixed(1)}px, ${orbY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderOrb);
    }
    requestAnimationFrame(renderOrb);
  }

  // Hero 3D Floating Elements with Smooth Parallax
  function initHeroParallax() {
    const hero = document.querySelector('.hero-section, .portal-hero');
    if (!hero) return;

    const floatItems = hero.querySelectorAll('.float-item');
    if (floatItems.length === 0) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

      floatItems.forEach((item, idx) => {
        const depth = (idx % 3 + 1) * 14;
        const moveX = xNorm * depth;
        const moveY = yNorm * depth;
        item.style.transform = `translate(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      floatItems.forEach(item => {
        item.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // Floating Scroll-To-Top Button with Circular SVG Progress Ring
  function initScrollProgress() {
    if (document.getElementById('scrollProgressBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'scrollProgressBtn';
    btn.className = 'scroll-progress-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.title = 'Scroll to top';
    btn.innerHTML = `
      <svg class="scroll-progress-svg" viewBox="0 0 36 36">
        <path class="scroll-progress-circle-bg"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        <path class="scroll-progress-circle-bar" id="scrollProgressCircleBar"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      </svg>
      <span class="scroll-progress-icon">↑</span>
    `;
    document.body.appendChild(btn);

    const circleBar = document.getElementById('scrollProgressCircleBar');

    function updateScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (circleBar) {
        circleBar.style.strokeDashoffset = Math.max(0, 100 - scrollPercent);
      }

      if (scrollTop > 220) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===================================================================
  // HORIZONTAL CAROUSEL SCROLL & MOUSE DRAG HELPERS
  // ===================================================================
  function scrollContainerBy(containerOrId, direction) {
    const container = typeof containerOrId === 'string' ? document.getElementById(containerOrId) : containerOrId;
    if (!container) return;
    const scrollAmount = Math.max(300, container.clientWidth * 0.75);
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }

  function scrollAisle(catKey, direction) {
    const aisleTrack = document.getElementById(`aisle-scroll-${catKey}`);
    if (aisleTrack) {
      scrollContainerBy(aisleTrack, direction);
    }
  }

  function setViewMode(mode) {
    state.viewMode = mode;
    renderProductsGrid();
  }

  function jumpToAisle(aisleName) {
    if (aisleName === 'all') {
      setCategoryFilter('all');
      const catalog = document.getElementById('storeProductsSection') || document.getElementById('storeCatalogSection');
      if (catalog) {
        const targetY = catalog.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
      return;
    }

    if (state.viewMode === 'aisles' && state.filterCategory === 'all' && !state.searchQuery.trim()) {
      const catKey = aisleName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const aisleEl = document.getElementById(`aisle-${catKey}`);
      if (aisleEl) {
        const targetY = aisleEl.getBoundingClientRect().top + window.pageYOffset - 130;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        return;
      }
    }

    setCategoryFilter(aisleName);
  }

  function makeHorizontalScrollable(slider) {
    if (!slider || slider._hasDragScroll) return;
    slider._hasDragScroll = true;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    slider.addEventListener('mousedown', (e) => {
      if (e.button !== 0 || e.target.closest('button, a, input, select')) return;
      isDown = true;
      slider.classList.add('is-dragging');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        slider.classList.remove('is-dragging');
      }
    });

    slider.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        slider.classList.remove('is-dragging');
      }
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  // ===================================================================
  // 20% SCROLL-TRIGGERED PRODUCTS REVEAL, PROGRESS HUD & SCROLLSPY
  // ===================================================================
  function init20PercentScrollReveal() {
    const productsSection = document.getElementById('storeProductsSection') || document.getElementById('storeCatalogSection');
    const hud = document.getElementById('scrollGateHud');
    const statusText = document.getElementById('scrollGateStatus');
    const subText = document.getElementById('scrollGateSub');
    const icon = document.getElementById('scrollGateIcon');
    const meterLabel = document.getElementById('scrollGateMeterLabel');
    const progressFill = document.getElementById('scrollGateProgressFill');
    const revealBtn = document.getElementById('btnScrollRevealNow');
    const revealBtnText = document.getElementById('btnScrollRevealText');
    const globalBar = document.getElementById('globalScrollProgressBar');
    const catSection = document.getElementById('categorySection');
    const aisleDock = document.getElementById('aisleScrollDock');

    if (!productsSection && !hud) return;

    // Ensure products section is always visible
    if (productsSection) {
      productsSection.classList.remove('is-locked');
      productsSection.classList.add('is-revealed');
    }

    let wasUnlocked = false;

    function evaluateScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // 1. Top Global Glowing Scroll Progress Bar
      if (globalBar) {
        globalBar.style.width = `${Math.min(100, Math.max(0, scrollPercent)).toFixed(1)}%`;
      }

      // 2. Sticky Category Bar when scrolled past hero
      if (catSection) {
        const isSticky = scrollTop > 460;
        catSection.classList.toggle('is-sticky', isSticky);
      }

      // 3. Floating Aisle Navigation Dock & Scrollspy
      if (aisleDock) {
        const showDock = scrollTop > 520;
        aisleDock.classList.toggle('is-visible', showDock);

        if (showDock) {
          const aisleRows = document.querySelectorAll('.aisle-showcase-row');
          let currentAisle = 'all';
          aisleRows.forEach(row => {
            const rect = row.getBoundingClientRect();
            if (rect.top <= 240 && rect.bottom >= 120) {
              currentAisle = row.dataset.aisle || 'all';
            }
          });

          aisleDock.querySelectorAll('.dock-aisle-pill').forEach(pill => {
            pill.classList.toggle('active', pill.dataset.aisle === currentAisle);
          });
        }
      }

      // 4. Scroll Gate HUD meter calculation
      const isPast20 = scrollPercent >= 16.0;
      const ratioTo20 = Math.min(100, (scrollPercent / 20) * 100);

      if (progressFill) {
        progressFill.style.width = `${Math.min(100, Math.max(0, ratioTo20)).toFixed(1)}%`;
      }

      if (meterLabel) {
        meterLabel.textContent = `Scroll: ${Math.min(100, Math.round(scrollPercent))}% / 20%`;
      }

      if (isPast20) {
        if (!wasUnlocked) {
          wasUnlocked = true;
          if (hud) hud.classList.add('is-unlocked');
          if (statusText) statusText.textContent = '✨ Products Unlocked! Showing Fresh Goods Below';
          if (subText) subText.textContent = 'Explore our 6 fresh aisles with smooth horizontal scrolling or multi-column grid.';
          if (icon) icon.textContent = '🔓';
          if (revealBtnText) revealBtnText.textContent = 'Explore Goods ↓';
        }
      } else {
        if (wasUnlocked) {
          wasUnlocked = false;
          if (hud) hud.classList.remove('is-unlocked');
          if (statusText) statusText.textContent = 'Scroll down to browse our 6 signature fresh aisles';
          if (subText) subText.textContent = 'Explore hero & billboard posters above, or jump down to discover fresh mart items';
          if (icon) icon.textContent = '🛒';
          if (revealBtnText) revealBtnText.textContent = 'Explore Goods ↓';
        }
      }
    }

    window.addEventListener('scroll', evaluateScroll, { passive: true });
    evaluateScroll(); // Initial check

    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        const targetEl = document.getElementById('storeProductsSection') || document.getElementById('storeCatalogSection');
        if (targetEl) {
          const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      });
    }
  }

  // ===================================================================
  // 4. PORTAL GATEWAY HUB LOGIC (index.html)
  // ===================================================================
  function renderPortalHub() {
    const totalCount = state.products.length;
    const inventoryVal = state.products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const activeCats = new Set(state.products.map(p => p.category)).size;
    const inStockItems = state.products.filter(p => p.stock > 0).length;
    const inStockRate = totalCount > 0 ? Math.round((inStockItems / totalCount) * 100) : 100;

    safeText('portalTotalProducts', totalCount);
    safeText('portalInventoryValue', `$${inventoryVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    safeText('portalActiveAisles', activeCats);
    safeText('portalInStockCount', `${inStockRate}%`);
    safeText('portalSyncTime', 'Synced ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    // Update category card preview counts
    const counts = {};
    state.products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    ['Drink', 'Cookie', 'Beer', 'Vegetable', 'Beef', 'Food'].forEach(cat => {
      const el = document.getElementById(`portalCount${cat}`);
      if (el) {
        el.textContent = `${counts[cat] || 0} products`;
      }
    });

    init3DCardPhysics();
    initHeroParallax();
  }

  // ===================================================================
  // 5. ADMINISTRATOR SECURITY PIN LOCK (admin.html)
  // ===================================================================
  function isAdminAuthenticated() {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH_SESSION) === 'true' ||
           localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH_LOCAL) === 'true';
  }

  function setAdminAuthenticated(remember = true) {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH_SESSION, 'true');
    if (remember) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH_LOCAL, 'true');
    }
  }

  function lockAdmin() {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH_SESSION);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH_LOCAL);
    const overlay = document.getElementById('adminLockOverlay');
    const pinInput = document.getElementById('adminPinInput');
    if (overlay) {
      overlay.classList.remove('hidden');
    }
    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }
    showToast('Administrator session locked.', 'info');
  }

  function checkAdminLockState() {
    const overlay = document.getElementById('adminLockOverlay');
    if (!overlay) return;

    if (isAdminAuthenticated()) {
      overlay.classList.add('hidden');
      renderAdminDashboard();
    } else {
      overlay.classList.remove('hidden');
      const pinInput = document.getElementById('adminPinInput');
      if (pinInput) {
        pinInput.value = '';
        setTimeout(() => pinInput.focus(), 150);
      }
    }
  }

  function verifyAdminPin() {
    const pinInput = document.getElementById('adminPinInput');
    const errorAlert = document.getElementById('pinErrorAlert');
    const lockCard = document.getElementById('adminLockCard');
    const overlay = document.getElementById('adminLockOverlay');
    const rememberCheckbox = document.getElementById('pinRememberCheckbox');

    if (!pinInput) return;
    const enteredPin = pinInput.value.trim();
    const storedPin = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_PIN;

    if (enteredPin === storedPin) {
      if (errorAlert) errorAlert.style.display = 'none';
      setAdminAuthenticated(rememberCheckbox ? rememberCheckbox.checked : true);

      // Level Developer Pro Lens Flare Flash
      const flare = document.createElement('div');
      flare.className = 'unlock-lens-flare';
      document.body.appendChild(flare);
      setTimeout(() => flare.remove(), 800);

      triggerConfetti({ count: 90 });

      if (overlay) {
        overlay.classList.add('unlocking');
        setTimeout(() => {
          overlay.classList.remove('unlocking');
          overlay.classList.add('hidden');
        }, 550);
      }
      showToast('Welcome, Administrator! Portal unlocked.', 'success');
      renderAdminDashboard();
    } else {
      if (errorAlert) {
        errorAlert.style.display = 'block';
        errorAlert.textContent = '✕ Incorrect passcode. Try default: ' + DEFAULT_PIN;
      }
      if (lockCard) {
        lockCard.classList.remove('shake');
        void lockCard.offsetWidth; // trigger reflow
        lockCard.classList.add('shake');
      }
      pinInput.value = '';
      pinInput.focus();
    }
  }

  // ===================================================================
  // 6. STOREFRONT RENDERING & FILTERING (user.html)
  // ===================================================================
  function parseUrlParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('category')) {
        const cat = params.get('category');
        if (cat) state.filterCategory = cat;
      }
      if (params.has('search')) {
        const q = params.get('search');
        if (q) {
          state.searchQuery = q;
          const searchInput = document.getElementById('searchInput');
          if (searchInput) searchInput.value = q;
          const clearBtn = document.getElementById('clearSearchBtn');
          if (clearBtn) clearBtn.style.display = 'flex';
        }
      }
    } catch (e) {
      console.warn('URL param parse error:', e);
    }
  }

  function renderStorefront() {
    renderCategoryPills();
    renderProductsGrid();
    updateCartUI();
  }

  const CATEGORY_REAL_PICS = {
    all: 'images/cat_all_mart.jpg',
    Drink: 'images/drink_orange_juice.jpg',
    Cookie: 'images/cookie_chocolate_chunks.jpg',
    Beer: 'images/beer_silver_lager.jpg',
    Vegetable: 'images/veg_romaine_lettuce.jpg',
    Beef: 'images/beef_wagyu_sirloin.jpg',
    Food: 'images/food_salmon_poke.jpg'
  };

  function renderCategoryPills() {
    const container = document.getElementById('categoryPills');
    if (!container) return;

    const counts = { all: state.products.length };
    state.products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    ['all', 'Drink', 'Cookie', 'Beer', 'Vegetable', 'Beef', 'Food'].forEach(cat => {
      const el = document.getElementById('count' + (cat === 'all' ? 'All' : cat));
      if (el) el.textContent = counts[cat] || 0;
    });

    safeText('heroTotalProductsCount', state.products.length);

    // Custom categories
    const defaultCats = ['all', 'Drink', 'Cookie', 'Beer', 'Vegetable', 'Beef', 'Food'];
    container.querySelectorAll('.cat-pill-custom').forEach(p => p.remove());

    const allCats = [...new Set(state.products.map(p => p.category))];
    allCats.forEach(cat => {
      if (!defaultCats.includes(cat)) {
        const pill = document.createElement('button');
        pill.className = `cat-pill cat-pill-custom ${state.filterCategory === cat ? 'active' : ''}`;
        pill.dataset.category = cat;
        const catThumb = CATEGORY_REAL_PICS[cat] || 'images/cat_all_mart.jpg';
        pill.innerHTML = `
          <span class="cat-icon-thumb"><img src="${catThumb}" alt="${escapeHtml(cat)}"></span>
          <span class="cat-name">${escapeHtml(cat)}</span>
          <span class="cat-pill-count">${counts[cat] || 0}</span>
        `;
        pill.addEventListener('click', () => setCategoryFilter(cat));
        container.appendChild(pill);
      }
    });

    container.querySelectorAll('.cat-pill').forEach(pill => {
      if (pill.dataset.category === state.filterCategory) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  function setCategoryFilter(category) {
    state.filterCategory = category;
    renderCategoryPills();
    renderProductsGrid();
    updateFilterChips();

    // Smooth horizontal center active category pill
    const container = document.getElementById('categoryPills');
    if (container) {
      const activePill = container.querySelector(`.cat-pill[data-category="${category}"]`);
      if (activePill) {
        const pillLeft = activePill.offsetLeft;
        const pillWidth = activePill.offsetWidth;
        const containerWidth = container.offsetWidth;
        container.scrollTo({
          left: pillLeft - (containerWidth / 2) + (pillWidth / 2),
          behavior: 'smooth'
        });
      }
    }

    // Smooth scroll down to catalog if near top
    const targetEl = document.getElementById('storeProductsSection') || document.getElementById('storeCatalogSection');
    if (targetEl) {
      const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 90;
      if (window.pageYOffset < targetPos - 40) {
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
  }

  function getFilteredProducts() {
    let list = [...state.products];

    if (state.filterCategory !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === state.filterCategory.toLowerCase());
    }

    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.unit && p.unit.toLowerCase().includes(q))
      );
    }

    if (state.stockFilter === 'in-stock') {
      list = list.filter(p => p.stock > 0);
    }

    switch (state.sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'stock-desc':
        list.sort((a, b) => b.stock - a.stock);
        break;
      case 'featured':
      default:
        break;
    }

    return list;
  }

  const CATEGORY_META = {
    Drink: { icon: '🥤', name: 'Cold Drinks', tagline: 'Chilled, Fresh & Cold-Pressed Juices' },
    Cookie: { icon: '🍪', name: 'Artisan Cookies', tagline: 'Oven-Baked Treats & Buttery Wafers' },
    Beer: { icon: '🍺', name: 'Craft Beers', tagline: 'Ice-Frosted Lagers & Mountain IPAs' },
    Vegetable: { icon: '🥦', name: 'Farm Greens', tagline: 'Dewy Fresh & Organic Crisp Harvest' },
    Beef: { icon: '🥩', name: 'Butcher Beef', tagline: 'Prime Hand-Cut Ribeye & Wagyu Sirloin' },
    Food: { icon: '🍱', name: 'Chef Prepared', tagline: 'Kitchen Fresh Bowls & Herb Rotisserie' }
  };

  function renderProductCardHtml(prod, index = 0) {
    const inCartQty = state.cart[prod.id] || 0;
    const isOutOfStock = prod.stock <= 0;
    const isLowStock = prod.stock > 0 && prod.stock <= 5;

    let badgeHtml = '';
    if (prod.badge) {
      const badgeClass = 'badge-' + prod.badge.toLowerCase().replace(/[^a-z0-9]/g, '');
      badgeHtml = `<span class="product-badge-tag ${badgeClass}">${escapeHtml(prod.badge)}</span>`;
    }

    let stockHtml = '';
    if (isOutOfStock) {
      stockHtml = `<span class="stock-indicator stock-out"><span class="status-radar-dot"></span> Out of stock</span>`;
    } else if (isLowStock) {
      stockHtml = `<span class="stock-indicator stock-low"><span class="status-radar-dot"></span> Only ${prod.stock} left!</span>`;
    } else {
      stockHtml = `<span class="stock-indicator stock-good"><span class="status-radar-dot"></span> In Stock (${prod.stock})</span>`;
    }

    let actionBtnHtml = '';
    if (isOutOfStock) {
      actionBtnHtml = `<button class="btn-add-cart" disabled>Sold Out</button>`;
    } else if (inCartQty > 0) {
      actionBtnHtml = `
        <div class="card-stepper">
          <button class="card-stepper-btn" onclick="VichApp.updateCartQuantity('${prod.id}', -1)" title="Decrease">－</button>
          <span class="card-stepper-val">${inCartQty}</span>
          <button class="card-stepper-btn" onclick="VichApp.updateCartQuantity('${prod.id}', 1)" title="Increase" ${inCartQty >= prod.stock ? 'disabled' : ''}>＋</button>
        </div>
      `;
    } else {
      actionBtnHtml = `
        <button class="btn-add-cart" onclick="VichApp.addToCart('${prod.id}', 1, this)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>Add</span>
        </button>
      `;
    }

    return `
      <div class="product-card" data-id="${prod.id}" style="animation-delay: ${index * 45}ms;">
        <div class="card-glare-effect"></div>
        <div class="product-thumb-box" onclick="VichApp.openQuickView('${prod.id}')">
          ${badgeHtml}
          <img class="product-image" src="${escapeHtml(prod.imageUrl)}" alt="${escapeHtml(prod.title)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'">
          <button class="product-quick-view-btn">Quick View</button>
        </div>
        <div class="product-body">
          <div class="product-category-meta">
            <span class="cat-text">${escapeHtml(prod.category)}</span>
            <span class="unit-text">${escapeHtml(prod.unit || 'unit')}</span>
          </div>
          <h4 class="product-title" onclick="VichApp.openQuickView('${prod.id}')" style="cursor: pointer;">${escapeHtml(prod.title)}</h4>
          <p class="product-desc">${escapeHtml(prod.description || '')}</p>
          <div class="product-footer">
            <div class="product-price-block">
              <span class="price-currency">USD</span>
              <span class="price-value">$${prod.price.toFixed(2)}</span>
              ${stockHtml}
            </div>
            <div class="product-action-box">
              ${actionBtnHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderProductsGrid() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const emptyState = document.getElementById('emptyState') || document.getElementById('productsEmptyState');
    const catalogCount = document.getElementById('catalogCountDisplay') || document.getElementById('productsFoundCount');
    const catalogHeading = document.getElementById('catalogHeading');

    // Update view mode toggle active buttons
    const btnAisles = document.getElementById('btnViewAisles');
    const btnGrid = document.getElementById('btnViewGrid');
    if (btnAisles && btnGrid) {
      if (state.viewMode === 'aisles') {
        btnAisles.classList.add('active');
        btnGrid.classList.remove('active');
      } else {
        btnGrid.classList.add('active');
        btnAisles.classList.remove('active');
      }
    }

    const filtered = getFilteredProducts();

    if (catalogHeading) {
      catalogHeading.textContent = state.filterCategory === 'all' ? 'All Fresh Goods' : `${state.filterCategory} Aisle`;
    }
    if (catalogCount) {
      catalogCount.textContent = `Showing ${filtered.length} of ${state.products.length} products`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // AISLE SCROLL VIEW MODE (Default when viewing All Products and not searching)
    const isAisleView = state.viewMode === 'aisles' && state.filterCategory === 'all' && !state.searchQuery.trim();

    if (isAisleView) {
      grid.classList.add('aisles-mode');
      grid.classList.remove('standard-grid');

      const categoriesOrder = ['Drink', 'Cookie', 'Beer', 'Vegetable', 'Beef', 'Food'];
      const extraCategories = [...new Set(state.products.map(p => p.category))].filter(c => !categoriesOrder.includes(c));
      const allCategories = [...categoriesOrder, ...extraCategories];

      let aisleHtml = '';
      allCategories.forEach(cat => {
        const catProds = filtered.filter(p => p.category.toLowerCase() === cat.toLowerCase());
        if (catProds.length === 0) return;

        const meta = CATEGORY_META[cat] || { icon: '🏷️', name: `${cat} Goods`, tagline: `Fresh ${cat} selections` };
        const catKey = cat.toLowerCase().replace(/[^a-z0-9]/g, '');

        aisleHtml += `
          <div class="aisle-showcase-row" id="aisle-${catKey}" data-aisle="${cat}">
            <div class="aisle-showcase-header">
              <div class="aisle-header-left">
                <span class="aisle-icon">${meta.icon}</span>
                <div class="aisle-info">
                  <h4 class="aisle-name">${escapeHtml(cat)} Aisle</h4>
                  <span class="aisle-tagline">${escapeHtml(meta.tagline)} • ${catProds.length} item${catProds.length > 1 ? 's' : ''}</span>
                </div>
              </div>
              <div class="aisle-header-right">
                <button type="button" class="btn-aisle-filter" onclick="VichApp.setCategoryFilter('${cat}')" title="Filter to ${escapeHtml(cat)} only">
                  <span>View Aisle</span>
                  <span>→</span>
                </button>
                <div class="aisle-scroll-arrows">
                  <button type="button" class="carousel-arrow-btn prev aisle-arrow-btn" onclick="VichApp.scrollAisle('${catKey}', -1)" aria-label="Scroll left" title="Scroll left">‹</button>
                  <button type="button" class="carousel-arrow-btn next aisle-arrow-btn" onclick="VichApp.scrollAisle('${catKey}', 1)" aria-label="Scroll right" title="Scroll right">›</button>
                </div>
              </div>
            </div>
            <div class="aisle-products-scroll" id="aisle-scroll-${catKey}">
              ${catProds.map((prod, idx) => renderProductCardHtml(prod, idx)).join('')}
            </div>
          </div>
        `;
      });

      grid.innerHTML = aisleHtml;

      // Attach mouse drag-to-scroll to each aisle track
      grid.querySelectorAll('.aisle-products-scroll').forEach(track => {
        makeHorizontalScrollable(track);
      });
    } else {
      // GRID VIEW MODE
      grid.classList.remove('aisles-mode');
      grid.classList.add('standard-grid');
      grid.innerHTML = filtered.map((prod, idx) => renderProductCardHtml(prod, idx)).join('');
    }

    init3DCardPhysics();
  }

  function updateFilterChips() {
    const chipsBar = document.getElementById('activeFiltersBar');
    const chipsList = document.getElementById('filterChipsList');
    if (!chipsBar || !chipsList) return;

    const chips = [];

    if (state.filterCategory !== 'all') {
      chips.push({
        label: `Category: ${state.filterCategory}`,
        clear: () => setCategoryFilter('all')
      });
    }

    if (state.searchQuery.trim()) {
      chips.push({
        label: `Search: "${state.searchQuery}"`,
        clear: () => {
          state.searchQuery = '';
          const searchInput = document.getElementById('searchInput');
          if (searchInput) searchInput.value = '';
          const clearBtn = document.getElementById('clearSearchBtn');
          if (clearBtn) clearBtn.style.display = 'none';
          renderProductsGrid();
          updateFilterChips();
        }
      });
    }

    if (state.stockFilter !== 'all') {
      chips.push({
        label: `Availability: In Stock`,
        clear: () => {
          state.stockFilter = 'all';
          const sel = document.getElementById('stockFilterSelect');
          if (sel) sel.value = 'all';
          renderProductsGrid();
          updateFilterChips();
        }
      });
    }

    if (chips.length > 0) {
      chipsBar.style.display = 'flex';
      chipsList.innerHTML = '';
      chips.forEach((chip) => {
        const item = document.createElement('span');
        item.className = 'filter-chip';
        item.innerHTML = `<span>${escapeHtml(chip.label)}</span> <span class="chip-remove">✕</span>`;
        item.querySelector('.chip-remove').addEventListener('click', chip.clear);
        chipsList.appendChild(item);
      });
    } else {
      chipsBar.style.display = 'none';
    }
  }

  // ===================================================================
  // 7. SHOPPING CART MANAGEMENT
  // ===================================================================
  function addToCart(productId, qty = 1, triggerEl = null) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const currentQty = state.cart[productId] || 0;
    if (currentQty + qty > product.stock) {
      showToast(`Cannot add more. Only ${product.stock} units available!`, 'error');
      return;
    }

    // Trigger Fly to Cart animation
    let originEl = triggerEl;
    if (!originEl) {
      const card = document.querySelector(`.product-card[data-id="${productId}"]`);
      if (card) {
        originEl = card.querySelector('.btn-add-cart') || card.querySelector('img');
      }
    }
    if (originEl) {
      triggerSparkleBurst(originEl);
      triggerFloatingPlusOne(originEl);
      flyItemToCart(originEl, product.imageUrl);
    }

    state.cart[productId] = currentQty + qty;
    saveCart();
    updateCartUI();
    renderProductsGrid();
    showToast(`Added "${product.title}" to cart!`, 'success', 2200);
  }

  function updateCartQuantity(productId, delta) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const currentQty = state.cart[productId] || 0;
    const newQty = currentQty + delta;

    if (delta > 0) {
      const card = document.querySelector(`.product-card[data-id="${productId}"]`);
      if (card) {
        const btn = card.querySelector('.card-stepper-btn:last-child') || card;
        triggerSparkleBurst(btn);
        triggerFloatingPlusOne(btn);
      }
    }

    if (newQty <= 0) {
      delete state.cart[productId];
      showToast(`Removed from cart`, 'info', 1800);
    } else if (newQty > product.stock) {
      showToast(`Only ${product.stock} available in stock!`, 'error');
      return;
    } else {
      state.cart[productId] = newQty;
    }

    saveCart();
    updateCartUI();
    renderProductsGrid();
  }

  function removeFromCart(productId) {
    if (state.cart[productId]) {
      delete state.cart[productId];
      saveCart();
      updateCartUI();
      renderProductsGrid();
      showToast('Item removed from cart', 'info', 1800);
    }
  }

  function clearCart() {
    state.cart = {};
    saveCart();
    updateCartUI();
    renderProductsGrid();
    showToast('Basket cleared', 'info');
  }

  function calculateCartTotals() {
    let subtotal = 0;
    let itemCount = 0;

    for (const [prodId, qty] of Object.entries(state.cart)) {
      const prod = state.products.find(p => p.id === prodId);
      if (prod) {
        subtotal += prod.price * qty;
        itemCount += qty;
      }
    }

    const discountAmount = subtotal * state.promoDiscount;
    const totalAfterDiscount = Math.max(0, subtotal - discountAmount);

    return {
      subtotal,
      itemCount,
      discountAmount,
      total: totalAfterDiscount
    };
  }

  function updateCartUI() {
    const { subtotal, itemCount, discountAmount, total } = calculateCartTotals();

    safeText('cartCountBadge', itemCount);
    safeText('cartTotalNav', `$${total.toFixed(2)}`);
    safeText('cartDrawerItemCount', `${itemCount} items`);
    safeText('cartSubtotal', `$${subtotal.toFixed(2)}`);
    safeText('cartTotalDisplay', `$${total.toFixed(2)}`);

    const discountRow = document.getElementById('promoDiscountRow');
    const discountVal = document.getElementById('promoDiscountVal');
    if (discountAmount > 0 && discountRow) {
      discountRow.style.display = 'flex';
      if (discountVal) discountVal.textContent = `-$${discountAmount.toFixed(2)}`;
    } else if (discountRow) {
      discountRow.style.display = 'none';
    }

    const itemsContainer = document.getElementById('cartItemsContainer');
    const emptyState = document.getElementById('cartEmptyState');
    const footer = document.getElementById('cartFooter');

    if (itemCount === 0) {
      if (itemsContainer) itemsContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footer) footer.style.display = 'flex';

    if (itemsContainer) {
      itemsContainer.innerHTML = Object.entries(state.cart).map(([prodId, qty]) => {
        const prod = state.products.find(p => p.id === prodId);
        if (!prod) return '';

        const itemTotal = (prod.price * qty).toFixed(2);
        return `
          <div class="cart-item-row" data-id="${prod.id}">
            <img class="cart-item-thumb" src="${escapeHtml(prod.imageUrl)}" alt="${escapeHtml(prod.title)}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'">
            <div class="cart-item-info">
              <h5 class="cart-item-title" title="${escapeHtml(prod.title)}">${escapeHtml(prod.title)}</h5>
              <div class="cart-item-sub">${escapeHtml(prod.category)} • ${escapeHtml(prod.unit)}</div>
              <div class="cart-item-price">$${prod.price.toFixed(2)} × ${qty} = $${itemTotal}</div>
            </div>
            <div class="cart-item-controls">
              <div class="cart-stepper">
                <button onclick="VichApp.updateCartQuantity('${prod.id}', -1)">－</button>
                <span>${qty}</span>
                <button onclick="VichApp.updateCartQuantity('${prod.id}', 1)" ${qty >= prod.stock ? 'disabled' : ''}>＋</button>
              </div>
              <button class="btn-remove-item" onclick="VichApp.removeFromCart('${prod.id}')">Remove</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function toggleCartDrawer(open) {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer || !overlay) return;

    if (open) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ===================================================================
  // 8. ADMINISTRATOR DASHBOARD & PRODUCT CRUD (admin.html)
  // ===================================================================
  function renderAdminDashboard() {
    renderAdminMetrics();
    renderAdminTable();
  }

  function renderAdminMetrics() {
    const totalCount = state.products.length;
    const inventoryVal = state.products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const lowStockCount = state.products.filter(p => p.stock <= 5).length;
    const categoriesCount = new Set(state.products.map(p => p.category)).size;

    safeText('metricTotalProducts', totalCount);
    safeText('metricInventoryValue', `$${inventoryVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    safeText('metricLowStockCount', lowStockCount);
    safeText('metricCategoriesCount', categoriesCount);

    const lowStockSub = document.getElementById('metricLowStockSub');
    if (lowStockSub) {
      lowStockSub.textContent = lowStockCount === 0 ? 'All stocks healthy' : `${lowStockCount} items need replenishment`;
    }
  }

  function renderAdminTable() {
    const tbody = document.getElementById('adminTableBody');
    const summary = document.getElementById('adminTableSummary');
    if (!tbody) return;

    let list = [...state.products];

    if (state.adminCategory !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === state.adminCategory.toLowerCase());
    }

    if (state.adminStock === 'low') {
      list = list.filter(p => p.stock > 0 && p.stock <= 5);
    } else if (state.adminStock === 'out') {
      list = list.filter(p => p.stock <= 0);
    } else if (state.adminStock === 'in') {
      list = list.filter(p => p.stock > 5);
    }

    if (state.adminSearch.trim()) {
      const q = state.adminSearch.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.price.toString().includes(q)
      );
    }

    if (summary) {
      summary.textContent = `Showing ${list.length} of ${state.products.length} products`;
    }

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">
            No matching inventory products found. Try adjusting the search or category filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map(prod => {
      let statusBadge = '';
      if (prod.stock <= 0) {
        statusBadge = `<span class="badge-status badge-status-out"><span class="status-dot"></span> Out of Stock</span>`;
      } else if (prod.stock <= 5) {
        statusBadge = `<span class="badge-status badge-status-low"><span class="status-dot"></span> Low (${prod.stock})</span>`;
      } else {
        statusBadge = `<span class="badge-status badge-status-in"><span class="status-dot"></span> In Stock (${prod.stock})</span>`;
      }

      return `
        <tr data-id="${prod.id}">
          <td>
            <img class="table-thumb" src="${escapeHtml(prod.imageUrl)}" alt="${escapeHtml(prod.title)}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'">
          </td>
          <td>
            <div class="table-product-title">${escapeHtml(prod.title)}</div>
            ${prod.badge ? `<div class="table-product-tag">${escapeHtml(prod.badge)}</div>` : ''}
          </td>
          <td>
            <span class="cat-pill" style="padding: 4px 10px; font-size: 0.76rem;">${escapeHtml(prod.category)}</span>
          </td>
          <td>
            <strong>$${prod.price.toFixed(2)}</strong>
          </td>
          <td>
            <div class="table-stock-control">
              <button class="btn-stock-adjust" onclick="VichApp.adjustProductStock('${prod.id}', -1)" title="Decrease stock">－</button>
              <strong style="min-width: 28px; text-align: center;">${prod.stock}</strong>
              <button class="btn-stock-adjust" onclick="VichApp.adjustProductStock('${prod.id}', 1)" title="Increase stock">＋</button>
            </div>
          </td>
          <td>
            <span class="unit-text">${escapeHtml(prod.unit || '-')}</span>
          </td>
          <td>
            ${statusBadge}
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-action-edit" onclick="VichApp.openEditProductModal('${prod.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <span>Edit</span>
              </button>
              <button class="btn-action-delete" onclick="VichApp.deleteProduct('${prod.id}')" title="Delete product">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function adjustProductStock(productId, delta) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    prod.stock = Math.max(0, prod.stock + delta);
    saveProducts();
    renderAdminDashboard();
    renderProductsGrid();
    showToast(`Updated stock for "${prod.title}" to ${prod.stock}`, 'info', 1500);
  }

  function deleteProduct(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    if (confirm(`Are you sure you want to delete "${prod.title}" from Vich Shop inventory?`)) {
      state.products = state.products.filter(p => p.id !== productId);
      if (state.cart[productId]) {
        delete state.cart[productId];
        saveCart();
      }
      saveProducts();
      renderAdminDashboard();
      renderProductsGrid();
      showToast(`Deleted "${prod.title}"`, 'info');
    }
  }

  // Add / Edit Product Modal
  function openAddProductModal() {
    const modal = document.getElementById('productModalBackdrop');
    const form = document.getElementById('productForm');
    if (!modal || !form) return;

    form.reset();
    safeValue('formProductId', '');
    safeValue('formCategory', 'Drink');
    const customInput = document.getElementById('formCustomCategory');
    if (customInput) customInput.style.display = 'none';

    safeText('productModalTitle', 'Input New Product to Vich Shop');
    safeText('btnSaveProductText', 'Save Product to Inventory');

    updatePresetImages('Drink');
    updateFormImagePreview('');

    modal.classList.add('active');
    const titleInput = document.getElementById('formTitle');
    if (titleInput) titleInput.focus();
  }

  function openEditProductModal(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById('productModalBackdrop');
    if (!modal) return;

    safeValue('formProductId', prod.id);
    safeValue('formTitle', prod.title);

    const catSelect = document.getElementById('formCategory');
    const customCatInput = document.getElementById('formCustomCategory');
    const isStandardCat = ['Drink', 'Cookie', 'Beer', 'Vegetable', 'Beef', 'Food'].includes(prod.category);

    if (catSelect && customCatInput) {
      if (isStandardCat) {
        catSelect.value = prod.category;
        customCatInput.style.display = 'none';
        customCatInput.value = '';
      } else {
        catSelect.value = 'custom';
        customCatInput.style.display = 'block';
        customCatInput.value = prod.category;
      }
    }

    safeValue('formPrice', prod.price);
    safeValue('formStock', prod.stock);
    safeValue('formUnit', prod.unit || '');
    safeValue('formBadge', prod.badge || '');
    safeValue('formImageUrl', prod.imageUrl || '');
    safeValue('formDescription', prod.description || '');

    safeText('productModalTitle', `Edit Product: ${prod.title}`);
    safeText('btnSaveProductText', 'Update Product Details');

    updatePresetImages(prod.category);
    updateFormImagePreview(prod.imageUrl);

    modal.classList.add('active');
  }

  function closeProductModal() {
    const modal = document.getElementById('productModalBackdrop');
    if (modal) modal.classList.remove('active');
  }

  function updatePresetImages(category) {
    const container = document.getElementById('presetImagesContainer');
    if (!container) return;

    const presets = PRESET_IMAGES[category] || PRESET_IMAGES['Drink'];
    container.innerHTML = presets.map(p => `
      <button type="button" class="preset-pill-btn" onclick="VichApp.selectPresetImage('${escapeHtml(p.url)}')">
        ${escapeHtml(p.name)}
      </button>
    `).join('');
  }

  function selectPresetImage(url) {
    safeValue('formImageUrl', url);
    updateFormImagePreview(url);
  }

  function updateFormImagePreview(url) {
    const previewImg = document.getElementById('formImagePreview');
    const placeholder = document.getElementById('previewPlaceholder');
    if (!previewImg || !placeholder) return;

    if (url && url.trim()) {
      previewImg.src = url;
      previewImg.style.display = 'block';
      placeholder.style.display = 'none';
      previewImg.onerror = () => {
        previewImg.style.display = 'none';
        placeholder.style.display = 'block';
      };
    } else {
      previewImg.style.display = 'none';
      placeholder.style.display = 'block';
    }
  }

  function handleProductFormSubmit(e) {
    e.preventDefault();

    const idInput = document.getElementById('formProductId')?.value;
    const title = document.getElementById('formTitle')?.value.trim();
    const catSelect = document.getElementById('formCategory')?.value;
    const customCat = document.getElementById('formCustomCategory')?.value.trim();
    const price = parseFloat(document.getElementById('formPrice')?.value);
    const stock = parseInt(document.getElementById('formStock')?.value, 10);
    const unit = document.getElementById('formUnit')?.value.trim();
    const badge = document.getElementById('formBadge')?.value;
    let imageUrl = document.getElementById('formImageUrl')?.value.trim();
    const description = document.getElementById('formDescription')?.value.trim();

    if (!title) {
      showToast('Please enter a product title', 'error');
      return;
    }
    if (isNaN(price) || price <= 0) {
      showToast('Please enter a valid price greater than 0', 'error');
      return;
    }
    if (isNaN(stock) || stock < 0) {
      showToast('Please enter a valid stock quantity (0 or more)', 'error');
      return;
    }

    const category = catSelect === 'custom' ? (customCat || 'Other') : catSelect;

    if (!imageUrl) {
      const presets = PRESET_IMAGES[category] || PRESET_IMAGES['Drink'];
      imageUrl = presets[0]?.url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
    }

    if (idInput) {
      // UPDATE EXISTING
      const index = state.products.findIndex(p => p.id === idInput);
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          title,
          category,
          price,
          stock,
          unit: unit || '1 unit',
          badge,
          imageUrl,
          description
        };
        showToast(`Product "${title}" updated successfully!`, 'success');
      }
    } else {
      // CREATE NEW
      const newProduct = {
        id: 'prod-' + Date.now(),
        title,
        category,
        price,
        stock,
        unit: unit || '1 unit',
        badge,
        imageUrl,
        description
      };
      state.products.unshift(newProduct);
      showToast(`New product "${title}" added to Vich Shop!`, 'success');
    }

    saveProducts();
    closeProductModal();
    renderAdminDashboard();
    renderProductsGrid();
    renderCategoryPills();
  }

  // ===================================================================
  // 9. QUICK VIEW MODAL (user.html)
  // ===================================================================
  function openQuickView(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById('quickViewBackdrop');
    const badge = document.getElementById('qvCategoryBadge');
    const body = document.getElementById('quickViewBody');
    if (!modal || !body) return;

    if (badge) badge.textContent = `${prod.category} • ${prod.badge || 'Fresh'}`;

    const isOutOfStock = prod.stock <= 0;
    let stockText = `<span class="stock-indicator stock-good"><span class="status-radar-dot"></span> In Stock (${prod.stock} available)</span>`;
    if (isOutOfStock) {
      stockText = `<span class="stock-indicator stock-out"><span class="status-radar-dot"></span> Out of stock</span>`;
    } else if (prod.stock <= 5) {
      stockText = `<span class="stock-indicator stock-low"><span class="status-radar-dot"></span> Low Stock (Only ${prod.stock} left!)</span>`;
    }

    body.innerHTML = `
      <div class="qv-image-box">
        <img src="${escapeHtml(prod.imageUrl)}" alt="${escapeHtml(prod.title)}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'">
      </div>
      <div>
        <h2 class="qv-title">${escapeHtml(prod.title)}</h2>
        <div class="qv-pricing" style="margin-top: 8px;">
          <span class="qv-price">$${prod.price.toFixed(2)}</span>
          <span class="qv-unit">per ${escapeHtml(prod.unit || 'unit')}</span>
        </div>
      </div>
      <div class="qv-stock-bar">
        ${stockText}
      </div>
      <p class="qv-desc">${escapeHtml(prod.description || 'Fresh daily goods selected with care for Vich Shop customers.')}</p>
      <div class="qv-actions">
        <button class="btn-primary" style="flex: 1;" onclick="VichApp.addToCart('${prod.id}', 1, this); VichApp.closeQuickView();" ${isOutOfStock ? 'disabled' : ''}>
          ${isOutOfStock ? 'Currently Out of Stock' : '+ Add Item to Cart'}
        </button>
      </div>
    `;

    modal.classList.add('active');

    const qvBox = body.querySelector('.qv-image-box');
    const qvImg = body.querySelector('.qv-image-box img');
    if (qvBox && qvImg) {
      qvBox.addEventListener('mousemove', (e) => {
        const rect = qvBox.getBoundingClientRect();
        const xPercent = (e.clientX - rect.left) / rect.width;
        const yPercent = (e.clientY - rect.top) / rect.height;
        const moveX = (0.5 - xPercent) * 28;
        const moveY = (0.5 - yPercent) * 28;
        qvImg.style.transform = `scale(1.2) translate(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px)`;
      });
      qvBox.addEventListener('mouseleave', () => {
        qvImg.style.transform = 'scale(1) translate(0, 0)';
      });
    }
  }

  function closeQuickView() {
    const modal = document.getElementById('quickViewBackdrop');
    if (modal) modal.classList.remove('active');
  }

  // ===================================================================
  // 10. CHECKOUT & RECEIPT (user.html)
  // ===================================================================
  function openCheckoutModal() {
    const { itemCount, total } = calculateCartTotals();
    if (itemCount === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    toggleCartDrawer(false);

    const modal = document.getElementById('checkoutBackdrop');
    const formSection = document.getElementById('checkoutFormSection');
    const receiptSection = document.getElementById('checkoutReceiptSection');
    const itemsMini = document.getElementById('checkoutItemsList');
    if (!modal) return;

    if (formSection) formSection.style.display = 'block';
    if (receiptSection) receiptSection.style.display = 'none';

    safeText('checkoutFinalAmount', `$${total.toFixed(2)}`);

    if (itemsMini) {
      itemsMini.innerHTML = Object.entries(state.cart).map(([prodId, qty]) => {
        const prod = state.products.find(p => p.id === prodId);
        if (!prod) return '';
        return `
          <div class="checkout-item-mini-row">
            <span>${qty}x ${escapeHtml(prod.title)}</span>
            <span>$${(prod.price * qty).toFixed(2)}</span>
          </div>
        `;
      }).join('');
    }

    modal.classList.add('active');
  }

  function closeCheckoutModal() {
    const modal = document.getElementById('checkoutBackdrop');
    if (modal) modal.classList.remove('active');
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('custName')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    const address = document.getElementById('custAddress')?.value.trim();
    const payment = document.getElementById('custPayment')?.value;
    const notes = document.getElementById('custNotes')?.value.trim();

    const { subtotal, discountAmount, total } = calculateCartTotals();
    const orderNumber = 'VICH-' + Math.floor(1000 + Math.random() * 9000);
    const orderDate = new Date().toLocaleString();

    // Reduce inventory stock based on purchased items
    for (const [prodId, qty] of Object.entries(state.cart)) {
      const prod = state.products.find(p => p.id === prodId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - qty);
      }
    }
    saveProducts();

    // Receipt Information
    safeText('receiptOrderNumber', '#' + orderNumber);
    safeText('receiptOrderDate', orderDate);

    const custDetails = document.getElementById('receiptCustomerDetails');
    if (custDetails) {
      custDetails.innerHTML = `
        <div><strong>Customer:</strong> ${escapeHtml(name)}</div>
        <div><strong>Phone:</strong> ${escapeHtml(phone)}</div>
        <div><strong>Address:</strong> ${escapeHtml(address)}</div>
        <div><strong>Payment:</strong> ${escapeHtml(payment)}</div>
        ${notes ? `<div><strong>Notes:</strong> ${escapeHtml(notes)}</div>` : ''}
      `;
    }

    const receiptItems = document.getElementById('receiptItemsList');
    if (receiptItems) {
      receiptItems.innerHTML = Object.entries(state.cart).map(([prodId, qty]) => {
        const prod = state.products.find(p => p.id === prodId);
        if (!prod) return '';
        return `
          <div class="receipt-item-row">
            <span>${qty}x ${escapeHtml(prod.title)}</span>
            <span>$${(prod.price * qty).toFixed(2)}</span>
          </div>
        `;
      }).join('');
    }

    const receiptTotals = document.getElementById('receiptTotals');
    if (receiptTotals) {
      receiptTotals.innerHTML = `
        <div class="receipt-item-row">
          <span>Subtotal:</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        ${discountAmount > 0 ? `
          <div class="receipt-item-row" style="color: #16a34a;">
            <span>Discount (10%):</span>
            <span>-$${discountAmount.toFixed(2)}</span>
          </div>
        ` : ''}
        <div class="receipt-item-row">
          <span>Delivery:</span>
          <span>FREE</span>
        </div>
        <div class="receipt-item-row" style="font-size: 0.95rem; border-top: 1px dashed #000; padding-top: 4px; margin-top: 4px;">
          <span>TOTAL PAID:</span>
          <span>$${total.toFixed(2)}</span>
        </div>
      `;
    }

    // Clear cart
    state.cart = {};
    saveCart();
    updateCartUI();
    renderProductsGrid();
    renderAdminDashboard();

    const formSection = document.getElementById('checkoutFormSection');
    const receiptSection = document.getElementById('checkoutReceiptSection');
    if (formSection) formSection.style.display = 'none';
    if (receiptSection) {
      receiptSection.style.display = 'block';

      const receiptBox = receiptSection.querySelector('.receipt-box') || receiptSection;
      if (receiptBox) {
        receiptBox.classList.remove('receipt-printing-roll');
        void receiptBox.offsetWidth; // Reflow
        receiptBox.classList.add('receipt-printing-roll');

        let laser = receiptBox.querySelector('.receipt-laser-scan');
        if (!laser) {
          laser = document.createElement('div');
          laser.className = 'receipt-laser-scan';
          receiptBox.prepend(laser);
        }
        setTimeout(() => laser && laser.remove(), 1200);
      }
    }

    showToast(`Order #${orderNumber} placed successfully!`, 'success', 3500);
    triggerConfetti({ count: 140 });
  }

  // ===================================================================
  // 11. EXPORT & RESET DATA
  // ===================================================================
  function exportInventoryData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vich_shop_inventory_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Inventory exported to JSON file', 'info');
  }

  function resetSampleData() {
    if (confirm('Restore default sample inventory for Vich Shop? This will refresh all products across all 6 aisles.')) {
      state.products = [...DEFAULT_PRODUCTS];
      saveProducts();
      renderAdminDashboard();
      renderProductsGrid();
      renderCategoryPills();
      showToast('Sample products restored!', 'success');
    }
  }

  // Escape HTML helper
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function safeValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

  // ===================================================================
  // 12. EVENT LISTENERS INITIALIZATION
  // ===================================================================
  function initEvents() {
    // --- PIN LOCK MODAL EVENTS (admin.html) ---
    const pinInput = document.getElementById('adminPinInput');
    if (pinInput) {
      pinInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          verifyAdminPin();
        }
      });
    }

    safeListen('btnKeySubmit', 'click', verifyAdminPin);
    safeListen('btnKeyClear', 'click', () => {
      if (pinInput) {
        pinInput.value = '';
        pinInput.focus();
      }
    });

    // Keypad number buttons
    document.querySelectorAll('.pin-key[data-key]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (pinInput) {
          if (pinInput.value.length < 8) {
            pinInput.value += btn.dataset.key;
          }
          pinInput.focus();
        }
      });
    });

    // Toggle PIN visibility
    safeListen('btnTogglePinVisibility', 'click', () => {
      if (pinInput) {
        pinInput.type = pinInput.type === 'password' ? 'text' : 'password';
      }
    });

    // Lock session buttons
    safeListen('btnLockAdmin', 'click', lockAdmin);
    safeListen('btnFooterLock', 'click', (e) => {
      e.preventDefault();
      lockAdmin();
    });

    // --- CART DRAWER EVENTS (user.html) ---
    safeListen('cartTriggerBtn', 'click', () => toggleCartDrawer(true));
    safeListen('btnCloseCart', 'click', () => toggleCartDrawer(false));
    safeListen('cartOverlay', 'click', () => toggleCartDrawer(false));
    safeListen('btnCartStartShopping', 'click', () => toggleCartDrawer(false));
    safeListen('btnClearCart', 'click', clearCart);
    safeListen('btnOpenCheckout', 'click', openCheckoutModal);

    // ===================================================================
    // ULTRA-FRESH NAVBAR: SCROLL ELEVATION, LIVE DROPDOWN & SHORTCUTS
    // ===================================================================
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
      let ticking = false;
      const onScrollNavbar = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const isScrolled = window.scrollY > 15;
            navbar.classList.toggle('is-scrolled', isScrolled);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', onScrollNavbar, { passive: true });
      onScrollNavbar();
    }

    // Quick Theme Switcher in Navbar
    const navThemeBtn = document.getElementById('btnNavThemeToggle');
    if (navThemeBtn) {
      navThemeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const themes = ['emerald', 'cyber', 'sunset', 'frost'];
        const current = (window.VichThemeStudio ? window.VichThemeStudio.getTheme() : document.documentElement.dataset.theme) || 'emerald';
        const next = themes[(themes.indexOf(current) + 1) % themes.length];
        if (window.VichThemeStudio) {
          window.VichThemeStudio.setTheme(next);
        } else {
          document.documentElement.setAttribute('data-theme', next);
          document.body.setAttribute('data-theme', next);
          localStorage.setItem(STORAGE_KEYS.THEME, next);
        }
        showToast(`Theme: ${BG_THEMES[next] ? BG_THEMES[next].label : next}`, 'success', 1800);
      });
    }

    // Announcement Bar 1-Click Promo Copy & Apply
    const promoPill = document.getElementById('btnCopyPromoNav');
    if (promoPill) {
      promoPill.addEventListener('click', () => {
        const promoCode = 'VICH10';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(promoCode).catch(() => {});
        }
        const promoInput = document.getElementById('cartPromoInput');
        if (promoInput) {
          promoInput.value = promoCode;
          state.promoDiscount = 0.10;
          state.appliedPromo = promoCode;
          updateCartUI();
        }
        triggerConfetti();
        showToast('🎉 Code VICH10 copied & 10% discount applied!', 'success', 2800);
      });
    }

    // Live Instant Search with Dropdown Preview
    const searchInput = document.getElementById('searchInput');
    const searchBox = document.getElementById('navbarSearchBox');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchDropdown = document.getElementById('searchLiveDropdown');

    function renderLiveSearchDropdown(q) {
      if (!searchDropdown) return;
      const query = (q || '').trim().toLowerCase();

      if (!query) {
        searchDropdown.classList.remove('is-active');
        searchDropdown.innerHTML = '';
        if (searchBox) searchBox.classList.remove('has-query');
        return;
      }

      if (searchBox) searchBox.classList.add('has-query');

      const matches = state.products.filter(p => {
        return p.title.toLowerCase().includes(query) ||
               p.category.toLowerCase().includes(query) ||
               (p.description && p.description.toLowerCase().includes(query));
      });

      if (matches.length === 0) {
        searchDropdown.innerHTML = `
          <div class="search-drop-empty">
            <span style="font-size: 1.4rem; display: block; margin-bottom: 4px;">🔍</span>
            <strong>No items matching "${escapeHtml(q)}"</strong>
            <p style="font-size: 0.75rem; margin-top: 4px; opacity: 0.75;">Try "juice", "matcha", "cookie", "beer", or "beef"</p>
          </div>
        `;
        searchDropdown.classList.add('is-active');
        return;
      }

      const topMatches = matches.slice(0, 4);
      let html = `
        <div class="search-drop-header">
          <span>Fresh Mart Matches (${matches.length})</span>
          <span style="font-size: 0.7rem; color: var(--primary);">Press Enter for full catalog</span>
        </div>
      `;

      topMatches.forEach(prod => {
        html += `
          <div class="search-drop-item" data-product-id="${prod.id}">
            <img class="search-drop-thumb" src="${escapeHtml(prod.imageUrl || 'images/drink_orange_juice.jpg')}" alt="${escapeHtml(prod.title)}" onerror="this.src='images/drink_orange_juice.jpg'">
            <div class="search-drop-meta">
              <div class="search-drop-title">${escapeHtml(prod.title)}</div>
              <div class="search-drop-cat">${escapeHtml(prod.category)} • ${prod.unit || 'per unit'} (${prod.stock} in stock)</div>
            </div>
            <div class="search-drop-price">$${prod.price.toFixed(2)}</div>
          </div>
        `;
      });

      searchDropdown.innerHTML = html;
      searchDropdown.classList.add('is-active');

      searchDropdown.querySelectorAll('.search-drop-item').forEach(item => {
        item.addEventListener('click', () => {
          const prodId = item.dataset.productId;
          searchDropdown.classList.remove('is-active');
          openQuickView(prodId);
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (clearSearchBtn) clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
        renderProductsGrid();
        updateFilterChips();
        renderLiveSearchDropdown(state.searchQuery);

        if (state.searchQuery.trim()) {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          if (scrollPercent < 18.5 && docHeight > 0) {
            window.scrollTo({ top: docHeight * 0.22, behavior: 'smooth' });
          }
        }
      });

      searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim()) {
          renderLiveSearchDropdown(searchInput.value);
        }
      });

      // Rotating Placeholders
      const placeholders = [
        'Search cold-pressed orange juice...',
        'Search Belgian chocolate cookies...',
        'Search Prime Wagyu ribeye...',
        'Search organic lettuce hearts...',
        'Search craft lager beer...',
        'Search fresh salmon poke bowl...'
      ];
      let phIdx = 0;
      setInterval(() => {
        if (document.activeElement !== searchInput && !searchInput.value) {
          phIdx = (phIdx + 1) % placeholders.length;
          searchInput.setAttribute('placeholder', placeholders[phIdx]);
        }
      }, 3500);

      // Keyboard shortcut '/' and 'Ctrl+K'
      window.addEventListener('keydown', (e) => {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        const isInput = activeTag === 'input' || activeTag === 'textarea' || (document.activeElement && document.activeElement.isContentEditable);

        if ((e.key === '/' && !isInput) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        } else if (e.key === 'Escape') {
          if (document.activeElement === searchInput) {
            searchInput.blur();
          }
          if (searchDropdown) {
            searchDropdown.classList.remove('is-active');
          }
        }
      });

      // Outside click dismisses search dropdown
      document.addEventListener('click', (e) => {
        if (searchDropdown && !searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
          searchDropdown.classList.remove('is-active');
        }
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        state.searchQuery = '';
        clearSearchBtn.style.display = 'none';
        if (searchBox) searchBox.classList.remove('has-query');
        if (searchDropdown) {
          searchDropdown.classList.remove('is-active');
          searchDropdown.innerHTML = '';
        }
        renderProductsGrid();
        updateFilterChips();
      });
    }

    // Sort & Availability
    safeListen('sortBySelect', 'change', (e) => {
      state.sortBy = e.target.value;
      renderProductsGrid();
    });
    safeListen('stockFilterSelect', 'change', (e) => {
      state.stockFilter = e.target.value;
      renderProductsGrid();
      updateFilterChips();
    });

    // Reset Filters button
    safeListen('btnResetFilters', 'click', () => {
      state.filterCategory = 'all';
      state.searchQuery = '';
      state.stockFilter = 'all';
      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      safeValue('stockFilterSelect', 'all');
      renderCategoryPills();
      renderProductsGrid();
      updateFilterChips();
    });

    safeListen('clearAllFiltersBtn', 'click', () => {
      const resetBtn = document.getElementById('btnResetFilters');
      if (resetBtn) resetBtn.click();
    });

    // View Mode Toggle (Aisles Horizontal Scroll vs Multi-Column Grid)
    safeListen('btnViewAisles', 'click', () => setViewMode('aisles'));
    safeListen('btnViewGrid', 'click', () => setViewMode('grid'));

    // Poster Horizontal Carousel Scroll Arrows
    safeListen('btnPosterPrev', 'click', () => scrollContainerBy('proPostersScroll', -1));
    safeListen('btnPosterNext', 'click', () => scrollContainerBy('proPostersScroll', 1));

    // Category Pills Horizontal Carousel Scroll Arrows
    safeListen('btnCatPrev', 'click', () => scrollContainerBy('categoryPills', -1));
    safeListen('btnCatNext', 'click', () => scrollContainerBy('categoryPills', 1));

    // Floating Aisle Navigation Dock Jump Buttons
    document.querySelectorAll('.dock-aisle-pill[data-aisle]').forEach(pill => {
      pill.addEventListener('click', () => {
        jumpToAisle(pill.dataset.aisle);
      });
    });

    // Mouse Drag-to-Scroll on Billboard Posters & Category Pills
    makeHorizontalScrollable(document.getElementById('proPostersScroll'));
    makeHorizontalScrollable(document.getElementById('categoryPills'));

    // Default Category Pills
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        if (pill.dataset.category) {
          setCategoryFilter(pill.dataset.category);
        }
      });
    });

    // Promo Code Application
    safeListen('btnApplyPromo', 'click', () => {
      const codeInput = document.getElementById('promoInput');
      const code = codeInput ? codeInput.value.trim().toUpperCase() : '';
      if (code === 'VICH10') {
        state.promoDiscount = 0.10; // 10% OFF
        state.appliedPromo = 'VICH10';
        updateCartUI();
        showToast('Promo code VICH10 applied! 10% discount added.', 'success');
        triggerConfetti({ count: 80 });
      } else if (!code) {
        showToast('Please enter a promo code', 'error');
      } else {
        showToast('Invalid promo code. Try "VICH10"', 'error');
      }
    });

    // Administrator CRUD & Modals
    safeListen('btnOpenAddModal', 'click', openAddProductModal);
    safeListen('btnResetSampleData', 'click', resetSampleData);
    safeListen('btnExportData', 'click', exportInventoryData);
    safeListen('btnCloseProductModal', 'click', closeProductModal);
    safeListen('btnCancelProductModal', 'click', closeProductModal);

    const productForm = document.getElementById('productForm');
    if (productForm) {
      productForm.addEventListener('submit', handleProductFormSubmit);
    }

    // Category select in form
    safeListen('formCategory', 'change', (e) => {
      const customInput = document.getElementById('formCustomCategory');
      if (e.target.value === 'custom') {
        if (customInput) {
          customInput.style.display = 'block';
          customInput.focus();
        }
      } else {
        if (customInput) customInput.style.display = 'none';
        updatePresetImages(e.target.value);
      }
    });

    // Live URL preview in form
    safeListen('formImageUrl', 'input', (e) => {
      updateFormImagePreview(e.target.value);
    });

    // Admin Table Filters & Search
    safeListen('adminTableSearchInput', 'input', (e) => {
      state.adminSearch = e.target.value;
      renderAdminTable();
    });
    safeListen('adminCategoryFilter', 'change', (e) => {
      state.adminCategory = e.target.value;
      renderAdminTable();
    });
    safeListen('adminStockFilter', 'change', (e) => {
      state.adminStock = e.target.value;
      renderAdminTable();
    });
    safeListen('btnScrollToTopTable', 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Quick View Modal
    safeListen('btnCloseQuickView', 'click', closeQuickView);

    // Checkout Form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
    safeListen('btnCloseCheckout', 'click', closeCheckoutModal);
    safeListen('btnPrintReceipt', 'click', () => window.print());
    safeListen('btnBackToStoreAfterOrder', 'click', () => {
      closeCheckoutModal();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Close modals on clicking backdrop
    [
      { backdrop: 'productModalBackdrop', close: closeProductModal },
      { backdrop: 'quickViewBackdrop', close: closeQuickView },
      { backdrop: 'checkoutBackdrop', close: closeCheckoutModal }
    ].forEach(({ backdrop, close }) => {
      const el = document.getElementById(backdrop);
      if (el) {
        el.addEventListener('click', (e) => {
          if (e.target === el) close();
        });
      }
    });

    // Keyboard ESC key closes modals & drawer
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProductModal();
        closeQuickView();
        closeCheckoutModal();
        toggleCartDrawer(false);
      }
    });

    // Cross-tab Synchronization
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEYS.PRODUCTS) {
        loadInitialState();
        renderPortalHub();
        renderStorefront();
        renderAdminDashboard();
      } else if (e.key === STORAGE_KEYS.CART) {
        loadInitialState();
        updateCartUI();
        renderProductsGrid();
      }
    });
    // Interactive button ink ripple effect
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-primary, .btn-checkout-primary, .btn-customer-portal, .btn-admin-portal, .btn-add-cart, .pin-key, .card-action-btn, .btn-apply-promo');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.className = 'ink-ripple';

      const existing = btn.querySelector('.ink-ripple');
      if (existing) existing.remove();

      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  }

  // ===================================================================
  // 13. UNIFIED MODE SWITCHER (INDEX + ADMIN + PORTAL TOGETHER)
  // ===================================================================
  function switchUnifiedMode(mode) {
    const validModes = ['store', 'admin', 'portal'];
    if (!validModes.includes(mode)) mode = 'store';

    // 1. Hide all unified view panels
    document.querySelectorAll('.unified-view-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    // 2. Deactivate all mode tab buttons
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // 3. Activate target panel
    const targetPanel = document.getElementById(`${mode}ViewSection`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    // 4. Activate target tab button
    const targetTab = document.getElementById(`tab${mode.charAt(0).toUpperCase() + mode.slice(1)}Mode`);
    if (targetTab) {
      targetTab.classList.add('active');
    }

    // 5. Mode specific logic
    if (mode === 'admin') {
      if (!isAdminAuthenticated()) {
        const overlay = document.getElementById('adminLockOverlay');
        if (overlay) overlay.classList.remove('hidden');
        const pinInput = document.getElementById('adminPinInput');
        if (pinInput) setTimeout(() => pinInput.focus(), 150);
      } else {
        renderAdminDashboard();
      }
    } else if (mode === 'store') {
      renderStorefront();
      init3DCardPhysics();
    } else if (mode === 'portal') {
      renderPortalHub();
      init3DCardPhysics();
    }

    // 6. Update URL hash
    try {
      history.replaceState(null, '', `#${mode}`);
    } catch (e) {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.switchUnifiedMode = switchUnifiedMode;

  // ===================================================================
  // 14. EXPOSE PUBLIC API & INITIALIZE
  // ===================================================================
  window.VichApp = {
    addToCart,
    updateCartQuantity,
    removeFromCart,
    openQuickView,
    closeQuickView,
    openEditProductModal,
    adjustProductStock,
    deleteProduct,
    selectPresetImage,
    verifyAdminPin,
    lockAdmin,
    triggerConfetti,
    switchMode: switchUnifiedMode,
    setCategoryFilter,
    scrollAisle,
    scrollContainerBy,
    setViewMode,
    jumpToAisle,
    setTheme: (theme) => window.VichThemeStudio && window.VichThemeStudio.setTheme(theme),
    getTheme: () => window.VichThemeStudio ? window.VichThemeStudio.getTheme() : 'emerald'
  };

  document.addEventListener('DOMContentLoaded', () => {
    loadInitialState();
    initLivingBackgroundAndThemeStudio();
    initEvents();
    initProCursorSpotlight();
    initScrollProgress();
    initHeroParallax();

    const pageType = document.body.dataset.page;

    // Check URL query or hash for mode
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get('mode') ? urlParams.get('mode').toLowerCase() : '';
    const initialMode = ['store', 'admin', 'portal'].includes(hash) ? hash : (['store', 'admin', 'portal'].includes(modeParam) ? modeParam : null);

    if (document.querySelector('.unified-view-panel')) {
      // Unified Index + Admin Page
      parseUrlParams();
      renderStorefront();
      renderAdminDashboard();
      renderPortalHub();
      init3DCardPhysics();
      initHeroParallax();
      init20PercentScrollReveal();

      if (initialMode) {
        switchUnifiedMode(initialMode);
      } else if (pageType === 'admin') {
        switchUnifiedMode('admin');
      } else if (pageType === 'portal') {
        switchUnifiedMode('portal');
      } else {
        switchUnifiedMode('store'); // Default to Customer Storefront on unified index
      }

      // Wire tab buttons
      safeListen('tabStoreMode', 'click', () => switchUnifiedMode('store'));
      safeListen('tabAdminMode', 'click', () => switchUnifiedMode('admin'));
      safeListen('tabPortalMode', 'click', () => switchUnifiedMode('portal'));
    } else {
      // Standalone pages fallback
      if (pageType === 'admin') {
        checkAdminLockState();
        init3DCardPhysics();
      } else if (pageType === 'user') {
        parseUrlParams();
        renderStorefront();
        initHeroParallax();
        init3DCardPhysics();
        init20PercentScrollReveal();
      } else if (pageType === 'portal') {
        renderPortalHub();
        initHeroParallax();
        init3DCardPhysics();
      } else {
        // Fallback detection
        if (document.getElementById('adminLockOverlay')) {
          checkAdminLockState();
        }
        if (document.getElementById('productsGrid')) {
          parseUrlParams();
          renderStorefront();
          init20PercentScrollReveal();
        }
        if (document.getElementById('portalTotalProducts')) {
          renderPortalHub();
        }
        init3DCardPhysics();
        initHeroParallax();
      }
    }
  });

})();
