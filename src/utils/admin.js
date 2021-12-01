const transporter = require("../config/mail")


module.exports = (from, to, subject, text) => {
    


    const message = {
       from,
       to,
        subject,
        text

    };

    transporter.sendMail(message)

}
