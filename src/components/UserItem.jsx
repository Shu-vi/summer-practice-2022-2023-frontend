import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import ModalEditUser from "./ModalEditUser";

const UserItem = ({user, ...props}) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className='d-flex align-items-center'>
                    <div>
                        <h5>{user.username}</h5>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
                    <div className='ml-5'>
                        <p>Город: {user.city}</p>
                        <p>Район: {user.district}</p>
                    </div>
                    <p className='ml-5'>Статус: {user.role}</p>
                </div>
                <Button variant="primary" onClick={() => {setShow(true);}}>
                    Редактировать
                </Button>
            </div>
            <ModalEditUser user={user} show={show} setShow={setShow}/>
        </>
    );
};

export default UserItem;