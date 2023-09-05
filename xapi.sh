URL="http://localhost:3000"
case $1 in
   
    list)
        curl -i -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/api/list
    ;;
    create)
        curl -i -X POST -H "Authorization: Bearer $(cat token.txt)" -F "file=@./icon.png" http://localhost:3000/file/create
    ;;
    file)
        curl -i -X POST -H "Authorization: Bearer $(cat token.txt)" -F "file=@./postcss.config.js" http://localhost:3000/file/create
    ;;
    update)
        curl -i -X POST -H "Authorization: Bearer $(cat token.txt)" -F "file=@./tsconfig.json" http://localhost:3000/file/update?id=clm6iqis10009mbm2kclewhz1
    ;;
    delete)
        curl -i -X DELETE -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/file/delete?id=clm6i6wpq0007mbm2o9yc4tx5
    ;;
    search)
        curl -i -X GET -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/file/search?name=i
    ;;
    list)
        curl -i -X GET -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/file/list
    ;;
    list-range)
        curl -i -X GET -H "Authorization: Bearer $(cat token.txt)" http://localhost:3000/file/list?skip=0&take=10
    ;;
    *)
        echo "gak ada"
    ;;
esac