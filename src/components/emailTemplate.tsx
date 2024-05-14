type TEmailTemplateProps = {
  username: string;
  userId: string;
  verifyCode: string;
};

function EmailTemplate({ username, userId, verifyCode }: TEmailTemplateProps) {
  const verifyEmailLink = process.env.DOMAIN + "/verify/" + userId.toString();
  return (
    <div>
      <h2 className="text-5xl text-black">Hello {username}</h2>
      <p style={{ fontSize: "16px" }}>Your verification code is:</p>
      <span
        style={{
          display: "block",
          fontSize: "24px",
          letterSpacing: "2px",
          fontWeight: "bold",
        }}
      >
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
      <br />
      <p
        style={{
          textAlign: "right",
          borderLeft: "2px solid white",
          paddingInline: "8px",
        }}
      >
        From Watchlist Team.
      </p>
    </div>
  );
}

export default EmailTemplate;
