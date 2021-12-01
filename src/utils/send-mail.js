const transporter = require("../config/mail")

module.exports = (from, to, subject, text) =>{

       const message = {
           from,
           to,
           subject,
           text

       };

       transporter.sendMail(message)

}

    //    const message = {
    //        from: "a@a.com",
    //        to: `b@b.com`,
    //        subject: ,
    //        text: 

    //    };