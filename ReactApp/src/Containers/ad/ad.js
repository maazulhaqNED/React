import React from 'react';
import './ad.css'
import { connect } from 'react-redux'
import Header from '../../Components/header/header'
import Footer from '../../Components/footer/footer'
import PersonIcon from '../../Components/icons/personIcon'
import PhoneIcon from '../../Components/icons/phoneIcon'
import * as firebase from 'firebase/app'
import Firebase from '../../Config/firebase'


class Ad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          imgURLs: ['', '', '', '']
        }
      }
      componentDidMount() {
        for (let i = 0; i < 4; i++) {
          let storageRef = firebase.storage().ref(`images/${this.props.location.ad.adKey}/${i}`);
          storageRef.getDownloadURL().then((url) => {
            this.state.imgURLs[i] = url;
            this.setState({})
          })
        }
      }
    
    render() {
        return (
            <div>
                <Header />
                <div className='row ad'>

                    {/* Col 1 */}
                    <div className='col col-md-6 col-sm-12'>
                        {/* Images */}
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={this.state.imgURLs[0]} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={this.state.imgURLs[1]} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={this.state.imgURLs[2]} alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={this.state.imgURLs[3]} alt="..." />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

                        {/*Description  */}

                        <div className="descCard card">

                            <div className="card-body">
                                <p className="card-text"><b>Description</b></p><hr />
                                <small>{this.props.location.ad.description}</small>
                            </div>

                        </div>

                    </div>

                    {/* Col 2 */}
                    <div className='col col-md-4 col-sm-12'>

                        {/*Price , Title & Location  */}
                        <div className="priceCard card" style={{ width: '25rem' }}>

                            <div className="card-body">
                                <h4 className="card-title">Rs. {this.props.location.ad.price}</h4>
                                <p className="card-text">{this.props.location.ad.title}
                                </p>
                                <small>{this.props.location.ad.location}</small>
                            </div>

                        </div>

                        {/*Seller Details  */}
                        <div className="sellerCard card" style={{ width: '25rem' }}>

                            <div className="card-body">
                                <p className="card-text"><b>Seller description</b></p><hr />
                                <PersonIcon />
                                <h6 className="card-title">{this.props.location.ad.name}</h6><br />
                                <PhoneIcon />
                                <h6 className="card-title">+92{this.props.location.ad.phone}</h6>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        loginStatus: state.app.loginStatus,
        userName: state.app.userName,
        photoURL: state.app.photoURL
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Ad);