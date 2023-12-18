import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { deleteSTudentAction } from '../STudents/store';

export default function DeleteStudent({show, setShow}) {
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)


    const deleteStudent = () =>{
        setloading(true)
        axios.post('http://127.0.0.1:8000/delete-single-student', {userid: show.deleteid})
        .then(async function (response) {
            setloading(false)
            if (response.data.message === "student-delteed") {
                dispatch(deleteSTudentAction(show.deleteid))
                setShow({ display: false, deleteid: null })
            }
        })
        .catch(function (error) {
            setloading(false)

        });
    }
    return (
        <Modal
            show={show.display}
            onHide={() => setShow({ display: false, deleteid: null })}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >

                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you really want to delete Student</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="danger" onClick={()=>deleteStudent()}>
                    
                    {loading ? 'Loading…' : 'Confirm'}
                        </Button>
                </Modal.Footer>
        </Modal>
    )
}
