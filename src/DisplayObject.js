export default class DisplayObject {
  constructor (props = {}) {
    this.visible = props.visible ?? true

    this.x = props.x ?? 0
    this.y = props.y ?? 0

    this.width = props.width ?? 0
    this.height = props.height ?? 0
  }

  update () {}

  draw () {}
}