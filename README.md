# 基本功能
- 深度封装请求函数，基于axios，实现请求规则的实现，cookie暂不考虑，根据需求改动
- 集成常见工具函数，快速实现基本功能

# 函数列表
## current当前时间

## data数据

## TYPE类型判断
### checkComplex
  > ### 说明
  > - 通过getType获取对应的类型并判断此类型是否是复杂对象
  > ### 参数
  > - value:any，需要进行判断的值
  > ### 返回值
  > - isComplex:boolean，是否是复杂对象
  ### getTag
  > ### 说明
  > - 获取Object.prototype.toString.call的值
  > ### 参数
  > - value:any，需要进行判断的值
  > ### 返回值
  > - stringTag:string，返回Object.prototype.toString.call(value)
### getType
  > ### 说明
  > - 获取value的数据类型
  > ### 参数
  > - value:any，需要获取类型的值
  > - complex?:boolean，复杂判断，为否则在typeof基础上额外判断null/array，为真则再额外判断file/blob/date/regexp，并准确判断symbol
  > ### 返回值
  > - stringTag:["string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null" | "array" | "file" | "blob" | "regexp" | "date"]，类型
### isArray
  > ### 说明
  > - 是否是Array
  > ### 参数
  > - value:any，需要判断的值
  > ### 返回值
  > - isArray:boolean，value is Array
### isBlob
  > ### 说明
  > - 是否是Blob
  > ### 参数
  > - value:any，需要判断的值
  > ### 返回值
  > - isBlob:boolean，value is Blob
### isComplex
  > ### 说明
  > - 是否是Complex:复杂对象object&array
  > ### 参数
  > - value:any，需要判断的类型值
  > ### 返回值
  > - isComplex:boolean，value is Complex
### isDate
  > ### 说明
  > - 是否是Date
  > ### 参数
  > - value:any，需要判断的值
  > ### 返回值
  > - isDate:boolean，value is Date
### isEmpty
  > ### 说明
  > - 是否为空
  > ### 参数
  > - value:any，需要判断的值
  > - checkList?:string[]，需要深入判断的数据类型，对象和数组可选，默认config.type.emptyCheckList，判断对象和数组
  > ### 返回值
  > - isEmpty:boolean，value is Empty
### isEmptyArray
  > ### 说明
  > - 是否为空数组
  > ### 参数
  > - value:any，需要判断的值
  > - type:string，value的类型
  > ### 返回值
  > - isEmptyArray:boolean，value is EmptyArray
### isEmptyObject
  > ### 说明
  > - 是否为空对象
  > ### 参数
  > - value:any，需要判断的值
  > - type:string，value的类型
  > ### 返回值
  > - isEmptyObject:boolean，value is EmptyObject
### isError
  > ### 说明
  > - 是否是Error
  > ### 参数
  > - value:any，需要判断的值
  > ### 返回值
  > - isError:boolean，value is Error
### isExist
  > ### 说明
  > - 是否Exist
  > ### 参数
  > - value:any，需要判断的值
  > - existList?:any[\]，为否但是需要判断为存在的值数组，默认为[false, 0]
  > - unExistList?:any[\]，为真但是需要判断为不存在的值数组，默认为[\]
  > ### 返回值
  > - isExist:boolean，value is Exist
### isFile
  > ### 说明
  > - 是否是File
  > ### 参数
  > - value:any，需要判断的值
  > ### 返回值
  > - isFile:boolean，value is File
### isPromise
  > ### 说明
  > - 是否是Pomise
  > ### 参数
  > - value:any，需要判断的值
  > ### 返回值
  > - isPomise:boolean，value is Pomise
### isRegExp
  > ### 说明
  > - 是否是RegExp
  > ### 参数
  > - value:any，需要判断的值
  > ### 返回值
  > - isRegExp:boolean，value is RegExp
### isSymbol
  > ### 说明
  > - 是否是Symbol
  > ### 参数
  > - value:any，需要判断的值
  > ### 返回值
  > - isSymbol:boolean，value is Symbol
### isSame
  > ### 说明
  > - 是否相同=>对象则直接进行属性的依次对比
  > ### 参数
  > - value:any，需要判断的value
  > - other:any，需要判断的other
  > ### 返回值
  > - isSame:boolean，value and other is Same
---

## NUMBER数字
### formatNum
  > ### 说明
  > - 将value转换为数字并返回
  > ### 参数
  > - value:any，需要转换的值
  > ### 返回值
  > - number:number
### getDecimal
  > ### 说明
  > - 获取数字的小数部分
  > ### 参数
  > - value:any，需要获取小数的值
  > ### 返回值
  > - number:number
### getInteger
  > ### 说明
  > - 获取数字的整数部分
  > ### 参数
  > - value:any，需要获取整数的值
  > ### 返回值
  > - number:number
### getNum
  > ### 说明
  > - 格式化数字
  > ### 参数
  > - originNum:any，需要格式化的值
  > - type?:'origin' | 'round' | 'floor' | 'ceil'，格式化的类型，默认为round
  > - radix?:number，保留小数点位数
  > - NANZERO?:boolean，NAN是否格式化为0，默认为true
  > ### 返回值
  > - number:number
### getRandomNum
  > ### 说明
  > - 获取从start开始, 最大值为size - 1 的随机数,开始和结束的可能平均
  > ### 参数
  > - start:number，开始值
  > - size:number，总长度
  > ### 返回值
  > - number:number
### parseNum
  > ### 说明
  > - 解析数字，返回数组，第一位为整数，第二位为小数，数字格式
  > ### 参数
  > - value:number，需要解析的数据
  > ### 返回值
  > - list:[number, number]
---

## STRING字符串
### fillString
  > ### 说明
  > - 将目标字符串中指定未知填充指定字符串到指定长度
  > ### 参数
  > - str:string，目标字符串
  > - targetLength?:number，目标长度，默认为2
  > - padString?:string，填充字符串，默认为'0'
  > - to?:'start' | 'end'，填充位置，默认为start
  > - unDivision?:boolean，是否分割填充字符串，默认分割
  > ### 返回值
  > - str:string
### findTargetInStr
  > ### 说明
  > - 查找target在目标字符串中的位置数组
  > ### 参数
  > - str:string，目标字符串
  > - target:string，需要查找的字符串
  > - option?:object，设置项
  > > - option.case?:boolean，是否忽略大小写,默认不忽略
  > > - option.limitNum?:false | number，限制数量，false不限制
  > ### 返回值
  > - list:number[]
### findTargetInStrNext
  > ### 说明
  > - 获取指定字符串在目标字符串中的位置数组,理论上不单独调用
  > ### 参数
  > - str:string，目标字符串
  > - target:string，需要查找的字符串
  > - limitNum:false | number，限制数量，false不限制
  > - list?:number[]，index位置数组
  > - index?:number，开始查找的坐标
  > ### 返回值
  > - list:number[]
### getRandomData
  > ### 说明
  > - 获取随机字符串
  > ### 参数
  > - size:number，长度
  > - letter?:object，字符串库
  > > - letter.small?:boolean，字符串库设置,小写字母,默认为真
  > > - letter.big?:boolean，字符串库设置,大写字母,默认为真
  > > - letter.number?:boolean，字符串库设置,整数,默认为真
  > ### 返回值
  > - str:string
### getRandomInList
  > ### 说明
  > - 从列表中随机取值
  > ### 参数
  > - list:any[]
  > ### 返回值
  > - res:any
### getRandomLetter
  > ### 说明
  > - 获取随机字符
  > ### 参数
  > - letter?:object，字符串库
  > > - letter.small?:boolean，字符串库设置,小写字母,默认为真
  > > - letter.big?:boolean，字符串库设置,大写字母,默认为真
  > > - letter.number?:boolean，字符串库设置,整数,默认为真
  > ### 返回值
  > - str:string
### strCodeNum
  > ### 说明
  > - 获取字符串每个字符的code值和
  > ### 参数
  > - str:string
  > ### 返回值
  > - num:number
---

## OBJECT对象
### appendProp
  > ### 说明
  > - 指定对象/FormData添加属性
  > ### 参数
  > - data:object | FormData，需要添加属性的对象
  > - propName:string，属性名
  > - propData:any，属性值
  > - type:'json' | 'formdata'，需要添加对象的对应类型,默认为json
  > ### 返回值
  > - :void
### arrayClearOther
  > ### 说明
  > - 数组清除其他对象
  > ### 参数
  > - list:array，目标数组
  > - index:number，清理到index
  > - startIndex:number，开始清理的startIndex
  > ### 返回值
  > - :void
### choiceProp
  > ### 说明
  > - 更改list列表中选择的prop属性为指定值target,存在item则item更改为itemTarget
  > ### 参数
  > - list:object[]，目标数组
  > - prop:string，属性
  > - target:any，目标值
  > - item?:object，特殊对象
  > - itemTarget?:any，特殊对象值
  > ### 返回值
  > - :void
### clearArray
  > ### 说明
  > - 清空数组
  > ### 参数
  > - list:any[]，目标数组
  > ### 返回值
  > - :void
### deepClone
  > ### 说明
  > - 深拷贝
  > ### 参数
  > - origindata:any，需要进行深拷贝的对象
  > - option?:boolean | object，用户设置的设置项,根据此项调用不同方法,为否通过JSON.parse(JSON.stringify())进行深拷贝，为true通过循环deepCloneData，为对象则通过deepCloneDataWithOption进行深拷贝
  > > - option.type?:'total' | 'add'，全更新/附加更新判断值
  > > - option.reset?:boolean，重置判断值，默认为真，类型不同且reset为真时，无法将以前的数据作为基准，将会对源数据的对应值根据类型重置后再进行深拷贝循环
  > > - option.depth?:boolean | number，属性深度判断值
  > > - option.limitData?:LimitData，属性限制判断值
  > > - option.limit?:object，属性限制判断值limitData生成参数
  > > > - option.limit.type?:'forbid' | 'allow'，属性限制判断值limitData生成参数-type
  > > > - option.limit.list?:string[]，属性限制判断值limitData生成参数-list
  > ### 返回值
  > - copydata:any
### deepCloneData
  > ### 说明
  > - 基础版本的深拷贝
  > ### 参数
  > - origindata:any，需要进行深拷贝的对象
  > - map?:Map，循环引用缓存
  > ### 返回值
  > - copydata:any
### deepCloneDataWithOption
  > ### 说明
  > - updateDataWidthOption的深拷贝
  > ### 参数
  > - origindata:any，需要进行深拷贝的对象
  > - option?:object，用户设置的设置项,通过updateDataWidthOption进行深拷贝
  > > - option.type?:'total' | 'add'，全更新/附加更新判断值
  > > - option.reset?:boolean，重置判断值，默认为真，类型不同且reset为真时，无法将以前的数据作为基准，将会对源数据的对应值根据类型重置后再进行深拷贝循环
  > > - option.depth?:boolean | number，属性深度判断值
  > > - option.limitData?:LimitData，属性限制判断值
  > > - option.limit?:object，属性限制判断值limitData生成参数
  > > > - option.limit.type?:'forbid' | 'allow'，属性限制判断值limitData生成参数-type
  > > > - option.limit.list?:string[]，属性限制判断值limitData生成参数-list
  > ### 返回值
  > - copydata:any
### defineProperty,
### formatDataByType
  > ### 说明
  > - 根据类型格式化对象,暂时只对number和boolean进行格式化
  > ### 参数
  > - value:any，需要格式化的值
  > - type?:string，需要格式化的类型，默认为string
  > ### 返回值
  > - typeValue:type
### formatList
  > ### 说明
  > - 将originList中的值经过updateData后push到targetList中
  > ### 参数
  > - originList:object[]，源数组
  > - option?:object，updateData设置项
  > - targetList?:object[]，目标数组
  > ### 返回值
  > - targetList:object[]
### formatTree
  > ### 说明
  > - 格式化list为tree数组
  > ### 参数
  > - originList:object[]，源数组
  > - option?:object，设置项
  > > - option.id?:string，id属性,默认值id
  > > - option.parentId?:string，parentId属性,默认值parentId
  > > - option.children?:string，树形接口的子列表属性,默认值children
  > > - option.type?:string，返回值类型，默认为list,map情况下将dataMap直接返回
  > > - option.childrenFormat?:function，父类children属性存在时的格式化操作
  > ### 返回值
  > - res:object[] | {object}
### formatUpdateDataOption
  > ### 说明
  > - 格式化UpdateOption,updateDataWidthOption函数的设置项
  > ### 参数
  > - option?:object，用户设置的设置项,通过updateDataWidthOption进行深拷贝
  > > - option.type?:'total' | 'add'，全更新/附加更新判断值
  > > - option.reset?:boolean，重置判断值，默认为真，类型不同且reset为真时，无法将以前的数据作为基准，将会对源数据的对应值根据类型重置后再进行深拷贝循环
  > > - option.depth?:boolean | number，属性深度判断值
  > > - option.limitData?:LimitData，属性限制判断值
  > > - option.limit?:object，属性限制判断值limitData生成参数
  > > > - option.limit.type?:'forbid' | 'allow'，属性限制判断值limitData生成参数-type
  > > > - option.limit.list?:string[]，属性限制判断值limitData生成参数-list
  > - defaultOption?:object，默认的设置项
  > > - defaultOption.type?:'total' | 'add'，option.type不存在时默认值
  > > - defaultOption.reset?:boolean，重置判断值，option.reset === undefined时默认值
  > ### 返回值
  > - option:object
### getDefaultData
  > ### 说明
  > - 获取value\[prop]，当value\[prop]不存在时获取默认值defaultData，判断条件是isExist
  > ### 参数
  > - value:object，值
  > - prop:string，属性
  > - defaultData:any，默认值
  > - existList?:any[\]，存在列表
  > - unExistList?:any[\]，不存在列表
  > ### 返回值
  > - res:any
### getProp
  > ### 说明
  > - 根据'mainprop.prop'格式字符串获取对象值
  > ### 参数
  > - value:object，对应对象
  > - prop:string，对应属性
  > - intervalRepeat:boolean，分隔符.重复判断值, 默认为否;为真时连续.会全部删除,为否时连续和开始结束分隔符会保留,此时.视为属性,.a直接取[.a],a..b取\[.a]\[.b],理论上无法对\[a.]取值
  > ### 返回值
  > - res:any
### getPropByList
  > ### 说明
  > - 根据属性列表获取对象属性
  > ### 参数
  > - value:object，对应对象
  > - propList:string[]，属性列表
  > ### 返回值
  > - res:any
### hasProp
  > ### 说明
  > - 判断对象是否存在对应属性
  > ### 参数
  > - value:object，对象
  > - prop:string，属性
  > ### 返回值
  > - hasProp:value has prop
### jsonToForm
  > ### 说明
  > - 将对象转换为FormData格式
  > ### 参数
  > - value:object，对象
  > ### 返回值
  > - formData:FormData
### mergeData
  > ### 说明
  > - 合并数据函数，可以理解为简化版本的add模式的updateData，基于源数据originData格式化目标数据targetData函数
  > ### 参数
  > - targetData:any，目标数据
  > - ...originList:any[]，源数据列表
  > ### 返回值
  > - targetData:object
### orderArrayByProp
  > ### 说明
  > - 根据rule数组顺序对list\[index]\[prop]的值进行排序
  > ### 参数
  > - list:object[]，目标数组
  > - option:object，设置项
  > - list.prop:string，对比属性
  > - list.rule:any[]，对比属性值列表
  > ### 返回值
  > - targetData:object
### setDefaultData,
### setProp,
### setPropByList,
### setPropByType,
### showArrayProp,
### updateData,
### updateDataWidthOption,
### updateList,
---

## REACTIVE响应式
### defineReactive,
### defineWatch,
---

## OBSERVE观察模式
### observe,
### Watcher,
---

## FUNCTION函数
### runFunction,
### triggerFunc,
### triggerPromise,
---

## UTILS工具
### debounce,
### downloadBlob,
### downloadFile,
### downloadFileByAnchor,
### localEncodeURIComponent,
### formatQueryUrl,
### getLimitData,
### getQueryData,
### getQueryUrl,
### loadContents,
### openWindow,
### printMsg,
### printMsgAct,
### promiseAllFinished,
### showJson,
### throttle,
### transformFile,
### trimData,
---

## LOCAL本地缓存
### buildLocalDataName,
### getLocalData,
### removeLocalData,
### setLocalData,
### setLocalDataPre,
---

## TIME时间
### formatTime,
### getOffsetTime,
### getOffsetTimeStr,
### parseTime,
### showTime,
---

## ENVIRONMENT环境变量和可用功能
### checkUseItem,
### getCanUse,
### getEnv,
### getEnvMode,
### setCanUse,
### setEnv,
### setEnvMode,
---

## WORKER多线程
### getWorkerContent,
### setWorker,
### workerDo,
---

## RULE规则判断
### buildRule,
### checkRule,
---

## REQUIRE请求和TOKEN设置
### ajax: requiredata.ajax.bind(requiredata),
### require: requiredata.require.bind(requiredata),
### get: requiredata.get.bind(requiredata),
### post: requiredata.post.bind(requiredata),
### postform: requiredata.postform.bind(requiredata),
### postfile: requiredata.postfile.bind(requiredata),
### setToken: requiredata.setToken.bind(requiredata),
### getToken: requiredata.getToken.bind(requiredata),
### removeToken: requiredata.removeToken.bind(requiredata),
---

# 文件结构
>root
> - index: 模块输出和Vue插件加载
> - main: 模块整合
> > ## build
> > - LimitData: 限制数据格式类
> > - Require: 请求模块实现类
> > - RequireRule: 请求规则实现类
> > - RuleData: 规则检查实现类ing
> > - TimeData: 时间对象类ing
> > ## data
> > - environment: 环境判断
> > - rule: 规则检查
> > - utils: 功能
> > ## option
> > - noticeData: 警告弹窗模块
> > - setData: 设置数据模块，为兼容Vue
---
[更新历史](./history.md)