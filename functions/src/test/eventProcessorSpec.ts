import EventProcessor = require("../eventProcessor");

describe("EventProcessor", () => {

  var expect = require('chai').expect;
  var subject : EventProcessor.EventProcessor;

  beforeEach(function() {
    subject = new EventProcessor.EventProcessor();
  });

  describe("#getFilenameFromKey", () => {
   it("should parse key without subfolder", () => {
     expect(subject.getFilenameFromKey("hello")).to.equal("hello");
   });
   it("should parse key with 1 subfolder", () => {
     expect(subject.getFilenameFromKey("folder/hello")).to.equal("hello");
   });
   it("should parse key with many subfolder", () => {
     expect(subject.getFilenameFromKey("folder/folder/folder/hello")).to.equal("hello");
   });

  });

});

