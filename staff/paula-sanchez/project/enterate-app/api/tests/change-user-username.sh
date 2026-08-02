# uso: TOKEN=<jwt> sh change-user-username.sh
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"username":"newusername"}' http://localhost:8080/users/me/username -v
