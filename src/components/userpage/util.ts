import {User} from '../../api';

export function testString(str: string, pattern: string): boolean {
  return str.match(pattern) != null;
}

export function inGroup(user: User, group: string): boolean {
  return !group || group === '*'
    || user.groups.find(g => g.name === group) != null;
}
