import React from 'react';
import './profile.css'
import { connect } from 'react-redux'
import Header from '../../Components/header/header'
import Footer from '../../Components/footer/footer'
import NoAd from '../../assets/images/NoAd.png'
import { Link } from 'react-router-dom'

import AdCard from '../../Components/adCard/adCard'
import * as firebase from 'firebase/app'
import Firebase from '../../Config/firebase'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { adslist: [] }
    }
    componentDidMount() {
        firebase.database().ref("Ad").on("value", (snapshot) => {
            let adslist = [];
            snapshot.forEach((snap) => {
                adslist.push(snap.val());
            });
            this.setState({ adslist: adslist });
        });
    }

    render() {
        return (
            <div className='profile'>
                <Header />
                {
                    this.props.loginStatus === true
                        ?
                        <div className='row'>
                            <div className='col col-md-3 col-sm-12'>
                                <img className='profilePic' src={this.props.photoURL + '?type=large'}></img>
                            </div>
                            <div className='col col-md-9 col-sm-12'>
                                <h1 className='userName'>{this.props.userName}</h1>
                                <hr />

                                <div className='adsDiv'>
                                    <ul className='adsList'>
                                        <small><b>Your Ads</b></small><hr />
                                        {
                                                this.state.adslist.map((ad, index) => {
                                                    if (ad.uid == this.props.uid) {
                                                        return (
                                                            <li key={index}>
                                                                <AdCard ad={ad} />
                                                            </li>
                                                        );
                                                    }
                                                })

                                            
                                        }
                                    </ul>
                                </div>

                                <button type="button" className="btn btn-info startSellingBtn">
                                    <Link to={'/placeAd'}>
                                        <b style={{ color: 'white' }}>Start selling</b>
                                    </Link>
                                </button>
                            </div>

                        </div>
                        :
                        <div>
                            <div className='alertTriangle'>
                                <svg width="5.3125em" height="5em" viewBox="0 0 17 16" class="bi bi-exclamation-triangle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                                </svg>
                                <h6>Sorry, you are not allowed to access this page. Login First!</h6>
                            </div>
                        </div>
                }
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        loginStatus: state.app.loginStatus,
        uid: state.app.uid,
        userName: state.app.userName,
        photoURL: state.app.photoURL
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);