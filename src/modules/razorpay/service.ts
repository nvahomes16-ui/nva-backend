import Razorpay from "razorpay"
import crypto from "crypto"

class RazorpayService {
  protected razorpay: Razorpay

  constructor(_: any, options: any) {
    this.razorpay = new Razorpay({
      key_id: options.key_id,
      key_secret: options.key_secret,
    })
  }

  async createPayment(order: { amount: number; id: string }) {
    return await this.razorpay.orders.create({
      amount: order.amount,
      currency: "INR",
      receipt: order.id,
    })
  }

  verifySignature(order_id: string, payment_id: string, signature: string) {
    const body = order_id + "|" + payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex")

    return expectedSignature === signature
  }
}

export default RazorpayService
