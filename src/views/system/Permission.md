## 权限

1. 修改main.js中，如果不走后台配置，配置
```
// 如果通过后台system模块做权限管理，请选择使用async-router.js 若只是页面配置，请选择permission.js
// import permissionStore from '@/store/modules/permission.js'
import permissionStore from '@/store/modules/async-router.js'
```

2. 