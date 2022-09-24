import Babel from '@babel/standalone';
import solid from 'babel-preset-solid';

Babel.registerPreset("solid", solid());

var input = 'const getMessage = () => "Hello World";';
input = `
export default function Home(){
  return (<div>Test</div>)
}
`;

var output = Babel.transform(input,{presets: ["solid"], babelrc: false }).code;
console.log(output)