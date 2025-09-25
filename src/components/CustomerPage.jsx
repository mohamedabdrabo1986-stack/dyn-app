import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export default function CustomerPage(){
  const [employees, setEmployees] = useState([])
  const [drinks, setDrinks] = useState([])
  const [employeeId, setEmployeeId] = useState('')
  const [cart, setCart] = useState({})

  useEffect(()=>{
    const fetch = async ()=>{
      const empSnap = await getDocs(collection(db, 'employees'))
      setEmployees(empSnap.docs.map(d=> ({ id: d.id, ...d.data() })))
      const drSnap = await getDocs(collection(db, 'drinks'))
      setDrinks(drSnap.docs.map(d=> ({ id: d.id, ...d.data() })))
    }
    fetch()
  },[])

  const changeQty = (id, delta)=>{
    setCart(prev => {
      const next = { ...prev }
      next[id] = Math.max( (next[id]||0) + delta, 0 )
      if(next[id]===0) delete next[id]
      return next
    })
  }

  const submitOrder = async ()=>{
    if(!employeeId) return alert('اختار اسم الموظف')
    const items = Object.keys(cart).map(id => {
      const d = drinks.find(x=>x.id===id)
      return { drinkId: id, name: d.name, qty: cart[id], unitPrice: d.price, lineTotal: d.price*cart[id] }
    })
    if(items.length===0) return alert('اختار مشروب واحد على الأقل')
    const total = items.reduce((s,i)=>s+i.lineTotal,0)
    await addDoc(collection(db, 'orders'), {
      employeeId, items, total, status: 'pending', createdAt: serverTimestamp()
    })
    setCart({})
    alert('تم إرسال الطلب بنجاح')
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='p-4 bg-white rounded shadow'>
        <h3 className='text-lg font-semibold mb-2'>اختار الموظف</h3>
        <select className='border p-2 w-full mb-3' value={employeeId} onChange={e=>setEmployeeId(e.target.value)}>
          <option value=''>-- اختر اسم الموظف --</option>
          {employees.map(emp=> <option key={emp.id} value={emp.id}>{emp.name} — {emp.department}</option>)}
        </select>

        <h3 className='text-lg font-semibold mb-2'>قائمة المشروبات</h3>
        <div className='space-y-2'>
          {drinks.map(d=> (
            <div key={d.id} className='flex items-center justify-between border p-2 rounded'>
              <div>
                <div className='font-medium'>{d.name}</div>
                <div className='text-sm'>السعر: {d.price} ج.م</div>
              </div>
              <div className='flex items-center gap-2'>
                <button className='px-2 py-1 bg-gray-200 rounded' onClick={()=>changeQty(d.id, -1)}>-</button>
                <div>{cart[d.id] || 0}</div>
                <button className='px-2 py-1 bg-gray-200 rounded' onClick={()=>changeQty(d.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-4'>
          <button className='px-4 py-2 bg-blue-600 text-white rounded' onClick={submitOrder}>إرسال الطلب</button>
        </div>
      </div>

      <div className='p-4 bg-white rounded shadow'>
        <h3 className='text-lg font-semibold mb-2'>السلة</h3>
        <ul>
          {Object.keys(cart).length===0 && <li>السلة فارغة</li>}
          {Object.keys(cart).map(id=>{
            const d = drinks.find(x=>x.id===id)
            return <li key={id} className='mb-2'>{d?.name} — {cart[id]} × {d?.price} = {cart[id]*d?.price} ج.م</li>
          })}
        </ul>
        <div className='mt-4 font-semibold'>
          المجموع: {Object.keys(cart).reduce((s,id)=>{ const d=drinks.find(x=>x.id===id); return s + (d? d.price*cart[id]:0)},0)} ج.م
        </div>
      </div>
    </div>
  )
}
