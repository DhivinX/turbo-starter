import { Role, rolesByImportance } from 'shared';

type ConditionOperator = '<' | '>' | '<=' | '>=' | '=';

export function rawCompareRoles(role1: Role, role2: Role): number {
  if (rolesByImportance.indexOf(role1) > rolesByImportance.indexOf(role2)) return 1;
  else if (rolesByImportance.indexOf(role1) === rolesByImportance.indexOf(role2)) return 0;
  else return -1;
}

export function compareRoles(role1: Role, operator: ConditionOperator, role2: Role): boolean {
  switch (operator) {
    case '>':
      return rawCompareRoles(role1, role2) == 1;
    case '=':
      return rawCompareRoles(role1, role2) == 0;
    case '<':
      return rawCompareRoles(role1, role2) == -1;
    case '>=':
      return rawCompareRoles(role1, role2) >= 0;
    case '<=':
      return rawCompareRoles(role1, role2) <= 0;
  }
}
