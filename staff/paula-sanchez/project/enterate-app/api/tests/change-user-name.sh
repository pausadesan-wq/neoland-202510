# uso: TOKEN=<jwt> sh change-user-name.sh
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"name":"Nuevo Nombre"}' http://localhost:8080/users/me/name -v
