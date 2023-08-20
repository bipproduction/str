# Ini Adalah Info

### route

### Info

menampilkan semua info

```bash
curl -b "$(cat cookie.txt)" -X GET http://localhost:3000/info

```

`/api/auth/login` 

untuk login dengan username dan password

```bash
curl -c cookies.txt -X POST -d '{"email": "xxx", "password": "xxx"}' http://localhost:3000/api/auth/login
```


`/api/auth/register` 

register menggunakan email dan password

```bash
curl -X POST -d '{"name": "xxx", "email": "xxx", "password": "xxx", "phone": "xxx"}' http://localhost:3000/api/auth/register
```


`/api/file/del?id=xxx`

menghapus file dengan id

```bash
curl -b "$(cat cookie.txt)" -X DELETE http://localhost:3000/api/file/del?id=xxx

```

`/api/file/find?name=xxx`

pencarian atau search

```bash
curl -b "$(cat cookie.txt)" -X GET http://localhost:3000/api/file/find?name=xxx
```

### GET

display / download file

```bash
curl -b "$(cat cookie.txt)" -X GET http://localhost:3000/api/file/get/[id].[ext]
```

### LIST

menampilkan semua list file

```bash
cur -b "$(cat cookie.txt)" -X GET http://localhost:3000/api/file/list
```

### UPL

upload file

```bash
curl -b "$(cat cookie.txt)" -X POST -F 'file=@./img.png' http://localhost:3000/api/file/upl
```