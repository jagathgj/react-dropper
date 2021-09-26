import React, { useState, useRef, useEffect } from 'react';
import {
  PsdIcons,
  AiIcons,
  PdfIcons,
  XlsIcons,
  DocIcons,
  PngIcons,
  JpgIcons,
  UnknownIcons,
} from './SvgIcons';

export const ProgressBar = ({ format, progressValue }) => {
  return (
    <div
      className={
        format === 'psd'
          ? 'progress__bar--bg progress__psd'
          : format === 'ai'
          ? 'progress__bar--bg progress__ai'
          : format === 'png'
          ? 'progress__bar--bg progress__png'
          : format === 'pdf'
          ? 'progress__bar--bg progress__pdf'
          : format === 'jpg'
          ? 'progress__bar--bg progress__jpg'
          : format === 'xls'
          ? 'progress__bar--bg progress__xls'
          : format === 'doc' || format === 'docx'
          ? 'progress__bar--bg progress__doc'
          : 'progress__bar--bg progress__unknown'
      }
    >
      <div
        className="progress__bar--fg"
        style={{ width: `${progressValue && progressValue}%` }}
      ></div>
    </div>
  );
};

const ProgressFile = ({
  initializeProgress,
  progressValue,
  totalFileSize,
  loadedFileSize,
  filesLength,
  fileData,
}) => {
  const [currentProgress, setCurrentProgress] = useState(progressValue);

  const { original_extension, format, byte, original_filename } = fileData;
  return (
    <>
      {fileData && fileData ? (
        <div className="file__list__wrapper">
          <div className="file">
            <div className="file__icon__wrapper">
              {format === 'psd' ? (
                <PsdIcons />
              ) : format === 'ai' ? (
                <AiIcons />
              ) : format === 'png' ? (
                <PngIcons />
              ) : format === 'pdf' ? (
                <PdfIcons />
              ) : format === 'jpg' ? (
                <JpgIcons />
              ) : format === 'xls' ? (
                <XlsIcons />
              ) : format === 'doc' || format === 'docx' ? (
                <DocIcons />
              ) : (
                <UnknownIcons />
              )}
            </div>
            <div className="file__data__wrapper">
              <div className="file__data">
                <div
                  className="file__name"
                  title={`${original_filename}.${format}`}
                >{`${original_filename}.${format}`}</div>
                <div className="file__size">{`${progressValue}%`}</div>
              </div>
              <div className="file__status">
                <ProgressBar
                  format={format}
                  progressValue={progressValue}
                ></ProgressBar>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ProgressFile;
