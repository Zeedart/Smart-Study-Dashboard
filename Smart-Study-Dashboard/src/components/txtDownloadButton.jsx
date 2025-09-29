import React from "react";

const txtDownloadButton = ({ data, filename, buttonClassName }) => {
  const downloadTxt = () => {
    const textContent = JSON.stringify(data, null, 2);


    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;

    a.download = filename ? (filename.endsWith('.txt') ? filename : filename + '.txt') : 'data.txt';


    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={downloadTxt} className={buttonClassName}>
      Download LOG
    </button>
  );
};

export default txtDownloadButton;