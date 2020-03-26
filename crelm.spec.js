require('browser-env')()
const crelm = require('./crelm.js')

beforeEach(() => {
  document.body.innerHTML = ''
})

test('Create a link:', () => {
  crelm({
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
  let div = crelm({test: myObj, deepClone: true})
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
})

test('Create a bare minimum element:', () => {
  let div = crelm()
  expect(div.tagName).toBe('DIV')
})

test('Create an element with styles:', () => {
  let div = crelm({
    style: {
      fontWeight: 'bold'
    }
  })
  expect(div.style.fontWeight).toBe('bold')
})

test('Create element with a string:', () => {
  let span = crelm('SPAN')
  expect(span.tagName).toBe('SPAN')
})

test('Use parentElement instead:', () => {
  let span = crelm({parentElement: document.body})
  expect(document.body.children[0]).toBe(span)
})

test('Create all kinds of children:', () => {
  let span = crelm({innerHTML: 'I\'m a span'})
  let div = crelm({
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

test('Should set innerHTML by changing html:', () => {
  let div = crelm({html: 'test'})
  expect(div.innerHTML).toBe('test')
})

test('Should retrieve innerHTML by checking html:', () => {
  let div = crelm({innerHTML: 'test'})
  expect(div.html).toBe('test')
})

test('Should set innerText by changing text:', () => {
  let div = crelm({text: 'test'})
  expect(div.innerText).toBe('test')
})

test('Should retrieve innerText by checking text:', () => {
  let div = crelm({innerText: 'test'})
  expect(div.text).toBe('test')
})

test('Should set className by changing clss:', () => {
  let div = crelm({clss: 'test'})
  expect(div.className).toBe('test')
})

test('Should retrieve className by checking clss:', () => {
  let div = crelm({className: 'test'})
  expect(div.clss).toBe('test')
})

test('Should make append a child to a parent by string id:', () => {
  let parent = crelm({id: 'test', parent: document.body})
  let child = crelm({parent: 'test'})
  expect(parent.firstChild).toBe(child)
})

test('Should fire oncreate(elem) after creation:', () => {
  let elem = crelm({created: false, oncreate: e => e.created = true})
  expect(elem.created).toBe(true)
})