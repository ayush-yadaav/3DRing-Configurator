# 💍 3D Ring Configurator

An interactive 3D jewelry customization platform built with React, React Three Fiber, Three.js, Tailwind CSS, and WooCommerce. Users can personalize rings in real-time, preview changes instantly in 3D.

## 🌐 Live Demo

- Demo: https://3-d-ring-configurator-two.vercel.app/

---

## ✨ Key Features

### 🎨 Real-Time Ring Customization
- Change metal colors and finishes
- Customize diamond/stone options
- Dynamic material updates without page reloads
- Instant visual feedback

### 🧊 Interactive 3D Experience
- Built with React Three Fiber & Three.js
- GLB/GLTF model support
- Environment lighting and realistic materials
- Smooth camera controls and interactions

### 📱 Responsive Design
- Modern UI with Tailwind CSS
- Optimized layout across devices

---

## 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React, Vite |
| 3D Engine | Three.js |
| React 3D | React Three Fiber |
| Helpers | @react-three/drei |
| Styling | Tailwind CSS |
| Backend | WooCommerce REST API |
| Deployment | Vercel / Netlify |
| Models | GLB / GLTF |

---

## ⚠️ Deployment Status

The WooCommerce backend is currently running in a local development environment and is not publicly hosted.

The frontend successfully communicates with the local WooCommerce instance through the WooCommerce REST API and retrieves product information.

Due to hosting constraints during development, the backend could not be deployed to a public server for the final submission.

Current Status:
- ✅ WooCommerce product data fetching
- ✅ REST API integration
- ✅ Real-time 3D customization
- ✅ Local cart implementation
- ❌ Public WooCommerce deployment
- ❌ WooCommerce cart synchronization

## 🏗 Project Structure

```text
src/
├── components/      # Reusable UI & 3D components
├── pages/           # Application pages
├── assets/          # Images, models
├── lib/             # WooCommerce/API logic         
└── App.jsx
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_WOOCOMMERCE_URL=https://your-store.com
VITE_NAME=xxxxxxxxxxxxxxxxx
VITE_PASSWORD=xxxxxxxxxxxxxxxxx
```

---

## 🚀 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/ayush-yadaav/3DRing-Configurator.git
cd 3DRing-Configurator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 📦 Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 🎯 Performance Optimizations

- Lazy loading of 3D assets
- Optimized GLB model delivery
- Component-based architecture
- Vite-powered fast builds
- Efficient React state management

---

---

## 🔮 Future Improvements

- Multiple ring styles
- Advanced gemstone customization
- User accounts & saved designs
- Wishlist functionality

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---


## 👨‍💻 Author

**Ayush Yadav**

- GitHub: https://github.com/ayush-yadaav

If you found this project useful, consider giving it a ⭐ on GitHub.
