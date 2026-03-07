"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const razorpay_1 = __importDefault(require("razorpay"));
async function POST(req, res) {
    try {
        const { amount, cart_id } = req.body;
        if (!amount || !cart_id) {
            return res.status(400).json({
                message: "amount and cart_id are required",
            });
        }
        const razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: cart_id,
        });
        return res.status(200).json(order);
    }
    catch (error) {
        console.error("RAZORPAY ERROR:", error);
        return res.status(500).json({
            message: error?.message || "Razorpay order creation failed",
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3Jhem9ycGF5L3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsb0JBNkJDO0FBcENELHdEQUErQjtBQU94QixLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDaEUsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBMkIsQ0FBQTtRQUUzRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxFQUFFLGlDQUFpQzthQUMzQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDO1lBQzVCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWdCO1lBQ3BDLFVBQVUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFvQjtTQUM3QyxDQUFDLENBQUE7UUFFRixNQUFNLEtBQUssR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3pDLE1BQU0sRUFBRSxNQUFNLEdBQUcsR0FBRztZQUNwQixRQUFRLEVBQUUsS0FBSztZQUNmLE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQTtRQUVGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUV2QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxJQUFJLGdDQUFnQztTQUM1RCxDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQyJ9