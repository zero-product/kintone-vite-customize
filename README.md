# Vite kintoneカスタマイズ

## 導入方法

```bash
# GitHubからリポジトリをクローン
git clone https://github.com/zero-product/kintone-vite-customize.git

# プロジェクトディレクトリに移動
cd kintone-vite-customize

# モジュール、ライブラリ インストール
yarn install
```

### 認証情報ファイル

1. `./dest/auth.json.example`を同ディレクトリに`./dest/auth.json`として複製。

1. `./dest/auth.json`を以下のように修正

    ```json
    {
        "base_url": "<kintone環境 URL>",
        "username": "<管理者権限ユーザー名>",
        "password": "<管理者権限パスワード>"
    }
    ```

### マニフェストファイル

1. `./dest/manifest.json`を以下のように修正

    ```json
    {
        "app": "<該当のアプリID>",
        "scope": "<適用範囲 (ALL|ADMIN|NONE)>",
        "desktop": {
            "js": [
                "./dist/app.js"
            ],
            "css": [
                "./dist/style.css"
            ]
        },
        "mobile": {
            "js": [],
            "css": []
        }
    }
    ```

## コマンド一覧

|コマンド|概要|
|-|-|
|`yarn dev`|`./src`ディレクトリ内のファイルを変更するとkintoneに反映されます。|
|`yarn deploy`|kintoneにカスタマイズを反映します。|

## Vue.js(Option)

1. Vue3、Viteインストール

    ```bash
    yarn add -D vue @vitejs/plugin-vue
    ```

1. Vite(`vite.config.js`) 設定変更

    ```javascript
    //// ./vite.config.js

    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'  // ← 追加

    export default defineConfig({
      plugins: [ vue() ],  // ← 追加
      build: {
        outDir: './dist',
        minify: process.env.NODE_ENV === 'development' ? false : 'esbuild',
        lib: {
          entry: resolve(__dirname, 'src/app.js'),
          name: 'app',
        },
        rollupOptions: {
          output: {
            entryFileNames: `[name].js`,
            chunkFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`,
          },
        },
      },
    })
    ```

1. `./src`ディレクトリに`App.vue`を作成

    ```javascript
    //// ./src/App.vue
    <script setup>
    </script>

    <template>
      <div>Hello World!</div>
    </template>
    ```

1. `main.js`でVue3を読込み

    ```javascript
    //// ./src/main.js

    import { createApp } from 'vue'
    import App from './App.vue'
    import './style.css'
    // :
    // 略
    // :

    kintone.events.on('app.record.index.show', (event) => {
      console.log(event);

      /** **************************************************************
       * 例1) カスタマイズビュー
       *
       * kintoneのカスタマイズビューの`HTML`欄に
       * `<div id="app"></div>`
       * を登録してください。
       ************************************************************** */
      const app = createApp(App)
      app.mount('#app')

      /** **************************************************************
       * 例2) 一覧のメニューの右側の空白部分
       ************************************************************** */
      if (!document.getElementById('app')) {
        // ヘッダー要素取得
        const header = kintone.app.getHeaderMenuSpaceElement()

        // `div#app` 要素を作成
        const appEl = document.createElement('div')
        appEl.id = 'app'

        // ヘッダー要素に `div#app` 要素を追加
        header.appendChild(appEl)

        // Vue定義
        createApp(App).mount('#app')
      }
    });
    ```
