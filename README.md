# Full Stack Playtime App

This repository contains coursework for the Full Stack Development module. It demonstrates the progressive development of a server-rendered web application using Node.js, Hapi, and Handlebars following an MVC structure.

---

## Exercise 1 – Core MVC and Authentication

### Features
- User authentication (sign up, log in, log out)
- Dashboard view for logged-in users
- About page with active navigation highlighting
- Playlists management (add and list playlists)
- Session-based authentication
- Handlebars layouts and partials
- Clear separation of routes, controllers, models, and views

---

## Exercise 2 – Playlists and Tracks

Exercise 2 extends the project by adding track functionality and expanding the MVC flow through additional controllers, views, and in-memory stores.

### Features
- Add and list **tracks** within a playlist
- New playlist page/view to display a single playlist and its tracks
- Additional Handlebars partials for track UI (add + list)
- New in-memory data store to manage tracks
- Controllers updated to support playlist/track interactions

### Architecture Notes
The project continues to follow MVC:
- **Routes** define endpoints and map requests
- **Controllers** handle request logic and choose views
- **Models/Stores** manage in-memory data structures
- **Views** render server-side using Handlebars templates and partials

---

## Tech Stack
- Node.js
- Hapi.js
- Handlebars (Vision)
- Bulma CSS
- Git & GitHub

---

## How to Run
1. Install dependencies:
   ```bash
   npm install

