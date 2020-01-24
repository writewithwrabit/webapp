const convertNode = (node) => {
  const { object, type, data, nodes, ...rest } = node;
  // We drop `object`, pull up data, convert `nodes` to children and copy the rest across
  const element = {
    type,
    ...data,
    ...rest,
    ...(nodes ? { children: nodes.map(convertNode) } : {}),
  };

  if (element.marks && element.marks.length) {
    element.marks.forEach(mark => {
      switch (mark.type) {
        case 'bold':
          element.bold = true;
          break;
        case 'italic':
          element.italic = true;
          break;
        case 'underlined':
          element.underlined = true;
          break;
      }
    });
  }

  // Atomic blocks must now have children
  if (element.type && !element.children) {
    element.children = [
      {
        text: '',
      },
    ];
  }
  return element;
};

const convertSlate047 = (object) => {
  const { nodes } = object.document;
  return nodes.map(convertNode);
};

export default convertSlate047;