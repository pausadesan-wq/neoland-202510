# uso: TOKEN=<jwt> EVENT_ID=<id> sh leave-event.sh
curl -X DELETE -H "Authorization: Bearer $TOKEN" http://localhost:8080/events/$EVENT_ID/attendees/me -v
