# 背景：
通常产品中有很多feature, 每个feature owner 会负责feature 开发也会提供feature 文档。等到产品发布的时候，需要有专门的人来维护一个产品文档，此文旦包含所有的feature 和一些overall 的配置信息和预置条件等信息。此时tech write需要将所有的feature 文档粘贴到一起，然后调整格式，统一风格。而且一旦feature 文档再次更新，还需要重复以上步骤。本工具旨在为减少tech write重复工作，后期可以继续优化使用模板、AI 润色使风格统一。

痛点如下：
- feature guide 需要重新粘贴到用户手册中
- 各个feature guide 字体，图片大小，表格大小等风格不统一
- 各个feature guide wording 需要润色
- 引用插图下标，有些写a,b,c... 有些写step1, step2, step3..., 有些写I, II, III...
- 如果feature guide 本身没有任何规则所言，如何抽取相应的信息

