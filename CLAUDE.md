# 会員登録フォーム サンプルアプリケーション

## プロジェクト概要
Reactでフォームを取り扱う方法を理解するための、シンプルな会員登録処理を行うアプリケーション。

## 技術スタック
- **フレームワーク**: Next.js 14.2.31
- **言語**: TypeScript
- **UIフレームワーク**: Material-UI (MUI)
- **選択リスト**: react-select
- **スタイリング**: MUI + CSS Modules

## 現在のプロジェクト構成
```
cc-react-form-sample/
├── src/
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx  
│   │   ├── index.tsx
│   │   └── api/
│   │       └── hello.ts
│   └── styles/
│       ├── globals.css
│       └── Home.module.css
├── public/
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## 実装要件

### フォーム項目
会員情報の登録フォームに以下の項目を含める：
- **テキスト（単一行）**: 名前、メールアドレス
- **テキスト（複数行）**: 自己紹介
- **選択リスト（単一）**: 都道府県（react-select）
- **選択リスト（複数）**: 興味のある分野（react-select）
- **ラジオボタン**: 性別

### バリデーション
- 必須入力チェックのみ実装
- 複雑なバリデーションは不要

### 処理フロー
1. 登録ボタン押下でバリデーション実行
2. エラーがある場合：該当項目を目立たせる
3. エラーがない場合：APIルートにダミー処理を送信

## 実装計画

### 1. 依存関係の追加
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install react-select
npm install @types/react-select
```

### 2. ファイル構成
```
src/
├── components/
│   ├── MemberRegistrationForm.tsx    # メイン登録フォーム
│   └── FormField.tsx                 # 共通フォームフィールド
├── pages/
│   ├── index.tsx                     # フォーム表示ページ
│   └── api/
│       └── register.ts               # 登録API
├── types/
│   └── member.ts                     # 型定義
└── utils/
    └── validation.ts                 # バリデーション関数
```

### 3. フォーム項目詳細
- **name** (string): 名前 - 必須
- **email** (string): メールアドレス - 必須  
- **gender** ('male' | 'female' | 'other'): 性別 - 必須
- **prefecture** (string): 都道府県 - 必須
- **interests** (string[]): 興味のある分野 - 必須（1つ以上）
- **bio** (string): 自己紹介 - 任意

### 4. API仕様
**POST /api/register**
```typescript
// Request
{
  name: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  prefecture: string;
  interests: string[];
  bio?: string;
}

// Response (Success)
{
  success: true;
  message: string;
  id: string;
}

// Response (Error)
{
  success: false;
  message: string;
  errors: Record<string, string>;
}
```

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint
```

## 学習ポイント
1. React状態管理（useState）
2. フォームハンドリング
3. バリデーション実装
4. エラー表示とUI/UX
5. TypeScriptでの型安全性
6. Next.js APIルートの活用
7. MUIコンポーネントの使用方法
8. react-selectの使用方法