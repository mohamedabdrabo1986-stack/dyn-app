import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

export default function InvoicesAdmin(){
  const [clients, setClients] = useState([])
  const [selected, setSelected] = useState('')
  const [invoices, setInvoices] = useState([])

  const fetchClients = async ()=>{
    const snap = await getDocs(collection(db,'employees')); setClients(snap.docs.map(d=>({ id: d.id, ...d.data() })))
    const inv = await getDocs(collection(db,'invoices')); setInvoices(inv.docs.map(d=>({ id: d.id, ...d.data() })))
  }
  useEffect(()=>{ fetchClients() },[])

  const createInvoice = async ()=>{
    if(!selected) return alert('اختار موظف')
    const q = query(collection(db,'orders'), where('employeeId','==', selected))
    const snap = await getDocs(q)
    const items = snap.docs.flatMap(d=> d.data().items || [])
    if(items.length===0) return alert('لا توجد طلبات لهذا الموظف')
    const subtotal = items.reduce((s,it)=> s + (it.lineTotal||0),0)
    await addDoc(collection(db,'invoices'), { employeeId: selected, items, subtotal, total: subtotal, createdAt: new Date(), paid:false })
    alert('تم إنشاء الفاتورة')
    const inv = await getDocs(collection(db,'invoices')); setInvoices(inv.docs.map(d=>({ id: d.id, ...d.data() })))
  }

  const markPaid = async (id)=>{
    await updateDoc(doc(db,'invoices',id), { paid: true, paidAt: new Date() })
    const inv = await getDocs(collection(db,'invoices')); setInvoices(inv.docs.map(d=>({ id: d.id, ...d.data() })))
  }

  return (
    <div>
      <h3 className='text-lg font-semibold mb-2'>الفواتير</h3>
      <select className='border p-2 mb-2 w-full' value={selected} onChange={e=>setSelected(e.target.value)}>
        <option value=''>-- اختر موظف --</option>
        {clients.map(c=> <option key={c.id} value={c.id}>{c.name} — {c.department}</option>)}
      </select>
      <button className='px-3 py-1 bg-indigo-600 text-white rounded mb-4' onClick={createInvoice}>إنشاء فاتورة</button>
      <div className='space-y-2'>
        {invoices.map(inv=> (
          <div key={inv.id} className='p-2 border rounded'>
            <div>موظف: {inv.employeeId}</div>
            <div>المجموع: {inv.total} ج.م</div>
            <div>مدفوع: {inv.paid ? 'نعم' : 'لا'}</div>
            {!inv.paid && <button className='mt-2 px-3 py-1 bg-green-600 text-white rounded' onClick={()=>markPaid(inv.id)}>تم السداد</button>}
          </div>
        ))}
      </div>
    </div>
  )
}
