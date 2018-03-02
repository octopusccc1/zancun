export const getSiblings = (elem) => {
  let siblings = [];
  let sibling = elem.parentNode.firstChild;
  for (; sibling; sibling = sibling.nextSibling)
    if (sibling.nodeType === 1 && sibling !== elem)
      siblings.push(sibling);
  return siblings;
};

export const setRowActive = (node) => {
  //去除个例外
  if (node.classList.contains('ant-tooltip-inner') || node.classList.contains('ant-tooltip-arrow')) return;
  while (!node.classList.contains('ant-table-row')) {
    node = node.parentNode;
    if (node.classList.contains('ant-table-row')) {
      node.classList.add('row-active');
      getSiblings(node).map((i) => i.classList.remove('row-active'));
    }
  }
};
