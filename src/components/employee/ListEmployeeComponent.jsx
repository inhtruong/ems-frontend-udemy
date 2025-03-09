import React, { useEffect, useState } from 'react'
import { listEmployees } from '../../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([])
  const navigator = useNavigate()

  useEffect(() => {
    gettAllEmployee()
  }, [])

  const gettAllEmployee = () => {
    listEmployees().then((response) => {
      setEmployees(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const addNewEmployee = () => {
    navigator('/add-employee')
  }

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`)
  }

  const deleteEmployee = (id) => {
    console.log(id)

    deleteEmployee(id).then((response) => {
      // TODO:
      console.log(response.data)
      alert('Delete Employee Success!')
      gettAllEmployee()
    }).catch(e => {
      console.error(e);
    })
  }
  return (
    <div className='container'>
      <h2 className='text-center'>List of Employee</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map(empl =>
              <tr key={empl.id}>
                <td scope="row">{empl.id}</td>
                <td>{empl.firstName}</td>
                <td>{empl.lastName}</td>
                <td>{empl.email}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updateEmployee(empl.id)}>Update</button>
                  <button className='btn btn-danger' onClick={() => deleteEmployee(empl.id)}
                    style={{ marginLeft: '10px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponent