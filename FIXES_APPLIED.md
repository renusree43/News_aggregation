# Fixes Applied

## Main problems found
1. Maven wrapper was broken: `.mvn/wrapper/maven-wrapper.properties` was missing.
2. Spring Boot project used PostgreSQL settings by default but the project had H2 dependency, causing database/driver/startup confusion.
3. Frontend API URL was pointing directly to Spring Boot (`8082`) instead of the FastAPI gateway (`8000`).
4. Gateway CORS allowed only one frontend origin, so Vite ports like `5174` could fail.
5. Gateway proxy did not show a clear error when Spring Boot was not running.
6. Frontend login field forced email input, but backend accepts username or email.

## Files changed
- `backend/coreservices/pom.xml`
- `backend/coreservices/.mvn/wrapper/maven-wrapper.properties`
- `backend/coreservices/src/main/resources/application.properties`
- Removed conflicting `backend/coreservices/src/main/resources/application.yml`
- `gateway/.env`
- `gateway/main.py`
- `gateway/routes/proxy.py`
- `frontend/.env`
- `frontend/src/services/authService.js`
- `frontend/src/pages/Home.jsx`

## How to run on Windows PowerShell

### 1. Start Spring Boot backend
```powershell
Set-Location "D:\dsdbm\SDC_Project(news_aggregation)\backend-spring"
.\mvnw.cmd spring-boot:run
```
Spring Boot runs on:
```text
http://localhost:8001
```

### 2. Start FastAPI gateway
Open a new terminal:
```powershell
Set-Location "D:\dsdbm\SDC_Project(news_aggregation)\gateway"
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
Gateway runs on:
```text
http://localhost:8000
```

### 3. Start React frontend
Open a new terminal:
```powershell
Set-Location "D:\dsdbm\SDC_Project(news_aggregation)\frontend"
npm.cmd install
npm.cmd run dev
```
Frontend runs on:
```text
http://localhost:5173
```

## Test login accounts
These are created automatically when Spring Boot starts:

| Username | Password | Role |
|---|---|---|
| admin | admin123 | ROLE_ADMIN |
| manager | manager123 | ROLE_MANAGER |
| user | user123 | ROLE_USER |

## Important
Keep all three terminals running at the same time:
1. Spring Boot backend on `8001`
2. FastAPI gateway on `8000`
3. React frontend on `5173`
