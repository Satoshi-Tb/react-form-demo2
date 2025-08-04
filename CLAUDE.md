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
会員情報の登録フォームに以下の項目を含める（縦スクロール表示対応）：

#### 基本情報
- **テキスト（単一行）**: 姓、名、フリガナ（姓）、フリガナ（名）
- **テキスト（単一行）**: メールアドレス、電話番号、郵便番号
- **テキスト（複数行）**: 住所、自己紹介、志望動機

#### 選択項目
- **ラジオボタン**: 性別、年代、職業、学歴
- **選択リスト（単一）**: 都道府県、最寄り駅（react-select）
- **選択リスト（複数）**: 興味のある分野、スキル、資格（react-select）

#### 詳細情報
- **チェックボックス**: 趣味（複数選択可）、連絡希望時間帯
- **テキスト（単一行）**: 緊急連絡先名、緊急連絡先電話番号
- **テキスト（複数行）**: 特記事項、アピールポイント
- **選択リスト（単一）**: 希望勤務地、希望職種（react-select）

#### 同意・確認項目
- **チェックボックス**: プライバシーポリシー同意、メルマガ配信同意
- **テキスト（複数行）**: その他要望・質問

**スクロール挙動確認**: 
- フォーム全体を縦スクロール可能にし、再レンダリング時のスクロール位置保持動作を確認
- 高さ制限エリア内でのscrollY制御も実装予定

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
#### 基本情報
- **lastName** (string): 姓 - 必須
- **firstName** (string): 名 - 必須
- **lastNameKana** (string): フリガナ（姓） - 必須
- **firstNameKana** (string): フリガナ（名） - 必須
- **email** (string): メールアドレス - 必須
- **phone** (string): 電話番号 - 必須
- **zipCode** (string): 郵便番号 - 必須
- **address** (string): 住所 - 必須
- **bio** (string): 自己紹介 - 任意
- **motivation** (string): 志望動機 - 必須

#### 選択項目
- **gender** ('male' | 'female' | 'other'): 性別 - 必須
- **ageGroup** ('20s' | '30s' | '40s' | '50s' | '60s+'): 年代 - 必須
- **occupation** ('student' | 'employee' | 'freelance' | 'other'): 職業 - 必須
- **education** ('high_school' | 'university' | 'graduate' | 'other'): 学歴 - 必須
- **prefecture** (string): 都道府県 - 必須
- **nearestStation** (string): 最寄り駅 - 必須
- **interests** (string[]): 興味のある分野 - 必須（1つ以上）
- **skills** (string[]): スキル - 任意
- **certifications** (string[]): 資格 - 任意

#### 詳細情報
- **hobbies** (string[]): 趣味 - 任意
- **contactTimeSlots** (string[]): 連絡希望時間帯 - 任意
- **emergencyContactName** (string): 緊急連絡先名 - 必須
- **emergencyContactPhone** (string): 緊急連絡先電話番号 - 必須
- **specialNotes** (string): 特記事項 - 任意
- **appealPoints** (string): アピールポイント - 任意
- **preferredWorkLocation** (string): 希望勤務地 - 任意
- **preferredJobType** (string): 希望職種 - 任意

#### 同意・確認項目
- **privacyPolicyAgreed** (boolean): プライバシーポリシー同意 - 必須
- **newsletterSubscribed** (boolean): メルマガ配信同意 - 任意
- **additionalRequests** (string): その他要望・質問 - 任意

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
9. **縦スクロール対応と再レンダリング時のスクロール位置挙動**
10. **大量フォーム項目の効率的な管理とUX設計**