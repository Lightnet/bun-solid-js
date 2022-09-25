
# Status:
- prototype
- tests

# Package / Program:
 - Bun 0.1.8 beta

# Information:

  simple but buildless solid-js with bun http server.

  Current solid-js is not possible to compile jsx to js.

  Babeljs is not possible.

  The only possible way is html format buildless set up.

  Note that cors or Content-Security-Policy just for dev testing since. unsafe-eval is not good.

```
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' 'nonce-n0nce'" />
```

  Nodejs test for simple solid build test.

# Test build:
- https://codedamn.com/playground/VK-TpLw8x2K9LjsG1WQ7a

# Notes:
  - websocket on server is not added from Bun runtime.
  - Bun.Transpiler({ loader: "jsx"}); not working and partly working.
    - The format for solid-js not added. Only custom build for Bun runtime.

# ref links:
 - import html from "https://cdn.skypack.dev/solid-js/html";
 - https://www.solidjs.com/guides/getting-started