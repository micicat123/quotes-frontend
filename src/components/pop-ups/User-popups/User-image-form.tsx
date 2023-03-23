import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

function UploadImage(props: {handleData: Function}) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        setFile(file);
    }
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (file) {
        formData.append('image', file);
    }   

    try {
      await axios.post('uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='profile-settings'>
            <h4 className="profile-h4">Profile <span className="orange-text">settings</span></h4>
            <p>Change your profile photo</p>
            <img src="pictures/profile-photo.png" className='profile-photo-large' alt="" />

        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} id="files" style={{display:"none"}}/>
            <label htmlFor="files" className='signup-button button picture-upload-button'>Upload new image</label>
            <div className="name-surname flex-buttons">
              <input type="submit" value="Submit" className='submit-button-small'/>
            </div>
        </form>
    </div>
  );
}

export default UploadImage;