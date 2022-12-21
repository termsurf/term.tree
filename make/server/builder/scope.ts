import {
  ASTMeshType,
  NestedPartial,
  Scope,
  ScopeTableType,
  ScopeType,
} from '~server/type'

export function extendScope<L extends Scope>(
  like: L,
  data: ScopeTableType[L],
  parent?: unknown,
): ScopeType<L> {
  return { data, like, parent }
}

export function getPropertyValueFromScope(
  scope: ScopeType<Scope>,
  path: Array<string> | string,
): unknown {
  if (typeof path === 'string') {
    path = [path]
  }

  let name = path[0]
  let source: ScopeType<Scope> | undefined | unknown = scope

  if (name) {
    while (source) {
      if (source.data.hasOwnProperty(name)) {
        break
      } else {
        source = source.parent
      }
    }
  }

  if (!source) {
    return
  }

  let record: LexicalScopeDefaultType = source.data

  path.slice(0, -1).forEach(node => {
    if (record && typeof record[node] === 'object') {
      record = record[node] as LexicalScopeDefaultType
    }
  })

  if (!record) {
    return
  }

  const last = path[path.length - 1]

  if (!last) {
    return
  }

  return record[last]
}

export function resolveScope<S extends ASTMeshType>(
  scope: NestedPartial<S>,
  check: (scope: NestedPartial<S>) => boolean,
  finalize: (scope: NestedPartial<S>) => void,
): void {
  if (check(scope)) {
    finalize(scope)
  }
}

export function setPropertyValueOnScope(
  scope: ScopeType<Scope>,
  path: string,
  value: unknown,
): void {
  scope.data[path] = value
}