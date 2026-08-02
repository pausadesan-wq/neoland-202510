# uso: TOKEN=<jwt> EVENT_ID=<id> sh join-event.sh
curl -X POST -H "Authorization: Bearer $TOKEN" http://localhost:8080/events/$EVENT_ID/attendees/me -v
