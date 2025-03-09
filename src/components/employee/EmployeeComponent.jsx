import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllDepartments } from '../../services/DepartmentService'

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const navigator = useNavigate()
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  })
  const { id } = useParams();

  useEffect(() => {
    getAllDepartments().then((response) => {
      console.log("Department", response.data)
      setDepartments(response.data);
    }).catch(e => {
      console.error(e);
    })
  }, [])

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setDepartmentId(response.data.departmentId)
      }).catch((e) => {
        console.error(e)
      })
    }
  }, [id])

  const saveorUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email, departmentId }
      console.log(employee)

      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response)
          navigator('/employees')
        }).catch(e => {
          console.error(e)
        })
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data)
          navigator('/employees')
        }).catch(e => {
          console.error(e)
        })
      }

    }
  }

  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors }

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First Name is required';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last Name is required';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    if (departmentId.trim()) {
      errorsCopy.department = '';
    } else {
      errorsCopy.department = 'Department is required';
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          {
            id ? <h2 className='text-center'>Update Employee</h2> : <h2 className='text-center'>Add Employee</h2>
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee First Name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Last Name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input
                  type='email'
                  placeholder='Enter Employee Email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Department:</label>
                <select
                  className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="Select Department">Select Department</option>
                  {
                    departments.map((department) =>
                      <option key={department.id} value={department.id}>{department.departmentName} </option>
                    )
                  }
                </select>
                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
              </div>

              <button className='btn btn-success' onClick={saveorUpdateEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent