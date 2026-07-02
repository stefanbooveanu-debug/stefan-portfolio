# Stefan Portfolio

Personal portfolio site inspired by [laurachirila.com](https://laurachirila.com).

## Pages

- `index.html` — Home, experience, stack, recent projects
- `about.html` — Bio, experience, education focus
- `portfolio.html` — Full project gallery
- `contact.html` — Contact form with inquiry topics

## Run locally

Open any page in the browser, or serve the folder:

```bash
cd ~/Projects/stefan-portfolio
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Customize

Edit your email in `assets/js/main.js`:

```js
const SITE = {
  email: "stefanbooveanu@gmail.com",
  github: "https://github.com/stefanbooveanu-debug",
  linkedin: "https://www.linkedin.com/in/stefan-booveanu-4a316a328/",
};
```

Also update project links, experience, and your LinkedIn URL in `assets/js/main.js` if needed.

## Deploy

Works on GitHub Pages, Netlify, or Vercel as a static site.
