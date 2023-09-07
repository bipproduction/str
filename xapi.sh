URL="https://str.wibudev.com"
case $1 in
   
    list)
        curl -i -H "Authorization: Bearer $(cat token.txt)" $URL/api/list
    ;;
    create)
        curl -i -X POST -H "Authorization: Bearer $(cat token.txt)" -F "file=@./icon.png" $URL/file/create
    ;;
    file)
        curl -i -X POST -H "Authorization: Bearer $(cat token.txt)" -F "file=@./postcss.config.js" $URL/file/create
    ;;
    update)
        curl -i -X POST -H "Authorization: Bearer $(cat token.txt)" -F "file=@./tsconfig.json" $URL/file/update?id=clm6iqis10009mbm2kclewhz1
    ;;
    delete)
        curl -i -X DELETE -H "Authorization: Bearer $(cat token.txt)" $URL/file/delete?id=clm6i6wpq0007mbm2o9yc4tx5
    ;;
    search)
        curl -i -X GET -H "Authorization: Bearer $(cat token.txt)" $URL/file/search?name=i
    ;;
    list)
        curl -i -X GET -H "Authorization: Bearer $(cat token.txt)" $URL/file/list
    ;;
    list-range)
        curl -i -X GET -H "Authorization: Bearer $(cat token.txt)" $URL/file/list?skip=0&take=10
    ;;
    *)
        echo "gak ada"
    ;;
esac