import React, { useEffect, useState } from 'react'
import { getAllDepartments, deleteDepartmentById } from '../../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';

const ListDepartmentComponent = () => {

  const [departments, setDepartments] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllDepartment();
  }, [])

  const getAllDepartment = () => {
    getAllDepartments().then((response) => {
      setDepartments(response.data);
    }).catch(e => {
      console.error(e);
    })
  }

  const updateDepartment = (departmentId) => {
    navigator(`/edit-department/${departmentId}`)
  }

  const deleteDepartment = (departmentId) => {
    deleteDepartmentById(departmentId).then(() => {
      alert('Delete Department Success!');
      getAllDepartment();
    }).catch(e => {
      console.error(e);
    })
  }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Department</h2>
      <Link to="/add-department" className='btn btn-primary mb-2'>Add Department</Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Department Id</th>
            <th scope="col">Department Name</th>
            <th scope="col">Department Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            departments.map(department =>
              <tr key={department.id}>
                <td scope="row">{department.id}</td>
                <td>{department.departmentName}</td>
                <td>{department.departmentDescription}</td>
                <td>
                  <button className="btn btn-info" onClick={() => updateDepartment(department.id)}>Update</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteDepartment(department.id)}
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

export default ListDepartmentComponent