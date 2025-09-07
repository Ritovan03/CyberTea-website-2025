## Getting Started

1. **Download all dependencies**
    - Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.
    - In the project root, run:
        ```powershell
        pnpm install
        ```

---

## Working on a Feature

1. **Create a new branch**
    - Use the format: `yourname/feature-description`
    - Example:
      Branch Name: rakesh/feat-navbar
        ```powershell
        git checkout -b alice/feat-login
        ```

2. **Commit your changes**
    - Write clear commit messages.
    - Example:
        ```powershell
        git add .
        git commit -m "Add login page UI"
        ```

3. **Push your branch**
    - Example:
        ```powershell
        git push origin alice/feat-login
        ```

4. **Open a Pull Request (PR)**
    - Go to GitHub and open a PR from your branch to `main`.
    - Add a description of your changes.

---

## Code Formatting

Before pushing, run Prettier to format your code:

```powershell
pnpm run prettier
```

---

**Happy coding!**
