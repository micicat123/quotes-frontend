import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { User } from '../../../models/user';

function UploadImage(props: {handleData: Function, image:any, user:User, close:Function}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(props.image);	

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        setFile(file);
        setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
        formData.append('image', file);
    }   

    try {
      await axios.post(`uploads/${props.user.email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <div className='profile-settings'>
            <h4 className="profile-h4">Profile <span className="orange-text">settings</span></h4>
            <p>Change your profile photo</p>
            <img src={previewImage} alt="upload profile picture" width={65} height={65} className="uploaded-profile-image centered-image"/>

        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} id="files" style={{display:"none"}}/>
            <label htmlFor="files" className='button picture-upload-button'>Upload new image</label>
            <div className="flex-buttons">
              <input type="submit" value="Submit" className='submit-button-small popup-button'/>
              <p onClick={() => props.close("image")}>Cancel</p>
            </div>
        </form>
    </div>
  );
}

export default UploadImage;