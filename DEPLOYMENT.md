# Deployment Guide

## GitHub Pages Deployment

### Quick Setup

1. **Create a GitHub Repository**
   ```bash
   # Initialize git repository
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   
   # Add remote repository (replace with your GitHub username)
   git remote add origin https://github.com/vanshdeshwal/portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access Your Site**
   - Your site will be available at: `https://vanshdeshwal.github.io/portfolio`
   - It may take a few minutes for the site to be live

### Custom Domain (Optional)

1. **Purchase a Domain**
   - Buy a domain from providers like Namecheap, GoDaddy, etc.

2. **Configure DNS**
   - Add these A records to your domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Set Custom Domain in GitHub**
   - Go to repository Settings > Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

4. **Add CNAME File**
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

## Alternative Deployment Options

### Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build` (optional)
   - Publish directory: `/` (root)

3. **Deploy**
   - Netlify will automatically deploy your site
   - You'll get a random subdomain (e.g., `amazing-site-123.netlify.app`)

### Vercel

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository

2. **Deploy**
   - Vercel will automatically build and deploy
   - You'll get a `.vercel.app` domain

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

## Pre-Deployment Checklist

- [ ] Test website locally
- [ ] Update all personal information
- [ ] Replace placeholder content
- [ ] Optimize images
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Validate HTML/CSS
- [ ] Set up analytics
- [ ] Configure contact form
- [ ] Add favicon
- [ ] Test loading speed

## Post-Deployment

### Analytics Setup (Google Analytics)

1. Create a Google Analytics account
2. Add tracking code to `index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### SEO Optimization

1. **Meta Tags** (already included)
2. **Sitemap** (for larger sites)
3. **robots.txt** (if needed)
4. **Schema.org markup** (optional)

### Performance Monitoring

- Use Google PageSpeed Insights
- Monitor with Google Search Console
- Set up uptime monitoring

## Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor performance
- Update content regularly
- Check for broken links
- Backup your work

### Version Control
```bash
# Regular workflow
git add .
git commit -m "Update: description of changes"
git push
```

The site will automatically redeploy on GitHub Pages when you push changes to the main branch.
