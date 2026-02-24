import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import crypto from "crypto"
import { completeCartWorkflow } from "@medusajs/medusa/core-flows"

type VerifyBody = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
  cart_id: string
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cart_id,
    } = req.body as VerifyBody


    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      })
    }

    // 🔥 Complete cart using workflow
    const { result } = await completeCartWorkflow(req.scope).run({
      input: {
        id: cart_id,
      },
    })

    return res.status(200).json({
      success: true,
      order_id: result.id,
    })

  } catch (error) {
    console.error("Verification error:", error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
}
