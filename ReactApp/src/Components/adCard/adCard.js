import React from 'react';
import './adCard.css'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase/app'
import Firebase from '../../Config/firebase'

export default class AdCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgURL: ''
    }
  }
  componentDidMount() {
    let storageRef = firebase.storage().ref(`images/${this.props.ad.adKey}/0`);
    storageRef.getDownloadURL().then((url) => {
      console.log(url)
      this.setState({ imgURL: url })
    })

  }

  render() {
    return (
      <Link to={{
        pathname: '/ad',
        ad:this.props.ad,
      }}>
        <div className='adCard'>
          <div className="card" style={{ width: '18rem' }}>
            <div className='imgDiv'>
              <img src={this.state.imgURL} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <h4 className="card-title">Rs. {this.props.ad.price}</h4>
              <p className="card-text">
                {this.props.ad.title}
              </p>
              <small>{this.props.ad.location}</small>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};