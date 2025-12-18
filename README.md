# Simple Equipment Tracker

A straightforward, responsive application to track machinery status and maintenance schedules. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

## How to Run It

You'll need two separate terminal windows for this—one for the backend and one for the frontend.

### 1. The Backend
This handles the API and database connections.

```bash
cd backend
npm install
npm run dev
```
*Note: Make sure you have MongoDB running locally or a valid `MONGODB_URI` in your `.env` file. It defaults to port 5000.*

### 2. The Frontend
This is the React interface.

```bash
cd frontend
npm install
npm run dev
```
*   The app should launch at `http://localhost:5173` (or similar).

---

## Assumptions Made
*   **Environment**: Assumed you have Node.js and MongoDB installed on your machine.
*   **Security**: Since this wasn't specified, I didn't verify specific permissions. Currently, it acts like an internal tool where any user can add, edit, or delete items. 
*   **Design**: Went with a default Dark Mode because it fits the "industrial dashboard" vibe better and is easier on the eyes.

---

## If I Had More Time
*   **Real Auth**: Right now it's open access. I'd definitely add a proper login system (JWTs) so we know *who* is deleting equipment.
*   **Audit Logs**: Instead of just seeing "Last Cleaned," I'd track a history log of every maintenance event.
*   **Better Types**: I'd switch to TypeScript. It catches so many little bugs that slip through in plain JS.
*   **Dockerize**: Wrapping this in Docker Compose would make the "How to Run" section about 90% shorter.
