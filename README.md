# Hajk map implementation for Civity
We currently are going to only make use of sub-app `client` under /apps/client

## Client Config
This actually builds the hajk map.
Consists of hardcoded configurations, inside /public folder:
* appConfig.json -> defines generic app setup
* <map_and_layer_config.json> -> defines app components (plugins) structure, map extend, map layers etc.

<map_and_layer_config.json> can be explicitly selected to be loaded by providing in URL ?m=<map_and_layer_config>

## Build
Run commands:
```
   cd /apps/client
   npm install
   npm build
```

## Test locally
Either run:
```
    npm start
```
and serve it under http://localhost:3000

or test the current build, from inside client path:
```
   cd /build
   python ..\noCacheHttp.py
```
and serve it under http://localhost:3333

## Release
Place `build` folder inside apache server, under /var/www/hajkmap/ naming after it's version or release tag, ex. v4.0.0 and then hyperlink it to `current_release`
