/*
  Bun 1.0.8 beta
  Does not work transpiler and transform
  Babel does not work.
 */

import {file, serve} from "bun";
import fs from "node:fs"
import { join } from "node:path";

const PORT = process.env.PORT || 1337;
console.log(PORT)

// browser input request query
async function apiFetch(req){

  const { pathname } = new URL(req.url);
  if(pathname === '/favicon.ico'){
    //const heads = new Headers();
    //heads.set('Content-Type','text/html; charset=UTF-8')
    //return new Response(blob,{headers:heads});
    return new Response('',{status:204});
  }

  if(pathname === '/'){
    const headers = new Headers();
      
    headers.set('Content-Type','text/html; charset=UTF-8')
    headers.set('Access-Control-Allow-Origin','*')
    headers.set('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, PATCH')
    headers.set('Access-Control-Allow-Headers',"Origin, Depth, User-Agent, X-file-Size, X-Request-With, Content-Type, Accept")

    const blob = file(join(import.meta.dir, "/index.html"))
    let textHtml = await (new Response(blob).text());
    textHtml = textHtml.replace('<!--CLIENT-->','<script type="module" src="client.jsx" nonce="n0nce"></script>')
    return new Response(textHtml,{headers});
  }

  if(req.url.endsWith('.js')){
    const filepath = new URL( req.url).pathname;
    const blob = file(join(import.meta.dir+"/", filepath))		  
    return new Response(blob,{headers:{'Content-Type':'text/javascript'}})
  }

  if(req.url.endsWith('.jsx')){
    const transpiler = new Bun.Transpiler({ loader: "jsx", platform:"browser" });
    const filepath = new URL( req.url).pathname;
    const blob = file(join(import.meta.dir+"/", filepath))
    let text = await new Response(blob).text();
    //console.log(text)
    let JSXToJs = ``
    //JSXToJs += `import jsx from "solid-js/h";\n`
    JSXToJs += transpiler.transformSync(text)
    //console.log(JSXToJs)
    //JSXToJs = JSXToJs.replace(`/** @jsx 'solid-js/h' */`, `import { default as jsx } from "solid-js/h";`)
    return new Response(JSXToJs,{headers:{'Content-Type':'text/javascript'}})
  }
    
  return new Response(
    file(join(import.meta.dir,"./public/", pathname))
  );
}

//console.log("PORT:",PORT)
console.log(`Bun serve http://localhost:${PORT}`)
console.log("NODE_ENV:", process.env.NODE_ENV)

const server = serve({
  development: process.env.NODE_ENV !== "production",
  //hostname: "localhost", // defaults to 0.0.0.0
  //port: 3000,
  port: Number(PORT),//error on string
  //fetch:livereload(fetch),
  fetch:apiFetch,
  error(error) {//error: Error
    return new Response("Uh oh!!\n" + error.toString(), {status: 500 });
  },
});