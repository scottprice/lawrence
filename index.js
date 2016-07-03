
if (!process.env.SLACK_TOKEN) {
  console.log("You need to provide a SLACK_TOKEN.");
  process.exit(1);
}

var Botkit = require('botkit');

var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM();

controller.hears('hello',['direct_message','direct_mention','mention', 'ambient'],function(bot,message) {

  bot.reply(message,'Hello yourself.');

});
