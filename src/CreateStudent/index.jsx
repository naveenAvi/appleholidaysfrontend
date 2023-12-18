import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addStudentToList, updateUser } from '../STudents/store';

export default function CreateStudent() {
    const [validated, setValidated] = useState(false);
    const [details, setdetails] = useState({})
    const [errors, seterrors] = useState("")
    const { userid } = useParams()
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        let haserrors = false
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stop
            haserrors = true
        }
        setValidated(true);
        if (!haserrors) {
            createstudent()
        }
    }

    const createstudent = () => {
        seterrors({ color: "red", message: "", show: false })
        axios.post('http://127.0.0.1:8000/create-atudent', details)
            .then(async function (response) {
                if (response.data.message === "added") {
                    seterrors({ color: "green", message: "student Created", show: true })
                    dispatch(addStudentToList(response.data.addeduser))
                } else if (response.data.message === "updated") {
                    seterrors({ color: "green", message: "student Updated!", show: true })
                    dispatch(updateUser(response.data.addeduser))

                }
            })
            .catch(function (error) {
                seterrors({ color: "red", message: error.response.data.message, show: true })
            });
    }
    const changeDetails = (e) => {
        seterrors({ color: "red", message: "", show: false })
        setdetails({ ...details, [e.currentTarget.name]: e.currentTarget.value })
    }

    const setEditUserDetails = () => {
        axios.post('http://127.0.0.1:8000/get-single-student', { userid })
            .then(async function (response) {
                if (response.data.message === "student-not-found") {
                    seterrors({ color: "red", message: "Student Not found", show: true })
                } else if (response.data.message === "get") {
                    seterrors({ color: "red", message: "", show: false })

                    setdetails(response.data.student)
                }
            })
            .catch(function (error) {
                seterrors({ color: "red", message: error.response.data.message, show: true })
            });
    }

    useEffect(() => {
        if (userid) {
            setEditUserDetails()
        }
    }, [])

    return (
        <div className='container mt-4' style={{ display: "flex", justifyContent: "center" }}>
            <div className='d-flex '>
                <Card className='p-4 align-items-center'>
                    <p style={{ textAlign: "center", color: errors.color }}>
                        {errors.message}
                    </p>
                    <h5 className='mb-4'>Create Student
                    
                    </h5>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6} sm={12} >
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control required type="text" name='firstName' value={details.firstName} onChange={changeDetails} placeholder="Enter first name" />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12} >
                                <Form.Group className="mb-3" controlId="secondName">
                                    <Form.Label>Second Name</Form.Label>
                                    <Form.Control required type="text" name='secondName' value={details.secondName} onChange={changeDetails} placeholder="Enter second Name" />

                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" name='email' onChange={changeDetails} value={details.email} placeholder="Enter email" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3}  required type="text" name='address' onChange={changeDetails} value={details.address} placeholder="Enter address" />

                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create Student
                        </Button>
                    </Form>
                </Card>

            </div>

        </div>
    )
}
