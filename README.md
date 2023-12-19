# Portfolio

Personal portfolio of Dmytro Pahuba: one home page and one case study page
per project. Plain HTML, SASS and vanilla JavaScript, no framework.

## Running it

The site is plain HTML, CSS and JavaScript, so any static server will do:

```sh
npm run serve
```

Then open <http://localhost:5500>.

## Editing the styles

`css/style.css` is generated. Never edit it by hand: edit the partials under
`sass/` and rebuild.

```sh
npm install
npm run css      # build once
npm run watch    # rebuild on every save
```

## Layout

```
index.html              home page
kwh-4-0.html            case study: KWH 4.0
kherson-help-bot.html   case study: Kherson Help Bot
fx-calendar-bot.html    case study: FX Calendar Bot
index.js                small screen menu
sass/
  abstracts/            variables, media query mixin, shared utility classes
  base/                 reset and element defaults
  components/           header, footer, skills, scroll indicator
  pages/                home, case study
css/style.css           generated from sass/main.scss
assets/                 images and icons
```
