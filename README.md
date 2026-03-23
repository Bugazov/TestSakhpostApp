# TestSakhpostApp

Мобильное приложение на React Native для главного экрана с промо и списком ресторанов.

## Технологии и библиотеки

- `react` + `react-native` - основа приложения.
- `@tanstack/react-query` - загрузка и кеширование данных.
- `typescript` - типизация проекта.

## Архитектура

Проект организован по **FSD**: `app` -> `pages` -> `widgets` -> `entities` -> `shared`.

## Как запустить проект

### 1) Установить зависимости

```sh
npm install
```

### 2) Запустить Metro

```sh
npm start
```

### 3) Запустить приложение

В новом терминале из корня проекта:

- Android:

```sh
npm run android
```

- iOS (только macOS):

```sh
bundle install
bundle exec pod install --project-directory=ios
npm run ios
```

> Требуемая версия Node.js: `>= 22.11.0`.
