# Deployment Guide - Production Ready

## Overview
This guide covers secure deployment of your portfolio to production with enterprise-grade security practices.

## Pre-Deployment Security Checklist

### 1. **Dependency Audit**
```bash
npm audit
npm audit fix
npm update
```
Ensure all dependencies are up-to-date and free of known vulnerabilities.

### 2. **Environment Setup**
```bash
cp .env.example .env.production
# Update with production values, NEVER commit .env files
```

### 3. **Build Verification**
```bash
npm run build
npm run preview  # Test production build locally
```

### 4. **Security Headers Validation**
- [ ] CSP headers are properly set in vite.config.js
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] No sensitive data in client-side code
- [ ] No API keys exposed in code

## Deployment Platforms

### **Option 1: Vercel (Recommended)**
Most secure and convenient for frontend applications.

#### Steps:
1. Connect GitHub repository
2. Import project and select settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

#### Security Benefits:
- Automatic HTTPS/TLS
- Built-in DDoS protection
- Automatic HSTS headers
- Edge caching for performance
- Automatic security headers injection

#### Configuration:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_ENVIRONMENT": "production"
  }
}
```

### **Option 2: Netlify**
Great alternative with excellent security features.

#### Steps:
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### Netlify Headers Configuration (`netlify.toml`):
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'module'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com; font-src 'self' https://fonts.gstatic.com https://fonts.cdnfonts.com; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:;"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```

### **Option 3: GitHub Pages**
Free, built-in, secure option.

#### Steps:
1. Create GitHub workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: 'dist'
      - uses: actions/deploy-pages@v2
```

### **Option 4: Custom Server (AWS, DigitalOcean, etc.)**

#### Security Setup:
1. **Use HTTPS/TLS**
   ```bash
   # Install Certbot for Let's Encrypt
   sudo certbot certonly --standalone -d yourdomain.com
   ```

2. **Configure Nginx** (`/etc/nginx/sites-available/portfolio`):
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'module'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com; font-src 'self' https://fonts.gstatic.com https://fonts.cdnfonts.com; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:;" always;

    # Root directory
    root /var/www/portfolio;
    index index.html;

    # Serve static files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Redirect HTTP to HTTPS
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

3. **Enable Auto-Renewal**:
```bash
sudo systemctl enable certbot-renew.timer
sudo systemctl start certbot-renew.timer
```

## Post-Deployment Security Verification

### 1. **Security Header Check**
Use [securityheaders.com](https://securityheaders.com/) to verify headers are properly set.

### 2. **SSL/TLS Test**
Use [ssllabs.com](https://www.ssllabs.com/ssltest/) for comprehensive HTTPS testing.

### 3. **Security Scan**
Run regular scans:
- [OWASP ZAP](https://www.zaproxy.org/)
- [Snyk](https://snyk.io/)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)

### 4. **Performance Monitoring**
- Set up uptime monitoring (Pingdom, UptimeRobot)
- Monitor SSL certificate expiration
- Track performance metrics

## Monitoring & Maintenance

### Weekly
```bash
npm audit
```

### Monthly
- Review GitHub dependency alerts
- Check SSL certificate expiration (90 days before)
- Monitor analytics/errors

### Quarterly
- Update dependencies
- Security audit of code
- Backup configuration

## Environment Variables

**Never commit sensitive data!** Use platform-specific secrets:

### Vercel Secrets:
```bash
vercel env add VITE_ENVIRONMENT production
```

### GitHub Secrets:
Used in deployment workflows (`.github/workflows/`)

### Netlify Secrets:
Dashboard → Site settings → Build & deploy → Environment

## Rollback Procedure

### Vercel:
- Deployments tab → Select previous deployment → Redeploy

### Netlify:
- Deploys tab → Select previous deploy → Restore

### GitHub Pages:
```bash
git revert <commit-hash>
git push origin main
```

## Troubleshooting

### Issue: CSP Violations in Console
- Check vite.config.js CSP policy
- Verify all resources are whitelisted
- Review browser console for specific violations

### Issue: External Links Not Working
- Verify URLs in HTML are correct
- Check that `rel="noopener noreferrer"` is present
- Test in incognito window to rule out cache issues

### Issue: HTTPS Not Redirecting
- Verify SSL certificate is installed
- Check server configuration
- Run SSL test on [ssllabs.com](https://www.ssllabs.com/ssltest/)

## Support

For deployment questions or security concerns:
- GitHub Issues: [Create issue](https://github.com/nigarishrehmansarmad)
- Email: nigarish019@gmail.com

---

**Last Updated**: 2026-05-16
**Status**: Production Ready ✅
