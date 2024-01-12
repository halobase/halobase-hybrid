export type Tree<T> = {
  key: T,
  parent: Tree<T>,
  children: Tree<T>[],
};
