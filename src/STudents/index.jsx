import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setStudentlist } from './store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteStudent from '../DeleteStudent';

export default function ListStudents() {
    const { studentlist } = useSelector((state) => state.StudentSLice)
    const [show, setShow] = useState({ display: false, deleteid: null })
    const navigate= useNavigate()

    const dispatch = useDispatch()
    const getSTudentList = () => {
        axios.get('http://127.0.0.1:8000/list-atudent',)
            .then(async function (response) {
                if (response.data.message === "get") {
                    dispatch(setStudentlist(response.data.userlist))
                }
            })
            .catch(function (error) {

            });
    }
    console.log(studentlist)
    useEffect(() => {
        getSTudentList()
    }, [])

    const EditStudent = (id) => {
        navigate(`/create-student/${id}`)
    }

    const showDeleteUser = (id) => {
        setShow({ display: true, deleteid: id })
    }
    return (
        <div className='container pt-4'>
            <Card className='mt-4 p-4'>
                <h5 style={{display:"flex", justifyContent:"space-between"}}>Students List <Button onClick={()=>navigate("/create-student")}>Add Student</Button></h5>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>second Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentlist.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.secondName}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>

                                    <ButtonGroup aria-label="Basic example">
                                        <Button onClick={() => EditStudent(item.id)} variant="secondary"><i class="bi bi-pencil"></i></Button>
                                        <Button onClick={() => showDeleteUser(item.id)} variant="secondary"><i class="bi bi-trash"></i></Button>
                                    </ButtonGroup>

                                </td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </Card>

            <DeleteStudent show={show} setShow={setShow} />
        </div>
    )
}
