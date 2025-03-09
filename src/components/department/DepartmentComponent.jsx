import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartment } from '../../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getDepartment(id).then((response) => {
      setDepartmentName(response.data.departmentName);
      setDepartmentDescription(response.data.departmentDescription);
    }).catch(e => {
      console.error(e);
    })
  }, [id])

  const saveDepartment = (e) => {
    e.preventDefault();
    const department = { departmentName, departmentDescription };

    createDepartment(department).then((response) => {
      console.log(response.data);
      navigator("/departments");
    }).catch(e => {
      console.error(e);
    })
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          {
            id ? <h2 className='text-center'>Update Department</h2> : <h2 className='text-center'>Add Department</h2>
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Department Name:</label>
                <input
                  type='text'
                  placeholder='Enter Department Name'
                  name='departmentName'
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
                  name='departmentDescription'
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