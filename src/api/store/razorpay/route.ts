import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import Razorpay from "razorpay"

type RazorpayRequestBody = {
  amount: number
  cart_id: string
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const { amount, cart_id } = req.body as RazorpayRequestBody

    if (!amount || !cart_id) {
      return res.status(400).json({
        message: "amount and cart_id are required",
      })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: cart_id,
    })

    return res.status(200).json(order)
  } catch (error: any) {
    console.error("RAZORPAY ERROR:", error)

    return res.status(500).json({
      message: error?.message || "Razorpay order creation failed",
    })
  }
}
