# 翻訳ガイド

このリポジトリは [ghostty-org/website](https://github.com/ghostty-org/website) のフォークで、
`docs/` 以下を日本語に翻訳した非公式サイトです。本家の更新は `upstream` リモートから取り込みます。

## 翻訳する範囲

- `docs/**/*.mdx` の本文、frontmatter の `title` と `description`
- `docs/nav.json` の `title`（各ページの frontmatter の `title` と揃える）
- MDX コンポーネントの表示用文字列（`CardLinks` / `ButtonLinks` の `title`・`description`・`text` など）

## 翻訳しないもの

- コードブロック、インラインコード、設定キー名（`font-family` など）、キーバインドのアクション名、コマンド、ファイルパス、URL
- frontmatter のキー名と `editOnGithubLink` などの値、コンポーネント名や props 名、`href`
- `<VTSequence>` などの props の値（シーケンス表記）
- 固有名詞（Ghostty、macOS、GTK、Zig など）

## 見出しのアンカー

英語の見出しから作られる ID を残すため、見出しの末尾には `{/* #id */}` が付いています。
**このコメントは消さず、そのまま残してください。**

```mdx
## Getting the source code {/* #getting-the-source-code */}
```

は次のように訳します。

```mdx
## ソースコードの入手 {/* #getting-the-source-code */}
```

インラインコードだけの見出し（`## \`font-family\`` など）にはコメントは不要で、そのまま残します。
本家から取り込んだ新しい見出しには、訳す前に次のコマンドでコメントを付けます。

```sh
node bin/annotate-heading-ids.mjs docs/path/to/page.mdx
```

## 文体

- です・ます調で書きます。
- 全角文字と半角英数字の間には半角スペースを入れます（例: 「Ghostty の設定」）。
- 句読点は「、」「。」を使います。
- 原文の意味を変えずに、自然な日本語にします。段落や箇条書きの構成は原文に合わせます。
- 日本語に隣接する強調は `_強調_` ではなく `*強調*` で書きます（`_` は前後が日本語だと強調として解釈されません）。

## よく使う訳語

| 英語 | 訳語 |
| --- | --- |
| terminal emulator | ターミナルエミュレーター |
| configuration / config | 設定 |
| keybind / keybinding | キーバインド |
| action | アクション |
| split | 分割 |
| tab / window / surface | タブ / ウィンドウ / サーフェス |
| shell integration | シェル統合 |
| release notes | リリースノート |
| prerelease / tip | プレリリース / tip |
| escape sequence | エスケープシーケンス |

## 本家の更新の取り込み

本家 `ghostty-org/website` の更新は、`upstream` リモートからマージして取り込みます。
英語版で上書きされた箇所は、本家で変わった差分だけを訳し直します。

1. `git fetch upstream` のあと、`git merge-base HEAD upstream/main`（前回取り込んだコミット、以下 `OLD`）と `upstream/main` が同じなら、取り込むものはありません。
2. `main` から新しいブランチを作り、`git merge upstream/main` を実行します。
3. 本家で変わったファイルを `git diff --name-status OLD upstream/main` で確認し、次のように扱います。
   - `docs/**/*.mdx` と `docs/nav.json`: `git diff OLD upstream/main -- <file>` で英語の差分を確認し、同じ変更を日本語版に反映します。変わっていない段落の訳は変えません。
   - 本家で新しく追加されたページ: 英語の原文に `node bin/annotate-heading-ids.mjs <file>` で見出し ID を付けてから、全文を訳します。既存のページに追加された見出しも、同じ方法で ID を付けます。
   - `docs/config/reference.mdx` と `docs/config/keybind/reference.mdx`（Ghostty 本体の `Config.zig` などから自動生成）: マージすると英語版に置き換わることがあります。その場合は取り込む前の日本語版を元にして、変わった項目だけを訳し直します。
   - 本家で削除・移動されたページ: 本家に合わせて削除・移動し、`docs/nav.json` も合わせます。
   - `docs/` 以外（`src/` など）: 本家の変更を取り込みます。このリポジトリで変えた箇所（日本語の UI 文字列、非公式訳の表示、`next.config.mjs` のリダイレクト、`src/lib/search/engine.ts` の日本語分かち書き、見出し ID の仕組み、`.github/workflows` のランナー）は残します。
4. 本文中の英語が残っていないこと、見出しの `{/* #id */}` が消えていないことを確認します。
5. 下の「確認」を実行します。

## 確認

```sh
npm run lint
npm run build
```
