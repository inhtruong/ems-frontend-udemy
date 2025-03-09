import React, { useState } from 'react'

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const saveDepartment = (e) => {
    e.preventDefault();

    const department = { departmentName, departmentDescription };

    console.log(department);
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <h2 className='text-center'>Add Department</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Department Name:</label>
                <input
                  type='text'
                  placeholder='Enter Department Name'
                  name='firstName'
                  value={departmentName}
                  className='form-control'
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Department Description:</label>
                <input
                  type='text'
                  placeholder='Enter Department Description'
                  name='firstName'
                  value={departmentDescription}
                  className='form-control'
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                />
              </div>

              <button className='btn btn-success' onClick={(e) => saveDepartment(e)}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentComponent