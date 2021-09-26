import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DragAndDrop from './components/DragAndDrop';
import ProgressFileList from './components/ProgressFileList';
import './style.scss';

export default function App() {
  const [filesLength, setFilesLength] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [totalFileSize, setTotalFileSize] = useState(0);
  const [loadedFileSize, setLoadedFileSize] = useState(0);
  const [filesDataList, setFilesDataList] = useState({});
  const [allFilesArr, setAllFilesArr] = useState([]);
  const [showError, setError] = useState('');
  let uploadProgress = [];

  const handleDrop = (e) => {
    handleFiles(e);
  };

  const initializeProgress = (numFiles) => {
    setProgressValue(0);
    for (let i = numFiles; i > 0; i--) {
      uploadProgress.push(0);
    }
  };

  const handleFiles = (upfiles) => {
    let allUpfiles = [...upfiles];
    setFilesLength(allUpfiles.length);
    initializeProgress(filesLength);
    uploadFile(allUpfiles);
  };

  const updateProgress = (fileNumber, percent) => {
    uploadProgress[fileNumber] = percent;
    let total =
      uploadProgress.reduce((tot, curr) => tot + curr, 0) /
      uploadProgress.length;
    setProgressValue(total);
  };

  const progressConfig = {
    onUploadProgress: (progressEvent) => {
      let percent = 0;
      const { loaded, total } = progressEvent;
      percent = Math.floor((loaded * 100) / total);
      setLoadedFileSize(loaded);
      setTotalFileSize(total);
      if (percent <= 100) {
        setProgressValue(percent);
      }
    },
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  };

  const uploadFile = async (files) => {
    let newArr = [];
    const fileUploaders = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `jagathj, ibm`);
      formData.append('upload_preset', 'pabbisu7');
      formData.append('api_key', '443377877541289');
      formData.append('timestamp', (Date.now() / 1000) | 0);

      try {
        await axios
          .post(
            'https://api.cloudinary.com/v1_1/jagathj/image/upload',
            formData,
            progressConfig
          )
          .then((response) => {
            const data = response.data;
            setFilesDataList(data);
            // const newItem = {
            //   itemData: data,
            // };
            newArr.push(data);
          })
          .catch((err) => {
            if (err.response.status === 400) {
              throw new Error('Wrong filetype');
            }
            throw err;
          });

        setAllFilesArr(newArr);
      } catch (err) {
        setError(err);
      }
    });

    axios.all(fileUploaders).then(() => {
      setFilesDataList([...allFilesArr]);
      console.log('success');
    });
  };

  return (
    <div className="app-wrapper">
      <div className="wrapper">
        <div className="drop__box">
          <h2 className="drop__box__title">Dropper</h2>
          <DragAndDrop
            onHandleDrop={handleDrop}
            onHandleFiles={() => handleFiles(ev)}
          />
          <div className="drop__box__list__wrapper">
            {allFilesArr.length !== 0 ? (
              <ProgressFileList
                initializeProgress={initializeProgress}
                progressValue={progressValue}
                totalFileSize={totalFileSize}
                loadedFileSize={loadedFileSize}
                filesLength={filesLength}
                allFilesArr={allFilesArr}
              />
            ) : (
              <div className="drop__box__error">
                {showError &&
                  'Invalid Filetype. Please upload valid filetypes mentioned above'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
