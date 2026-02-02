# Full Stack Playtime App

This repository contains coursework for the **Full Stack Development** module.  
It demonstrates the progressive development of a server-rendered web application using **Node.js**, **Hapi**, and **Handlebars**, following a clear **MVC architecture**.

---

## Exercise 1 – Core MVC and Authentication

### Features
- User authentication (sign up, log in, log out)
- Session-based authentication using cookies
- Dashboard view for logged-in users
- Playlist creation and listing
- About page with active navigation highlighting
- Handlebars layouts and reusable partials
- Clear separation of routes, controllers, models, and views

---

## Exercise 2 – Playlists and Tracks

This exercise extends the application to support playlists and tracks.

### Features
- Create and list playlists per user
- Playlist detail view
- Add and list tracks within a playlist
- Additional Handlebars partials for track UI
- Controllers extended to manage playlist–track relationships
- Dedicated data stores for playlists and tracks

---

## Exercise 3 – Joi Validation

This exercise introduces **server-side validation** using Joi to protect application logic from invalid input.

### Features
- Joi schemas defined for:
  - User registration
  - User login
  - Playlist creation
  - Track creation
- Validation applied at controller level using Hapi `validate`
- Graceful error handling with validation feedback rendered in views
- Prevention of invalid or malformed data entering the stores

---

## Exercise 4 – Test Driven Development (TDD)

This exercise introduces **automated unit testing** to validate datastore behaviour and uncover edge-case bugs.

### Features
- Unit tests written using **Mocha** and **Chai**
- Separate test fixtures for reusable test data
- Full test coverage for:
  - User store (create, read, delete, edge cases)
  - Playlist store (create, retrieve, delete, invalid IDs)
- Tests for failure scenarios (bad IDs, missing data)
- Bugs identified and fixed through tests (e.g. handling of `undefined` vs `null`, invalid deletes)
- Support for both **JSON stores** and **in-memory stores**

---

## Architecture Notes

The project follows a traditional **MVC structure**:

- **Routes** define endpoints and map requests
- **Controllers** handle request logic and select views
- **Models / Stores** manage application data (memory and JSON stores)
- **Views** render server-side HTML using Handlebars templates and partials

Testing is used to validate datastore logic independently of the UI, ensuring robustness before features are exposed through routes and views.

---

## Tech Stack
- Node.js
- Hapi.js
- Handlebars (Vision)
- Joi (validation)
- Mocha & Chai (testing)
- LowDB (JSON persistence)
- Bulma CSS
- Git & GitHub

---

## How to Run

Install dependencies:
```bash
npm install
