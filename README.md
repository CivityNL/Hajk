# Hajk map implementation for Civity
We currently are going to only make use of sub-app `client` under /apps/client

## Client Config
This actually builds the hajk map.
Consists of hardcoded configurations, inside /public folder:
* appConfig.json -> defines generic app setup
* <map_and_layer_config.json> -> defines app components (plugins) structure, map extend, map layers etc.

<map_and_layer_config.json> can be explicitly selected to be loaded by providing in URL ?m=<map_and_layer_config>

## Release
`npm build` and place inside apache server, under /var/www/hajkmap/ naming after it's version or release tag, ex. v4.0.0 and then hyperlink it to `current_release`