next-pixi


## Export static files

You can export static files simply running the following command ([See Next.js document](https://github.com/zeit/next.js/#static-html-export))

```
npm run build
```

Remember to check all the exported paths have been properly configured in `exportPathMap` in `next.config.js`.

All the static assets will be exported to `./out` folder. You can use the following command to run a simple server to see the exported results.

```
node staticServer.js
```
