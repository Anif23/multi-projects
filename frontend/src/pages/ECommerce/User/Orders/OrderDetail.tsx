import { useParams } from "react-router-dom";
import { useOrder } from "../../../../hooks/user/useOrders";

const OrderDetail = () => {
    const { id } = useParams();

    const orderId = Number(id);

    const { data: order, isLoading } = useOrder(orderId);

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;

    if (!order) return <div className="text-center mt-10">Order not found</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">

            <h1 className="text-2xl font-bold">Order #{order.id}</h1>

            {/* 🧾 SUMMARY */}
            <div className="bg-white p-6 rounded-xl shadow flex justify-between flex-wrap gap-4">
                <div>
                    <p className="text-gray-500 text-sm">Date</p>
                    <p className="font-semibold">
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Status</p>
                    <p className="font-semibold">{order.status}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Total</p>
                    <p className="font-bold text-lg">₹{order.total}</p>
                </div>
            </div>

            {/* 📦 ITEMS */}
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
                <h2 className="font-semibold">Items</h2>

                {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 items-center border-b pb-3">

                        <img
                            src={item.product?.images?.[0]?.url || "/placeholder.png"}
                            className="w-20 h-20 object-cover rounded"
                        />

                        <div className="flex-1">
                            <h3 className="font-semibold">{item.product?.name}</h3>
                            <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <div className="font-bold">
                            ₹{item.price * item.quantity}
                        </div>
                    </div>
                ))}
            </div>

            {/* 💳 PAYMENT */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-2">Payment</h2>
                <p>Method: {order.payment?.provider}</p>
                <p>Status: {order.payment?.status}</p>
            </div>

        </div>
    );
};

export default OrderDetail;