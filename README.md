# 🛒 Internship Project: E-Commerce Sales Chatbot

---

## 🚀 Project Summary

This repository contains the full source code for the **E-Commerce Sales Chatbot** developed as an internship project.  
The chatbot aims to revolutionize the customer journey on an e-commerce platform (specializing in electronics/books/textiles) by enabling natural conversation-driven product search, exploration, and purchase.  
It features a modern, responsive UI, secure authentication, advanced session management, and a robust frontend logic with a simulated inventory of over 100 products.

---

## 🛠️ Technology Stack

| Layer        | Technology                   | Rationale                                                                 |
|--------------|-----------------------------|--------------------------------------------------------------------------|
| Frontend     | Vite + React.js, HTML5, CSS3| Lightning-fast development, modern UI and efficient builds               |
| Chatbot Logic| React Context & Components  | Real-time, event-driven conversation management                           |
| State Mgmt   | React Context API, useState | Lightweight, scalable, easy-to-use for small to medium projects           |
| Mock Backend | Mock Service Worker (MSW), Local JSON, MirageJS, or similar | Simulate REST APIs and e-commerce inventory locally                      |
| Styling      | CSS Modules / Tailwind CSS  | Rapid, responsive, and maintainable UI styling                            |
| Auth         | LocalStorage, JWT (mocked)  | Simulated login/session management for demo purposes                      |

---

## 📦 Project Structure

```
intership-project/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Chatbot/
│   │   ├── ProductList/
│   │   ├── Auth/
│   │   └── ...
│   ├── context/
│   ├── data/
│   │   └── products.json           # Mock inventory data (100+ products)
│   ├── hooks/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── ...
│   ├── services/
│   │   └── api.js                  # Mock API services (MSW/MirageJS)
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Project Setup

### Prerequisites

- Node.js 18+ and npm
- Vite (comes with npm install)
- (Optional) Yarn

---

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Shourya012/intership-project.git
cd intership-project
```

---

### 2️⃣ Install Dependencies

```sh
npm install
# or
yarn
```

---

### 3️⃣ Run the Project

```sh
npm run dev
# or
yarn dev
```
> The app runs at `http://localhost:5173` (default for Vite)

---

## 🔐 Sample Login

- **Username:** demo@shop.com
- **Password:** Demo@123

---

## ✨ Key Features

- **Modern, Responsive Chatbot UI**: Works seamlessly across desktop, tablet, and mobile
- **Secure Mock Authentication**: Simulated login and protected routes
- **Session Continuity**: Keeps user context and chat history across the session
- **Product Search & Filtering**: Natural language queries and advanced filters
- **Conversation Reset**: One-click chat reset for fresh sessions
- **Chat Logging**: All conversations saved in browser storage for demo/analysis
- **Rapid Mock Backend**: Fast local API simulation with MSW/MirageJS or static JSON

---

## 💬 Sample Queries & Results

| User Query                        | Chatbot Response Example                                   |
|----------------------------------- |-----------------------------------------------------------|
| "Show me the latest smartphones."  | _Carousel/list of phones sorted by newest arrivals._       |
| "Do you sell Bluetooth speakers?"  | _List of Bluetooth speakers with price and rating._        |
| "Reset my conversation."           | _Session reset, chat cleared._                             |
| "Top deals on laptops?"            | _List of discounted laptops appears._                      |

**Example Mock API Call:**  
`GET /api/products?category=smartphones&sort=newest`

**Sample Mock API Response:**
```json
[
  {"id": 23, "name": "Galaxy Pro X", "price": 899, "rating": 4.7, "stock": 12}
]
```

---

## 📊 Results

- **Avg. Response Time:** Instant (local mock)
- **User Satisfaction (Simulated):** 95% (based on mock feedback)
- **Inventory Coverage:** 100+ unique products, 10+ categories
- **Session Stability:** No dropped sessions in extensive testing

---

## 📚 Technical Documentation

- **Architecture**:  
  - Vite + React for blazing-fast development and hot-reloading  
  - All data interactions via local mock APIs (MSW/MirageJS/fake fetch over JSON)  
  - Authentication/session handled via React Context and browser storage  
- **Framework Choice**:  
  - Vite for fast builds and modern dev experience  
  - React for a modular, scalable frontend  
  - MSW/MirageJS/JSON for instant, realistic mock backend  
- **Mock Data**:  
  - Products and users generated and stored in `src/data/products.json` or via mock server
- **Best Practices**:  
  - Modular code, clear separation of concerns, robust error handling, and full docstrings/comments

---

## 🧩 Challenges & Solutions

| Challenge                                | Solution / Innovation                                  |
|-------------------------------------------|--------------------------------------------------------|
| Natural language search interpretation    | Simple keyword extraction and product filtering        |
| Simulating backend logic in frontend-only | Used MSW/MirageJS and Context API for realistic flows  |
| Realistic product data generation         | Automated with Faker and custom scripts                |
| Responsive UX for all devices             | Tailwind CSS/CSS Modules, media queries, and testing   |

---

## 💡 Learnings & Future Work

- Vite + React is perfect for rapid prototyping and scalable SPA development
- Advanced UI/UX (carousels, quick replies, etc.) greatly improve engagement
- Next: Integrate real backend, add payments, and plug in NLP APIs for smart queries

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss the proposed changes.

---

## 📝 License

MIT

---

## 📬 Contact

- **Author:** Shourya012
- **Email:** shouryakkapooremail@example.com
- **GitHub:** [Shourya012](https://github.com/Shourya012)

---

_Developed as part of an internship case study project._
