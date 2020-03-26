function crelm (elemAttr) {
  elemAttr = elemAttr || {};
  if (typeof elemAttr === 'string') return document.createElement(elemAttr);
  var tagName = elemAttr.tagName || elemAttr.tag || 'div';
  var elem = document.createElement(tagName);
  Object.defineProperty(elem, 'text', {
    get: function(){
        return this.innerText;
    },
    set: function(val){
      this.innerText = val;
    }
  })
  Object.defineProperty(elem, 'html', {
    get: function(){
        return this.innerHTML;
    },
    set: function(val){
      this.innerHTML = val;
    }
  })
  Object.defineProperty(elem, 'clss', {
    get: function(){
        return this.className;
    },
    set: function(val){
      this.className = val;
    }
  })
  var parent = elemAttr.parentElement  || elemAttr.parent || false;
  if (parent && parent.appendChild) parent.appendChild(elem);
  else if (typeof parent === 'string') document.getElementById(parent).appendChild(elem);
  if (elemAttr.children) {
    for (var x = 0; x < elemAttr.children.length; x++) {
      var child = elemAttr.children[x];
      if (child instanceof Node) elem.appendChild(child);
      else if (typeof child === 'string') {
        var textNode = document.createTextNode(child);
        elem.appendChild(textNode);
      } else if (typeof child === 'object') {
        var childElement = crelm(child);
        elem.appendChild(childElement);
      } else {
        var textNode = document.createTextNode(child.toString());
        elem.appendChild(textNode);
      }
    }
  }
  for (var key in elemAttr) {
    if (['parent', 'parentElement', 'tagName', 'tag', 'deepClone', 'children'].indexOf(key) !== -1) continue;
    else if (key === 'style' || key === 'dataset') deepClone(elem[key], elemAttr[key]);
    else if (typeof elemAttr[key] === 'object' && elemAttr.deepClone) elem[key] = deepClone({}, elemAttr[key]);
    else elem[key] = elemAttr[key];
  }
  if (typeof elem.oncreate === 'function') elem.oncreate(elem)
  return elem;

  function deepClone(obj1, obj2) {
    for (var key in obj2) {
      if (typeof obj2[key] === 'object') obj1[key] = deepClone({}, obj2[key]);
      else obj1[key] = obj2[key];
    }
    return obj1;
  }
}

module.exports = crelm;