/// <reference path="../../typings/index.d.ts" />
import MailReader = require("../mailReader");
import MailParser = require("mailparser");


describe("MailReader", () => {
  var expect = require('chai').expect;
  var subject : MailReader.MailReader;

  beforeEach(function () {
    subject = new MailReader.MailReader();
  });


  describe("#canParseMail", () => {
    it("should be ready to parse mail", () => {
      expect(subject.canParseMail()).to.be.true;
    });
  });

  describe("#attachmentIsReady", () => {
    it("attachment is not ready when just started", () => {
      expect(subject.attachmentIsReady()).to.be.false;
    });
  });

  describe("#extractAttachment", () => {
    it("should achieve to extract Attachment", async function(done) {
      subject.extractFirstAttachment(__dirname + "/assets/1hci34sbqitamb6clq44o3uvhtn0f2n7q81p7b81", function() {
        console.log("Hello");
        expect(subject.attachmentIsReady()).to.be.true;
        done();  
      });
    });
  });
  
  describe("#extractAttachment", () => {
    it("should extract with correct name", () => {
      var attach = subject.extractFirstAttachment(__dirname + "/assets/1hci34sbqitamb6clq44o3uvhtn0f2n7q81p7b81", function() {});
      //console.log(attach.then(function(attachment : MailParser.Attachment) { return Promise.resolve(attachment.fileName);}));
     // return attach.then(function(attachment : MailParser.Attachment) { return Promise.resolve(attachment.fileName);}).should.eventually.equal('N Béraud.docx');
    });
  });


});
