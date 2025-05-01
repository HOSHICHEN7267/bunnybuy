# BunnyBuy 代購媒合平台

這是一個前後端分離的專案，使用 Docker 管理環境。  
前端：React + Vite  
後端：NestJS + TypeORM + MySQL

---

## 🚀 專案架構

```
/frontend    → React 前端
/backend     → NestJS 後端
/docker-compose.yml → 一鍵啟動配置
```

---

## 💻 環境需求

- Node.js 20+
- Docker + Docker Compose
- Git

---

## ⚙️ 開發啟動流程

1️⃣ **Clone 專案**
```bash
git clone https://github.com/HOSHICHEN7267/bunnybuy.git
cd bunnybuy
git checkout develop
```

2️⃣ **建立 .env 檔案**

在 `/backend` 下建立 `.env`：
```
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=bunnybuy
DB_PASSWORD=bunnybuy123
DB_DATABASE=bunnybuydb
```

（你可以參考 `.env.example`）

---

3️⃣ **啟動專案**
```bash
docker compose up --build
```

啟動後：
- React 前端 → http://localhost:8080
- NestJS 後端 → http://localhost:3000/api/hello
- MySQL 資料庫 → port 3306

---

## 🛠 開發規範

- **分支策略**
    - `master` : 穩定版，只能從 develop branch merge 進來，merge 進來時會自動執行 CI/CD 流程 (別動)
    - `develop` : 用來整合所有我們開發出的 feature 的 branch
      - `feature/xxx` : 一般開發做任何 feature 時開的 branch (從 develop 開出來)
      - `fix/xxx` : Debug 時開的 branch (從 develop 開出來)
      - `chore/xxx` : 調整環境、設定或其他雜事時開的 branch (從 develop 開出來)
      - `doc/xxx` : 寫文件 (ex: README.md) 的時候開的 branch (從 develop 開出來)

- **PR 規則**
    - 請從 `feature/xxx` → `develop` 開 Pull Request
    - 開 PR 後請在群組跟大家通知一下，至少有一個人幫忙 review 過後再 merge 進去 :)
    - 如果有 conflict 也請上群組通知大家來解決 :)

- **Commit 格式**
    - `feat: ...` : 開發出的新功能
    - `fix: ...` : Debug
    - `chore: ...` : 調整設定或雜事

---

## 🏗 功能測試

| 功能    | 測試方式                                     |
|---------|------------------------------------------|
| 後端 API | curl http://localhost:3000/api/hello      |
| 前端     | 打開 http://localhost:8080               |
| 資料庫   | docker exec -it bunnybuy-mysql mysql -u proxy -p |

---

## 📦 指令速查

| 指令                             | 用途             |
|----------------------------------|------------------|
| `docker compose up --build`      | 啟動專案         |
| `docker compose down`            | 停止專案         |
| `docker compose logs backend`    | 看後端 log      |
| `docker exec -it bunnybuy-mysql mysql -u proxy -p` | 進入 MySQL |

---

## 👥 小組協作說明

每位組員請：
✅ 先 `git pull origin develop`  
✅ 開 `feature/xxx` 分支開發  
✅ 完成後開 PR 合併回 `develop`

---