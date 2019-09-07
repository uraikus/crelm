createElement
==
The fully tested browser utility that supers the document.createElement function.

Being exceptionally small, yet makes componentization so much easier!

Gives the additional capability to utilize using the argument as an object:
```js
// Example
  import createElement from 'createElement'

  let newLink = (name, href) => createElement({
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
  let div = createElement({test: myObj, deepClone: true}) // Default tagName is "DIV"
  let div2 = createElement({test: myObj})
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
let div = createElement({innerText: 'Hello World!'})
createElement({
  children:[
    'a text node', // Creates a textNode
    {tagName: 'span', innerText: 'Greetings'}, // Creates a span,
    div, // Appends child to element
  ]
})
```