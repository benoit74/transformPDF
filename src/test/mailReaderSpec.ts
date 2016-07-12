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

  describe("#getFileExtension", () => {
    it("should achieve to parse simple extension", () => {
      expect(subject.getFileExtension("toto.ext")).to.equal("ext");
    });
    it("should achieve to parse extension of file with dots in its name", () => {
      expect(subject.getFileExtension("toto.fake.ext")).to.equal("ext");
    });
  });

  describe("#extractAttachment", () => {
    it("should achieve to extract Attachment", function(done) {
      subject.extractFirstAttachment(__dirname + "/assets/1hci34sbqitamb6clq44o3uvhtn0f2n7q81p7b81")
             .then(function (x : MailParser.Attachment){
               expect(x.fileName).to.equal("N Béraud.docx");done();});
    });
  });

});
