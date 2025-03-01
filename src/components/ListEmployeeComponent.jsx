import React from 'react'

const ListEmployeeComponent = () => {
  const dummyData = [
    {
      "id": 1,
      "firstName": "abc",
      "lastName": "abc",
      "email": "abc@gmail.com"
    },
    {
      "id": 2,
      "firstName": "abc",
      "lastName": "abc",
      "email": "abc@gmail.com"
    },
    {
      "id": 3,
      "firstName": "abc",
      "lastName": "abc",
      "email": "abc@gmail.com"
    }
  ]
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
            dummyData.map(empl =>
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