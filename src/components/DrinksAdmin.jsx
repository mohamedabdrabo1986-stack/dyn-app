import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function DrinksAdmin(){
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const fetch = async ()=>{
    const snap = await getDocs(collection(db,'drinks'))
    setList(snap.docs.map(d=>({ id: d.id, ...d.data() })))
  }
  useEffect(()=>{ fetch() },[])

  const add = async ()=>{
    if(!name) return alert('اكتب اسم المشروب')
    await addDoc(collection(db,'drinks'), { name, price: Number(price), createdAt: new Date() }); setName(''); setPrice(0); fetch()
  }

  const updatePrice = async (id)=>{
    const np = prompt('السعر الجديد')
    if(!np) return
    await updateDoc(doc(db,'drinks',id), { price: Number(np) }); fetch()
  }

  const remove = async (id)=>{
    if(!confirm('تأكيد حذف المشروب؟')) return
    await deleteDoc(doc(db,'drinks',id)); fetch()
  }

  return (
    <div>
      <h3 className='text-lg font-semibold mb-2'>إدارة المشروبات</h3>
      <div className='mb-2 flex gap-2'>
        <input className='border p-2' placeholder='اسم المشروب' value={name} onChange={e=>setName(e.target.value)}/>
        <input className='border p-2' placeholder='السعر' type='number' value={price} onChange={e=>setPrice(e.target.value)}/>
        <button className='px-3 py-1 bg-blue-600 text-white rounded' onClick={add}>أضف</button>
      </div>
      <div className='space-y-2'>
        {list.map(d=> (
          <div key={d.id} className='flex justify-between p-2 border rounded'>
            <div>{d.name} — {d.price} ج.م</div>
            <div className='flex gap-2'>
              <button className='px-2 py-1 bg-yellow-500 rounded' onClick={()=>updatePrice(d.id)}>تعديل السعر</button>
              <button className='px-2 py-1 bg-red-600 text-white rounded' onClick={()=>remove(d.id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
