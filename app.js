const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 4000;

// middlewares
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ email, subject, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mamunpr6@gmail.com",
        pass: "ffcnburjdktkrbck",
      },
    });

    const mail_configs = {
      from: "mamunpr6@gmail.com",
      to: email,
      subject: subject,
      html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; color: #333;">
      
      <p style="font-size: 16px; font-weight: bold; margin-bottom: 20px;">Dear Sir/Madam,</p>
      <p style="font-size: 14px; margin-bottom: 15px;">I hope this message finds you in good health and high spirits.</p>
      <p style="font-size: 14px; margin-bottom: 15px;">I am writing to inform you about...</p>
      <p style="font-size: 14px; margin-bottom: 15px;">${message}</p>
      <p style="font-size: 14px; margin-bottom: 20px;">Your prompt attention to this matter is highly appreciated.</p>
      <hr style="border: 1px solid #ccc; margin-bottom: 20px;">
      <p style="font-size: 14px; margin-bottom: 15px;">Thank you for your cooperation.</p>
      <p style="font-size: 14px; padding: 20px; margin-bottom: 15px; color: #009900; background-color: red;">Best regards,</p>
      <p style="font-size: 14px; font-weight: bold; margin-bottom: 15px;">Your Name</p>
      <p style="font-size: 14px; margin-bottom: 15px;">Your Title</p>
      <p style="font-size: 14px; margin-bottom: 15px; color: #cc0000;">Your Company</p>
    </div>
    <style>
      p {
        margin: 0;
      }

      hr {
        width: 100%;
      }
    </style>
      `,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error occurred` });
      } else {
        console.log("Email sent: " + info.response);
        return resolve({ message: "Email sent successfully" });
      }
    });
  });
}

app.get("/", (req, res) => {
  const emailData = {
    email: req.query.email,
    subject: req.query.subject,
    message: req.query.message,
  };

  sendEmail(emailData)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailer is listening at http://localhost:${port}`);
});

// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const app = express();
// const port = 4000;

// // middlewares
// app.use(cors());
// app.use(express.json({ limit: "25mb" }));
// app.use(express.urlencoded({ limit: "25mb" }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

// function sendEmail({ email, subject, message }) {
//   return new Promise((resolve, reject) => {
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "mamunpr6@gmail.com",
//         pass: "ffcnburjdktkrbck",
//       },
//     });

//     const mail_configs = {
//       from: "mamunpr6@gmail.com",
//       to: email,
//       subject: subject,
//       html: `
//       <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
//       <p style="font-size: 16px; font-weight: bold; margin-bottom: 20px;">Dear Sir/Madam,</p>
//       <p style="font-size: 14px; margin-bottom: 15px;">I hope this message finds you in good health and high spirits.</p>
//       <p style="font-size: 14px; margin-bottom: 15px;">I am writing to inform you about...</p>
//       <p style="font-size: 14px; margin-bottom: 15px;">[Add your main message here]</p>
//       <p style="font-size: 14px; margin-bottom: 20px;">Your prompt attention to this matter is highly appreciated.</p>
//       <hr style="border: 1px solid #ccc; margin-bottom: 20px;">
//       <p style="font-size: 14px; margin-bottom: 15px;">Thank you for your cooperation.</p>
//       <p style="font-size: 14px; margin-bottom: 15px;">Best regards,</p>
//       <p style="font-size: 14px; font-weight: bold; margin-bottom: 15px;">Your Name</p>
//       <p style="font-size: 14px; margin-bottom: 15px;">Your Title</p>
//       <p style="font-size: 14px; margin-bottom: 15px;">Your Company</p>
//     </div>
//       `,
//     };

//     transporter.sendMail(mail_configs, function (error, info) {
//       if (error) {
//         console.log(error);
//         // return reject({ message: `An error occured` });
//       } else {
//         console.log("Email sent: " + info.response);
//       }

//       //   return resolve({ message: "Email send successfully" });
//     });
//   });
// }

// app.get("/", (req, res) => {
//   sendEmail(req.query)
//     .then((response) => response.send(response.message))
//     .catch((error) => res.status(500).send(error.message));
// });

// app.listen(port, () => {
//   console.log(`nodemailer is listening at http://localhost:${port}`);
// });
