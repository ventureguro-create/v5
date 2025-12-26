# 🎯 Быстрое руководство по работе с проектом

## ✅ Что уже сделано

1. ✅ Проект полностью развернут из GitHub
2. ✅ Backend (FastAPI) запущен на http://localhost:8001
3. ✅ Frontend (React) запущен на http://localhost:3000
4. ✅ MongoDB настроен и работает
5. ✅ Все зависимости установлены
6. ✅ Hot reload настроен для быстрой разработки

## 🚀 Основные команды

### Управление сервисами
```bash
# Перезапустить все
sudo supervisorctl restart all

# Перезапустить только backend
sudo supervisorctl restart backend

# Перезапустить только frontend
sudo supervisorctl restart frontend

# Проверить статус
sudo supervisorctl status
```

### Просмотр логов
```bash
# Backend логи (последние 50 строк)
tail -n 50 /var/log/supervisor/backend.out.log

# Frontend логи (последние 50 строк)
tail -n 50 /var/log/supervisor/frontend.out.log

# Следить за логами в реальном времени
tail -f /var/log/supervisor/backend.out.log
```

## 📝 Основные задачи разработки

### 1. Изменение Backend (API)

**Файл:** `/app/backend/server.py`

Пример добавления нового endpoint:
```python
@api_router.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello, {name}!"}
```

**После изменений:**
- ✅ Hot reload сработает автоматически
- ❌ НЕ нужно перезапускать сервер

### 2. Изменение Frontend (React)

**Главный файл:** `/app/frontend/src/App.js`
**Стили:** `/app/frontend/src/App.css`

**После изменений:**
- ✅ Hot reload сработает автоматически
- ❌ НЕ нужно перезапускать сервер

### 3. Добавление новых Python пакетов

```bash
cd /app/backend
pip install <название-пакета>
pip freeze > requirements.txt
sudo supervisorctl restart backend
```

### 4. Добавление новых npm пакетов

```bash
cd /app/frontend
yarn add <название-пакета>
# package.json обновится автоматически
```

### 5. Изменение переменных окружения

**Backend:** `/app/backend/.env`
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=fomo_db
CORS_ORIGINS=*
```

**Frontend:** `/app/frontend/.env`
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

**После изменения .env файлов:**
```bash
sudo supervisorctl restart all
```

## 🔍 Тестирование API

### Проверка работы API
```bash
# Базовый endpoint
curl http://localhost:8001/api/

# Создать status check
curl -X POST http://localhost:8001/api/status \
  -H "Content-Type: application/json" \
  -d '{"client_name": "Test"}'

# Получить все status checks
curl http://localhost:8001/api/status

# API документация (Swagger)
# Откройте в браузере: http://localhost:8001/docs
```

## 📂 Структура проекта

```
/app/
├── backend/
│   ├── server.py           ← Главный файл API
│   ├── requirements.txt    ← Python зависимости
│   └── .env               ← Настройки backend
│
└── frontend/
    ├── src/
    │   ├── App.js         ← Главный React компонент
    │   ├── App.css        ← Стили приложения
    │   └── components/    ← Ваши компоненты здесь
    ├── package.json       ← Node.js зависимости
    └── .env              ← Настройки frontend
```

## 💡 Советы по разработке

### 1. Работа с MongoDB
```bash
# Подключиться к MongoDB
mongo mongodb://localhost:27017/fomo_db

# Посмотреть коллекции
show collections

# Посмотреть документы
db.status_checks.find().pretty()

# Очистить коллекцию
db.status_checks.deleteMany({})
```

### 2. Отладка Backend
```python
# Добавьте в server.py для логирования
import logging
logger = logging.getLogger(__name__)

@api_router.get("/test")
async def test():
    logger.info("Test endpoint called")
    return {"status": "ok"}
```

### 3. Отладка Frontend
```javascript
// Используйте console.log в App.js
console.log("Component mounted");
console.log("Data:", data);
```

## 🎨 Изменение дизайна

### Tailwind CSS
Проект использует Tailwind CSS. Примеры классов:

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Синий блок с белым текстом
</div>

<button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg">
  Красивая кнопка
</button>
```

### Изменение цветов
Отредактируйте `/app/frontend/tailwind.config.js`

## 🐛 Решение проблем

### Backend не запускается
```bash
# Проверьте логи ошибок
tail -n 100 /var/log/supervisor/backend.err.log

# Проверьте, занят ли порт
netstat -tuln | grep 8001

# Проверьте MongoDB
sudo supervisorctl status mongodb
```

### Frontend не запускается
```bash
# Проверьте логи
tail -n 100 /var/log/supervisor/frontend.err.log

# Проверьте установлены ли пакеты
cd /app/frontend && ls node_modules/ | wc -l

# Переустановите зависимости если нужно
cd /app/frontend && rm -rf node_modules && yarn install
```

### API не работает
```bash
# Проверьте что backend запущен
curl http://localhost:8001/api/

# Проверьте MongoDB
mongo mongodb://localhost:27017/fomo_db --eval "db.stats()"

# Проверьте .env файл
cat /app/backend/.env
```

## 📚 Дополнительные ресурсы

- **Полная документация**: [PROJECT_INFO.md](/app/PROJECT_INFO.md)
- **FastAPI документация**: https://fastapi.tiangolo.com/
- **React документация**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **MongoDB**: https://www.mongodb.com/docs/

## 🎉 Готово!

Теперь вы можете:
1. ✨ Изменять дизайн в `/app/frontend/src/App.js`
2. 🔧 Добавлять новые API в `/app/backend/server.py`
3. 💾 Работать с MongoDB через API
4. 🚀 Деплоить изменения (hot reload работает!)

**Удачи в разработке! 🚀**
