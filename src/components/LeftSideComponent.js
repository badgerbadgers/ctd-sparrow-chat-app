// import { db } from "../config/fire-config"
// import { collection, getDocs } from "firebase/firestore"
// import { useState, useEffect } from "react"

const userList = [
  { id: 0, name: "user0" },
  { id: 1, name: "user1" },
  { id: 2, name: "user2" },
  { id: 3, name: "user3" },
  { id: 4, name: "user4" },
  { id: 5, name: "user5" },
]

function LeftSideComponent() {
  // const [users, setUsers] = useState([])

  // const usersCollectionRef = collection(db, "users")

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef)
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   }

  //   getUsers()
  // }, [])
  return (
    <>
      <ul>
        {userList.map((user) => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ul>
    </>
  )
}

export default LeftSideComponent
