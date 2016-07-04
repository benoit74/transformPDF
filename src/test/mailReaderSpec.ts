/// <reference path="../../typings/index.d.ts" />
import MailReader = require("../mailReader");

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
  

});
