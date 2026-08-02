# uso: TOKEN=<jwt> sh get-saved-events.sh
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/users/me/saved-events -v
