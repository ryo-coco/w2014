// データベース接続の結果型
export interface DatabaseConnectionResult {
    success: boolean;
    time?: Date;
    error?: string;
  }
  
  // データベースクエリの共通インターフェース
  export interface QueryResult<T> {
    rows: T[];
    rowCount: number;
  }
  
  // 例: ユーザーテーブルの型
  export interface User {
    id: number;
    username: string;
    email: string;
    created_at: Date;
  }