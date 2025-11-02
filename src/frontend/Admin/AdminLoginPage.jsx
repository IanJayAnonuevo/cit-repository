import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLogin from './AdminLogin'

export default function AdminLoginPage() {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()
  
  const handleClose = () => {
    setIsOpen(false)
    navigate('/')
  }
  
  return <AdminLogin isOpen={isOpen} onClose={handleClose} />
}

