import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      image:"",
    }
  }

  submitImage = (e) => {
    e.preventDefault();
    const {image}  = this.state;
    if (image){
      // console.log(`Found the image${image}`);
      const formData = new FormData();
      formData.append('image', image)
      fetch(`http://localhost:3001/upload`, {
        method:'POST',
        body:formData
      })
      .then( res => {
        if (res.status === 200){
          res.json().then(resData => {
            console.log(resData.imageUrl)
          });
        } else{
          res.json().then(resData => {
            console.log(resData.message)
          });
        }
      }).catch( err => {
        console.log(err);
      });
    } else{
      console.log(`Image not found`)
    }
  }

  imageChangeHandler = (e) => {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    this.setState({
      image:e.target.files[0]
    })
    console.log(`Image URL is ${imageURL}`)

  }

  render(){
    return(
      <div>
        <h1>
          S3 Upload
        </h1>
        <form onSubmit={this.submitImage}>
          <input type="file" id="upload" onChange={this.imageChangeHandler}/>
          <button type="submit" >Submit</button>
        </form>
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
