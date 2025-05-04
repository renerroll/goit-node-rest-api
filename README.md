# Contacts REST API

## Технології
- Node.js
- Express
- PostgreSQL (хостинг на Render)
- Sequelize
- Joi (валідація)
- DBeaver (для роботи з базою)

## Запуск проекту
- за необхідності - відредагуйте .env:
```
DB_HOST=your-db-host.render.com
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-username
DB_PASSWORD=your-db-password
```  

```npm i```  
```npm run dev```  

## API Роутери
Метод     | Роут                                 | Опис
----------|--------------------------------------|------------------------------
GET       | /api/contacts                        | Отримати всі контакти
GET       | /api/contacts/:id                    | Отримати контакт за ID
POST      | /api/contacts                        | Створити новий контакт
PUT       | /api/contacts/:id                    | Оновити контакт повністю
PATCH     | /api/contacts/:id/favorite           | Оновити лише статус "favorite"
DELETE    | /api/contacts/:id                    | Видалити контакт

## Структура таблиці `contacts`  
Поле       | Тип
-----------|------------------
id         | SERIAL PRIMARY KEY
name       | VARCHAR NOT NULL
email      | VARCHAR NOT NULL
phone      | VARCHAR NOT NULL
favorite   | BOOLEAN DEFAULT FALSE

## Тестування
Рекомендується використовувати Postman для перевірки запитів вручну.  

## Результат: Крок 2
- створено базу даних на Render.com:
  
<img width="1092" alt="Screenshot 2025-04-06 at 15 40 19" src="https://github.com/user-attachments/assets/01e2a355-262b-47d5-9619-ba5f27b664d5" />  
  
- підключено локально з допомогою DBeaver та створено таблицю contacts:
  
<img width="1080" alt="Screenshot 2025-04-06 at 15 39 53" src="https://github.com/user-attachments/assets/1c9a1896-3866-4411-941d-2d83aca09e52" />  


