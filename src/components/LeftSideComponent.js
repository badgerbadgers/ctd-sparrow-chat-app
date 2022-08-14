import { db } from "../config/fire-config"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore"
import { useState, useEffect } from "react"

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
        <ul>
          {users.map((user) => {
            return <li key={user.id}>{user.name}</li>
          })}
        </ul>
      ) : (
        <p>No user online</p>
      )}
    </>
  )
}

export default LeftSideComponent
