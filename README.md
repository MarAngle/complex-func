# 描述
- 深度封装的功能函数
## 基本功能
- 深度封装请求函数，基于axios，实现请求规则的实现，cookie暂不考虑，根据需求改动
- 集成常见工具函数，快速实现基本功能

### 文件结构
>root
> - index: 模块输出和Vue插件加载
> - main: 模块整合
> > #### build
> > - LimitData: 限制数据格式类
> > - Require: 请求模块实现类
> > - RequireRule: 请求规则实现类
> > - RuleData: 规则检查实现类ing
> > - TimeData: 时间对象类ing
> > #### data
> > - environment: 环境判断
> > - rule: 规则检查
> > - utils: 功能
> > #### option
> > - noticeData: 警告弹窗模块
> > - setData: 设置数据模块，为兼容Vue
---
[更新历史](./history.md)