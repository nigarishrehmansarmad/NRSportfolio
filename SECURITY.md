# Security Policy

## Overview
This portfolio website implements comprehensive security best practices to protect against common web vulnerabilities and ensure safe user interactions.

## Security Implementations

### 1. **Content Security Policy (CSP)**
- **Implementation**: Strict CSP headers prevent XSS (Cross-Site Scripting) attacks
- **Policy**: 
  - `default-src 'self'` - Only allow content from same origin
  - `script-src 'self' 'module'` - Only self-hosted scripts and ES modules
  - `style-src 'self' 'unsafe-inline'` - Styles from self and inline (necessary for existing styles)
  - `font-src` - Whitelisted Google Fonts and CDN fonts only
  - `img-src 'self' data: https:` - Images from self, data URLs, and HTTPS
  - `connect-src 'self' https:` - Network requests to self and HTTPS only
  - `frame-ancestors 'none'` - Prevent clickjacking (cannot be embedded in iframes)
  - `form-action 'self' mailto:` - Form submissions limited to self and mailto links
  - `base-uri 'self'` - Prevents base tag injection

### 2. **HTTP Security Headers**

#### X-Content-Type-Options: nosniff
- Prevents MIME-sniffing attacks
- Ensures browsers respect declared content types

#### X-Frame-Options: DENY
- Blocks clickjacking attacks
- Prevents embedding in iframes

#### X-XSS-Protection: 1; mode=block
- Additional XSS protection layer
- Instructs browsers to block detected XSS attempts

#### Referrer-Policy: strict-origin-when-cross-origin
- Controls referrer information leakage
- Only sends origin on cross-origin requests

#### Permissions-Policy
- Disables dangerous APIs not in use:
  - `geolocation=()` - No geolocation access
  - `microphone=()` - No microphone access
  - `camera=()` - No camera access

#### Strict-Transport-Security (HSTS)
- Forces HTTPS-only connections (production)
- `max-age=31536000` - 1 year of HSTS enforcement
- Includes subdomains and preload directives

### 3. **External Link Security**

All external links include:
- `target="_blank"` - Opens in new tab/window
- `rel="noopener noreferrer"` - Prevents:
  - `noopener` - New page cannot access `window.opener`
  - `noreferrer` - No referrer information leakage

**Protected Links:**
- GitHub profile
- LinkedIn profile

### 4. **Meta Tags for Security**

#### X-UA-Compatible
- Ensures IE compatibility mode is disabled

#### Charset & Viewport
- UTF-8 encoding prevents encoding-based attacks
- Proper viewport configuration prevents mobile exploitation

#### Description & Theme Color
- Accurate metadata prevents phishing/confusion

### 5. **Input Validation**

While this is a static portfolio (no form processing), all user interactions are sanitized:
- Navigation links use data attributes
- No untrusted data is dynamically inserted into the DOM
- All external links are hardcoded and verified

### 6. **Third-Party Dependencies Security**

#### Google Fonts
- Served over HTTPS only
- Same-origin policy enforced via CSP

#### CDN Fonts
- Reputable CDN (`cdnfonts.com`)
- HTTPS-only delivery

#### Three.js, GSAP, FontAwesome
- All served from CDN over HTTPS
- Integrity checks recommended for production

### 7. **Production Deployment Security Checklist**

Before deploying to production:

- [ ] Enable HTTPS/TLS for all traffic
- [ ] Add SRI (Subresource Integrity) hashes to external scripts:
  ```html
  <script src="https://example.com/lib.js" 
          integrity="sha384-..." 
          crossorigin="anonymous"></script>
  ```
- [ ] Configure CORS headers if needed
- [ ] Set up rate limiting on your hosting provider
- [ ] Enable DDoS protection (Cloudflare, AWS Shield, etc.)
- [ ] Regular security audits and dependency updates
- [ ] Enable HTTP/2 and compression
- [ ] Monitor for vulnerabilities with tools like:
  - npm audit
  - Snyk
  - OWASP ZAP

### 8. **Vulnerability Protection**

This portfolio is protected against:

| Vulnerability | Protection Mechanism |
|---|---|
| **XSS (Cross-Site Scripting)** | CSP, sanitized outputs, no eval() |
| **Clickjacking** | X-Frame-Options: DENY |
| **MIME-Sniffing** | X-Content-Type-Options: nosniff |
| **Referrer Leakage** | Referrer-Policy: strict-origin-when-cross-origin |
| **Information Disclosure** | No sensitive data in client-side code |
| **Unsafe Redirects** | rel="noopener noreferrer" on external links |
| **Malicious Scripts** | CSP strict script-src policy |
| **API Exposure** | No client-side API keys; CORS restricted |
| **Directory Traversal** | N/A - Static content only |
| **SQL Injection** | N/A - No database queries |

### 9. **Data Privacy**

- **No Analytics Tracking**: Portfolio doesn't track user behavior
- **No Cookies**: No tracking or session cookies
- **No Data Collection**: Contact information is links only (mailto:, GitHub, LinkedIn)
- **GDPR Compliant**: No personal data processing

### 10. **Regular Security Updates**

Keep dependencies updated:
```bash
npm audit
npm update
```

Monitor for vulnerabilities:
- GitHub Dependabot alerts
- npm security advisories
- Regular manual audits

## Contact

For security concerns or to report vulnerabilities:
- Email: nigarish019@gmail.com
- GitHub: https://github.com/nigarishrehmansarmad

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [HTTP Headers Best Practices](https://securityheaders.com/)

---

**Last Updated**: 2026-05-16
**Status**: Production Ready ✅
