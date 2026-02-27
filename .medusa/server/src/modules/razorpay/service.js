"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
class RazorpayService {
    constructor(_, options) {
        this.razorpay = new razorpay_1.default({
            key_id: options.key_id,
            key_secret: options.key_secret,
        });
    }
    async createPayment(order) {
        return await this.razorpay.orders.create({
            amount: order.amount,
            currency: "INR",
            receipt: order.id,
        });
    }
    verifySignature(order_id, payment_id, signature) {
        const body = order_id + "|" + payment_id;
        const expectedSignature = crypto_1.default
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");
        return expectedSignature === signature;
    }
}
exports.default = RazorpayService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Jhem9ycGF5L3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBK0I7QUFDL0Isb0RBQTJCO0FBRTNCLE1BQU0sZUFBZTtJQUduQixZQUFZLENBQU0sRUFBRSxPQUFZO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDO1lBQzNCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7U0FDL0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBcUM7UUFDdkQsT0FBTyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUN2QyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsUUFBUSxFQUFFLEtBQUs7WUFDZixPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGVBQWUsQ0FBQyxRQUFnQixFQUFFLFVBQWtCLEVBQUUsU0FBaUI7UUFDckUsTUFBTSxJQUFJLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUE7UUFFeEMsTUFBTSxpQkFBaUIsR0FBRyxnQkFBTTthQUM3QixVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW9CLENBQUM7YUFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNaLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVoQixPQUFPLGlCQUFpQixLQUFLLFNBQVMsQ0FBQTtJQUN4QyxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxlQUFlLENBQUEifQ==