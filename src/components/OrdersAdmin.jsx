import React, { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

export default function OrdersAdmin(){
  const [orders, setOrders] = useState([])
  const fetch = async ()=>{
    const q = query(collection(db,'orders'), orderBy('createdAt','desc'))
    const snap = await getDocs(q)
    setOrders(snap.docs.map(d=>({ id: d.id, ...d.data() })))
  }
  useEffect(()=>{ fetch() },[])

  const markDone = async (id)=>{
    await updateDoc(doc(db,'orders',id), { status: 'done', executedAt: new Date() }); fetch()
  }

  return (
    <div>
      <h3 className='text-lg font-semibold mb-2'>جميع الطلبات</h3>
      <div className='space-y-2'>
        {orders.map(o=> (
          <div key={o.id} className='p-2 border rounded'>
            <div className='flex justify-between'><div className='font-medium'>{o.employeeId}</div><div>{o.total} ج.م</div></div>
            <div className='text-sm'>{o.items?.map(it=> <div key={it.drinkId}>{it.qty} × {it.name} = {it.lineTotal}</div>)}</div>
            {o.status!=='done' && <button className='mt-2 px-3 py-1 bg-green-600 text-white rounded' onClick={()=>markDone(o.id)}>تم التنفيذ</button>}
          </div>
        ))}
      </div>
    </div>
  )
}
