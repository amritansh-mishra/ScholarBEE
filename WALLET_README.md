# ScholarBEE Student Wallet System

## Overview
The Student Wallet system allows students to receive, manage, and withdraw scholarship funds directly within the ScholarBEE platform. Sponsors can credit students' wallets upon scholarship approval, and students can view their balance, transaction history, and withdraw funds to their UPI accounts.

---

## Features
- **Automatic Wallet Creation:** Each student gets a wallet upon registration or first access.
- **Balance Management:** Students can view their available balance, total earned, and total withdrawn.
- **Transaction History:** All credits (scholarship awards) and debits (withdrawals) are logged.
- **UPI Integration:** Students can set/update their UPI ID for withdrawals.
- **Sponsor Integration:** When a sponsor approves a scholarship application, the corresponding amount is credited to the student's wallet.
- **Secure Withdrawals:** Students can withdraw funds to their UPI account (simulated; real UPI integration can be added).

---

## Backend Implementation

### 1. **Model**
- **File:** `backend/models/walletModel.js`
- **Fields:**
  - `studentId` (unique, references User)
  - `balance`, `totalEarned`, `totalWithdrawn`
  - `upiId`, `isActive`
  - `transactions[]` (type, amount, description, status, scholarshipId, applicationId, upiTransactionId, createdAt)

### 2. **Controller**
- **File:** `backend/controllers/walletController.js`
- **Endpoints:**
  - `GET /api/wallet` — Get wallet info
  - `PUT /api/wallet/upi` — Update UPI ID
  - `GET /api/wallet/transactions` — Transaction history
  - `POST /api/wallet/withdraw` — Withdraw funds
  - `POST /api/wallet/credit` — Credit wallet (used by sponsor on approval)
  - `GET /api/wallet/stats` — Wallet stats

### 3. **Routes**
- **File:** `backend/routes/walletRoutes.js`
- **Mounted at:** `/api/wallet` in `backend/app.js`
- **Middleware:** All routes require authentication and student role (except `/credit`, which is used by sponsors)

### 4. **Sponsor Integration**
- When a sponsor approves an application, the backend and frontend call `/api/wallet/credit` to credit the student's wallet.

---

## Frontend Implementation

### 1. **Wallet Page**
- **File:** `frontend/src/pages/student/Wallet.jsx`
- **Features:**
  - Shows balance, total earned, withdrawn, UPI ID, and transaction history
  - Allows students to update UPI ID and withdraw funds
  - Modal dialogs for UPI and withdrawal
  - Pagination and filtering for transactions

### 2. **API Service**
- **File:** `frontend/src/services/api.js`
- **Exported as:** `walletAPI`
- **Methods:**
  - `getWallet()`, `updateUpiId(upiId)`, `getTransactions(page, limit, type)`, `withdrawFunds(amount)`, `getStats()`, `creditWallet(applicationId, amount, description)`

### 3. **Navigation**
- **Wallet link** added to the student navbar and dashboard for easy access.

### 4. **Sponsor Flow**
- When a sponsor approves an application, the wallet is credited automatically via the `/api/wallet/credit` endpoint.

---

## API Endpoints

### **Student Wallet**
- `GET    /api/wallet` — Get wallet info
- `PUT    /api/wallet/upi` — Update UPI ID
- `GET    /api/wallet/transactions` — Transaction history (pagination, filter by type)
- `POST   /api/wallet/withdraw` — Withdraw funds
- `GET    /api/wallet/stats` — Wallet statistics

### **Sponsor (Credit Wallet)**
- `POST   /api/wallet/credit` — Credit wallet (fields: `applicationId`, `amount`, `description`)

---

## Usage

### **For Students:**
- Go to **Wallet** from the dashboard or navbar to view/manage funds.
- Update your UPI ID for withdrawals.
- Withdraw funds to your UPI account (simulated).
- View all transactions and wallet statistics.

### **For Sponsors:**
- Approve applications as usual; the student's wallet is credited automatically.

### **For Admins:**
- All wallet actions are logged and visible in transaction history.

---

## Extending/Customizing
- **Real UPI Integration:** Integrate with a payment gateway for real payouts.
- **Notifications:** Notify students on credit/withdrawal.
- **Admin Controls:** Add admin views for wallet monitoring.
- **Security:** All endpoints require authentication and role checks.

---

## File Summary
- `backend/models/walletModel.js` — Wallet schema
- `backend/controllers/walletController.js` — Wallet logic
- `backend/routes/walletRoutes.js` — Wallet API routes
- `frontend/src/pages/student/Wallet.jsx` — Student wallet UI
- `frontend/src/services/api.js` — API methods for wallet
- `frontend/src/components/Navbar.jsx` — Wallet link in navbar
- `frontend/src/pages/student/StudentDashboard.jsx` — Wallet link in dashboard
- `frontend/src/pages/sponsor/ApplicationsManagement.jsx` — Sponsor triggers wallet credit
---

## Questions?
For any questions or further customization, please contact the project maintainer or open an issue. 