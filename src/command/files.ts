export default interface Files {
  list(): [string];

  cat(path: string): [string];
}
