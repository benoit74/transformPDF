/// <reference path="../typings/index.d.ts" />
import Promise = require("bluebird");
import FS = require("fs");
import Request = require("request");

export class PdfTransformer {

  private apiKey:string = '876153116';

  transformFile(fileName: string) {
    var self = this;
    return new Promise(function(resolve, reject) {
      var formData = {
        ApiKey: self.apiKey,
        File: FS.createReadStream(fileName)
      };
      var convertedFileName = fileName + ".pdf";
      var pdfOutput = FS.createWriteStream(convertedFileName);
      //console.log("Calling ConvertAPI");
      Request.post({url:'https://do.convertapi.com/Word2Pdf', formData: formData}, 
                   function(error, response, body){
                     if (error) {
                       reject(error);
                     } else {
                       //console.log("API call completed");
                     }
                   }).pipe(pdfOutput);
      pdfOutput.on('close', () => resolve(convertedFileName));
    });
  }

}
