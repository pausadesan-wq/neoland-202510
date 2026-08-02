# uso: TOKEN=<jwt> sh get-created-events.sh
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/users/me/created-events -v
