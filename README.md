# Contacts REST API

## Запуск проекту

- відредагуйте .env:

```
DB_HOST=your-db-host.render.com
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-username
DB_PASSWORD=your-db-password
```  

```npm i```  
```npm run dev```  

# API Роути

## Контакти

| Метод | Роут                      | Опис                              | Авторизація |
|-------|---------------------------|-----------------------------------|-------------|
| GET   | /api/contacts             | Отримати всі контакти             | Так         |
| GET   | /api/contacts/:id         | Отримати контакт за ID            | Так         |
| POST  | /api/contacts             | Створити новий контакт            | Так         |
| PUT   | /api/contacts/:id         | Оновити контакт повністю          | Так         |
| PATCH | /api/contacts/:id/favorite| Оновити статус "favorite"         | Так         |
| DELETE| /api/contacts/:id         | Видалити контакт                  | Так         |

## Аутентифікація та користувачі

| Метод | Роут                              | Опис                                      | Авторизація |
|-------|-----------------------------------|-------------------------------------------|-------------|
| POST  | /api/auth/register                | Реєстрація нового користувача             | Ні          |
| POST  | /api/auth/login                   | Вхід користувача                          | Ні          |
| POST  | /api/auth/logout                  | Вихід користувача                         | Так         |
| GET   | /api/auth/current                 | Отримати дані поточного користувача       | Так         |
| PATCH | /api/auth/subscription            | Оновити підписку користувача              | Так         |
| PATCH | /api/auth/avatars                 | Оновити аватар користувача                | Так         |
| GET   |/api/auth/verify/:verificationToken| Верифікація email за токеном              | Ні          |
| POST  | /api/auth/verify                  | Повторна відправка листа верифікації      | Ні          |


# Приклади запитів
Реєстрація користувача
```
http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "subscription": "starter"
}

```

# Вхід користувача

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

# Створення контакту

```
POST /api/contacts
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "favorite": false
}
```


Особливості

Кожен користувач має доступ тільки до своїх контактів

Токен потрібно передавати в заголовку Authorization: Bearer token

Система верифікує email користувача при реєстрації

Аватари користувачів зберігаються в директорії avatars

Технології
Node.js + Express

PostgreSQL + Sequelize ORM

JWT для автентифікації

Multer для завантаження файлів

Nodemailer для відправки email