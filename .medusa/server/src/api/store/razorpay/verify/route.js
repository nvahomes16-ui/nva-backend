"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const crypto_1 = __importDefault(require("crypto"));
const core_flows_1 = require("@medusajs/medusa/core-flows");
async function POST(req, res) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart_id, } = req.body;
        const generatedSignature = crypto_1.default
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }
        // 🔥 Complete cart using workflow
        const { result } = await (0, core_flows_1.completeCartWorkflow)(req.scope).run({
            input: {
                id: cart_id,
            },
        });
        return res.status(200).json({
            success: true,
            order_id: result.id,
        });
    }
    catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3Jhem9ycGF5L3ZlcmlmeS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVdBLG9CQTRDQztBQXRERCxvREFBMkI7QUFDM0IsNERBQWtFO0FBUzNELEtBQUssVUFBVSxJQUFJLENBQ3hCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLElBQUksQ0FBQztRQUNILE1BQU0sRUFDSixpQkFBaUIsRUFDakIsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixPQUFPLEdBQ1IsR0FBRyxHQUFHLENBQUMsSUFBa0IsQ0FBQTtRQUcxQixNQUFNLGtCQUFrQixHQUFHLGdCQUFNO2FBQzlCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBb0IsQ0FBQzthQUN0RCxNQUFNLENBQUMsR0FBRyxpQkFBaUIsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO2FBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVoQixJQUFJLGtCQUFrQixLQUFLLGtCQUFrQixFQUFFLENBQUM7WUFDOUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLDJCQUEyQjthQUNyQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQsa0NBQWtDO1FBQ2xDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsaUNBQW9CLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMzRCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLE9BQU87YUFDWjtTQUNGLENBQUMsQ0FBQTtRQUVGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLElBQUk7WUFDYixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQyxDQUFBO0lBRUosQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzNDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsc0JBQXNCO1NBQ2hDLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDIn0=