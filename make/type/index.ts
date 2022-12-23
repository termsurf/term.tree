export * from './initial'
export * from './input'
export * from './internal'
export * from './mesh'

export type NestedPartial<T> = T extends
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | symbol
  | Date
  ? T | undefined
  : T extends Array<infer ArrayType>
  ? Array<NestedPartial<ArrayType>>
  : T extends ReadonlyArray<infer ArrayType>
  ? ReadonlyArray<ArrayType>
  : T extends Set<infer SetType>
  ? Set<NestedPartial<SetType>>
  : T extends ReadonlySet<infer SetType>
  ? ReadonlySet<SetType>
  : T extends Map<infer KeyType, infer ValueType>
  ? Map<NestedPartial<KeyType>, NestedPartial<ValueType>>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? ReadonlyMap<
      NestedPartial<KeyType>,
      NestedPartial<ValueType>
    >
  : {
      [K in keyof T]?: NestedPartial<T[K]>
    }

export type PartialOptionalObject<T, M> = Partial<
  Omit<T, keyof M>
>

export type PickPartial<T, M> = PartialOptionalObject<T, M> &
  RequiredObject<T, M>

export type RecursiveRequired<T, M> = {
  [K in keyof T & keyof M]: M[K] extends object
    ? PickPartial<T[K], M[K]>
    : T[K]
}

export type RequiredKeyList<O> = {
  [K in keyof O]: O[K]
}

export type RequiredObject<T, M> = RecursiveRequired<
  T,
  M
> extends infer O
  ? RequiredKeyList<O>
  : never