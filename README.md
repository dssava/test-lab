Як запустити проект у VS Code

1. Відкрий папку domain-app у VS Code.
2. Відкрий два термінали.

SERVER:
cd server
npm install
npm run dev

CLIENT:
cd client
npm install
npm run dev

Після запуску:
- сервер: http://localhost:5001
- клієнт: http://localhost:5173

Що є в проекті:
- GET /domains — отримання списку доменів
- POST /domains — додавання нового домену
- Валідація полів
- CORS для локального фронтенду
- React + useState + useEffect
- Контрольована форма
- Динамічне оновлення таблиці після POST
