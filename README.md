# 🏠 Home Twin - Smart Home Management System

A comprehensive React-based home management application that helps you manage your assets, tasks, and home maintenance with an interactive digital twin of your home.

## ✨ Features

- 🏡 **Digital Twin** - Interactive floor plan visualization
- 📦 **Asset Management** - Track appliances with OCR receipt scanning
- ✅ **Task Management** - Organize maintenance and repairs
- 🛠️ **Service Marketplace** - Book service providers
- 📊 **Progress Tracking** - Real-time task completion
- 🔔 **Smart Notifications** - Warranty and maintenance alerts

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- GitHub account

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/Abjad.git
cd Abjad

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:5173 to see the app.

## 📦 Deployment

### Deploy to GitHub Pages

**Option 1: Automatic (Recommended)**

Just push to main branch - GitHub Actions will deploy automatically:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Option 2: Manual**

```bash
npm run deploy
```

See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for detailed instructions.

## 🏗️ Project Structure

```
Abjad/
├── Components/          # Reusable UI components
│   ├── ErrorBoundary.js
│   ├── ToastContainer.js
│   ├── LoadingSkeleton.js
│   ├── EmptyState.js
│   └── ErrorState.js
├── Pages/              # Page components
│   ├── Home.js
│   ├── Assets.js
│   ├── DigitalTwin.js
│   ├── Marketplace.js
│   └── MyTasks.js
├── hooks/              # Custom React hooks
│   ├── useToast.js
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   └── useMediaQuery.js
├── utils/              # Utility functions
│   ├── constants.js
│   ├── helpers.js
│   └── validation.js
├── Entities/           # Data models (Base44)
├── src/                # Entry point
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── Layout.js           # Main layout
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TanStack Query** - Data fetching
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Base44** - Backend API
- **date-fns** - Date utilities

## 📚 Documentation

- [ENHANCEMENTS.md](./ENHANCEMENTS.md) - Complete feature documentation
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Step-by-step implementation guide
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Quick deployment reference

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start development server (http://localhost:5173)

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
npm run deploy           # Deploy to GitHub Pages
npm run predeploy        # Run automatically before deploy
```

## 🧩 Key Components

### Custom Hooks

- `useToast()` - Toast notification management
- `useDebounce()` - Debounce input values
- `useLocalStorage()` - Persist state to localStorage
- `useMediaQuery()` - Responsive breakpoint detection

### UI Components

- `ErrorBoundary` - Global error handling
- `ToastContainer` - Notification system
- `LoadingSkeleton` - Loading states
- `EmptyState` - Empty state UI
- `ErrorState` - Error state UI

### Utilities

- 200+ centralized constants
- 30+ helper functions
- Form validation system
- API error parsing
- Date formatting

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://your-api-url.com
VITE_APP_NAME=Home Twin
```

### Vite Configuration

Edit `vite.config.js` to customize:

```javascript
{
  base: '/Abjad/',        // GitHub Pages base path
  // ... other options
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Base44](https://base44.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Live Demo:** https://YOUR-USERNAME.github.io/Abjad/

**Documentation:** See the docs folder for detailed guides.

Made with ❤️ for smart home management
