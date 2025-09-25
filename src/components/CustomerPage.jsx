import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function CustomerPage() {
  const [name, setName] = useState("");
  const [drink, setDrink] = useState("");
  const [orders, setOrders] = useState([]);

  // ✅ جلب البيانات من Firestore
  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const ordersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(ordersList);
  };

  // ✅ إضافة أوردر جديد
  const addOrder = async (e) => {
    e.preventDefault();
    if (!name || !drink) return alert("من فضلك أدخل البيانات كاملة");

    await addDoc(collection(db, "orders"), {
      name,
      drink,
      createdAt: new Date(),
    });

    setName("");
    setDrink("");
    fetchOrders(); // تحديث البيانات بعد الإضافة
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Customer Orders</h2>

      <form onSubmit={addOrder} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="اسم العميل"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="المشروب"
          value={drink}
          onChange={(e) => setDrink(e.target.value)}
        />
        <button type="submit">➕ Add Order</button>
      </form>

      <h3>🧾 Existing Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.name} طلب {order.drink}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerPage;
