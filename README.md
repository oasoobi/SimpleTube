# Simple Youtube

日本語用です。

## Credit
- [feathericons](https://feathericons.com)
- [octicons](https://primer.style/foundations/icons)
- [noto sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)

# ScreenShots
![TOP](https://i.imgur.com/Kygar7S.png)
![Search](https://i.imgur.com/5aGVPut.png)

# API Memo
### 検索候補を取得
/api/suggest?q=[keyword]
### 検索結果を取得
/api/search/[keyword]/[page]
### サムネイルを取得
/api/image?id=[videoId]
### 動画を取得
api/video/[videoId]
### 動画のコメントを取得
api/video/[videoId]/comment

## 忘備録
### 返信の取得方法
yourinstance/api/v1/comments/[videoId]?hl=ja&thin_mode=false&continuation=[continuation]action=action_get_comment_replies
continuationはコメントapiから取得可能。

format=htmlをつけるとhtmlとして取得可能
