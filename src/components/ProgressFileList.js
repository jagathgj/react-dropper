import React, { useState, useRef, useEffect } from 'react';
import ProgressFile from './ProgressFile';

const ProgressFileList = ({
  initializeProgress,
  progressValue,
  totalFileSize,
  loadedFileSize,
  filesLength,
  allFilesArr,
}) => {
  return (
    <>
      {allFilesArr &&
        allFilesArr.map((file, idx) => {
          return (
            <ProgressFile
              key={idx}
              initializeProgress={initializeProgress}
              progressValue={progressValue}
              totalFileSize={totalFileSize}
              loadedFileSize={loadedFileSize}
              filesLength={filesLength}
              fileData={file}
            />
          );
        })}
    </>
  );
};

export default ProgressFileList;
