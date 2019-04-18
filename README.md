# jwallet-web

## Quick Start

Download and start image:

```bash
docker run -it -p 8080:80 jibrelnetwork/jwallet-web
```

Start with storybook:

```bash
docker run -it --env ENV=demo -p 8080:80 somename
```

And check it running: [http://localhost:8080]()

For recommended browsers list check out: [@jibrelnetwork/browserslist-config](https://github.com/jibrelnetwork/browserslist-config)

Visit our repository on Docker Hub: https://hub.docker.com/r/jibrelnetwork/jwallet-web/

## After first checkout

Install Digital Assets repository
* `git submodule update --init`

## Development
* `npm i`
* `npm run lang-update:en` - update en.json from po file
* `npm run dev` - starts webpack dev server (HMR enabled)

## Production

* `npm i`
* `npm run build:clean`
* share static files from `build` dir
