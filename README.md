# Multimedia Project: Minimum Wage


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


## Export for production

```
npm run build
```

All of the links to static assets will be added with prefix: `appConfig/assetPrefix`, which can be configured in `config.js`


## Useful links

* [D3 4.0 API Reference](https://github.com/d3/d3/blob/master/API.md)
* [react-faux-dom](https://github.com/Olical/react-faux-dom)
* [D3 Tips and Tricks v3.x](https://leanpub.com/D3-Tips-and-Tricks/read)
* [Example Website 1](https://bl.ocks.org/markmarkoh)
* [Example Website 2](https://bl.ocks.org/d3noob)
