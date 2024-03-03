# SimpleTube

クソコードかもしれませんが、許してください()

## Credit
- [feathericons](https://feathericons.com)
- [octicons](https://primer.style/foundations/icons)
- [noto sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)

# ScreenShots
## TOP
![TOP](https://i.imgur.com/Kygar7S.png)
## Search
![Search](https://i.imgur.com/5aGVPut.png)
## Watch
![watch](https://i.imgur.com/4gA2wR8.png)

# API
### 検索候補を取得
/api/suggest?q=[keyword]
### 検索結果を取得
/api/search/[keyword]/[page]
### サムネイルを取得
/api/image?id=[videoId]
### 動画を取得
api/videos/[videoId]
### 動画のコメントを取得
/api/videos/[videoId]/comments
### コメントをさらに取得
/api/videos/[videoId]/comments/[continuation]
# 忘備録
### 返信の取得方法
yourinstance/api/v1/comments/[videoId]?hl=ja&thin_mode=false&continuation=[continuation]action=action_get_comment_replies
continuationはコメントapiから取得可能。


format=htmlをつけるとhtmlとして取得可能

#Todo
- チャンネルページ
- プレイリスト
