# Jastrzębie-Zdrój — Mobile Tourist Guide

React Native tourist guide app for Jastrzębie-Zdrój, built for the **SMART Jastrzębie** city competition — and winning it.

> **🥇 1st place, SMART Jastrzębie competition** — bon o wartości 10 000 zł
>
> *"Miejsce I — za aplikację pt. „Jastrzębie-Zdrój" Wojciech Caldzudis"*
> — [tujastrzebie.pl, 10.10.2022](https://www.tujastrzebie.pl/wiadomosci,nagroda-przyznana-znamy-zwyciezce-smart-jastrzebie,wia5-3266-23099.html)

Previously published on **Google Play Store**.

![Award ceremony](assets/award.jpg)

## Features

- **Points of interest** — tourist attractions with descriptions and photos
- **Places** — accommodation and gastronomy with category filters
- **Walking trails** — 3 curated routes through the city
- **Event calendar** — upcoming events, cultural and sports activities
- **Practical info** — pharmacies, hospitals, bike rentals, transport
- **Dark / light theme**
- **Multilingual** — Polish 🇵🇱 / English 🇬🇧 (Czech planned)
- **Firebase backend** — real-time data sync via Firebase Realtime Database

## Stack

- **React Native 0.73** (bare workflow)
- **Firebase** — Realtime Database + Storage
- **React Navigation** — bottom tabs + stack navigators
- **Context API** — theme, language, category filters
- **i18next** — internationalization
- **Styled-components** — theming
- **Lottie** — loading animations

## Setup

```bash
npm install

# Copy environment config
cp .env.example .env
# Fill in your Firebase credentials in .env

# iOS
npx pod-install
npx react-native run-ios

# Android
npx react-native run-android
```

## Project Structure

```
app/
├── screens/         # Main screens (Places, Ways, Calendar, Settings, Info)
├── components/      # Reusable UI components
│   ├── calendar/
│   ├── info/
│   ├── places/
│   ├── ways/
│   └── loader/
├── config/          # Firebase initialization
├── themes/          # Light and dark theme definitions
├── styles/          # Global styles
└── images/          # Local assets and icons
```

## Known Issues

- Firebase Storage plan downgraded — remote images currently unavailable. Placeholder fallback in progress.

## Background

Built for the **SMART Jastrzębie** municipal competition organized by the city of Jastrzębie-Zdrój. The competition brief required a free mobile app for tourists and residents covering attractions, gastronomy, walking trails, events calendar, and practical city info — available in Polish, English, and Czech.
