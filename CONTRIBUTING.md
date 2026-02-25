# Contributing to CodeApps

## 📋 Overview

CodeApps is a **view-only reference repository**. This document explains how you can engage with the project while respecting this policy.

## ⚠️ Important Notice

This repository is maintained for **reference and learning purposes**. Direct contributions to the main repository are not accepted.

### ✅ What You Can Do

- **Clone** the repository and use it locally
- **Fork** the repository for your own use and modifications
- **Study** the codebase and learn from it
- **Customize** it locally for your projects
- **Share** feedback (though PRs won't be merged to main)
- **Create issues** in your own fork
- **Reference** the code patterns and architecture

### ❌ What We Don't Accept

- ??? Direct pull requests to the main repository
- ??? Issues reported against the main repository  
- ??? Feature requests for the main repository
- ??? Bug fix contributions to main

## 🛠️ Local Development

### Setup Your Local Environment

If you want to customize CodeApps for your own use:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/CodeApps.git
   cd CodeApps
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Follow development setup from [DEVELOPMENT.md](DEVELOPMENT.md)**

4. **Make your changes**
   ```bash
   cd AppFromScratch
   npm run dev
   ```

5. **Commit and push to your fork**
   ```bash
   git commit -m "feat: Add your feature"
   git push origin feature/your-feature-name
   ```

## 📋 Code Style & Standards

If you're working with this code locally, follow these guidelines:

### Commit Messages

Use conventional commit format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Testing
- `chore:` - Build/tooling

Example:
```bash
git commit -m "feat: Add user authentication component"
```

### Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

### Git Workflow

1. Always create a new branch from `main`
2. Keep commits atomic and logical
3. Write meaningful commit messages
4. Test your changes locally before pushing
5. Keep branch history clean

## 🏗️ Working in Your Fork

### Keep Your Fork Updated

```bash
# Add upstream remote
git remote add upstream https://github.com/programmingcorporate/CodeApps.git

# Fetch latest changes
git fetch upstream

# Rebase your changes
git rebase upstream/main
```

### Creating Pull Requests (In Your Fork)

1. Create a descriptive PR title
2. Write a clear PR description
3. Reference any related issues
4. Keep PRs focused on a single feature/fix

## 🙋 Questions?

- Check the [README.md](README.md) for general information
- See [DEVELOPMENT.md](DEVELOPMENT.md) for setup help
- Review [Troubleshooting](README.md#-troubleshooting) section
- Visit commit history to understand code evolution

## 📛 License

By using this code, you agree to the MIT License terms.

You are free to modify and distribute your fork as needed.

---

**Thank you for your interest in CodeApps!** 🙋

Even though we don't accept direct contributions, we appreciate you learning from and building upon this project. Happy coding! 🚀
