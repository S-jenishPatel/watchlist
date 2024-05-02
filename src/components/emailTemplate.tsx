import React from "react";

type EmailTemplateProps = {
  username: string;
  userId: string;
  verifyCode: string;
};

function EmailTemplate({ username, userId, verifyCode }: EmailTemplateProps) {
  const verifyEmailLink = process.env.DOMAIN + "/verify/" + userId.toString();
  return (
    <div>
      <h2 className="text-5xl text-black">Hello {username}</h2>
      <br />
      <p>This is your verification code below.</p>
      <span className="block text-7xl font-bold tracking-wider">
        {verifyCode}
      </span>
      <br />
      <p>
        Click on the link below and enter your verification code to verify your
        email with your account!
      </p>
      <br />
      <a href={verifyEmailLink}>{verifyEmailLink}</a>
      <hr />
      <p className="text-right">| From Watchlist Team.</p>
    </div>
  );
}

export default EmailTemplate;
