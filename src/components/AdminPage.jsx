import React, { useEffect, useState } from 'react'
import EmployeesAdmin from './EmployeesAdmin'
import DrinksAdmin from './DrinksAdmin'
import InvoicesAdmin from './InvoicesAdmin'
import OrdersAdmin from './OrdersAdmin'

export default function AdminPage(){
  const [tab, setTab] = useState('orders')
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-3 flex gap-2 mb-4'>
        <button className='px-3 py-2 bg-indigo-600 text-white rounded' onClick={()=>setTab('orders')}>الطلبات</button>
        <button className='px-3 py-2 bg-blue-600 text-white rounded' onClick={()=>setTab('employees')}>الموظفين</button>
        <button className='px-3 py-2 bg-purple-600 text-white rounded' onClick={()=>setTab('drinks')}>المشروبات</button>
        <button className='px-3 py-2 bg-orange-600 text-white rounded' onClick={()=>setTab('invoices')}>الفواتير</button>
      </div>
      <div className='col-span-2'>
        {tab==='orders' && <OrdersAdmin/>}
        {tab==='employees' && <EmployeesAdmin/>}
        {tab==='drinks' && <DrinksAdmin/>}
        {tab==='invoices' && <InvoicesAdmin/>}
      </div>
      <div className='col-span-1 p-4 bg-white rounded shadow'>
        <h3 className='font-semibold mb-2'>إحصاءات سريعة</h3>
        <p>هنا ممكن تحط إجمالي الطلبات اليوم، الإيراد، ...</p>
      </div>
    </div>
  )
}
