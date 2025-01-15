'use client';

import React, { useState, useEffect } from 'react';

export default function DatabaseConnection() {
  const [connectionStatus, setConnectionStatus] = useState<string>('接続中...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('/api/db-connection');
        const data = await response.json();

        if (data.status === 'success') {
          setConnectionStatus('データベース接続成功！');
        } else {
          setConnectionStatus(`接続エラー: ${data.message}`);
        }
      } catch (error) {
        console.error('フェッチエラー:', error);
        setConnectionStatus('接続に失敗しました');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h1 className="text-xl font-bold mb-2 text-black">データベース接続ステータス</h1>
      <p className="text-black">{connectionStatus}</p>
    </div>
  );
}