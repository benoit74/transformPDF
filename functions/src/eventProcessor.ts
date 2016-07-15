/// <reference path="../typings/index.d.ts" />
import Promise = require("bluebird");
import FS = require("fs");
import AWS = require("aws-sdk")
import Moment = require("moment")

var s3 = Promise.promisifyAll(new AWS.S3({apiVersion: '2006-03-01'}));
var fs = Promise.promisifyAll(FS);

export class EventProcessor
{
  
  getFilenameFromKey(key : string) {
    var n = key.lastIndexOf("/");
    return key.substring(n+1);
  }

  processS3IncomingMail(s3Event : any) {
    var self = this;
    return new Promise(function(resolve, reject) {
      console.log("S3 Event received : " + JSON.stringify(s3Event,null, 2));

      const bucket = s3Event.Records[0].s3.bucket.name;
      const key = decodeURIComponent(s3Event.Records[0].s3.object.key.replace(/\+/g, ' '));
      const params = {
        Bucket: bucket,
        Key: key
      };
      
      console.log('Bucket:', bucket, 'Key:', key);
      
      const filename = self.getFilenameFromKey(key); 
      const localPath = "/tmp/" + filename;
      console.log("File location: ", localPath);

      s3.getObjectAsync(params)
        .then(function(data:any) {
          return fs.writeFileAsync(localPath, data.Body);
        })
        .then(function() {
          console.log("File stored");
          const outputParams = {
            Bucket: bucket,
            Filename : filename,
            LocalPath : localPath 
          }
          resolve(outputParams);
        });

    });
  }

  storeLocalFileAsPublicReadInS3(bucket:string, s3Prefix : string, fileName : string, localPath : string) {
    var self = this;
    return new Promise(function(resolve, reject) {
      console.log("Test");
      fs.readFileAsync(localPath)
        .then(function(data : any) {
          
          const params = {
            Bucket: bucket,
            Key:    s3Prefix + fileName,
            ACL: 'public-read',
            Body : data,
          };
          console.log(params);
          return s3.putObjectAsync(params);
        })
        .then(function() {
          console.log("File stored in S3");
          resolve();
        });
    });
  }

}
