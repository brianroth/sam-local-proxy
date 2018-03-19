# sam-local-proxy

A thing that works as a proxy using AWS SAM local

```
sam local start-api
```

The following CURL commands work

Get the second page of all users (with a 3 second delay):
```
curl --request GET \
  --url 'http://127.0.0.1:3000/users?page=2&delay=3' \
  --header 'Accept: application/json'
```

Use a delay of 61 seconds to test the error handling of the proxy.

Read the user with id 2 (will return 200 HTTP response):
```
curl --request GET \
  --url http://127.0.0.1:3000/users/2 \
  --header 'Accept: application/json'
```

Read the user with id 23 (will return 404 HTTP response):
```
curl --request GET \
  --url http://127.0.0.1:3000/users/23 \
  --header 'Accept: application/json'
```

Delete the user with id 2 (will return a 200 HTTP response):
```
curl --request DELETE \
  --url http://127.0.0.1:3000/users/2 \
  --header 'Accept: application/json'
```

Create a new user:
```
curl --request POST \
  --url http://127.0.0.1:3000/users \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{"name": "Jean-Luc Picard","job": "Captain"}'
```
