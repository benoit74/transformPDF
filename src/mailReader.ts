/// <reference path="../typings/index.d.ts" />
import MailParser = require("mailparser");
import Promise = require("bluebird");
import FS = require("fs");

export class MailReader
{
  private mailParser : MailParser.MailParser;
  private first : boolean;

  constructor() 
  { 
    this.mailParser = new MailParser.MailParser({
        streamAttachments: true
    });
  } 

  canParseMail() { return this.mailParser != null;}
  
  getFileExtension(filename : string):string {
    return filename.split('.').pop(); 
  } 

  extractFirstAttachment(fileName: string) {
    var self = this;
    return new Promise(function (resolve, reject) { 
    var first = false;
    self.mailParser.on("attachment", function(attachment : MailParser.Attachment, mail : MailParser.ParsedMail) {
      var extension = self.getFileExtension(attachment.fileName);
      if (!first && (extension == "doc" || extension == "docx")) {
        resolve(attachment);
      }
    });
    FS.createReadStream(fileName).pipe(self.mailParser);
  }); 
  }
  

}
