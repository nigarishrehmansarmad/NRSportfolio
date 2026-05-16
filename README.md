# Nigarish Rehman Sarmad - Full-Stack AI Engineer Portfolio

> **Building beautiful, intelligent products — from pixel-perfect frontends to robust backends**

A stunning 3D interactive portfolio website showcasing full-stack development expertise across frontend, backend, and AI/ML domains. Built with modern web technologies, enterprise-grade security, and optimized performance.

## 🌟 Features

### **Expertise Showcase**
- **Frontend Engineering**: React, TypeScript, Next.js, Tailwind CSS, animations
- **Backend Systems**: Node.js, FastAPI, system architecture, API design
- **AI & Machine Learning**: LLMs, Computer Vision, Deep Learning, RAG systems

### **8 Real Projects**
1. **Medical Image Analysis** - Full-stack multi-modal medical imaging with 82.6% precision
2. **Querying Tabular Data using Agentic AI** - Text-to-SQL pipeline with 4-stage workflow
3. **AI-based Answer Validator App** - Educational assessment with semantic similarity
4. **AI-powered RAG Search Application** - Next.js RAG system with pgvector
5. **NTIRE2025 Challenge** - Cross-domain few-shot object detection research
6. **Motorbike & Helmet Detection** - YOLOv3 real-time detection pipeline
7. **Emotion Detection using CNN** - 89% accuracy facial emotion recognition
8. **User Authentication using Socket Programming** - JWT-based WebSocket security

### **Visual Experience**
- Interactive 3D scene with Three.js and GSAP
- Smooth scroll animations and transitions
- Responsive design (mobile, tablet, desktop)
- Girlie aesthetic with refined typography and colors

### **Security**
- Content Security Policy (CSP) protection
- Security headers (HSTS, X-Frame-Options, etc.)
- Protected external links with rel="noopener noreferrer"
- No tracking or data collection
- GDPR compliant

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

## 📦 Tech Stack

### Frontend
- **Framework**: Vite 6, React (via Three.js)
- **3D Graphics**: Three.js (lighting, materials, camera animations)
- **Animations**: GSAP 3.15 with ScrollTrigger
- **Styling**: CSS3 with custom variables and gradients
- **Fonts**: Inter, PixelPurl

### Dev Tools
- **Node.js**: ^18.0.0
- **Package Manager**: npm 9+

### Security
- Content Security Policy (CSP)
- HTTP Security Headers
- Environment configuration management
- Regular dependency audits

## 📁 Project Structure

```
my-3d-portfolio-website/
├── index.html           # Main HTML with all sections & styles
├── scene.js             # Three.js 3D scene & animations
├── package.json         # Dependencies & scripts
├── vite.config.js       # Vite configuration with security headers
├── SECURITY.md          # Security policy & implementations
├── DEPLOYMENT.md        # Production deployment guide
└── .gitignore          # Git exclusions & security
```

## 🔒 Security Features

### Built-In Protections
- ✅ **XSS Prevention**: Strict CSP, no eval(), sanitized outputs
- ✅ **Clickjacking Defense**: X-Frame-Options: DENY
- ✅ **MIME-Sniffing Prevention**: X-Content-Type-Options: nosniff
- ✅ **Referrer Leakage Protection**: strict-origin-when-cross-origin
- ✅ **API Isolation**: No client-side API keys
- ✅ **Link Security**: rel="noopener noreferrer" on all external links

### Compliance
- ✅ GDPR Compliant (no tracking, no cookies)
- ✅ OWASP Top 10 Protection
- ✅ Security Headers Best Practices
- ✅ Content Security Policy Level 3

## 📊 Sections

### Home
Impressive introduction highlighting full-stack expertise with project showcase buttons.

### About
Professional background with technical stack breakdown and domain expertise.

### Expertise
Categorized skill levels with visual progress bars:
- Frontend Engineering (React, TypeScript, UI/UX)
- Backend Engineering (Node.js, FastAPI, Databases)
- AI & Machine Learning (LLMs, Computer Vision, RAG)

### Projects
8 production-ready projects with category badges, detailed descriptions, and tech stacks.

### Journey
Career timeline with experience and education, highlighting technical growth.

### Contact
Direct contact methods:
- 📧 Email: nigarish019@gmail.com
- 🐙 GitHub: github.com/nigarishrehmansarmad
- 💼 LinkedIn: linkedin.com/in/nigarish-rehman-sarmad-swe/
- 📍 Location: Karachi, Pakistan · Remote

## 🎨 Customization

### Colors
Edit CSS variables in `index.html`:
```css
:root {
  --plum-deep: #47105e;
  --orchid: #dc52de;
  --mauve: #d893df;
  --rose: #ea7098;
  /* ... more colors ... */
}
```

### Content
Edit sections directly in `index.html`:
- Hero section (lines 314-330)
- About section (lines 332-350)
- Expertise section (lines 352-425)
- Projects section (lines 427-500)
- Journey section (lines 502-555)
- Contact section (lines 557-620)

### 3D Scene
Modify in `scene.js`:
- Camera positions (sectionViews array)
- Lighting (ambientLight, dirLight, rimLight)
- Materials and colors
- 3D object geometries

## 📈 Performance

Optimized for speed and responsiveness:
- Lazy loading for 3D assets
- Efficient GSAP animations with hardware acceleration
- CSS containment for layout performance
- Minimal JavaScript bundle size

## 🔄 Updates & Maintenance

### Weekly
```bash
npm audit
```

### Monthly
- Check for dependency updates
- Review GitHub security alerts
- Monitor portfolio analytics

### Quarterly
```bash
npm update
npm audit fix
```

## 📚 Documentation

- **[SECURITY.md](./SECURITY.md)** - Detailed security implementations
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide

## 🌐 Deployment

Recommended platforms (in order):
1. **Vercel** (automatic security headers, best performance)
2. **Netlify** (excellent DX, custom headers support)
3. **GitHub Pages** (free, built-in HTTPS)
4. **Custom Server** (full control, requires manual security setup)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📞 Contact

- **Email**: nigarish019@gmail.com
- **GitHub**: [github.com/nigarishrehmansarmad](https://github.com/nigarishrehmansarmad)
- **LinkedIn**: [linkedin.com/in/nigarish-rehman-sarmad-swe](https://www.linkedin.com/in/nigarish-rehman-sarmad-swe/)

## 📄 License

This portfolio is personal work and not licensed for redistribution.

## 🙏 Credits

Created with [Three.js](https://threejs.org/), [GSAP](https://greensock.com/gsap/), and [Vite](https://vitejs.dev/).

---

**Last Updated**: May 16, 2026  
**Status**: Production Ready ✅  
**Security**: Enterprise Grade 🔒
