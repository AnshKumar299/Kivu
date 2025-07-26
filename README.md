<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# 🪙 Kivu – Personal Finance Tracker

> **A comprehensive fullstack web application that helps you take control of your personal finances with elegant simplicity.**

**Live Demo:** [kivu-woad.vercel.app](https://kivu-woad.vercel.app)

## 🎯 Project Overview

**Kivu** is my first fullstack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It’s designed to make personal finance management simple, intuitive, and accessible across all devices. Whether you’re tracking daily expenses, managing monthly budgets, or analyzing spending patterns, Kivu provides the tools you need to stay financially organized.

## ✨ Key Features

### 🎨 Frontend Features

- 📊 **Smart Transaction Tracking** – Categorize expenses across rent, food, taxes, bills, and more
- ➕ **Intuitive Transaction Management** – Add, edit, and delete records with a clean interface
- 🧮 **Real-time Balance Calculations** – Automatic calculations with visual spending summaries
- 🔍 **Advanced Search \& Filter** – Find transactions by name, category, or amount
- 📱 **Fully Responsive Design** – Seamless experience across mobile, tablet, and desktop
- 🎯 **Interactive Dashboard** – Visual spending insights with top categories highlight
- 🌟 **Modern UI/UX** – Built with Tailwind CSS for a polished, professional look


### ⚙️ Backend Features

- 🔐 **Secure Authentication** – JWT-based user authentication and authorization
- 🗄️ **RESTful API** – Clean, well-structured endpoints
- 💾 **MongoDB Integration** – Robust data persistence with Mongoose ODM
- 🛡️ **Data Validation** – Server-side validation for all user inputs
- 🚀 **Optimized Performance** – Efficient database queries and caching


## 🛠️ Tech Stack

### Frontend

### Backend

### Deployment \& Tools

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or Atlas)
- npm or yarn


### Installation

1. **Clone the repository**

```bash
git clone https://github.com/AnshKumar299/Kivu.git
cd Kivu
```

2. **Install dependencies**

```bash
# Server
npm install

# Client
cd client
npm install
cd ..
```

3. **Environment Setup**
Create a `.env` in the root:

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/kivu
JWT_SECRET=your_jwt_secret_key
```

4. **Run the app**

```bash
# Monorepo dev mode
npm run dev

# Or separately:
# Server: npm run server
# Client: cd client && npm run dev
```

5. **Access**
    - Frontend: http://localhost:5173
    - API: http://localhost:4000

## 📁 Project Structure

```
Kivu/
├── client/                    # React frontend
│   ├── src/
│   │   ├── assets/           # images, logos
│   │   ├── components/       # NavBar, BalanceComponent…
│   │   ├── features/         # Redux slices & selectors
│   │   ├── pages/            # Home, Transactions…
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── tailwind.config.js
├── server/                    # Node.js backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── README.md
└── package.json               # root
```


## 🌟 Key Learnings \& Achievements

- 🎯 Fullstack integration (MERN)
- 📱 Mobile-first responsive design
- 🔄 State management with Redux Toolkit
- 🛡️ JWT auth and validation
- 📊 MongoDB schema design
- 🚀 Automated deployment with Vercel


## 🎨 UI Screenshots

| Desktop Dashboard | Mobile View | Transaction Management |
| :-- | :-- | :-- |
| *add screenshot* | *add screenshot* | *add screenshot* |

## 🔮 Future Enhancements

- [ ] 📈 Advanced analytics \& charts
- [ ] 📅 Budget planning \& forecasts
- [ ] 📄 PDF/CSV export
- [ ] 🔔 Smart notifications
- [ ] 💳 Bank integration
- [ ] 🌍 Multi-currency support
- [ ] 👥 Shared/group expenses
- [ ] 🤖 AI-powered insights


## 🤝 Contributing

Feel free to submit issues or PRs!

1. Fork
2. Branch: `git checkout -b feature/Awesome`
3. Commit: `git commit -m "Add Awesome"`
4. Push \& open PR

## 👨‍💻 Author

**Ansh Kumar**

- Portfolio: https://your-portfolio.com
- LinkedIn: https://linkedin.com/in/your-profile
- Email: anshkumar299@example.com


## 📄 License

Licensed under MIT – see [LICENSE](LICENSE).

## 🙏 Acknowledgments

- React Community
- MongoDB University
- Tailwind CSS
- Vercel

⭐ If you found this helpful, please give it a star! ⭐

<div align="center">
  <strong>Built with ❤️ by Ansh Kumar</strong>
</div>
