import React, { useEffect, useState } from 'react'
import { listEmployees } from '../services/EmployeeService'

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    listEmployees().then((response) => {
      setEmployees(response.data)
    }).catch(error => {
      console.log(error);
    })
  }, [])
  return (
    <div className='container'>
      <h2>List of Employee</h2>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
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
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponent