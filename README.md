# Portfolio

Personal portfolio of Dmytro Pahuba: one home page and one case study page
per project. Astro, SASS and a little vanilla JavaScript, no UI framework.

## Running it

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site into dist/
npm run preview   # serve what was built
```

## Layout

```
src/
  pages/          one file per page, the home page and three case studies
  layouts/        Base wraps every page, CaseStudy adds the hero and the prose column
  components/     Header, Footer, Hero, Prose, Figure, Stack
  data/           the project list and the skill list the home page reads
  scripts/        small screen menu, scroll reveals, the three.js hero
  styles/         sass partials, entered through main.scss
public/assets/    images and icons, served as they are
```

## How a page is put together

A page picks a layout, hands it a title and a description, and fills the slot.
`CaseStudy` takes the hero image, the headline and the credit line, then leaves
the body to `Prose`, `Figure` and `Stack`, so a new case study is one file with
no styling of its own.
