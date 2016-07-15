/// <reference path="../../typings/index.d.ts" />
import MailReader = require("../mailReader");
import MailParser = require("mailparser");
import FS = require("fs")
import mockFS = require('mock-fs');

describe("MailReader", () => {
  var expect = require('chai').expect;
  var subject : MailReader.MailReader;

  beforeEach(function () {
    var mail1Content = FS.readFileSync(__dirname + "/assets/1hci34sbqitamb6clq44o3uvhtn0f2n7q81p7b81");
    mockFS({
      "/tmp/1hci34sbqitamb6clq44o3uvhtn0f2n7q81p7b81": mail1Content,
    });
    subject = new MailReader.MailReader();
  });

  afterEach(mockFS.restore);

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
      subject.extractFirstAttachment("/tmp/1hci34sbqitamb6clq44o3uvhtn0f2n7q81p7b81")
             .then(function (x : any){
               var expectFileName = "/tmp/N Béraud.docx";
               expect(x.LocalPath).to.equal(expectFileName);
               var stats = FS.statSync(expectFileName);
               var fileSizeInBytes = stats["size"];
               expect(fileSizeInBytes).to.equal(14764);
               expect(x.FromEmail.name).to.equal("Benoît Beraud");
               expect(x.FromEmail.address).to.equal("bberaud@octo.com");
               done();
             });
    });
  });
});
