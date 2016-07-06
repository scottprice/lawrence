
if (!process.env.SLACK_TOKEN || !process.env.WEATHER_TOKEN) {
  console.log("You need to provide a SLACK_TOKEN and a WEATHER_TOKEN.");
  process.exit(1);
}

var Botkit = require('botkit');
var request = require('request');
var weatherResponse;
var weatherToken = process.env.WEATHER_TOKEN;
var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM();


controller.hears('hello',['direct_message','direct_mention','mention', 'ambient'],function(bot,message) {

  bot.reply(message,'Hello yourself.');

});

controller.hears('weather',['direct_message','direct_mention','mention', 'ambient'],function(bot,message) {

  var options = {
    method: 'GET',
    url: 'http://api.wunderground.com/api/' + weatherToken + '/conditions/q/ga/ball_ground.json',
    headers: {
      'postman-token': '3ac85f00-f4af-738c-4f69-2c355c09eb38',
      'cache-control': 'no-cache' }
    };

  request(options, function (error, response, body) {
    if (!error) {
      weatherResponse = JSON.parse(body);
      console.log(weatherResponse.current_observation.observation_location.full);
      bot.reply(message, 'Currently it is ' + weatherResponse.current_observation.weather);
      bot.reply(message, 'The temperature is ' + weatherResponse.current_observation.temperature_string);
      bot.reply(message, 'The location is ' + weatherResponse.current_observation.observation_location.full);
      bot.reply(message, weatherResponse.current_observation.observation_time);
    }
  });



});
