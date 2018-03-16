# jwallet-web

## Quick Start

Download and start image:

```bash
docker run -it -p 8080:80 jibrelnetwork/jwallet-web
```

And check it running: [http://localhost:8080]()

Visit our repository on Docker Hub: https://hub.docker.com/r/jibrelnetwork/jwallet-web/

## Development

* `npm run compile` - compiles assets
* `npm run dev` - starts webpack dev server (HMR enabled)

## Production

0. `npm i`
1. `npm run compile:prod`
2. share static files from `build` dir
