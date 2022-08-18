import { db } from "../config/fire-config"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore"
import { useState, useEffect } from "react"
import { Nav } from "react-bootstrap"
import style from "./LeftSideComponent.module.css"

// Component renders list on currently logged in users in application
function LeftSideComponent() {
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
    <>
      <h4>Logged in users: {users.length}</h4>
      {users.length > 0 ? (
        <ul class={style.listGroup}>
          {users.map((user) => {
            return (
              <li key={user.id} className={style.listGroupItem}>
                {user.name}
              </li>
            )
          })}
        </ul>
      ) : (
        <p>No user online</p>
      )}
      <Nav
        className='col-md-12 d-none d-md-block bg-light sidebar'
        activeKey='/home'
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className='sidebar-sticky'></div>
        <Nav.Item>
          <Nav.Link href='/home'>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-1'>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-2'>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='disabled' disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}

export default LeftSideComponent
