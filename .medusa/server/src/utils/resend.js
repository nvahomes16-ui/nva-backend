"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
async function sendEmail({ to, subject, html, }) {
    return await resend.emails.send({
        from: "onboarding@resend.dev", // keep for test mode
        to,
        subject,
        html,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3Jlc2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLDhCQWVDO0FBbkJELG1DQUErQjtBQUUvQixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWUsQ0FBQyxDQUFBO0FBRS9DLEtBQUssVUFBVSxTQUFTLENBQUMsRUFDOUIsRUFBRSxFQUNGLE9BQU8sRUFDUCxJQUFJLEdBS0w7SUFDQyxPQUFPLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDOUIsSUFBSSxFQUFFLHVCQUF1QixFQUFFLHFCQUFxQjtRQUNwRCxFQUFFO1FBQ0YsT0FBTztRQUNQLElBQUk7S0FDTCxDQUFDLENBQUE7QUFDSixDQUFDIn0=