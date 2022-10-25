# URL Mapper

Run tests for backend:

```bash
docker-compose -f backend/docker-compose.test.yml up --build --exit-code-from backend
```

Run just the backend:

```bash
docker-compose -f backend/docker-compose.yml up --build
```

Run the entire application:

```bash
docker-compose up --build
```

Then visit http://localhost:3000
