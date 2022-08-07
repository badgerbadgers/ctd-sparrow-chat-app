import { db } from "../config/fire-config"
import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"

function LeftSideComponent() {
  const [users, setUsers] = useState([])

  const usersCollectionRef = collection(db, "users")

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getUsers()
  }, [])

  return (
    <>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ul>
    </>
  )
}

export default LeftSideComponent
