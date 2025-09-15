export type Option<V = string | number | null, T = string> = {
  value: V;
  text: T;
}

export type Selection<V = string | number | null, T = string> = Option<V, T>[]

export type CustomOption = {
  id: number | null;
  name: string;
}

export type CustomSelection = CustomOption[]
