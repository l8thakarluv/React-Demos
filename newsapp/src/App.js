import './App.css';
import React, { Component, useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { Route, Routes,  } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

// export default class App extends Component {
//   pageSize = 15;

//   state = {
//     progress: 0
//   }

//   apiKey = process.env.REACT_APP_NEWS_API_KEY;

//   setProgress = (progress) => {
//     this.setState({progress: progress})
//   }
  
//   render() {
//     return (
//       <div>
//         <Navbar />
//         <LoadingBar
//         height={3}
//         color='#f11946'
//         progress={this.state.progress}
//         />
//         <Routes>
//           <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
//           <Route path='/Business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={this.pageSize} country='in' category='business' />}></Route>
//           <Route path='/Entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} country='in' category='entertainment' />}></Route>
//           <Route path='/Health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={this.pageSize} country='in' category='health' />}></Route>
//           <Route path='/Science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageSize} country='in' category='science' />}></Route>
//           <Route path='/Sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country='in' category='sports' />}></Route>
//           <Route path='/Technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country='in' category='technology' />}></Route>
//         </Routes>
//       </div>
//     )
//   }
// }

// For Function Based Component

const App = () => {
  const pageSize = 15;

  const [progress, setProgress] = useState(0);

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const setProgressState = (progress) => {
    setProgress(progress);
  }
  
  // render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        />
        <Routes>
          <Route path='/' element={<News setProgress={setProgressState} apiKey={apiKey} key='general' pageSize={pageSize} country='in' category='general' />}></Route>
          <Route path='/Business' element={<News setProgress={setProgressState} apiKey={apiKey} key='business' pageSize={pageSize} country='in' category='business' />}></Route>
          <Route path='/Entertainment' element={<News setProgress={setProgressState} apiKey={apiKey} key='entertainment' pageSize={pageSize} country='in' category='entertainment' />}></Route>
          <Route path='/Health' element={<News setProgress={setProgressState} apiKey={apiKey} key='health' pageSize={pageSize} country='in' category='health' />}></Route>
          <Route path='/Science' element={<News setProgress={setProgressState} apiKey={apiKey} key='science' pageSize={pageSize} country='in' category='science' />}></Route>
          <Route path='/Sports' element={<News setProgress={setProgressState} apiKey={apiKey} key='sports' pageSize={pageSize} country='in' category='sports' />}></Route>
          <Route path='/Technology' element={<News setProgress={setProgressState} apiKey={apiKey} key='technology' pageSize={pageSize} country='in' category='technology' />}></Route>
        </Routes>
      </div>
    )
  // }
}

export default App;

