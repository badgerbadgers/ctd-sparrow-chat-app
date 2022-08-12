import { db } from "../config/fire-config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { useState } from "react"

// Component renders list on currently logged in users in application
function LeftSideComponent() {
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  const queryMessages = query(usersCollectionRef, orderBy("name"))

  // When user sign in on app, set user name and password on "users" collection. When user signs out remove user from "users" collection.
  onSnapshot(queryMessages, function (snapshot) {
    setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })

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
