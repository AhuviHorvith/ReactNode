import React from 'react';
import '../Css/Cube.css'
const Cube = () => {
  return (
    <div className="scene">
      <div className="cube">
        <div className="face front">טיולים</div>
        <div className="face back">חשמל</div>
        <div className="face right">מזון</div>
        <div className="face left">ביגוד</div>
        <div className="face top">ארנונה</div>
        <div className="face bottom">משכנתא</div>
      </div>
    </div>
  );
};

export default Cube;
