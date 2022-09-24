
# Package / Program:
 - Bun 0.1.8 beta

# Information:

  Current solid-js is not possible to compile jsx to js.

  Babeljs is not possible.

  The only possible way is html format buildless set up.

# Notes:
  - websocket on server is not added from Bun runtime.
  - Bun.Transpiler({ loader: "jsx"}); not working and partly working.
    - The format for solid-js not added. Only custom build for Bun runtime.

# ref links:
 - import html from "https://cdn.skypack.dev/solid-js/html";
 - https://www.solidjs.com/guides/getting-started