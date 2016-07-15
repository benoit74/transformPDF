'use strict';

var eventProcessor = require("../lib/eventProcessor");
var mailReader = require("../lib/mailReader");
var sendMail = require("../lib/sendMail");
var pdfTransformer = require("../lib/pdfTransformer");

module.exports.handler = function(event, context, cb) {

  console.log('Received event:', JSON.stringify(event, null, 2));
  
  var proc = new eventProcessor.EventProcessor();
  var mailrdr = new mailReader.MailReader(); 
  var pdfTrans = new pdfTransformer.PdfTransformer();
  var send = new sendMail.SendMail();
  
  var incomingMail; // Bucket, Filename, LocalPath
  var incomingAttachment; // LocalPath, FromEmail (address, name) 
  var transformedLocalPath;

  proc.processS3IncomingMail(event)
  .then(function(data) {
    incomingMail = data;
    return mailrdr.extractFirstAttachment(incomingMail.LocalPath);
  })
  .then(function(data) {
    incomingAttachment = data;
    return pdfTrans.transformFile(incomingAttachment.LocalPath);
  })
  .then(function(data) {
    transformedLocalPath = data;
    return proc.storeLocalFileAsPublicReadInS3(incomingMail.Bucket, "outgoing_pdf/", incomingMail.Filename, transformedLocalPath); 
  })
  .then(function() {
    var url = "https://s3-eu-west-1.amazonaws.com/" + incomingMail.Bucket + "/outgoing_pdf/" + incomingMail.Filename; 
    return send.sendSuccessMail(incomingAttachment.FromEmail.address, incomingAttachment.FromEmail.name, url)
  })
  .then(function() {
    return cb(null, {
      message: 'Lambda function executed successfully!'
    });
  });

};
