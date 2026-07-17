import { transporter } from "../config/mail.config";

interface sendResetTokenToMail {
    email: string,
    resetToken: string,
    firstName: string
}




export const sendResetTokenToMail = async ({
    email,
    resetToken,
    firstName,
}: sendResetTokenToMail) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
        from: `"Full Auth App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Password",
        text: `
                Hello ${firstName},

                We received a request to reset your password.

                Open the following link to create a new password:

                ${resetUrl}

                This link will expire in 10 minutes.

                If you didn't request a password reset, you can safely ignore this email.
        `,
        html: `
                <div style="background:#f5f7fb;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:40px;border:1px solid #e6e6e6;">

                        <div style="text-align:center;">
                            <h1 style="color:#2d3748;margin-bottom:5px;">
                                🔐 Password Reset
                            </h1>

                            <p style="color:#718096;font-size:15px;">
                                Full Auth App
                            </p>
                        </div>

                        <hr style="border:none;border-top:1px solid #eeeeee;margin:30px 0;">

                        <p style="font-size:16px;color:#333;">
                            Hello <strong>${firstName || "there"}</strong>,
                        </p>

                        <p style="font-size:15px;color:#555;line-height:1.7;">
                            We received a request to reset your password.
                            Click the button below to create a new password.
                        </p>

                        <div style="text-align:center;margin:40px 0;">
                            <a
                                href="${resetUrl}"
                                style="
                                    background:#2563eb;
                                    color:#ffffff;
                                    text-decoration:none;
                                    padding:15px 35px;
                                    border-radius:8px;
                                    font-size:16px;
                                    font-weight:bold;
                                    display:inline-block;
                                "
                            >
                                Reset Password
                            </a>
                        </div>

                        <p style="font-size:14px;color:#555;">
                            Or copy and paste this link into your browser:
                        </p>

                        <p style="
                            background:#f3f4f6;
                            padding:12px;
                            border-radius:6px;
                            word-break:break-all;
                            font-size:13px;
                            color:#2563eb;
                        ">
                            ${resetUrl}
                        </p>

                        <div style="
                            background:#fff8e5;
                            border-left:4px solid #f59e0b;
                            padding:15px;
                            margin-top:30px;
                            border-radius:6px;
                        ">
                            <strong>⚠️ Security Notice</strong>

                            <p style="margin-top:10px;color:#555;font-size:14px;">
                                This reset link will expire in <strong>10 minutes</strong>.
                            </p>

                            <p style="margin-top:8px;color:#555;font-size:14px;">
                                If you didn't request a password reset, you can safely ignore this email.
                                Your password will remain unchanged.
                            </p>
                        </div>

                        <hr style="border:none;border-top:1px solid #eeeeee;margin:35px 0;">

                        <p style="text-align:center;color:#999;font-size:13px;">
                            © ${new Date().getFullYear()} Full Auth App
                        </p>

                    </div>
                </div>
        `,
    }).then(() => {
        console.log('email send successfully ')
    }).catch((err) => {
        console.log('there is a problem when send email', err)
    })


};