import { useCart, useRemoveCart, useUpdateCart } from "../../../../hooks/user/useCart";
import { useCheckout } from "../../../../hooks/user/useCheckout";
import { useState } from "react";
import { useAuthStore } from "../../../../store/authStore";
import { useGuestCartStore } from "../../../../store/guestCartStore";
import { useNavigate, useLocation } from "react-router-dom";

const CartPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { data: cart, isLoading } = useCart();
    const token = useAuthStore((s) => s.token);
    const guestCart = useGuestCartStore();

    const isGuest = !token;

    const items = isGuest
        ? guestCart.items.map(i => ({
            id: i.product.id,
            product: i.product,
            quantity: i.quantity,
        }))
        : cart?.items || [];

    const updateCart = useUpdateCart();
    const removeCart = useRemoveCart();

    const checkout = useCheckout();

    const [paymentMethod, setPaymentMethod] = useState<"COD" | "RAZORPAY">("COD");

    if (isLoading) {
        return <div className="text-center mt-10">Loading cart...</div>;
    }

    const total = items.reduce(
        (acc: number, item: any) =>
            acc + item.quantity * item.product.price,
        0
    );

    const handleUpdate = (item: any, type: "inc" | "dec") => {
        if (isGuest) {
            const newQty =
                type === "inc" ? item.quantity + 1 : item.quantity - 1;

            if (newQty < 1) return;

            guestCart.update(item.product.id, newQty);
        } else {
            updateCart.mutate({
                id: item.id,
                data: {
                    quantity:
                        type === "inc"
                            ? item.quantity + 1
                            : item.quantity - 1,
                },
            });
        }
    };

    const handleRemove = (item: any) => {
        if (isGuest) {
            guestCart.remove(item.product.id);
        } else {
            removeCart.mutate(item.id);
        }
    };


    const handleCheckout = () => {
        if (!token) {
            navigate("/login", {
                state: { from: location.pathname },
            });
            return;
        }

        if (!confirm("Proceed to checkout?")) return;

        checkout.mutate({ paymentMethod });
    };

    if (!items || items.length === 0) {
        return (
            <div className="text-center mt-20 text-gray-400">
                Your cart is empty 🛒
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

            <div className="space-y-4">

                {items.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
                    >
                        {/* IMAGE */}
                        <img
                            src={item.product.images?.[0]?.url}
                            className="w-20 h-20 object-cover rounded"
                        />

                        {/* DETAILS */}
                        <div className="flex-1">
                            <h2 className="font-semibold">{item.product.name}</h2>
                            <p className="text-gray-500 text-sm">
                                ₹{item.product.price}
                            </p>

                            {/* QUANTITY */}
                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={() => handleUpdate(item, "dec")}
                                    className="px-2 bg-gray-200 rounded"
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() => handleUpdate(item, "inc")}
                                    className="px-2 bg-gray-200 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className="font-bold">
                            ₹{item.product.price * item.quantity}
                        </div>

                        {/* REMOVE */}
                        <button
                            onClick={() => handleRemove(item)}
                            className="text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                ))}

            </div>

            {/* 💳 PAYMENT METHOD */}
            <div className="mt-6 bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-4">Select Payment Method</h2>

                <div className="flex flex-col gap-3">

                    {/* COD */}
                    <label className="flex items-center gap-3 cursor-pointer border p-3 rounded-lg">
                        <input
                            type="radio"
                            name="payment"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={() => setPaymentMethod("COD")}
                        />
                        <span>Cash on Delivery (COD)</span>
                    </label>

                    {/* RAZORPAY */}
                    <label className="flex items-center gap-3 cursor-pointer border p-3 rounded-lg">
                        <input
                            type="radio"
                            name="payment"
                            value="RAZORPAY"
                            checked={paymentMethod === "RAZORPAY"}
                            onChange={() => setPaymentMethod("RAZORPAY")}
                        />
                        <span>Online Payment (Razorpay)</span>
                    </label>

                </div>
            </div>

            {/* TOTAL */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                    Total: ₹{total}
                </h2>

                <button
                    onClick={handleCheckout}
                    disabled={!isGuest && checkout.isPending}
                    className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                    {!isGuest && checkout.isPending
                        ? "Processing..."
                        : "Checkout"}
                </button>
            </div>

        </div>
    );
};

export default CartPage;