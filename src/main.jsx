import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// WebContainer環境でのエラーハンドリング
const handleError = (error) => {
  console.error('Application Error:', error);
  // エラーUI表示
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: center;
  `;
  errorDiv.innerHTML = `
    <h2>エラーが発生しました</h2>
    <p>アプリケーションの再読み込みを行ってください。</p>
    <button onclick="window.location.reload()" style="
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">再読み込み</button>
  `;
  document.body.appendChild(errorDiv);
};

// エラーハンドリングの設定
window.onerror = (message, source, lineno, colno, error) => {
  handleError(error);
};

window.onunhandledrejection = (event) => {
  handleError(event.reason);
};

// アプリケーションのマウント
try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  handleError(error);
}
