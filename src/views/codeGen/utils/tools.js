export function toHump (name) { // 下划线转驼峰命名
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

export default {
  toHump
}
