function sendMail(mailOptions) {
    const mailer = require("nodemailer");


    var transport = {
        transport: 'ses',
        service: "gmail",
        auth: {
            user: "jesuisunbot10@gmail.com",
            pass: "jesuisunbot1000"
        }
    };

    var transporter = mailer.createTransport('SMTP', transport)
        mailOptions.to = transport.auth.user;

    console.log("mailOptions@mailer")
    mailOptions.html = '<b>' + mailOptions.message + '</b>';

    console.log(mailOptions)


    transporter.sendMail(mailOptions, function (error, info) {
        console.log('dans ke transporteur');
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
    transporter.close();

}

module.exports = sendMail;



//var mail = {
//    from: "jesuisunbot10@gmail.com",
//    to: "lou.bensaadi@gmail.com",
//    subject: "salut poto",
//    html: "<p> t moche </p>"
//}


//smtpTransport.sendMail(mail, function (error, response) {
//    if (error) {
//        console.log("Erreur lors de l'envoie du mail!");
//        console.log(error);
//    } else {
//        console.log("Mail envoyé avec succès!")
//    }
//    smtpTransport.close();
//});

//module.exports = getMail;
