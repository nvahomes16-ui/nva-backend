"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const razorpay_1 = __importDefault(require("razorpay"));
async function POST(req, res) {
    try {
        const { cart_id } = req.body;
        if (!cart_id) {
            return res.status(400).json({
                success: false,
                message: "Cart ID is required",
            });
        }
        // 🔹 Resolve cart service
        const cartService = req.scope.resolve("cartService");
        const cart = await cartService.retrieve(cart_id);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        // 🔹 Initialize Razorpay
        const razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        // 🔹 Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: cart.total, // already in smallest currency unit (paise)
            currency: cart.currency_code.toUpperCase(),
            receipt: cart.id,
        });
        // 🔹 Store razorpay_order_id in cart metadata
        await cartService.update(cart.id, {
            metadata: {
                ...cart.metadata,
                razorpay_order_id: razorpayOrder.id,
            },
        });
        return res.status(200).json({
            success: true,
            razorpay_order_id: razorpayOrder.id,
            key: process.env.RAZORPAY_KEY_ID,
            amount: cart.total,
            currency: cart.currency_code.toUpperCase(),
        });
    }
    catch (error) {
        console.error("Create Razorpay order error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3Jhem9ycGF5L2NyZWF0ZS1vcmRlci9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU9BLG9CQThEQztBQXBFRCx3REFBK0I7QUFNeEIsS0FBSyxVQUFVLElBQUksQ0FDeEIsR0FBa0IsRUFDbEIsR0FBbUI7SUFFbkIsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUF1QixDQUFBO1FBRS9DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSxxQkFBcUI7YUFDL0IsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUVELDBCQUEwQjtRQUMxQixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQVEsQ0FBQTtRQUUzRCxNQUFNLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFaEQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLGdCQUFnQjthQUMxQixDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksa0JBQVEsQ0FBQztZQUM1QixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFnQjtZQUNwQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBb0I7U0FDN0MsQ0FBQyxDQUFBO1FBRUYsMkJBQTJCO1FBQzNCLE1BQU0sYUFBYSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDakQsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsNENBQTRDO1lBQ2hFLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUMxQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDakIsQ0FBQyxDQUFBO1FBRUYsOENBQThDO1FBQzlDLE1BQU0sV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2hDLFFBQVEsRUFBRTtnQkFDUixHQUFHLElBQUksQ0FBQyxRQUFRO2dCQUNoQixpQkFBaUIsRUFBRSxhQUFhLENBQUMsRUFBRTthQUNwQztTQUNGLENBQUMsQ0FBQTtRQUVGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLElBQUk7WUFDYixpQkFBaUIsRUFBRSxhQUFhLENBQUMsRUFBRTtZQUNuQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlO1lBQ2hDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSztZQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUU7U0FDM0MsQ0FBQyxDQUFBO0lBRUosQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3BELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsdUJBQXVCO1NBQ2pDLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDIn0=