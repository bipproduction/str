. .env.http

curl  -X POST "$HTTP_URL"/api/file/upl \
-b "$(cat cookies.txt)" \
-i -F "file=@./img.png"