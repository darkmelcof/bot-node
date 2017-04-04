// Do not forget to change the url of the model
var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create bot and bind to the chat
var connector = new builder.ChatConnector();
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = '<url_of_model>';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);

// Add intent handlers
dialog.matches('greeting', function(session, args) {
   session.send("Hi you !");
   session.beginDialog('/step2');
});

dialog.onDefault(function (session) {
    session.send("I'm sorry I didn't understand");
});

bot.dialog('/step2', function (session) {
    session.send("How may I help you ?");
    session.endConversation();
});
