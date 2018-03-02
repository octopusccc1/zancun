### 开发环境如何查看组件的demo

- 环境启动成功后，通过http://localhost:3000/demo/查看。
webpack编译配置会检索source/components/下的demo目录，展示demo列表。

### 开发环境如何加快编译速度
- 开发环境使用filter进行文件编译，指定编译单个入口文件：
customerCreateByTag 为source/entries/目录下，入口目录名称。
```
 npm run open:src -- --filter=customerCreateByTag
```
