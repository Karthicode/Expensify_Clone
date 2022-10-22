
import nodemailer from 'nodemailer'

/**
 * @param {*} options
 * @returns {Promise<void>}
 */

export const sendEmailService = async (options:any):Promise<any> => {
  try {
    console.log(options);
    const data= options;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'noreply.expensify@gmail.com',
        pass: 'Quasi_250'
      }
    });
     
    const mailOptions = {
      from: 'noreply.expensify@gmail.com',
      to: data.options.to,
      subject: data.options.subject,
      html: data.options.html
    };
    console.log("MAILOPTIONs",mailOptions);
    transporter.sendMail(mailOptions, function (err:any, data:Object) {
      if (err) {
        console.log("Error " + err);
        return Promise.reject("Error in sending email");
      } else {
        console.log("Email sent successfully");
        console.log(data);
        return Promise.resolve("Email sent");
      }
    });
  }
  catch (error:any) {
    console.log(error);
  }
}
