import path from 'path';

export function publicDir(...paths: string[]): string {
  const pathsToJoin = [__dirname, '../', 'public', ...paths];
  return path.join(...pathsToJoin);
}
