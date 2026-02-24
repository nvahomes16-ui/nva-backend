import Razorpay from "razorpay"

class RazorpayService {
  protected razorpay_: Razorpay

  constructor() {
    this.razorpay_ = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })
  }

  async createPayment(data: { amount: number; id: string }) {
    return this.razorpay_.orders.create({
      amount: data.amount,
      currency: "INR",
      receipt: data.id,
    })
  }
}

export default RazorpayService
