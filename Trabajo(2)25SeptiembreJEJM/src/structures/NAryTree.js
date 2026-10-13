export class NAryTreeNode {
  constructor({ id, title, path, icon, componentName, children = [] }) {
    this.id = id || String(Date.now() + Math.random());
    this.title = title;
    this.path = path;
    this.icon = icon || 'Folder';
    this.componentName = componentName || 'DefaultView';
    this.children = children.map(child => new NAryTreeNode(child));
  }

  addChild(childData) {
    const childNode = new NAryTreeNode(childData);
    this.children.push(childNode);
    return childNode;
  }
}

export class NAryTree {
  constructor(rootData) {
    this.root = new NAryTreeNode(rootData);
  }

  findNodeById(id, current = this.root) {
    if (current.id === id) return current;
    for (const child of current.children) {
      const found = this.findNodeById(id, child);
      if (found) return found;
    }
    return null;
  }

  insert(parentId, nodeData) {
    const parent = this.findNodeById(parentId);
    if (parent) {
      return parent.addChild(nodeData);
    }
    return null;
  }

  getAllNodes(current = this.root, list = []) {
    if (current.id !== 'root') {
      list.push(current);
    }
    for (const child of current.children) {
      this.getAllNodes(child, list);
    }
    return list;
  }
}