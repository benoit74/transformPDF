'use strict';


var eventProcessor = require("../../lib/eventProcessor");

module.exports.handler = function(event, context, cb) {
//  console.log('Received event:', JSON.stringify(event));
  var proc = new eventProcessor.EventProcessor();
  proc.processS3IncomingMail(event)
   .then(function() {
     return cb(null, {
       message: 'Go Serverless! Your Lambda function executed successfully!'
     });
   });
};
