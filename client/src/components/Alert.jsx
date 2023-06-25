import React from 'react'
import {CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, } from '@heroicons/react/24/outline'

const Alert = ({message, alertType}) => {
  if (alertType == 'success') {
    return (
      <div className='flex items-center gap-2 rounded-b-xl capitalize absolute top-0 px-4 py-2 left-[50%] translate-x-[-50%] text-green-500 bg-green-300'>
        <CheckCircleIcon className='w-5 h-5' />
        <span>{message}</span>
      </div>
    )
  }else if(alertType === 'warning'){
    return (
      <div className='flex items-center gap-2 rounded-b-xl capitalize absolute top-0 px-4 py-2 left-[50%] translate-x-[-50%] text-orange-500 bg-orange-300'>
        <ExclamationCircleIcon className='w-5 h-5' />
        <span>{message}</span>
      </div>
    )
  } else if (alertType === 'info') {
    return (
      <div className='flex items-center gap-2 rounded-b-xl capitalize absolute top-0 px-4 py-2 left-[50%] translate-x-[-50%] text-blue-500 bg-blue-300'>
        <ExclamationCircleIcon className='w-5 h-5' />
        <span>{message}</span>
      </div>
    )
  } else if (alertType === 'danger') {
    return (
      <div className='flex items-center gap-2 rounded-b-xl capitalize absolute top-0 px-4 py-2 left-[50%] translate-x-[-50%] text-red-500 bg-red-300'>
        <ExclamationTriangleIcon className='w-5 h-5' />
        <span>{message}</span>
      </div>
    )
  }
}

export default Alert