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
  let div = crelm({test: myObj}, {deepClone: true})
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

test('Expect error to be thrown when not using an object:', () => {
  expect(() => crelm('SPAN')).toThrowError()
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

test('Method toJSON should return proper JSON:', () => {
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
  let json = elem.toJSON()
  expect(json.tagName).toBe('INPUT')
  expect(json.value).toBe('all the data')
  expect(json.placeholder).toBe('enter the data')
  expect(json.dataset.test).toBe('true')
  expect(typeof json.style).toBe('string')
})

test('toJSON should save children:', () => {
  let elem = crelm({html: '<b>test</b> test'})
  expect(elem.childNodes.length).toBe(2)
  expect(elem.toJSON().children[0].tagName).toBe('B')
})

test('toJSON selectedIndex and reapply:', () => {
  let elem = crelm({tag: 'select', children: [{tag: 'option'}, {tag: 'option'}], selectedIndex: 1})
  let elem2 = crelm(elem.toJSON(elem))
  expect(elem2.selectedIndex).toBe(1)
})

test('String style should compute:', () => {
  let elem = crelm({style: 'font-weight: bold'})
  expect(elem.style.fontWeight).toBe('bold')
})

test('attr should translate to attributes:', () => {
  let elem = crelm({attr: {max: '2'}})
  expect(elem.getAttribute('max')).toBe('2')
})

test('falsy child should not be made or throw error:', () => {
  let elem = crelm({children: [false, {}]})
  expect(elem.children.length).toBe(1)
})

test('Two of the same id should be same reference: ', () => {
  let elem = crelm({parent: document.body, id: 'test', html: 'hello', dataset: {test: 'true'}})
  let elemTwo = crelm({parent: document.body, id: 'test'})
  expect(document.body.children.length).toBe(1)
  expect(elem === elemTwo).toBe(true)
  expect(elemTwo.innerHTML).toBe('')
  expect(elemTwo.dataset.test).toBe(undefined)
})

test('mergeChanges should merge the elements: ', () => {
  let elem = crelm({parent: document.body, id: 'test', html: 'hello'})
  let elemTwo = crelm({parent: document.body, id: 'test', world: true}, {mergeChanges: true})
  expect(elem).toBe(elemTwo)
  expect(elem.innerHTML).toBe('hello')
  expect(elem.world).toBe(true)
})

test('replaceElement should remove old reference:' , () => {
  let elem = crelm({parent: document.body, id: 'test', html: 'hello'})
  let elemTwo = crelm({parent: document.body, id: 'test'}, {replaceElement: true})
  expect(document.body.children.length).toBe(1)
  expect(document.body.querySelector('#test').innerHTML).toBe('')
  expect(elem === elemTwo).toBe(false)
})

test('alwaysInsert should contain both references:', () => {
  let elem = crelm({parent: document.body, id: 'test'})
  let elemTwo = crelm({parent: document.body, id: 'test'}, {alwaysInsert: true})
  expect(document.body.children.length).toBe(2)
  expect(elem === elemTwo).toBe(false)
})

test('make document fragment:', () => {
  let f = crelm([
    [{tag: 'i', html: 'Hello fragment!'}],
    {tag: 'b', html: 'Hello world!'}
  ])
  let fTwo = crelm({
    tag: 'fragment'
  })
  expect(f.nodeName).toBe('#document-fragment')
  expect(f.firstChild.tagName).toBe('I')
  expect(fTwo.nodeName).toBe('#document-fragment')
})

test('make open shadow DOM:', () => {
  let s = crelm({
    shadow: [
      {tag: 'b', html: 'Hello!'}
    ]
  })
  expect(s.shadowRoot.nodeName).toBe('#document-fragment')
  expect(s.shadowRoot.firstChild.html).toBe('Hello!')
})

test('make closed shadow DOM:', () => {
  let s = crelm({
    shadow: {
      closed: true,
      children: [
        {tag: 'b', text: 'Hello!'}
      ]
    }
  })
  expect(s.shadowRoot).toBe(null)
})

test('make empty shadow DOM:', () => {
  let s = crelm({
    shadow: {}
  })
  expect(s.shadowRoot.nodeName).toBe('#document-fragment')
})