import {User, UserGroup} from '../../../api';

export function testString(str: string, pattern: string): boolean {
  return str.match(pattern) != null;
}

export function inGroup(user: User, group: string): boolean {
  return !group || group === '*'
    || user.groups.find(g => g.name === group) != null;
}

export function inGroups(user: User, groups: UserGroup[]): boolean {
  if (groups.length === 0)
    return true;
  for (let group of groups)
    if (user.groups.find(g => g.id === group.id) != null)
      return true;
  return false;
}
