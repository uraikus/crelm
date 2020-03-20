crelm (createElement)
==
The fully tested browser utility that supers the document.createElement function.

Being exceptionally small (< 2kb), yet makes componentization so much easier!

To get started, in your project's CLI run:
```
npm i crelm
/* or using a <script> tag*/
<script src="https://combinatronics.com/uraikus/crelm/master/browser/v3.0.js"></script>
```

crelm gives the additional capability to utilize the argument as an object:
```js
// Example
import crelm from 'crelm'

let newLink = (name, href) => crelm({
  tag: 'A',
  parent: document.body, // a string === document.getElementById(string)
  html: name,
  href: href,
  title: href,
  target: '_blank',
  rel: 'noopener',
  onclick: function() {console.log(`Clicked: ${this.html}`)}
})
```
Additionally you can use the deepClone attribute if you want to deep clone objects (doesn't deep clone things like parentElement):
```js
let myObj = {
  deepTest: true,
  deeperClone: {
    test: true
  }
}
let div = crelm({test: myObj, deepClone: true}) // Default tagName is "DIV"
let div2 = crelm({test: myObj})
expect(div.test.deepTest).toBe(true)
expect(div2.test.deepTest).toBe(true)
expect(div.test.deeperClone.test).toBe(true)
expect(div2.test.deeperClone.test).toBe(true)
myObj.deepTest = false
myObj.deeperClone.test = false
expect(div.test.deepTest).toBe(true)
expect(div2.test.deepTest).toBe(false)
expect(div.test.deeperClone.test).toBe(true)
expect(div2.test.deeperClone.test).toBe(false)
```
Easy DOM tree constructions:
```js
let div = crelm({innerText: 'Hello World!'})
crelm({
  children:[
    'a text node', // Creates a textNode
    {tag: 'span', text: 'Greetings'}, // <span>Greetings</span>
    div, // Appends child to element
  ]
})
```
Styles and dataset will always be deep cloned:
```js
test('Create an element with styles:', () => {
  let div = crelm({
    style: {
      fontWeight: 'bold'
    }
  })
  expect(div.style.fontWeight).toBe('bold')
})
```
Crelm works great with [crease](https://www.npmjs.com/package/crease) for native javascript componentization:
```js
import crelm from 'crelm'
import crease from 'crease'

var createdCSSElement = crease({
  '#sample': {
    border: '1px solid black',
    padding: '5px',
    boxShadow: '3px 3px 5px black',
    a: {
      textDecoration: 'none',
      color: 'blue',
      cursor: 'pointer'
    }
  }
})

var createdDOMElement = crelm({
  id: 'sample',
  parent: document.body,
  children: [
    'My Links:',
    {tag: 'a', text: 'My Website', href: 'https://<whatever>.me'},
  ]
})
```
Would equal:
```html
<head>
  <style>
    #sample {
      border: 1px solid black;
      padding: 5px;
      box-shadow: 3px 3px 5px black;
    }
    #sample a {
      text-decoration: none;
      color: blue;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="sample">
    My Links
    <a href="https://<whatever>.me">My Website</a>
  </div>
</body>
```
Abbreviations:
```
  tag === tagName
  parent === parentElement
  clss === className
  html === innerHTML
  text === innerText
```