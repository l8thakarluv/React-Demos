import React, { Component } from 'react';
import loading from '../assets/loading.gif';

// export default class Spinner extends Component {
const Spinner = () => {
  // render() {
    return (
      <div className='text-center'>
        <img src={loading} className='my-3' alt='loading' />
      </div>
    )
  // }
}

export default Spinner;
