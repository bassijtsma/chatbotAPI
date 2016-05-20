## Chatbot manager API

API endpoints to manage the database that contains the conversations that can take place with the [Facebook chatbot](https://github.com/bastronaut/facebookChatbot/) and the [Whatsapp chatbot](https://github.com/bastronaut/whatsappChatbot/). The frontend that can be used to interact with this API can be found [Here](https://github.com/bastronaut/chatbotFrontend/).

To start, all you need to do is:
* cd into the chatbotAPI folder
* run `npm install`
* run `node start app.js` / `nodemon start app.js` / `forever start app.js`

Console logging is all over the place for debugging purposes. No flag to turn debugging off at this point

### Endpoints

The API exposes the following endpoints:

**/messages/**
to GET and POST messages

**/:conv_id/:messagekey**
To PUT and DELETE messages

**/conversations/**
to GET and POST conversations

**/:conv_id**
to PUT and DELETE conversations
