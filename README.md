# 🚀 CodeApps | React + Vite Issue Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646cff.svg)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)](#)

CodeApps is a modern, production-ready React-based web application scaffolded with Vite, designed to streamline issue tracking and management. Built with TypeScript strict mode, modular components, and a clean development workflow optimized for speed and scalability.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Testing](#testing)
- [Usage & Access](#usage--access)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## ✨ Features

- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Full type safety with strict mode
- **Vite** - Lightning-fast build tool with HMR
- **Modular Architecture** - Well-organized components and services
- **ESLint Configuration** - Code quality and consistency
- **Scalable Structure** - Ready for feature expansion
- **Issue Tracking UI** - Reusable components for issue management
- **Development-Friendly** - Quick feedback loop with HMR

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|----------|
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Vite | 4.x | Build tool |
| ESLint | 8.x+ | Code linting |
| CSS | 3 | Styling |

## 📄 Project Structure

```
CodeApps/
├── AppFromScratch/
│   ├── src/
│   │   ├── components/
│   │   │   ├── IssueList.tsx
│   │   │   ├── IssueDetail.tsx
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── IssueService.ts
│   │   │   └── ...
│   │   ├── types/
│   │   │   ├── Issue.ts
│   │   │   └── ...
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.js
│   └── index.html
├── .gitignore
├── LICENSE
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16.x or higher
- **npm**: v8.x or higher (or yarn/pnpm)
- **Git**: For version control

Verify installations:
```bash
node --version
npm --version
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/programmingcorporate/CodeApps.git
   cd CodeApps/AppFromScratch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   Or with yarn:
   ```bash
   yarn install
   ```

3. **Verify installation**
   ```bash
   npm list react typescript vite
   ```

## 🚀 Development

### Start Development Server

```bash
cd AppFromScratch
npm run dev
```

The application will be available at `http://localhost:5173`

**Features:**
- Hot Module Replacement (HMR) - Changes appear instantly
- Fast refresh without losing component state
- Source maps for easy debugging

### Code Quality

#### Linting
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix
```

#### Type Checking
```bash
# TypeScript type checking
npm run type-check
```

## 🏗️ Building

### Production Build

```bash
npm run build
```

**Output:**
- Optimized production bundle in `dist/` folder
- Minified and tree-shaken code
- Source maps for debugging in production

### Preview Production Build

```bash
npm run preview
```

Preview the built application at `http://localhost:4173`

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📥 Usage & Access

### View-Only Repository

This repository is maintained as **view-only**. You can:

✅ **Allowed:**
- Clone or fork the repository
- Review the codebase
- Use it locally for learning or personal projects
- Customize locally for your needs
- Reference the code structure and patterns

❌ **Not Accepted:**
- Pull requests to the main repository
- Issues reported against the main repository
- Direct contributions to this repository

For custom modifications, clone and work on your own copy.

### Local Customization

After cloning, you can modify the code freely:

```bash
# Create your own branch
git checkout -b your-feature

# Make your changes
# Commit and push to your fork
```

## 🤝 Contributing

This is a view-only repository. However, you can:

1. **Fork** the repository for your own use
2. **Create issues** in your fork for tracking
3. **Submit pull requests** to your fork
4. **Share feedback** via GitHub Discussions (if enabled)

For guidelines on code structure and standards, see [DEVELOPMENT.md](DEVELOPMENT.md).

## 🐛 Troubleshooting

### Common Issues

**Issue: Port 5173 already in use**
```bash
# Use a different port
npm run dev -- --port 5174
```

**Issue: Module not found errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Type errors in IDE**
```bash
# Ensure TypeScript is installed globally or locally
npm install -g typescript
# Or use npx
npx tsc --version
```

**Issue: HMR not working**
```bash
# Check firewall settings
# Restart dev server
npm run dev
```

### Debugging

1. **Chrome DevTools**
   - Open `http://localhost:5173`
   - Press F12 or Cmd+Shift+I
   - Use Console, Network, Sources tabs

2. **VS Code Debugger**
   - Install Debugger for Chrome extension
   - Add breakpoints and run with debug mode

3. **Network Issues**
   - Check browser console for CORS errors
   - Verify backend service URLs in code

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [ESLint Documentation](https://eslint.org/docs/)

## 📃 License

This project is licensed under the **MIT License**.

You are free to:
- ✅ Use for personal or commercial projects
- ✅ Modify and distribute
- ✅ Include in proprietary applications

**Conditions:**
- Include a copy of the license
- State significant changes
- Disclose source

See [LICENSE](LICENSE) file for full details.

## 👤 Author

**Corporate Programming**
- GitHub: [@programmingcorporate](https://github.com/programmingcorporate)
- YouTube: [@corporateprogramming](https://www.youtube.com/@corporateprogramming)

## 📞 Support

- For questions, create a fork and open an issue there
- Review [DEVELOPMENT.md](DEVELOPMENT.md) for setup help
- Check [Troubleshooting](#troubleshooting) section

---

**Last Updated:** February 2026  
**Status:** Active Development  

⭐ If you find this project helpful, consider giving it a star!

**Note:** This is a reference implementation. Feel free to use it as a starting point for your own projects.
