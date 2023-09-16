var nodemailer = require("nodemailer");

class MailHelper {
  SendMail = (Mail) => {
    try {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER_NAME,
          pass: process.env.MAIL_USER_PASS,
        },
      });

      var MailData = {
        from: process.env.MAIL_USER_NAME,
        ...Mail,
      };

      var result = transporter.sendMail(MailData);
      return result;
    } catch (ex) {
      console.log({ MaileError: ex });
      return null;
    }
  };
}
module.exports = new MailHelper();
