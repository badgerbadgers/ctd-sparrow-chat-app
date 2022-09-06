import {
  addDoc,
  collection,
  serverTimestamp,
  getFirestore,
  getUserName,
  LOADING_IMAGE_URL,
  getProfilePicUrl,
  getAuth,
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  updateDoc,
} from "firebase/firestore"

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
export async function saveImageMessage(file) {
  try {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    const messageRef = await addDoc(collection(getFirestore(), "messages"), {
      name: getUserName(),
      imageUrl: LOADING_IMAGE_URL,
      profilePicUrl: getProfilePicUrl(),
      timestamp: serverTimestamp(),
    })

    // 2 - Upload the image to Cloud Storage.
    const filePath = `${getAuth().currentUser.uid}/${messageRef.id}/${
      file.name
    }`
    const newImageRef = ref(getStorage(), filePath)
    const fileSnapshot = await uploadBytesResumable(newImageRef, file)

    // 3 - Generate a public URL for the file.
    const publicImageUrl = await getDownloadURL(newImageRef)

    // 4 - Update the chat message placeholder with the image's URL.
    await updateDoc(messageRef, {
      imageUrl: publicImageUrl,
      storageUri: fileSnapshot.metadata.fullPath,
    })
  } catch (error) {
    console.error(
      "There was an error uploading a file to Cloud Storage:",
      error
    )
  }
}
