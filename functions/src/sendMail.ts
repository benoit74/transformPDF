/// <reference path="../typings/index.d.ts" />
import Promise = require("bluebird");
import AWS = require("aws-sdk")

var ses = Promise.promisifyAll(new AWS.SES({apiVersion: '2010-12-01', region: 'eu-west-1'}));

export class SendMail
{
  sendSuccessMail(ToAddress : string, ToName : string, URL : string) {
    return new Promise(function(resolve, reject) {
      const params = {
        Destination : {
          ToAddresses : [ToName + '<' + ToAddress + '>']
        },
        Message: {
          Body: {
            Html: {
              Data: "Votre document a été converti avec succès en PDF.<br/>Il est téléchargeable à l'URL suivante : <a href=" + URL + ">"+URL+"</a><br/>Il restera disponible durant 7 jours."
            }
          },
          Subject : {
            Data: "Votre document a été converti"
          }
        },
        Source: "pdf@ploumpouloum.com"
      };
      ses.sendEmailAsync(params)
        .then(() => {resolve();});
    }); 
  }

}
