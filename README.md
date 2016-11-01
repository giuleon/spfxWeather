# weather-webpart

This is where you include your web part docs.

## Api

```bash
http://api.openweathermap.org
Api Key: 2251fe39598c8fa472ec4378cf1ef193
http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2251fe39598c8fa472ec4378cf1ef193

Google maps api
Api Key: AIzaSyAjaqtDy6kDiLHvCpulCEB1PIV7JwlAmoY
get photo reference
https://maps.googleapis.com/maps/api/place/textsearch/xml?query=rome&key=AIzaSyAjaqtDy6kDiLHvCpulCEB1PIV7JwlAmoY
get photo
https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAHhkCX6-pZwZAuvPWKioIQjbdGPpxbifptSET2hmEqw5uPTfgN-XUxBkqqc3_Wg5zB0wes_OyPmSd6aHtX5wZDirPT29EhqFDmFbK-m1wRZGHQp81WSuhrFA0RMJaVY46r91dE_GrVvnf7iWcIsbZ9l9vbVXQMhdO_13BVM7AYKsEhB4tATteDWLVS3ea_o0m31sGhRwuTnBrR8I4v_2kqYEmTkZGfOTlQ&key=AIzaSyAjaqtDy6kDiLHvCpulCEB1PIV7JwlAmoY
```

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* commonjs components - this allows this package to be reused from other packages.
* dist/* - a single bundle containing the components used for uploading to a cdn pointing a registered Sharepoint webpart library to.
* example/* a test page that hosts all components in this package.

### Build options

gulp nuke - TODO
gulp test - TODO
gulp watch - TODO
gulp build - TODO
gulp deploy - TODO
