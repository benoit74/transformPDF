/// <reference path="../typings/index.d.ts" />
import MailParser = require("mailparser");
/*
export function checkPotd(password : string) : boolean
{
      return new PasswordGenerator().check(password);
}
*/
export class MailReader
{
  private mailParser : MailParser.MailParser;
  constructor() 
  { 
    this.mailParser = new MailParser.MailParser({
        streamAttachments: true
    });
  } 

  canParseMail() { return this.mailParser != null;}
  generate(date: Date) : string
  {
    // generate today's password
    return "Password";
  }    
        
  check(password : string) : boolean
  {
    // check the value matches today's password of the day
    return password == this.generate(new Date());
  }
}
