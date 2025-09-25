import React, { useState } from 'react'
import CustomerPage from './components/CustomerPage'
import AdminPage from './components/AdminPage'
import KitchenPage from './components/KitchenPage'

export default function App(){
  const [view, setView] = useState('customer')
  return (
    <div className='p-4'>
      <div className='flex gap-2 mb-4'>
        <button className='px-3 py-2 bg-blue-600 text-white rounded' onClick={()=>setView('customer')}>واجهة الموظفين</button>
        <button className='px-3 py-2 bg-green-600 text-white rounded' onClick={()=>setView('admin')}>لوحة الإدارة</button>
        <button className='px-3 py-2 bg-orange-600 text-white rounded' onClick={()=>setView('kitchen')}>واجهة المطبخ</button>
      </div>
      {view==='customer' && <CustomerPage/>}
      {view==='admin' && <AdminPage/>}
      {view==='kitchen' && <KitchenPage/>}
    </div>
  )
}
