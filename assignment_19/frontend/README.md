
## ✅ Implemented Features CLA-PROJECT

### 🔐 **Authentication**
- [x] **Login** via GraphQL with real MongoDB backend
- [x] **JWT Token handling** and secure transmission
- [x] **Token stored in Redux + localStorage**
- [x] **Logout** with token cleanup
- [x] **Protected routes** using `<ProtectedRoute />` wrapper
- [x] **User role detection** via token (e.g., coder vs manager)

---

### 🧭 **Routing & Navigation**
- [x] `react-router-dom` for navigation
- [x] Dynamic route for challenge detail: `/challenge/:id`
- [x] Role-based modals for **signup** and **login** via popups
- [x] Dynamic redirection based on role

---

### 💾 **Backend (GraphQL)**
- [x] Modular GraphQL architecture (types, resolvers, queries, mutations)
- [x] MongoDB models: Coder, Manager, Challenge, Submission
- [x] Queries:
  - `getAllChallenges`
  - `getChallengesByCategory`
  - `getChallengeById`
  - `getAllCategories`
  - `getMyProfile`
- [x] Mutations:
  - `loginUser`
- [x] Token parsing inside resolvers

---

### ⚙️ **Frontend (React + RTK Query)**
- [x] `@reduxjs/toolkit` + `RTK Query` setup for data fetching
- [x] `graphql-request` + `graphqlRequestBaseQuery`
- [x] API service via `gqlApi.js`
- [x] Dynamic fetching & filtering of:
  - Categories
  - Challenges
  - Challenge by ID

---

### 🖼️ **UI Components**
- [x] **Dark Mode Toggle** (Redux-based)
- [x] **Navbar with profile avatar** + dropdown menu
- [x] **Responsive design** with Tailwind + media queries
- [x] Clickable table rows to navigate to challenge detail
- [x] Markdown rendering of challenge descriptions using `react-markdown`
- [x] `SimpleMDE` was tested (but dropped in favor of read-only Markdown)
- [x] Visual indicators for challenge status (icons + tooltips)
- [x] Difficulty levels styled by color (Easy, Moderate, Hard)

---

### 🛠️ **Extras**
- [x] Data seeding via Postman / MongoDB import
- [x] CORS configuration
- [x] Debug logging on both client & server
- [x] Error handling (frontend & backend)
