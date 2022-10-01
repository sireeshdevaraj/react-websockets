### `npm start` and `node server.js`


+ Start the express server that runs the websocket on 3001 and uses 3002 for our backend database.
+ 3000 port will be used for our front end.
+ We are using SQlite3 persistent database to store all the messages with ID and message.
+ add `.env` file with our gogogle clientId
+ Specify the Google client ID which looks like `25453453556-sdfkjsbvjnshnvsnckn.apps.googleusercontent.com` and use passportJs(prefer this) (OR)
```html
<script src="https://apis.google.com/gsi/client" async defer></script>
<meta name="google-signin-client_id" content="25453453556-sdfkjsbvjnshnvsnckn.apps.googleusercontent.com">
```
+ You can add features like displaying profile pic,google displayname and store them in database.
+ PS: It's boring to add CSS so..
+ Pull requests are always welcome.

