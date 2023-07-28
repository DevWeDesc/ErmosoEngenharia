import dotenv from "dotenv"
const sgMail = require("@sendgrid/mail");
dotenv.config({
    path: "src/security/.env"
  })

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


interface SendMailProps {
  destiny: string;
  title: string;
}
export const emaiLService = {
  sendEmail: async () => {
    const msg = {
      to: 'dilanlopez009@gmail.com',
      from: 'desenvolvimento@descti.com.br',
      subject: 'TESTE ENVIO DE EMAIL',
      text: "TESTANDO ENVIO DE EMAIL COM SENDGRID",
      html: '<strong>SUCESS</strong>',
    };

    try {
      sgMail.send(msg);
      console.log("EMAIL ENVIADO!")
    } catch (error) {
      console.log(error);
    }
  },
};
