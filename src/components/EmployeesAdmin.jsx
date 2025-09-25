import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase';

export default function EmployeesAdmin(){
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('مطبخ')

  const fetch = async ()=>{
    const snap = await getDocs(collection(db, 'employees'))
    setList(snap.docs.map(d=>({ id: d.id, ...d.data() })))
  }
  useEffect(()=>{ fetch() },[])

  const add = async ()=>{
    if(!name) return alert('اكتب اسم الموظف')
    await addDoc(collection(db, 'employees'), { name, department, createdAt: new Date() })
    setName(''); setDepartment('مطبخ'); fetch()
  }

  const remove = async (id)=>{
    if(!confirm('تأكيد حذف الموظف؟')) return
    await deleteDoc(doc(db,'employees',id)); fetch()
  }

  return (
    <div>
      <h3 className='text-lg font-semibold mb-2'>إدارة الموظفين</h3>
      <div className='mb-2'>
        <input className='border p-2 mr-2' placeholder='اسم الموظف' value={name} onChange={e=>setName(e.target.value)}/>
        <input className='border p-2 mr-2' placeholder='القسم' value={department} onChange={e=>setDepartment(e.target.value)}/>
        <button className='px-3 py-1 bg-blue-600 text-white rounded' onClick={add}>أضف</button>
      </div>
      <div className='space-y-2'>
        {list.map(l=> (
          <div key={l.id} className='flex justify-between p-2 border rounded'>
            <div>{l.name} — {l.department}</div>
            <div><button className='px-2 py-1 bg-red-600 text-white rounded' onClick={()=>remove(l.id)}>حذف</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
