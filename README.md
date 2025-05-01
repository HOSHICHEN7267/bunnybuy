# BunnyBuy 幫你買

## Project Structure
- frontend/ (React + Vite)
- backend/ (NestJS)

## Requirements
- Node.js 18+
- Docker (optional)

## Setup

1. Clone this repo
2. Install dependencies:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Start frontend:
    ```bash
    cd frontend
    npm run dev
    ```

4. Start backend:
    ```bash
    cd backend
    npm run start:dev
    ```

## Testing
Frontend：http://localhost:5173 <br/>
Backend：http://localhost:3000/api/hello <br/>

## CI/CD
- Auto build on every PR on master branch using GitHub Actions
