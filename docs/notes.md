
server websocket 1.0.8 not yet for server

```js
import { WebSocket } from 'ws';

const ws = new WebSocket(`wss://`);
ws.onopen = ev => {
  console.log('open');
};
ws.onmessage = ev => {
  console.log('message', ev.data);
};
ws.onclose = ev => {
  console.log('close', ev.code);
};
ws.onerror = ev => {
  console.log('error', ev);
};
```

```
new WebSocket(url);
```
 - https://github.com/oven-sh/bun/issues/782
 - https://github.com/oven-sh/bun/discussions/414
```js
import {jsx as _jsx} from 'react/jsx-runtime';
```

```
jsxImportSource solid-js
```

```
bun dev --jsx solid
```

```
bun dev --jsx-runtime solid --jsx-import-source solid-js/web
```

```
const jsxTransform = require("babel-plugin-jsx-dom-expressions");
https://github.com/solidjs/solid/blob/main/packages/babel-preset-solid/index.js
```

```
const { code } = babel.transformSync("const v = <div a b={2} />;", {
  presets: [preset],
  babelrc: false,
  compact: true
});
```

https://dev.to/devalnor/running-jsx-in-your-browser-without-babel-1agc

<script src="https://unpkg.com/htm@2.2.1" crossorigin></script>

https://github.com/dataformsjs/dataformsjs/blob/master/docs/jsx-loader.md
