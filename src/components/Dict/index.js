import Vue from 'vue'
import DictSelect from './DictSelect'
import AdvancedSelect from './AdvancedSelect'
import OpsSymbolSelect from './OpsSymbolSelect'

import { initDictStore, initAdvancedStore, dictItemName, getDictItems, advancedItemName } from './utils'

Vue.component(DictSelect.name, DictSelect)
Vue.component(AdvancedSelect.name, AdvancedSelect)
Vue.component(OpsSymbolSelect.name, OpsSymbolSelect)
export {
  DictSelect,
  AdvancedSelect,
  OpsSymbolSelect,
  initDictStore,
  initAdvancedStore,
  dictItemName,
  getDictItems,
  advancedItemName
}
