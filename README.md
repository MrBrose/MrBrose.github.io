# https://MCTitles.com
This is the MCTitles Website, a place where you can learn how to create Minecraft Style logos, and download all of the official Minecraft logos. I hope you all find this website helpful!

# Development
The site is a Vue app built with Vite. Install the dependencies with `npm install`, then:

- `npm run dev` runs it locally at http://127.0.0.1:5292
- `npm run build` builds it into `dist`

Pages are listed in `src/pages.js`, which sets each page's title and OpenGraph tags, and their content is in `src/pages`. Images, fonts and downloads go in `public`. Pushing to `main` builds and deploys the site through GitHub Actions.

# How to use spellcheck.py
Ensure you have `python` and `nodejs` installed.
Run the spellcheck.py file, if cspell is not installed it will tell you.
To install cspell you will need to type `npm i cspell` then wait for it to install.
Rerun the spellcheck.py file and it should work.