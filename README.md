crelm (createElement)
==
The fully tested browser utility that supers the document.createElement function.

Being exceptionally small, yet makes componentization so much easier!

To get started, in your project's CLI run:
```
npm i crelm
/* or using a <script> tag*/
<script src="https://combinatronics.com/uraikus/crelm/master/browser/v1.0.js"></script>
```

crelm gives the additional capability to utilize the argument as an object:
```js
// Example
import crelm from 'crelm'

let newLink = (name, href) => crelm({
  tagName: 'A',
  parent: document.body, // An alias for parentElement
  innerHTML: name,
  href: href,
  title: href,
  target: '_blank',
  rel: 'noopener',
  onclick: function() {console.log(`Clicked: ${this.innerHTML}`)}
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
    {tagName: 'span', innerText: 'Greetings'}, // Creates a span,
    div, // Appends child to element
  ]
})
```
Styles will always be deep cloned:
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