require('browser-env')()
const createElement = require('./createElement.js')

beforeEach(() => {
  document.body.innerHTML = ''
})

test('Create a link:', () => {
  createElement({
    tagName: 'a',
    parent: document.body, // An alias for parentElement
    innerHTML: 'Google',
    href: 'https://google.com/',
    onclick: function() {console.log(`Clicked: ${this.innerHTML}`)}
  })
  let a = document.body.children[0]
  expect(a.innerHTML).toBe('Google')
  expect(a.href).toBe('https://google.com/')
  expect(a.parentElement).toBe(document.body)
  expect(a.tagName).toBe('A')
})

test('Create a deep clone:', () => {
  let myObj = {
    deepTest: true,
    deeperClone: {
      test: true
    }
  }
  let div = createElement({test: myObj, deepClone: true})
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
})

test('Create a bare minimum element:', () => {
  let div = createElement()
  expect(div.tagName).toBe('DIV')
})

test('Create an element with styles:', () => {
  let div = createElement({
    style: {
      fontWeight: 'bold'
    }
  })
  expect(div.style.fontWeight).toBe('bold')
})

test('Create element with a string:', () => {
  let span = createElement('SPAN')
  expect(span.tagName).toBe('SPAN')
})

test('Use parentElement instead:', () => {
  let span = createElement({parentElement: document.body})
  expect(document.body.children[0]).toBe(span)
})

test('Create all kinds of children:', () => {
  let span = createElement({innerHTML: 'I\'m a span'})
  let div = createElement({
    children: [
      'textNode',
      {innerHTML: 'an Object to be made'},
      span,
      1
    ]
  })
  expect(div.firstChild.data).toBe('textNode')
  expect(div.children[0].innerHTML).toBe('an Object to be made')
  expect(div.children[0] instanceof Node).toBe(true)
  expect(div.children[1].innerHTML).toBe('I\'m a span')
  expect(div.children[1]).toBe(span)
  expect(div.childNodes[3].data).toBe('1')
})