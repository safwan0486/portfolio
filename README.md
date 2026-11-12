# Safwan's portfolio — how to edit and publish

Plain HTML, CSS and JavaScript. No build step and nothing to install.

```
site/
├── index.html          page structure (rarely needs editing)
├── css/style.css       colours, fonts, layout
├── js/data.js          ALL YOUR CONTENT  ← edit this one
├── js/main.js          animations, lanyard physics, tabs
├── images/             put your photos, screenshots and logos here
└── Safwan_Resume.pdf   the file the "Download CV" buttons open
```

## See it on your computer

Install the **Live Server** extension in VS Code, open the `site` folder,
right-click `index.html` and choose **Open with Live Server**. The page reloads
every time you save.

(Double-clicking `index.html` also works.)

## Change the text

Open `js/data.js`. Everything is there: name, bio, experience, projects,
certificates, skills and links. Keep the quotes `" "` and commas `,` in place.

## Add pictures

1. Copy the image into the `images/` folder.
2. In `js/data.js`, write its path in the matching field:

| What | Field in data.js | Best size |
|---|---|---|
| Lanyard badge photo | `photo: "images/me.jpg"` | portrait, about 600 × 800 |
| Project screenshot | `image: "images/sentiment.png"` inside a project | 16:9, about 1280 × 720 |
| Certificate | `image:` and `link: "https://www.credly.com/..."` | |
| Company, university or activity logo | `logo: "images/agrobank.png"` in experience, education or activities | square |
| Photos for an experience, education or activity | `images: ["images/agrobank-1.jpg", "images/agrobank-2.jpg"]` | landscape 4:3; add as many as you like, they enlarge on click |
| Tech logo | `logo: "images/powerbi.svg"` in skills | square SVG or PNG |

Tech logos already come from two free icon libraries:
- `dev("python/python-original")` uses https://devicon.dev (search for a logo there and copy its name)
- `si("polars")` uses https://simpleicons.org (one-colour logos; add `mono: true`)

Power BI, SharePoint and BeautifulSoup don't have logos in either library, so
they show letters. Download their logos, put them in `images/`, and set `logo:`.

## Change colours or fonts

The top of `css/style.css` has the colour list for dark mode and light mode.
Fonts are loaded from Google Fonts in `index.html`.

## Make the contact form send email

1. Sign up free at https://formspree.io and create a form.
2. Copy its URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `formEndpoint:` at the bottom of `js/data.js`.

## Put it online with Vercel (free)

1. Create a GitHub repository, e.g. `portfolio`, and upload everything inside `site/`.
2. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**, pick the repo, and click **Deploy**.
3. You get a link like `safwan-portfolio.vercel.app`. Every time you push a change to GitHub, Vercel updates the site.

GitHub Pages works too: you already have `safwan0486.github.io`, so you can upload these files there.
