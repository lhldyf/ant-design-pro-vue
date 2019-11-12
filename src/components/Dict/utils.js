import { api } from '@/api/metadata'
import { getAction, postAction } from '@/api/manage'

// 用来做code转name
export const dictItemStore = {}
// 用来显示下拉
export const dictItemOptionStore = {}
// 用来做code转name
export const advancedItemStore = {}
// 用来显示下拉
export const advancedItemOptionStore = {}
// 用来显示操作符列表
export const opsSymbolItemStore = {}
export async function initDictStore () {
  if (Object.keys(dictItemStore).length !== 0) {
    return
  }
  await getAction(api.get.allDictOption).then(res => {
    if (res.success) {
      res.data.forEach(dict => {
        dictItemStore[dict.code] = {}
        dictItemOptionStore[dict.code] = []
        dict.itemList &&
          dict.itemList.forEach(item => {
            dictItemStore[dict.code][item.itemCode] = item.itemName
            dictItemOptionStore[dict.code].push({
              key: item.itemCode,
              text: item.itemName
            })
          })
      })
    }
  })
}

export async function initAdvancedStore (type, param) {
  if (advancedItemStore[type]) {
    if (param) {
      if (advancedItemStore[type][param]) {
        return
      }
    } else {
      return
    }
  }
  await postAction(api.post.advancedOption, { type, param }).then(res => {
    if (res.success) {
      if (param) {
        advancedItemStore[type] = Object.assign({}, advancedItemStore[type])
        advancedItemOptionStore[type] = Object.assign({}, advancedItemOptionStore[type])
        advancedItemStore[type][param] = {}
        advancedItemOptionStore[type][param] = []
        res.data.forEach(item => {
          advancedItemStore[type][param][item.code] = item.text
          advancedItemOptionStore[type][param].push({
            key: item.code,
            text: item.text
          })
        })
      } else {
        advancedItemStore[type] = {}
        advancedItemOptionStore[type] = []
        res.data.forEach(item => {
          advancedItemStore[type][item.code] = item.text
          advancedItemOptionStore[type].push({
            key: item.code,
            text: item.text
          })
        })
      }
    }
  })
}

export function dictItemName (dictCode, itemCode) {
  let name
  if (dictItemStore[dictCode]) {
    name = dictItemStore[dictCode][itemCode] || itemCode
  }
  return name || itemCode
}

export function getDictItems (dictCode) {
  return dictItemOptionStore[dictCode]
}

export function advancedItemName (type, itemCode, param) {
  let name
  if (param) {
    if (advancedItemStore[type] && advancedItemStore[type][itemCode]) {
      name = advancedItemStore[type][itemCode][param]
    }
  } else if (advancedItemStore[type]) {
    name = advancedItemStore[type][itemCode]
  }
  return name || itemCode
}

export async function initOpsSymbolStore (type) {
  if (opsSymbolItemStore[type]) {
    return
  }
  await postAction(api.post.opsSymbolOption, { type }).then(res => {
    if (res.success) {
      opsSymbolItemStore[type] = []
      res.data.forEach(item => {
        opsSymbolItemStore[type].push({
          id: item.id,
          opsDisplayName: item.opsDisplayName,
          methodName: item.methodName,
          resType: item.resType
        })
      })
    }
  })
}
