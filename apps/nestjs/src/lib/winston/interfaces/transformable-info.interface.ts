const LEVEL = Symbol('LEVEL')
const MESSAGE = Symbol('MESSAGE')
const SPLAT = Symbol('SPLAT')

export interface TransformableInfo {
  level: string
  message: any
  [LEVEL]?: string
  [MESSAGE]?: any
  [SPLAT]?: any
  [key: string | symbol]: any
}
