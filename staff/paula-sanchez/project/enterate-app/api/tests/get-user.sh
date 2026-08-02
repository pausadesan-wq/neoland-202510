# uso: TOKEN=<jwt> sh get-user.sh
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/users/me -v