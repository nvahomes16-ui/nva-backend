import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import Razorpay from "razorpay"

type CreateOrderBody = {
  cart_id: string
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const { cart_id } = req.body as CreateOrderBody

    if (!cart_id) {
      return res.status(400).json({
        success: false,
        message: "Cart ID is required",
      })
    }

    // 🔹 Resolve cart service
    const cartService = req.scope.resolve("cartService") as any

    const cart = await cartService.retrieve(cart_id)

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    // 🔹 Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    // 🔹 Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: cart.total, // already in smallest currency unit (paise)
      currency: cart.currency_code.toUpperCase(),
      receipt: cart.id,
    })

    // 🔹 Store razorpay_order_id in cart metadata
    await cartService.update(cart.id, {
      metadata: {
        ...cart.metadata,
        razorpay_order_id: razorpayOrder.id,
      },
    })

    return res.status(200).json({
      success: true,
      razorpay_order_id: razorpayOrder.id,
      key: process.env.RAZORPAY_KEY_ID,
      amount: cart.total,
      currency: cart.currency_code.toUpperCase(),
    })

  } catch (error) {
    console.error("Create Razorpay order error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
