/// <reference path="../typings/index.d.ts" />
import Promise = require("bluebird");
import FS = require("fs");

export class EventProcessor
{
  processS3IncomingMail(s3Event : any) {
    return new Promise(function(resolve, reject) {
      console.log("S3 Event received : " + JSON.stringify(s3Event));
      resolve();
    });
  }
}
