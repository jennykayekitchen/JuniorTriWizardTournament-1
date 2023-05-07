import React from "react";
import { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { getCurrentUser, updateUserProfile } from "../modules/userProfileManager";
import { FavoriteSubject } from "./FavoriteSubject";

export const UserProfile = () => {
  const [user, setUser] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [editedAboutMe, setEditedAboutMe] = useState(user?.aboutMe)
  
  useEffect(() => {
    getCurrentUser()
      .then(userData => {
        setUser(userData)
      })
  }, [editMode])

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleAboutMeChange = (event) => {
    setEditedAboutMe(event.target.value)
  }

  const handleCancelEditClick = () => {
    setEditedAboutMe(user?.aboutMe)

    setEditMode(false);
  }

  const handleSaveChangesButtonClick = () => {
    const updatedAboutMe = {
      id: user.id,
      firebaseUserId: user.firebaseUserId,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      aboutMe: editedAboutMe,
    }

    updateUserProfile(updatedAboutMe)

    setEditMode(false)

  }

  return (
    <>
      <div>
        Name: {user.firstName} {user.lastName}
      </div>
      <div>
        Email: {user.emailAddress}
      </div>
      <div>
        School: {user?.school?.name}
      </div>
      <div>
        Total Points: {user?.totalPoints}
      </div>
      <div>
        {user.id && (

          <FavoriteSubject userId={user.id} />

        )}
      </div>
      {editMode ? (
        <>
          <div>
            About Me:{user?.aboutMe}
            <input type="text"
              value={editedAboutMe}
              onChange={handleAboutMeChange} />
          </div>
        </>
      )
        :
        <>
          <div>
            About Me:
            <div>
              {user.aboutMe}
            </div>
          </div>
        </>
      }
      {editMode ? (
        <>
          <div>
            <Button onClick={handleSaveChangesButtonClick}>Save Changes</Button>
            <Button onClick={handleCancelEditClick}>Cancel</Button>
          </div>
        </>
      )
        : (
          <>
            <div>
              <Button onClick={handleEditClick}>Edit About Me</Button>
            </div>
          </>
        )
      }


    </>
  )
}
