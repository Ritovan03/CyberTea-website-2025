# Development Workflow Guide

## 🚀 Initial Setup

### Prerequisites

- Install [Node.js](https://nodejs.org/) (latest LTS version)
- Install [pnpm](https://pnpm.io/) package manager

### Install Dependencies

```bash
pnpm install
```

---

## 🔧 Feature Development Workflow

### 1. Create a New Branch

**Branch naming convention:** `yourname/feature-description`

**Via Command Line:**

```bash
git checkout -b alice/feat-login
```

**Via GitHub Desktop:**

1. Click "Current branch" dropdown
2. Click "New branch"
3. Enter branch name: `alice/feat-login`
4. Click "Create branch"

**Via VS Code:**

1. Click branch name in bottom-left status bar
2. Select "Create new branch"
3. Enter branch name: `alice/feat-login`

### 2. Make Your Changes

- Work on your feature
- Test your changes locally
- Follow existing code patterns

### 3. Format Your Code

Before committing, always format your code:

```bash
pnpm run prettier
```

### 4. Commit Your Changes

**Via Command Line:**

```bash
git add .
git commit -m "Add login page UI with validation"
```

**Via GitHub Desktop:**

1. Review changes in the left panel
2. Write commit message in bottom-left
3. Click "Commit to alice/feat-login"

**Via VS Code:**

1. Open Source Control panel (Ctrl+Shift+G)
2. Stage changes by clicking "+"
3. Write commit message
4. Click "Commit"

### 5. Push Your Branch

**Via Command Line:**

```bash
git push origin alice/feat-login
```

**Via GitHub Desktop:**

1. Click "Push origin" button

**Via VS Code:**

1. Click "..." in Source Control panel
2. Select "Push"

### 6. Create Pull Request

1. Go to the GitHub repository
2. Click "Compare & pull request" (appears after pushing)
3. Fill out the PR template:
   - **Title:** Clear, descriptive title
   - **Description:** What changes were made and why
   - **Screenshots:** If UI changes were made
4. Request reviewers
5. Click "Create pull request"

---

## 📋 Best Practices

## Remember Do Not Push code directly into main branch

### Commit Messages

- Use present tense: "Add feature" not "Added feature"
- Be descriptive: "Add user authentication with JWT tokens"
- Keep first line under 50 characters
- Add details in subsequent lines if needed

### Branch Management

- Always branch from `main`
- Keep branches focused on single features
- Delete branches after merging PRs

### Code Quality

- Run `pnpm run prettier` before every commit
- Test your changes thoroughly
- Follow existing code style and patterns
- Add comments for complex logic

---

## 🆘 Common Issues

**Branch already exists?**

```bash
git checkout existing-branch-name
git pull origin main  # Get latest changes
```

**Forgot to format code?**

```bash
pnpm run prettier
git add .
git commit --amend --no-edit  # Amend last commit
```

**Need to update your branch with latest main?**

```bash
git checkout main
git pull origin main
git checkout your-branch-name
git merge main
```

---

**Happy coding! 🎉**
