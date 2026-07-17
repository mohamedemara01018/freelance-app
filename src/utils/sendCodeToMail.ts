import { transporter } from "../config/mail.config";


interface sendCodeToMailProbs {
    email: string,
    code: string,
    firstName: string
}

export const sendCodeToMail = async ({ email, code, firstName }: sendCodeToMailProbs) => {
    await transporter.sendMail({
        from: `"My App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "welcome to full-auth-app",
        text: `hello ${firstName || ""}, this is your verification code: ${code}`,
        html: `
                <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">

                <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:10px; border:1px solid #eaeaea;">

                    <h2 style="color:#2c3e50; text-align:center;">
                    Welcome to <span style="color:#007bff;">Full Auth App</span>
                    </h2>

                    <p style="font-size:16px; color:#333;">
                    Hi <b>${firstName || "there"}</b>, 👋
                    </p>

                    <p style="font-size:15px; color:#555;">
                    Thanks for signing up! Use the verification code below to complete your registration.
                    </p>

                    <div style="
                    text-align:center;
                    font-size:28px;
                    font-weight:bold;
                    letter-spacing:6px;
                    color:#007bff;
                    background:#f0f8ff;
                    padding:15px;
                    border-radius:8px;
                    margin:20px 0;
                    ">
                    ${code}
                    </div>

                    <p style="font-size:14px; color:#e74c3c; text-align:center;">
                    ⚠️ This code will expire in <b>5 minutes</b>
                    </p>

                    <hr style="border:none; border-top:1px solid #eee;" />

                    <p style="font-size:13px; color:#777; text-align:center;">
                    If you didn’t request this email, you can safely ignore it.
                    </p>

                    <p style="font-size:13px; color:#999; text-align:center;">
                    — Full Auth App Team
                    </p>

                </div>
                </div>
                `
    }).then(() => {
        console.log('email send successfully ')
    }).catch((err: any) => {
        console.log('there is a problem when send email', err)
        throw Error(err.message)
    })
};
