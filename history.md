### 2.0.12ing
- analyze=>parse作为分析相关字段名称
- getProp函数的优化，实现[.prop]属性的获取
- buildWatch=>defineWatch
- 添加defineReactive
- fillStr=>fillString，优化使用ES6语法
- 添加worker线程模块，基本实现线程操作，接受函数和传参，Promise的形式返回函数运行结果
- downloadFileByAnchor延时删除dom

### 2.0.11
- 优化整体的本地缓存相关函数，后缀由LocalTemp更改为LocalData
- getPropByStr/setPropByStr/setStrPropByType => getProp/setProp/setPropByType
- reBuildProp => setDefaultData
- 函数变量语义化
- 代码结构优化

### 2.0.10
- 优化printMsg函数，添加printMsgAct函数，优化整体错误输出相关
- 全局类的_selfName函数逻辑统一，实现类实例的名称输出
- 优化全局类的toString函数，统一调用_selfName函数输出