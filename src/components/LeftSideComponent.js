import { db } from "../config/fire-config"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore"
import { useState, useEffect } from "react"
import "./LeftSideComponent.css"
import Offcanvas from "react-bootstrap/Offcanvas"
import Button from "react-bootstrap/Button"

// Component renders list on currently logged in users in application
function LeftSideComponent({ name, ...props }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  const queryUsers = query(usersCollectionRef, orderBy("name"), limit(20))

  const getUsers = () => {
    onSnapshot(queryUsers, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <Button onClick={handleShow} className='me-2' variant='warning' size='lg'>
        Users
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        className='text-light'
      >
        <Offcanvas.Header closeButton className='bg-secondary'>
          <Offcanvas.Title className='bg-secondary'>
            Users: {users.length}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='bg-secondary'>
          {users.length > 0 ? (
            <ul className='listGroup'>
              {users.map((user) => {
                return (
                  <li key={user.id} className='listGroupItem'>
                    {user.name}
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>No user online</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default LeftSideComponent
