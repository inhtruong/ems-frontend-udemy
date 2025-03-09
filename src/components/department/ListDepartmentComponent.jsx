import React, { useEffect, useState } from 'react'
import { getAllDepartments } from '../../services/DepartmentService';
import { Link } from 'react-router-dom';

const ListDepartmentComponent = () => {

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartment();
  }, [])

  const getAllDepartment = () => {
    getAllDepartments().then((response) => {
      console.log(response.data);
      setDepartments(response.data);
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
          </tr>
        </thead>
        <tbody>
          {
            departments.map(department =>
              <tr key={department.id}>
                <td scope="row">{department.id}</td>
                <td>{department.departmentName}</td>
                <td>{department.departmentDescription}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListDepartmentComponent