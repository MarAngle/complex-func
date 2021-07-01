### 2.0.15ing
- environment/worker文件拆分,注释添加
- updateData BUG修复
- LoadContents => loadContents

### 2.0.14
- hasProp逻辑优化，错误修复
- printMsgAct优化，添加Error判断
- isError
- utils代码格式优化
- 暴露requiredata
- 优化复制/更新数据相关方法
- 添加loadContents函数
- utils文件拆分,注释添加

### 2.0.13
- 创建current当前时间相关函数，直接挂载到跟属性中，通过属性调用对应的方法，鉴于性能直接加载
- 添加runFunction，触发函数，通过回调的形式触发函数，存在callback时则直接进行下一步操作，可接收同步函数和Promise函数
- downloadBlob优化

### 2.0.12
- analyze=>parse作为分析相关字段名称
- getProp函数的优化，实现[.prop]属性的获取
- buildWatch=>defineWatch
- 添加defineReactive
- fillStr=>fillString，优化使用ES6语法
- 添加worker线程模块，基本实现线程操作，接受函数和传参，Promise的形式返回函数运行结果
- downloadFileByAnchor延时删除dom
- 挂载到Vue原型链设置方法添加，可指定属性

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