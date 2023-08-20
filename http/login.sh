. .env.http

curl -c "cookies.txt" \
-i -H 'Content-Type: application/json' \
-d '{"name": "malik", "password": "makuro_123"}' \
-X POST "$HTTP_URL"/api/auth/login