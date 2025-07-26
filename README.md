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


# ![React]([https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo)]([https://img.shields.io/badge/Redux-593D88?style=for-the-badge\&logo=redux\&logoCSS](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoCSS)]([https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=whiteields.io/badge/Vite-B73BFE?style=for-the-badge\&logo](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=whiteields.io/badge/Vite-B73BFE?style=for-the-badge&logo) Backend

![Node.js]([https://img.shields.io/badge/Node.js-43853D?style=for-the-badge\&logo=node.js\&logoColor=whiteimg.shields.io/badge/Express.js-404D59?style=for-the-badge.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=whiteields.io/badge/JWT-black?style=for-the-badge\&logo=](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=whiteimg.shields.io/badge/Express.js-404D59?style=for-the-badge.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=whiteields.io/badge/JWT-black?style=for-the-badge&logo=) Deployment \& Tools
![Vercel]([https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=whiteields.io/badge/GIT-E44C30?style=for-the-badge\&logo=Code](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=whiteields.io/badge/GIT-E44C30?style=for-the-badge&logo=Code)]([https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge\&logo=visual%20studio%20code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code) 🚀 Quick Start

make it words inseatd of links

I see the issue - the badge links got malformed in the markdown. Here's the tech stack section with proper word formatting instead of broken badge links:

## 🛠️ Tech Stack

### Frontend

- **React** - Component-based UI library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server


### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication


### Deployment \& Tools

- **Vercel** - Frontend deployment platform
- **Git** - Version control system
- **VS Code** - Code editor
- **npm** - Package manager

This format is cleaner and more readable than the broken badge links. It clearly shows all the technologies used in your MERN stack application without the visual clutter of malformed URLs.

<div style="text-align: center">⁂</div>

[^1]: https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo

[^2]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge\&logo=redux\&logoCSS

[^3]: https://img.shields.io/bad



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
