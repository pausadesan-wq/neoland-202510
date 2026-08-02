# uso: TOKEN=<jwt> EVENT_ID=<id> sh unsave-event.sh
curl -X DELETE -H "Authorization: Bearer $TOKEN" http://localhost:8080/users/me/saved-events/$EVENT_ID -v
