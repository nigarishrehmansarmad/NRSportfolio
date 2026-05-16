# GitHub Deployment Guide

This guide walks you through deploying your portfolio to GitHub Pages using your GitHub account.

## Prerequisites

- GitHub account: https://github.com/nigarishrehmansarmad
- Git installed locally
- Your portfolio code ready (already committed ✅)

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name**: `my-3d-portfolio-website`
   - **Description**: "Full-Stack AI Engineer Portfolio - Built with Vite, Three.js, and GSAP"
   - **Visibility**: Public
   - **Initialize repository**: No (we already have code)

3. Click **Create repository**

## Step 2: Push Your Code to GitHub

Run these commands in your terminal from the project directory:

```bash
# Add the remote repository
git remote add origin https://github.com/nigarishrehmansarmad/my-3d-portfolio-website.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

### Alternative: If You Already Set Up the Remote

```bash
# Check current remote
git remote -v

# If origin exists, update it
git remote set-url origin https://github.com/nigarishrehmansarmad/my-3d-portfolio-website.git

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository: https://github.com/nigarishrehmansarmad/my-3d-portfolio-website
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - The workflow is already configured in `.github/workflows/deploy.yml`

5. The deployment should start automatically

## Step 4: Monitor Deployment

1. Go to your repository
2. Click **Actions** tab
3. Watch the "Deploy to GitHub Pages" workflow
4. Once it completes (green checkmark), your site is live!

## Step 5: Access Your Live Portfolio

Your portfolio will be available at:

```
https://nigarishrehmansarmad.github.io/my-3d-portfolio-website/
```

Or if you purchase a custom domain, set it up in:
- Repository → Settings → Pages → Custom domain

## Automatic Deployment

Every time you push to the `main` branch:
1. GitHub Actions automatically builds your site
2. Runs security audit (`npm audit`)
3. Builds the project (`npm run build`)
4. Deploys to GitHub Pages

The workflow is configured in `.github/workflows/deploy.yml` ✅

## Troubleshooting

### Deployment Failed

Check the **Actions** tab for error messages:

```bash
# Common issues:
1. npm audit warnings - Review in Actions tab
2. Build errors - Check build logs
3. Pages not enabled - Ensure Pages is set to "GitHub Actions"
```

### Pages Not Updating

1. Clear browser cache (Ctrl+Shift+Del)
2. Force refresh (Ctrl+F5)
3. Check Actions tab - deployment might still be running
4. Wait 5-10 minutes for DNS to propagate

### HTTPS Not Working

GitHub Pages automatically provides HTTPS - it can take a few minutes:

```bash
# Test SSL:
# https://www.ssllabs.com/ssltest/analyze.html?d=nigarishrehmansarmad.github.io
```

## Performance Optimization

Your site is served via GitHub Pages CDN:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ No bandwidth limits
- ✅ Automatic security headers

## Security Verification

After deployment, verify security headers:

1. Visit your site: https://nigarishrehmansarmad.github.io/my-3d-portfolio-website/
2. Run security check: https://securityheaders.com/
3. Enter your domain

Expected grades:
- Content-Security-Policy: A
- X-Frame-Options: A
- X-Content-Type-Options: A
- X-XSS-Protection: B (no longer used, modern CSP replaces it)

## Custom Domain (Optional)

To use your own domain (e.g., nigarish.dev):

1. Purchase domain from registrar (GoDaddy, Namecheap, etc.)
2. Go to Repository → Settings → Pages
3. Under "Custom domain", enter your domain
4. Update DNS records:
   - Add CNAME record pointing to `nigarishrehmansarmad.github.io`
5. Enable "Enforce HTTPS"

For detailed instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Updating Your Portfolio

To update your portfolio:

1. Make changes locally
2. Commit changes:
   ```bash
   git add .
   git commit -m "Update: Description of changes"
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   ```
4. GitHub Actions automatically redeploys!

## Monitoring Deployments

View all deployments:
1. Repository → Deployments
2. Each deployment shows timestamp and status
3. Can rollback to previous deployment if needed

## Environment Variables

If you need environment variables for production:

1. Repository → Settings → Secrets and variables → Actions
2. Create new secret: `VITE_ENVIRONMENT=production`
3. Access in workflow: `${{ secrets.VITE_ENVIRONMENT }}`

Currently, no secrets are needed. Site is static.

## Statistics

After deployment, view traffic:

1. Repository → Insights → Traffic
2. See clone statistics and visitor counts

## Maintenance

### Weekly
```bash
npm audit
git push  # Deploys automatically
```

### Monthly
- Check GitHub security alerts
- Review deployment logs
- Monitor site performance

### Quarterly
```bash
npm update
npm audit fix
git push  # Auto-deploys
```

## Support

For GitHub Pages help:
- Official Docs: https://docs.github.com/en/pages
- GitHub Community: https://github.com/orgs/community/discussions/categories/github-pages

For portfolio questions:
- Email: nigarish019@gmail.com
- GitHub Issues: Create in your repository

---

## Deployment Checklist

- [ ] Repository created at GitHub
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled (Settings → Pages)
- [ ] Source set to "GitHub Actions"
- [ ] Actions workflow completed successfully
- [ ] Site accessible at https://nigarishrehmansarmad.github.io/my-3d-portfolio-website/
- [ ] Security headers verified at securityheaders.com
- [ ] All projects display correctly
- [ ] Contact links work
- [ ] Mobile responsive tested
- [ ] 3D scene loads properly

---

**Status**: Ready to Deploy ✅
**Last Updated**: May 16, 2026
