import React from 'react';

const JsonDownloadButton = ({ data, filename, buttonClassName }) => {
  const downloadJson = () => {
    const jsonString = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'data.json';


    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  

  return (
    <button onClick={downloadJson} className={buttonClassName}>
      Download LOG
    </button>
  );
};

export default JsonDownloadButton;