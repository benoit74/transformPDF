import PdfTransformer = require('../pdfTransformer');
import FS = require("fs");
import mockFS = require('mock-fs');
import Nock = require('nock');
  
describe("PdfTransformer", () => {

  var expect = require('chai').expect;
  var subject : PdfTransformer.PdfTransformer;

  beforeEach( function() {
    subject = new PdfTransformer.PdfTransformer();
  });

  afterEach( function() {
    Nock.cleanAll();
    mockFS.restore();
  });

  describe("#transformFile", () => {
    it("should achieve to transform", function(done) {
      
      var docContent = FS.readFileSync(__dirname + "/assets/N Béraud.docx");
      var pdfContent = FS.readFileSync(__dirname + "/assets/N Béraud.docx.pdf");
      var intercept = Nock('https://do.convertapi.com')
        .post('/Word2Pdf')
        .reply(200, pdfContent); // We will mock the FS, so we have to read the file to use for reply beforehand

      mockFS({
        "/tmp/N Béraud.docx" : docContent
      });
      
      subject.transformFile("/tmp/N Béraud.docx")
         .then(function(x : string) {
           expect(intercept.isDone()).to.be.true;
           var expectFileName = "/tmp/N Béraud.docx.pdf";
           expect(x).to.equal(expectFileName);
           var stats = FS.statSync(expectFileName);
           var fileSizeInBytes = stats["size"];
           expect(fileSizeInBytes).to.equal(218279);
           done();
         });
    }); 
  });

});
