# ismaelmejia.com

Personal website and blog built with [Hugo](https://gohugo.io/).

## Prerequisites

- [Hugo](https://gohugo.io/installation/) (v0.159.1 or later)

No other dependencies are required. The site uses a custom theme defined in `layouts/` and does not rely on npm, Go modules, or git submodules.

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
└── hugo.toml       # Hugo configuration
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

## Creating Content

Create a new blog post:

```sh
hugo new blog/my-new-post.md
```

This uses the archetype in `archetypes/blog.md` to scaffold the front matter.

## Testing

Hugo does not have a built-in test framework, but you can verify the site builds without errors:

```sh
hugo --printPathWarnings
```

This runs a full build and reports any path warnings or broken references. A successful build with exit code 0 and no error output confirms the site is valid.

To additionally check for draft or expired content issues:

```sh
hugo --buildDrafts --buildExpired --buildFuture --printPathWarnings
```

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
