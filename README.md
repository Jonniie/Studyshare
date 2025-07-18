# StudyShare

StudyShare is a modern web platform for sharing, exploring, and accessing university past questions and study materials. It features a beautiful file-explorer UI, seamless document uploads, and personalized user profiles, making it easy for students to contribute and find academic resources.

## Features

- 📁 **File Explorer UI**: Browse universities, faculties, departments, and past questions in a familiar, intuitive explorer interface.
- ⬆️ **Upload Past Questions**: Upload documents (PDFs, images, etc.) directly to Cloudinary and share them with the community.
- 👤 **User Profiles**: View your uploads, contributor stats, and university affiliation.
- 🔍 **Search & Filter**: Quickly find universities, faculties, departments, or specific past questions.
- 📱 **Responsive Design**: Fully mobile-friendly with a hamburger menu and adaptive layouts.
- 🖼️ **University Logos**: Visual branding for each university in the explorer.
- 🔒 **Authentication**: Secure login, registration, and protected routes.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons
- **State Management**: React Context API
- **Routing**: React Router
- **API**: RESTful endpoints (see `.env` for base URL)
- **File Uploads**: Cloudinary
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jonniie/studyshare.git
   cd studyshare
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in your API base URL and Cloudinary credentials.

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

### Test Login Details

- email - drillsjohnny00@gmail.com
- password - J!jtech2096

## Usage

- **Explore:** Browse universities and drill down to faculties, departments, and past questions.
- **Upload:** Click the upload button to add new documents. Files are stored on Cloudinary and linked in the database.
- **Profile:** View your uploads, stats, and contributor level.
- **Mobile:** Use the hamburger menu for navigation and search on small screens.

## License

This project is licensed under the MIT License.

---

**StudyShare** — Empowering students to share and access academic resources easily.
