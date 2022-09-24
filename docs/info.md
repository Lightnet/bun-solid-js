import and require .svelte, .vue, .yaml, .scss, .less and other file extensions that Bun doesn't implement a builtin loader for

import { plugin } from "bun";
// Their esbuild plugin runs in Bun (without esbuild)
import mdx from "@mdx-js/esbuild";
plugin(mdx());

```js
import { plugin } from "bun";

plugin({
  name: "YAML",

  setup(builder) {
    const { load } = require("js-yaml");
    const { readFileSync } = require("fs");
    // Run this function on any import that ends with .yaml or .yml
    builder.onLoad({ filter: /\.(yaml|yml)$/ }, (args) => {
      // Read the YAML file from disk
      const text = readFileSync(args.path, "utf8");

      // parse the YAML file with js-yaml
      const exports = load(text);

      return {
        // Copy the keys and values from the parsed YAML file into the ESM module namespace object
        exports,

        // we're returning an object
        loader: "object",
      };
    });
  },
});
```