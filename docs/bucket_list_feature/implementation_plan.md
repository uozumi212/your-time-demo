# バケットリスト機能 実装計画

## 目標
ユーザーが「死ぬまでにやりたいことリスト」を管理できる機能を追加する。
名言機能と同様に `localStorage` を使用してデータを永続化し、シンプルで使いやすいUIを提供する。

## ユーザーレビュー事項
- **データ永続化**: ブラウザの `localStorage` に保存するため、ブラウザのキャッシュをクリアするとデータが消える点。（現行仕様と同じ）
- **UIデザイン**: 既存のテーマに合わせたデザインを採用する。

## 変更内容

### 1. データロジックの追加
`src/utils/bucketList.ts` を作成し、データの型定義とCRUD操作を実装する。

#### [NEW] src/utils/bucketList.ts
```typescript
const BUCKET_LIST_KEY = 'my-bucket-list';

export interface BucketListItem {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: number;
}

export function getBucketList(): BucketListItem[] {
  if (typeof window === 'undefined') return [];
  const json = localStorage.getItem(BUCKET_LIST_KEY);
  return json ? JSON.parse(json) : [];
}

export function saveBucketList(list: BucketListItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BUCKET_LIST_KEY, JSON.stringify(list));
}

export function addBucketListItem(text: string): BucketListItem[] {
  const list = getBucketList();
  const newItem: BucketListItem = {
    id: Date.now().toString(),
    text,
    isCompleted: false,
    createdAt: Date.now(),
  };
  const updatedList = [newItem, ...list];
  saveBucketList(updatedList);
  return updatedList;
}

export function toggleBucketListItem(id: string): BucketListItem[] {
  const list = getBucketList();
  const updatedList = list.map(item =>
    item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
  );
  saveBucketList(updatedList);
  return updatedList;
}

export function deleteBucketListItem(id: string): BucketListItem[] {
  const list = getBucketList();
  const updatedList = list.filter(item => item.id !== id);
  saveBucketList(updatedList);
  return updatedList;
}
```

### 2. UIコンポーネントの作成
`src/components/BucketList.tsx` を作成し、リスト表示と追加フォームを実装する。

#### [NEW] src/components/BucketList.tsx
(概略: `useState` でリストを管理し、`useEffect` で初期ロード。追加フォームとリストレンダリングを行う)

### 3. ページの追加
`src/app/bucket-list/page.tsx` を作成し、`BucketList` コンポーネントを表示する。

#### [NEW] src/app/bucket-list/page.tsx
```typescript
import BucketList from '@/components/BucketList';

export default function BucketListPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-foreground/80">
        MY BUCKET LIST
      </h1>
      <BucketList />
    </div>
  );
}
```

### 4. ナビゲーションの更新
ヘッダーまたはフッターのナビゲーションに「Bucket List」へのリンクを追加する。

#### [MODIFY] src/components/Navigation.tsx
- リンクを追加: `/bucket-list`

## 検証計画
### 自動テスト
- 現状、E2Eテスト環境がないため手動確認を行う。

### 手動検証手順
1.  `/bucket-list` にアクセスできること。
2.  新しいアイテムを追加し、リストの一番上に表示されること。
3.  リロードしてもデータが残っていること。
4.  チェックボックスをクリックして完了状態が切り替わること（取り消し線などが付く）。
5.  削除ボタンでアイテムが消えること。
