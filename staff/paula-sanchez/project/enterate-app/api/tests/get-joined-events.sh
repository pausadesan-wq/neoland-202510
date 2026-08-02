# uso: TOKEN=<jwt> sh get-joined-events.sh
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/users/me/joined-events -v
