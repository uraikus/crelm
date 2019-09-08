function crelm (elemAttr) {
  elemAttr = elemAttr || {}
  if (typeof elemAttr === 'string') return document.createElement(elemAttr)
  let tagName = elemAttr.tagName || 'div'
  let elem = document.createElement(tagName)
  let parent = elemAttr.parentElement  || elemAttr.parent || false
  if (parent && parent.appendChild) parent.appendChild(elem)
  if (elemAttr.children) {
    for (let x = 0; x < elemAttr.children.length; x++) {
      let child = elemAttr.children[x]
      if (child instanceof Node) elem.appendChild(child)
      else if (typeof child === 'string') {
        let textNode = document.createTextNode(child)
        elem.appendChild(textNode)
      } else if (typeof child === 'object') {
        let childElement = crelm(child)
        elem.appendChild(childElement)
      } else {
        let textNode = document.createTextNode(child.toString())
        elem.appendChild(textNode)
      }
    }
  }
  for (let key in elemAttr) {
    if (['parent', 'parentElement', 'tagName', 'deepClone', 'children'].includes[key]) continue
    else if (key === 'style') deepClone(elem.style, elemAttr.style)
    else if (typeof elemAttr[key] === 'object' && elemAttr.deepClone) elem[key] = deepClone({}, elemAttr[key])
    else elem[key] = elemAttr[key]
  }
  return elem

  function deepClone(obj1, obj2) {
    for (let key in obj2) {
      if (typeof obj2[key] === 'object') obj1[key] = deepClone({}, obj2[key])
      else obj1[key] = obj2[key]
    }
    return obj1
  }
}

module.exports = crelm