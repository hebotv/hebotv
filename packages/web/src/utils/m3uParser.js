function parseAttributes(attributeString) {
  return attributeString
    .split(/\s+/)
    .filter(att => att.indexOf('=') > 0)
    .map(att => att.split('='))
    .reduce((pre, cur) => {
      pre[cur[0]] = cur[1].replace(/"/g, '');
      return pre;
    }, {})
}

export function parser(m3uString) {
  const lines = m3uString.split('\n');
  const lists = [];
  let lineIndex = 0;
  while(lineIndex < lines.length) {
    let line = lines[lineIndex];
    if (lines[lineIndex].indexOf('#EXTINF') === 0) {
      const [attributes, des] = line.split(',');
      lists.push({
        ...parseAttributes(attributes),
        des,
        uri: lines[lineIndex + 1].split('\r')[0],
      });
      lineIndex = lineIndex + 2;
    } else {
      lineIndex = lineIndex + 1;
    }
  }
  return lists;
}