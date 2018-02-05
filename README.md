<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/jullierme/flytecnologia-ui/master/demo/src/assets/logo.svg">
</p>

# flytecnologia-ui - Angular library

[![npm version](https://badge.fury.io/js/flytecnologia-ui.svg)](https://badge.fury.io/js/flytecnologia-ui),
[![Build Status](https://travis-ci.org/jullierme/flytecnologia-ui.svg?branch=master)](https://travis-ci.org/jullierme/flytecnologia-ui)
[![Coverage Status](https://coveralls.io/repos/github/jullierme/flytecnologia-ui/badge.svg?branch=master)](https://coveralls.io/github/jullierme/flytecnologia-ui?branch=master)
[![dependency Status](https://david-dm.org/jullierme/flytecnologia-ui/status.svg)](https://david-dm.org/jullierme/flytecnologia-ui)
[![devDependency Status](https://david-dm.org/jullierme/flytecnologia-ui/dev-status.svg?branch=master)](https://david-dm.org/jullierme/flytecnologia-ui#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/jullierme/flytecnologia-ui.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://jullierme.github.io/flytecnologia-ui

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 5 or higher, tested with 5.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `flytecnologia-ui` via:
```shell
npm install --save flytecnologia-ui --save
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `flytecnologia-ui`:
```js
map: {
  'flytecnologia-ui': 'node_modules/flytecnologia-ui/bundles/flytecnologia-ui.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { FlytecnologiaUiModule } from 'flytecnologia-ui';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` FlytecnologiaUiModule.forRoot()`):
```js
import { FlytecnologiaUiModule } from 'flytecnologia-ui';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [FlytecnologiaUiModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` FlytecnologiaUiModule `:

```js
import { FlytecnologiaUiModule } from 'flytecnologia-ui';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [FlytecnologiaUiModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2017 Jullierme Barros. Licensed under the MIT License (MIT)

