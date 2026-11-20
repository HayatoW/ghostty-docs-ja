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

## 確認

```sh
npm run lint
npm run build
```
