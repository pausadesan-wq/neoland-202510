# uso: TOKEN=<jwt> EVENT_ID=<id> sh save-event.sh
curl -X POST -H "Authorization: Bearer $TOKEN" http://localhost:8080/users/me/saved-events/$EVENT_ID -v
