# Development Guide

## 🚀 Getting Started

This guide covers everything you need to know to set up and develop CodeApps locally.

## 📋 Prerequisites

Before starting, ensure you have installed:

- **Node.js** v16.x or higher
- **npm** v8.x or higher
- **Git** for version control
- **VS Code** (recommended) or your preferred editor

### Verify Installation

```bash
node --version   # Should be v16.x or higher
npm --version    # Should be v8.x or higher
git --version    # Should be installed
```

## 🛠️ Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/programmingcorporate/CodeApps.git
cd CodeApps/AppFromScratch
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`.

### 3. Verify Setup

```bash
npm run type-check
```

If there are no errors, you're ready to start developing!

## 🚀 Development Workflow

### Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
VITE v4.x.x  ready in xxx ms
→ Local:   http://localhost:5173/
→ press h to show help
```

Open `http://localhost:5173` in your browser.

### Key Features

- **Hot Module Replacement (HMR)** - Changes are reflected instantly without page refresh
- **Source Maps** - Debug code in original TypeScript format
- **Fast Refresh** - Component state is preserved during updates

### Making Changes

1. Edit files in the `src/` directory
2. Save changes (Ctrl+S or Cmd+S)
3. Changes appear automatically in the browser
4. Check console for any errors

## 📋 Project Structure

```
AppFromScratch/
├── src/
│   ├── components/      # React components
│   │   ├── IssueList.tsx
│   │   ├── IssueDetail.tsx
│   │   └── ...
│   ├── services/       # API & business logic
│   │   └── IssueService.ts
│   ├── types/          # TypeScript interfaces
│   │   └── Issue.ts
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html       # HTML template
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript configuration
├── package.json     # Dependencies
└── eslint.config.js # Linting rules
```

## 📋 Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Automatically fix issues
npm run lint:fix
```

**Linting Rules:**
- ESLint for code quality
- Rules enforced: no unused variables, consistent naming, etc.

### Type Checking

```bash
# Check TypeScript types
npm run type-check
```

**Important:**
- TypeScript strict mode is enabled
- All types must be explicitly defined
- Fix any type errors before committing

### Before Committing

1. Run linting: `npm run lint:fix`
2. Check types: `npm run type-check`
3. Test manually in browser
4. Ensure no console errors

## 🏗️ Building

### Development Build

```bash
npm run build
```

Creates an optimized bundle in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Preview the production build at `http://localhost:4173`

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm run test

# Watch mode (re-run on changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🔍 Debugging

### Browser DevTools

1. Open `http://localhost:5173`
2. Press `F12` (Windows/Linux) or `Cmd+Shift+I` (Mac)
3. Use Console, Network, Sources tabs

### VS Code Debugging

1. Install "Debugger for Chrome" extension
2. Add breakpoints by clicking line numbers
3. Press `F5` to start debugging
4. Code execution pauses at breakpoints

### Common Errors

**Port Already in Use:**
```bash
npm run dev -- --port 5174
```

**Module Not Found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Type Errors:**
- Check variable types
- Ensure imports are correct
- Verify function signatures

## 🌟 Best Practices

### Component Development

- Keep components small and focused
- Use TypeScript interfaces for props
- Extract logic to services
- Write meaningful component names

### Code Organization

- One component per file
- Use descriptive folder structure
- Keep services separate from components
- Define types in dedicated files

### Commits

```bash
# Create a feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: Add new feature"

# Push to your fork
git push origin feature/my-feature
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code formatting
- `refactor:` - Code restructuring
- `test:` - Test additions
- `chore:` - Dependencies/tools

## 📤 Useful npm Scripts

| Command | Purpose |
|---------|----------|
| `npm run dev` | Start development server |
| `npm run build` | Create production bundle |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues |
| `npm run type-check` | Check TypeScript types |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)

## 🙋 Need Help?

1. Check [README.md](README.md) for general info
2. Review [Troubleshooting](README.md#-troubleshooting) section
3. Check git commit history for examples
4. Review existing components for patterns

---

**Happy coding!** 🚀

For any questions, refer to the main README or check the CONTRIBUTING guidelines.
