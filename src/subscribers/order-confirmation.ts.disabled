import { sendEmail } from "../utils/resend"

export default async function orderConfirmationHandler({
  event,
  container,
}) {
  console.log("ORDER EVENT FIRED")

  const query = container.resolve("query")

  const { data: orders } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "display_id",
      "email",
      "currency_code",
      "subtotal",
      "shipping_total",
      "total",
      "shipping_address.first_name",
      "shipping_address.last_name",
      "shipping_address.address_1",
      "shipping_address.city",
      "shipping_address.province",
      "shipping_address.postal_code",
      "shipping_address.country_code",
      "items.title",
      "items.quantity",
      "items.total",
    ],
    filters: {
      id: event.data.id,
    },
  })

  const order = orders?.[0]
  if (!order?.email) return

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format((amount || 0) / 100)

  const itemsHtml = order.items
    ?.map(
      (item: any) => `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #eee;">
          <div style="font-weight:600;color:#111827;">
            ${item.title}
          </div>
          <div style="font-size:13px;color:#6b7280;margin-top:4px;">
            Quantity: ${item.quantity ?? 0}
          </div>
        </td>
        <td align="right" style="padding:16px 0;border-bottom:1px solid #eee;font-weight:600;color:#111827;">
          ${formatINR(item.total)}
        </td>
      </tr>
    `
    )
    .join("")

  const html = `
  <div style="background:#f3f4f6;padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.06);">
      
      <!-- Header -->
      <div style="background:#0f172a;color:#ffffff;padding:30px;">
        <h1 style="margin:0;font-size:22px;font-weight:600;">
          NVA Homes
        </h1>
        <p style="margin:6px 0 0;font-size:14px;opacity:0.85;">
          Premium Living Essentials
        </p>
      </div>

      <!-- Body -->
      <div style="padding:36px;">
        
        <h2 style="margin:0 0 10px;font-size:22px;color:#111827;">
          🎉 Thank you for your order!
        </h2>

        <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">
          Your order <strong>#${order.display_id}</strong> has been confirmed.
        </p>

        <!-- Order Items -->
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${itemsHtml}
        </table>

        <!-- Summary Box -->
        <div style="margin-top:28px;background:#f9fafb;border-radius:12px;padding:22px;">
          <table width="100%" style="font-size:14px;color:#374151;">
            <tr>
              <td style="padding:6px 0;">Subtotal</td>
              <td align="right">${formatINR(order.subtotal)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;">Shipping</td>
              <td align="right">${formatINR(order.shipping_total)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;font-size:16px;font-weight:700;border-top:1px solid #e5e7eb;">
                Total
              </td>
              <td align="right" style="padding:12px 0;font-size:16px;font-weight:700;border-top:1px solid #e5e7eb;">
                ${formatINR(order.total)}
              </td>
            </tr>
          </table>
        </div>

        <!-- Shipping Address -->
        <div style="margin-top:32px;">
          <h3 style="margin:0 0 8px;font-size:16px;color:#111827;">
            Shipping Address
          </h3>
          <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
            ${order.shipping_address?.first_name || ""} ${order.shipping_address?.last_name || ""}<br/>
            ${order.shipping_address?.address_1 || ""}<br/>
            ${order.shipping_address?.city || ""}, ${order.shipping_address?.province || ""}<br/>
            ${order.shipping_address?.postal_code || ""}<br/>
            ${order.shipping_address?.country_code?.toUpperCase() || ""}
          </p>
        </div>

        <p style="margin-top:30px;font-size:14px;color:#6b7280;">
          We’ll notify you once your order ships with tracking details.
        </p>

      </div>

      <!-- Footer -->
      <div style="background:#f9fafb;padding:24px;text-align:center;font-size:13px;color:#6b7280;">
        Questions? Contact us at 
        <a href="mailto:support@nvahomes.com" style="color:#111827;text-decoration:none;font-weight:500;">
          support@nvahomes.com
        </a>
        <br/><br/>
        © ${new Date().getFullYear()} NVA Homes. All rights reserved.
      </div>

    </div>
  </div>
  `

  await sendEmail({
    to: order.email,
    subject: `Order #${order.display_id} Confirmation`,
    html,
  })
}

export const config = {
  event: "order.placed",
}