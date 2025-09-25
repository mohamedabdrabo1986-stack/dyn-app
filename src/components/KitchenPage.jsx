import React, { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

export default function KitchenPage(){
  const [orders, setOrders] = useState([])
  const fetch = async ()=>{
    const q = query(collection(db,'orders'), where('status','==','pending'), orderBy('createdAt','asc'))
    const snap = await getDocs(q)
    setOrders(snap.docs.map(d=>({ id: d.id, ...d.data() })))
  }
  useEffect(()=>{ fetch() },[])

  const markDone = async (id)=>{
    await updateDoc(doc(db,'orders',id), { status: 'done', executedAt: new Date() }); fetch()
  }

  return (
    <div className='p-4 bg-white rounded shadow'>
      <h3 className='text-lg font-semibold mb-2'>واجهة المطبخ — الطلبات الحالية</h3>
      <div className='space-y-2'>
        {orders.length===0 && <div>لا توجد طلبات حالياً</div>}
        {orders.map(o=> (
          <div key={o.id} className='p-2 border rounded flex justify-between items-start'>
            <div>
              <div className='font-medium'>موظف: {o.employeeId}</div>
              <div className='text-sm'>{o.items?.map(it=> <div key={it.drinkId}>{it.qty} × {it.name}</div>)}</div>
            </div>
            <div>
              <button className='px-3 py-1 bg-green-600 text-white rounded' onClick={()=>markDone(o.id)}>تم</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
