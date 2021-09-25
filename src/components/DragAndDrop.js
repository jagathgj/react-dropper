import React, { useState, useRef, useEffect } from 'react';

const DragAndDrop = ({ onHandleDrop, handleFiles }) => {
  const [drag, setDrag] = useState(false);
  const [dragCount, setDragCount] = useState(false);
  const dragAreaRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCount((prev) => {
      prev + 1;
    });
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCount((prev) => {
      prev - 1;
    });
    setDrag(false);
    if (dragCount === 0) {
      setDrag(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    onHandleDrop(e.dataTransfer.files);
    e.dataTransfer.clearData();
    setDragCount(0);
    // if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {

    // }
  };

  useEffect(() => {
    let dragArea = dragAreaRef.current;
    dragArea.addEventListener('dragenter', handleDragIn);
    dragArea.addEventListener('dragleave', handleDragOut);
    dragArea.addEventListener('dragover', handleDrag);
    dragArea.addEventListener('drop', handleDrop);
    return () => {
      dragArea.removeEventListener('dragenter', handleDragIn);
      dragArea.removeEventListener('dragleave', handleDragOut);
      dragArea.removeEventListener('dragover', handleDrag);
      dragArea.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div className="drop__box__area__wrapper">
      <div
        className={drag ? 'drop__box__area highlight' : 'drop__box__area'}
        ref={dragAreaRef}
      >
        <input
          className="drop__box__input"
          type="file"
          multiple
          onChange={() => handleFiles(e)}
        />
        <p className="drop__box__label">
          Drag your files here or{' '}
          <a className="drop__box__link" href="!#">
            browse
          </a>
          .
        </p>
        <p className="drop__box__label--sub">
          Supports PSD, AI, JPG, PNG, XLS, PDF, DOCX
        </p>
      </div>
    </div>
  );
};

export default DragAndDrop;
