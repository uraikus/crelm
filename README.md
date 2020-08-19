crelm (createElement)
==
The exceptionally small (< 3kb), super fast, independent, fully tested, and modular javascript library that simplifies and expedites page work flows.

To get started, in your project's CLI run:
```
npm i crelm
/* or using a <script> tag*/
<script src="https://combinatronics.com/uraikus/crelm/master/browser/v6.0.js"></script>
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

export default newLink
```
Easy DOM tree constructions:
```js
let div = crelm({innerText: 'Hello World!'})
crelm({
  children:[
    'a text node', // Creates a textNode
    {tag: 'span', text: 'Greetings'}, // <span>Greetings</span>
    div, // Appends child to element
    conditionalElement ? {tag: 'Hello!'} : false,
    {oncreate: element => {
      doSomethingToElement(element)
    }}
  ]
})
```
Easy to update components on data changes:
```js
import {state} from './state'

ondata = e => {
  // By default, this element will be updated to match or created if it doesn't exist
  crelm({id: 'test', style: {display: state.show}, parent: elem, text: e.data})
}
```
The second argument can pass options:
```js
// defaults
crelm({}, {
  deepClone: false, // Wether objects in the attribute argument will be stored as references or new objects. True === new Object()
  replaceElement: false, // Wether to remove the old and create a new reference.
  alwaysInsert: false, // Overides the update procedure.
  mergeChanges: false // When true, children, arguments, dataset, and style won't be reset on each update.
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
You can set attributes using the attr:Object key:
```js
let elem = crelm({
  tag: 'input',
  attr: {max: 5, min: 2}
})
elem.outerHTML // <input max=5 min=2 />
```
Abbreviations/aliases:
```
  tag === tagName
  parent === parentElement
  clss === className
  html === innerHTML
  text === innerText
```
If you like this package, also check out the following:
- [crelmstat](https://www.npmjs.com/package/crelmstat) for state management
- [crelm-popup](https://www.npmjs.com/package/crelm-popup) for a super simple popup
- [crease](https://www.npmjs.com/package/crease) for modular css
# Changelog

* V6.0.1
  - **Added:** README.md with references to other products.
  - **Changed:** package description.
* V6.0.0
  - **Added:** if an element already exists with the id, it will instead modify the pre-existing one.
  - **Added:** options argument with alwaysInsert, replaceElement, mergeChanges, and deepClone.
  - **Changed:** deepClone is now in the options argument, not the attributes argument.
* V5.0.0
  - **Fixed:** Style attribute now converts when string.
  - **Added:** The ('attr': Object) attribute will now setAttributes via key/value.
* V4.0.0
  - Created changelog
  - Added the toJSON method
  - In crelm(attr) the attr must be an object or falsy.
  - The style attribute can now be a string.