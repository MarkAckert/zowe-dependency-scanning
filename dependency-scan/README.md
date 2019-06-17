## Usage

`yarn install`

`yarn build && node lib/index.js`

Executing `node lib/index.js` from npm script context will not work (with either npm or yarn as invocation method). ENV's are populated which interfere with cloned project dependency resolutions.