
import {file, serve} from "bun";
import fs from "node:fs"
import { join } from "node:path";

const transpiler = new Bun.Transpiler({ loader: "jsx"});
const filepath = './components/App.jsx';
const blob = file(join(import.meta.dir+"/", filepath))
let text = await new Response(blob).text();
//console.log(text)

//let ports = transpiler.scan(text)
//console.log(ports)

let JSXToJs = ``
//JSXToJs += `import jsx from "solid-js/h";\n`
JSXToJs += transpiler.transformSync(text)
console.log(JSXToJs);
//NOTE THERE IS NO IMPORT 