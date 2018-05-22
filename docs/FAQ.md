### 开发环境如何查看组件的demo

- 环境启动成功后，通过http://localhost:3000/demo/查看。
webpack编译配置会检索source/components/下的demo目录，展示demo列表。

### 开发环境如何加快编译速度
- 开发环境使用filter进行文件编译，指定编译单个入口文件：
customerCreateByTag 为source/entries/目录下，入口目录名称。
```
 npm run open:src -- --filter=customerCreateByTag
```

### 开发环境Mock服务
- 使用NEI Mock服务
NEI Mock服务是默认配置的，详细请查看source code: tools/srcServer.js proxy(ajaxPrefix)这一行

- 使用json-server Mock服务
  - 什么时候使用json-server Mock服务
  
  json-server是一个支持REST API风格的接口规范的Mock server。最大的特定在于post提交的数据可以对Mock server上的数据做修改，
  下一次使用get请求数据时，返回的Mock 数据是经过修改的。这一点对于一些需要修改数据的业务场景下非常有用。
  
  - 如何使用json-server Mock服务
  
  tools/mock.js 使用json-server在本地运行Mock server，只需要使用```npm run start:mock```开启即可。
  将实际接口地址改成/db/api，本地server会将该前缀的请求代理到json-server Mock服务下。Mock数据在database-mocks中配置。
  json-server使用文档：https://github.com/typicode/json-server#example
