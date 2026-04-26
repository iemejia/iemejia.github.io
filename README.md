# ismaelmejia.com

Personal website and blog built with [Hugo](https://gohugo.io/).

## Prerequisites

- [Hugo](https://gohugo.io/installation/) (v0.159.1 or later)
- [Node.js](https://nodejs.org/) (for Playwright validation tests)

The site uses a custom Hugo theme defined in `layouts/`. npm is used only for browser-based validation tests.

## Project Structure

```
.
├── archetypes/     # Templates for new content
├── assets/         # Hugo asset pipeline (unused)
├── content/        # Markdown content (pages and blog posts)
├── layouts/        # HTML templates (custom theme)
│   ├── _default/   # Base, list, and single page templates
│   ├── partials/   # Reusable template fragments (header, footer)
│   └── index.html  # Homepage template
├── static/         # Static assets (CSS, images)
├── tests/          # Playwright navigation and accessibility tests
├── package.json    # Test dependencies and scripts
└── hugo.toml       # Hugo configuration
```

## Setup

Install the JavaScript dependencies and Playwright browsers once after cloning:

```sh
npm install
npm run test:install
```

## Build

Generate the production site into the `public/` directory:

```sh
hugo
```

## Development Server

Start a local development server with live reload:

```sh
hugo server
```

The site will be available at `http://localhost:1313/`. Changes to content, templates, and static files are reflected automatically.

To include draft posts:

```sh
hugo server -D
```

For consistency with the Playwright configuration, you can also run:

```sh
hugo server --port 1313 --disableFastRender --bind 127.0.0.1
```

Playwright starts this server automatically when running tests, so you do not need to keep a separate server running for validation.

## Creating Content

Create a new blog post:

```sh
hugo new blog/my-new-post.md
```

This uses the archetype in `archetypes/blog.md` to scaffold the front matter.

## Validation

Run the same validation used by the GitHub Pages workflow:

```sh
npm run validate
```

This command runs the Hugo build check and the full Playwright browser suite. Use it before pushing changes.

Run only the Hugo build check:

```sh
hugo --printPathWarnings
```

This runs a full build and reports any path warnings or broken references. A successful build with exit code 0 and no error output confirms the site is valid.

To additionally check for draft or expired content issues:

```sh
hugo --buildDrafts --buildExpired --buildFuture --printPathWarnings
```

Run only the browser validation suite:

```sh
npm test
```

This runs Playwright against a local Hugo server and validates:

- Top navigation links from `/`, `/about/`, and `/blog/`.
- Desktop and mobile navigation behavior.
- Mobile menu `aria-expanded` behavior.
- Accessibility checks with Axe on desktop and mobile.
- Accessibility checks with the mobile menu open.

Run only accessibility checks:

```sh
npm run test:a11y
```

Open Playwright's interactive UI while developing tests:

```sh
npm run test:ui
```

Recommended pre-commit workflow:

```sh
npm run validate
```

Both commands should pass before committing changes to templates, CSS, navigation, or content.

## Deployment to GitHub Pages

The site is deployed to GitHub Pages using a GitHub Actions workflow that builds and publishes automatically on every push to `master`.

### Initial Setup

1. Create a GitHub repository (e.g. `iemejia/ismaelmejia.com`) and push the code:

   ```sh
   git remote add origin git@github.com:iemejia/ismaelmejia.com.git
   git push -u origin master
   ```

2. In the GitHub repository, go to **Settings > Pages** and set:
   - **Source**: `GitHub Actions`

3. If using a custom domain (`ismaelmejia.com`), add it under **Settings > Pages > Custom domain** and configure your DNS provider with either:
   - A `CNAME` record pointing to `iemejia.github.io`
   - Or `A` records pointing to [GitHub's IP addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-github-pages)

### Workflow

Create the file `.github/workflows/hugo.yml` with the following content:

```yaml
name: Deploy Hugo site to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'

      - name: Build
        run: hugo --minify --baseURL "https://ismaelmejia.com/"

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

Once pushed, every commit to `master` triggers a build and deploy. You can also trigger a deploy manually from the **Actions** tab using the `workflow_dispatch` event.

### Notes

- The workflow overrides `baseURL` at build time with `--baseURL` so the `relativeURLs = true` setting in `hugo.toml` keeps local development working without changes.
- The `--minify` flag reduces the output size for production.
- If you are not using a custom domain and want to serve from `iemejia.github.io`, change the `--baseURL` value to `"https://iemejia.github.io/ismaelmejia.com/"` and adjust the repository Pages settings accordingly.
