const nodemailer = require('nodemailer');

function sendMailToFriend(friend) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "### usuário do gmail ###",
      pass: "### senha do gmail ###"
    }
  });

  let mailOptions = {
    from: '### email do remetente ###',
    to: friend.email,
    subject: '### assunto do email ###',
    text: `### conteúdo com texto puro ###`,
    html: `### conteúdo com html ###`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Mensagem enviada: %s', info.messageId);
    console.log('url: %s', nodemailer.getTestMessageUrl(info));
  });
}

exports.email = {
  send: sendMailToFriend
};