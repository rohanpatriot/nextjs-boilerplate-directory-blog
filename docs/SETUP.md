# GitHub Pages Setup

This directory contains the documentation for the Next.js Directory/Blog Boilerplate, published to GitHub Pages.

## Automatic Deployment

The documentation is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch that affect the `docs/` directory.

### GitHub Actions Workflow

The deployment is handled by `.github/workflows/docs.yml`, which:

1. Builds the documentation using Jekyll
2. Deploys to GitHub Pages
3. Makes the docs available at: `https://rohanpatriot.github.io/nextjs-directory-boilerplate/`

## Enabling GitHub Pages

If you're forking this repository, you'll need to enable GitHub Pages:

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. The workflow will automatically deploy on the next push to `main`

## Local Preview

To preview the documentation locally using Jekyll:

```bash
# Install Jekyll (if not already installed)
gem install jekyll bundler

# Navigate to docs directory
cd docs

# Serve locally
jekyll serve

# Visit http://localhost:4000/nextjs-directory-boilerplate/
```

## Documentation Structure

```
docs/
├── _config.yml              # Jekyll configuration
├── index.md                 # Home page
├── README.md                # Documentation overview
├── getting-started.md       # Installation guide
├── content-system.md        # Content management
├── configuration.md         # Config reference
├── components.md            # Component docs
├── seo.md                   # SEO features
├── dark-mode.md             # Theming guide
├── deployment.md            # Deployment guide
└── solutions/               # Common solutions
    └── README.md
```

## Theme

The documentation uses the **Cayman** theme for GitHub Pages, configured in `_config.yml`.

## Writing Documentation

Documentation is written in Markdown (`.md` files). Jekyll automatically converts these to HTML for GitHub Pages.

### Front Matter

Each documentation page should include front matter:

```yaml
---
layout: default
title: Page Title
---
```

### Internal Links

Use relative links without the `.md` extension:

```markdown
[Getting Started](getting-started)
[Configuration Guide](configuration)
```

## Troubleshooting

### Documentation Not Updating

1. Check the Actions tab in your GitHub repository
2. Ensure the workflow completed successfully
3. GitHub Pages can take a few minutes to update after deployment

### 404 Errors

1. Verify the file exists in the `docs/` directory
2. Check that internal links don't include `.md` extensions
3. Ensure the file is included in the repository

## Learn More

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
