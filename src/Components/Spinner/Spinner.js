import React from 'react';
import Loader from 'react-loader-spinner';
// import './Spinner.styles.css';


const Spinner = ({type, color, height, width}) => {
  return ( 
    <div className="page-loader-container">
      <Loader
          type={type}
          color={color}
          height={height}
          width={width}
      />
    </div>
  );
}
 
export default Spinner;