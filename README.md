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
    {oncreate: element => {
      doSomethingToElement(element)
    }}
  ]
})
```
Your elements can then be turned back into JSON with the toJSON method:
```js
let elem = crelm({
  tag: 'input',
  value: 'all the data',
  placeholder: 'enter the data',
  dataset: {
    test: true
  },
  style: {
    fontSize: 'large',
    color: 'blue'
  }
})
elem.toJSON() // would return the following:
{
  tagName: 'INPUT',
  value: 'all the data',
  placeholder: 'enter the data',
  dataset: {
    test: 'true' // dataset values are converted to strings
  },
  style: 'font-size: large; color: blue;' // notice type conversion here.
}
```
Abbreviations:
```
  tag === tagName
  parent === parentElement
  clss === className
  html === innerHTML
  text === innerText
```
# Changelog
* V4.0.0
  - Created changelog
  - Added the toJSON method
  - In crelm(attr) the attr must be an object or falsy.
  - The style attribute can now be a string.