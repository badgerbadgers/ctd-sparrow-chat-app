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
import { BsFillPeopleFill } from "react-icons/bs"
import { ThemeContext } from "../context.js"
import { useContext } from "react"

// Component renders list on currently logged in users in application
function LeftSideComponent({ name, ...props }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  const queryUsers = query(usersCollectionRef, orderBy("name"), limit(20))
  const { light, theme } = useContext(ThemeContext)

  const getUsers = () => {
    onSnapshot(queryUsers, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div
      className='side-bar'
      style={
        light
          ? { backgroundColor: theme.primary }
          : { backgroundColor: theme.primary }
      }
    >
      <div className='user-button'>
        <BsFillPeopleFill
          onClick={handleShow}
          className='me-2'
          variant='warning'
          size='lg'
          style={{
            color: "#2B2B2B",
          }}
        />
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        className='text-light'
        style={
          light
            ? { backgroundColor: theme.primary }
            : { backgroundColor: theme.primary }
        }
      >
        <Offcanvas.Header
          closeButton
          // className='bg-secondary'
          style={
            light
              ? { backgroundColor: theme.primary }
              : { backgroundColor: theme.primary }
          }
        >
          <Offcanvas.Title
            // className='bg-secondary'
            style={
              light ? { color: theme.secondary } : { color: theme.secondary }
            }
          >
            Users: {users.length}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          // className='bg-secondary'
          style={light ? { color: theme.color } : { color: theme.color }}
        >
          {users.length > 0 ? (
            <ul className='listGroup'>
              {users.map((user) => {
                return (
                  <li
                    key={user.id}
                    className='sidebar-text'
                    style={
                      light ? { color: theme.light } : { color: theme.light }
                    }
                  >
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
