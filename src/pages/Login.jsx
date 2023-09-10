import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

import { handleApiRes } from '../utils/errorHandler'

const { VITE_APP_HOST } = import.meta.env

function Login () {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/users/sign_in`, formData)
      const { token } = res.data
      document.cookie = `token=${token};`

      if (res.data.status) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: '登入成功',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/')
      }
    } catch (error) {
      handleApiRes('error', '登入失敗', error.response.data.message)
    }
  }

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]
    axios.defaults.headers.common['Authorization'] = token
    axios.defaults.baseURL = VITE_APP_HOST

    axios
      .get(`/users/checkout`)
      .then(res => {
        if (res.status) {
          handleApiRes('info', '您已登入')
          navigate('/')
        }
      })
      .catch(console.log)
  }, [])

  return (
    <div className='login-right-section d-flex col-md-4 col-12 flex-column align-items-center'>
      <h2 className='fw-bold text-center'>最實用的線上代辦事項服務</h2>
      <form className='d-flex flex-column justify-content-around mt-lg-3'>
        <div className='d-flex flex-column mt-3'>
          <label className='fw-bold fs-5' htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
            className='form-control'
          />
        </div>
        <div className='d-flex flex-column mt-3'>
          <label className='fw-bold fs-5' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            required
            className='form-control'
          />
        </div>
        <button
          type='button'
          onClick={handleSubmit}
          className='fw-bold btn btn-success mt-4'
        >
          登入
        </button>
        <NavLink
          to='/auth/register'
          className='fw-bold btn btn-outline-secondary mt-3 text-dark'
        >
          註冊帳號
        </NavLink>
      </form>
    </div>
  )
}

export default Login
