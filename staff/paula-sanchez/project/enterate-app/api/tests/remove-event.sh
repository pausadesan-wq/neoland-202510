# uso: TOKEN=<jwt> EVENT_ID=<id> sh remove-event.sh
curl -X DELETE -H "Authorization: Bearer $TOKEN" http://localhost:8080/events/$EVENT_ID -v
