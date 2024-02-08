function extractClassSelector(classValue: string) {
  const classes = classValue
    .replace(/(^\s)/gm, '')
    .replace(/(\s{2,})/gm, ' ')
    .split(/\s/)
  // NOTE: marginやpadding, gridなどlayout調整で使われやすい数値付きを除外し、cssをescape
  return classes
    .filter((clz) => !clz.match(/\d/))
    .map((clz) => clz.replace(/(^[^_a-zA-Z\u00a0-\uffff]|[^-_a-zA-Z0-9\u00a0-\uffff])/g, '\\$1'))
    .join('.')
}

function needNthPart(el: Element, classSelector: string): boolean {
  if (!classSelector) return true
  // TODO: querySelectorで判定する？？？

  const children = el.parentNode.children
  if (children.length === 1) return false

  const sameList = Array.from(children).filter((e: Element) => classSelector === extractClassSelector(e.className))
  return sameList.length > 1
}

function getNthPart(el: Element): string {
  let childIndex = 1
  let sib = el.previousElementSibling
  while (sib) {
    childIndex++
    sib = sib.previousElementSibling
  }
  return `:nth-child(${childIndex})`
}

export function elemToSelector(elem: Element): string {
  const { tagName, id, className, parentElement } = elem

  let str = ''
  if (id !== '' && id.match(/^[a-z].*/)) {
    str += `#${id}`
    return str
  }

  if (!['DIV', 'SPAN'].includes(tagName)) {
    str = tagName.toLowerCase()
  }

  // NOTE: v-ifなどでtag構成が変わる可能性があるため、nth-childはできるだけ使用しなくて済む方向でselectorを構成する
  // NOTE: classは数値が入ったものは極力使わない。marginやpaddingなどで多用され、変更される可能性が高いため
  let elemClassSelector = ''
  if (className) {
    elemClassSelector = extractClassSelector(className)
    str = `${str}.${elemClassSelector}`
  }

  if (needNthPart(elem, elemClassSelector)) str += getNthPart(elem)

  if ('BODY' === parentElement?.tagName) return `body > ${str}`
  if (['HTML'].includes(parentElement?.tagName)) return str

  return `${elemToSelector(parentElement)} > ${str}`
}
