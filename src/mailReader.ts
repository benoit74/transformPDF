/// <reference path="../typings/index.d.ts" />
import MailParser = require("mailparser");
import Promise = require("bluebird");
import FS = require("fs");

export class MailReader
{
  private mailParser : MailParser.MailParser;
  private attachment : MailParser.Attachment;
  private first : boolean;
  private attachmentCallback : () => void;

  constructor() 
  { 
    this.mailParser = new MailParser.MailParser({
        streamAttachments: true
    });
  } 

  canParseMail() { return this.mailParser != null;}
  attachmentIsReady() { return this.attachment != null; }
  getFileExtension(filename : string):string {
                 return filename.split('.').pop(); 
  } 

    private processAttachment(attachment : MailParser.Attachment, mail : MailParser.ParsedMail) {
      var extension = this.getFileExtension(attachment.fileName);
      if (!this.first && (extension == "doc" || extension == "docx")) {
        this.first = true;
        this.attachment = attachment;
        console.log("HELLO");
        this.attachmentCallback();
      }
    }

  extractFirstAttachment(fileName: string, callback: () => void) {
    this.attachmentCallback = callback;
    this.first = false;
    this.mailParser.on("attachment", this.processAttachment); // function(attachment : MailParser.Attachment, mail : MailParser.ParsedMail) { return this.processAttachment(attachment, mail, callback) } );
    FS.createReadStream(fileName).pipe(this.mailParser);
  
  }
  
}
