import { Resend } from "resend";
import EmailTemplate from "@/components/emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

type sendEmailProps = {
  username: string;
  userId: string;
  email: string;
  verifyCode: string;
};

const sendEmail = async ({
  username,
  userId,
  email,
  verifyCode,
}: sendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: "Watchlist <onboarding@resend.dev>",
    to: [email],
    subject: "Verify Your Email | from Watchlist",
    react: EmailTemplate({ username, userId, verifyCode }),
  });

  if (error) {
    throw error;
  }

  return data;
};

export default sendEmail;
