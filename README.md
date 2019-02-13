# jwallet-web

## Quick Start

Download and start image:

```bash
docker run -it -p 8080:80 jibrelnetwork/jwallet-web
```

And check it running: [http://localhost:8080]()

Visit our repository on Docker Hub: https://hub.docker.com/r/jibrelnetwork/jwallet-web/

## After first checkout

Install Digital Assets repository
* `git submodule init`
* `git submodule update`

## Development
* `npm i`
* `npm run lang-update:en` - update en.json from po file
* `npm run dev` - starts webpack dev server (HMR enabled)

## Production

* `npm i`
* `npm run build:clean`
* share static files from `build` dir
