# iPasswordApp

为PC端 [iPassword](https://github.com/teshoudong/iPassword) 定制的App，需要搭配一起使用

## 截图

<img src="https://raw.githubusercontent.com/teshoudong/iPasswordApp/master/capture.png" alt="Capture" width="200" style="border:1px solid #979797;">

## 功能特性

 - 支持从PC端扫描二维码导入以及更新密码列表

## 运行/打包方法

### 环境配置

 - 安装 [Node.js](https://nodejs.org/) 环境；
 - 下载项目`git clone https://github.com/teshoudong/iPasswordApp.git`
 - 进入项目根目录 `cd ./iPassword` 下，运行 `npm install` 命令，安装开发依赖库；

    ```bash
    git clone https://github.com/teshoudong/iPasswordApp.git
    cd ./iPasswordApp && npm install
    ```

### 构建及运行

 - 在项目根目录下执行`react-native run-ios`，会自动运行`simulator`
 - `cmd + D`代码改动实时生效

    ```bash
    npm install -g react-native-cli
    react-native run-ios
    ```