import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';

const Shop = () => {
    // here state.amount coming from reducers/index.js
    const balance = useSelector(state => state.amount);
    const dispatch = useDispatch();
    // const actions = bindActionCreators(actionCreators, dispatch);

    const { withdrawMoney, depositMoney } = bindActionCreators(actionCreators, dispatch);

  return (
    <div>
        <h2>Buy aesthetic ayurveda soaps</h2>

        {/* Without 'bindActionCreators' */}
        {/* <button className='btn btn-primary mx-1' onClick={() => dispatch(actionCreators.withdrawMoney(1))}>-</button>
            Update
        <button className='btn btn-primary mx-1' onClick={() => dispatch(actionCreators.depositMoney(1))}>+</button> */}

        {/* With 'bindActionCreators' */}
        {/* <button className='btn btn-primary mx-1' onClick={() => actions.withdrawMoney(1)}>-</button>
            Update
        <button className='btn btn-primary mx-1' onClick={() => actions.depositMoney(1)}>+</button> */}

        With 'bindActionCreators' - destructured in variables
        <button className='btn btn-primary mx-1' onClick={() => withdrawMoney(1)}>-</button>
            Updated balance: {balance}
        <button className='btn btn-primary mx-1' onClick={() => depositMoney(1)}>+</button>

    </div>
  )
}

export default Shop