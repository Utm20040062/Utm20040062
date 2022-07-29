const nodemailer = require("nodemailer");
const fs = require ("fs");
const path =  require("path");
const hogan = require("hogan.js");

class Email {
    constructor(){
        this.transport = nodemailer.createTransport({
            service : "gmail",
            auth: { 
                user : "examplenodemailer2022@gmail.com",
                pass : "nodemailer2022"
            }
        });
    }

    sendEmail(email, data){

        return new  Promise((resolve, reject) => {
            const template = fs.readFileSync(path.resolve(__dirname, "../assets/templates/template.html"),"utf-8");
            const compiletemplate = hogan.compile(template);

            this.transport.sendMail({
                from: '"utma" <examplenodemailer2022@gmail.com>',
                to : email,
                subject : "correo electronico",
                html : compiletemplate.html
            }).then((response)=> {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        } )
    }
}

module.exports = new Email();