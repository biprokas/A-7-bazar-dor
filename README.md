# 🛒 Bazar Dor — বাজার দর

**Bazar Dor** is a Bangladesh daily essentials price-tracking web application built with Next.js. It helps users explore product prices, compare market information, and see which products have increased or decreased in price.

## ✨ Features

* **Product Listings:** Browse daily essential products with prices and categories.
* **Price Movement:** View products with rising and falling prices.
* **Category Browsing:** Explore products by category and sort them by price.
* **Product Details:** View detailed product information and market-wise prices.
* **Authentication:** Sign up and sign in using email and password.
* **Social Authentication:** Google sign-in/sign-up integration.
* **Protected Routes:** Restrict selected product and category pages to authenticated users.
* **User Profile:** Update profile information.
* **Toast Notifications:** Receive feedback for authentication actions and errors.
* **Responsive UI:** Browse the application on desktop, tablet, and mobile screens.
* **Bangla Interface:** Present product information and prices for Bangladeshi users.

## 🧰 Tech Stack

* Next.js (App Router)
* React
* JavaScript (JSX)
* Tailwind CSS
* HeroUI
* Better Auth
* MongoDB
* Fetch API

## 🚀 Getting Started

### Prerequisites

* Node.js (a version compatible with the project's Next.js version)
* npm
* Access to the required authentication and database configuration

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd bazar-dor
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and configure the environment variables required by your Better Auth, MongoDB, and Google OAuth setup.

**Important:** Use the variable names already defined by your project configuration. Never commit real secrets or credentials.

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🔐 Authentication Configuration

Bazar Dor uses Better Auth for authentication and MongoDB for storing authentication data.

For Google authentication, configure the required Google OAuth credentials and authorized callback URL in your provider settings and deployment environment.

Keep all secret values in environment variables. Do not expose private credentials in client-side code.

## 📦 Production Build

Run the production build locally:

```bash
npm run build
```

If the build succeeds, start the production server:

```bash
npm run start
```

## 🌐 Deployment

This project can be deployed on Vercel or another platform that supports Next.js.

Before deploying, configure the required environment variables and verify authentication callbacks, protected routes, and dynamic product routes.

* **Live Demo:** Add your deployed application URL here.
* **GitHub Repository:** Add your repository URL here.

## 👨‍💻 Author

**Bipro Prokash**

CSE Student • Frontend Developer • Lifelong Learner

Interested in building modern web applications with React, Next.js, and AI-powered technologies.
