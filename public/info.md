# README

## Str > File Storage

token = api key

### DISPLAY
`/file/[id].[extension]`

GET `curl -X GET  http://localhost:3000/file/gambar.png`

### CREATE
`/file/create`

POST `curl -i -X POST -H "Authorization: Bearer $(cat token.txt)" -F "file=@./icon.png" http://localhost:3000/file/create`

### UPDATE
`/file/update?[id]`

POST `curl -i -X POST -H "Authorization: Bearer $(cat token.txt)" -F "file=@./tsconfig.json" http://localhost:3000/file/update?id=clm6iqis10009mbm2kclewhz1`

### DELETE
`/file/delete?[id]`


DELETE `curl -i -X DELETE -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/file/delete?id=clm6i6wpq0007mbm2o9yc4tx5`

### SEARCH
`/file/search?[name]`

GET `curl -i -X GET -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/file/search?name=i`

### LIST
`/file/list`

GET `curl -i -X GET -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/file/list`

### LIST-RANGE
`/file/list?[skip]&[take]`

GET `curl -i -X GET -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/file/list?skip=0&take=10`



