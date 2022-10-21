import React from 'react';
import './placeAd.css'
import { connect } from 'react-redux'
import Logo from '../../assets/images/OLX.gif'
import { Link } from 'react-router-dom'
import UploadPhoto from '../../Components/uploadPhoto/uploadPhoto'
import { PostAdd } from '@material-ui/icons';
import * as firebase from 'firebase/app';
import Firebase from '../../Config/firebase'

class PlaceAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            title: '',
            description: '',
            price: '',
            location: '',
            phone: '',
            name: props.userName,
            uid: props.uid,
            adKey: '',
            alert: '',
            photo: ['', '', '', ''],
        }
    }

    setPhoto = (e, index) => {
        let bucketName = 'images';
        let file = e.target.files[0];
        let storageRef = firebase.storage().ref(`${bucketName}/${this.state.adKey}/${index}`);
        let uploadTask = storageRef.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
                let downloadURL = uploadTask.snapshot.downloadURL;
                this.state.photo[index] = 'uploaded'
                this.setState({
                })
            })
        // storageRef.getDownloadURL().then((url)=>{
        //     console.log(url)
        //     this.state.photo[index]=url
        //     this.setState({})
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })

        // this.state.photo[index] = URL.createObjectURL(e.target.files[0]);
        // this.setState({});
        // console.log(URL.createObjectURL(e.target.files[0]));
    }
    postAd = () => {
        if (this.state.category === '' || this.state.title === '' || this.state.description === '' || this.state.price === '' || this.state.phone === '' || this.state.location === '' || this.state.photo[0]==='') {
            this.setState({
                alert: 'Please fill all required fields!'
            })
        }
        else {
            this.setState({
                alert: 'Posted !',
            })
            let reference = `Ad/${this.state.adKey}`
            console.log(this.state.adKey);
            firebase.database().ref(reference).set(this.state)
            this.refresh();
        }
    }
    refresh = () => {
        this.setState({
            category: '',
            title: '',
            description: '',
            price: '',
            photo: ['', '', '', ''],
            location: '',
            phone: '',
            adKey: firebase.database().ref('Ad').push().key,
            photo: ['', '', '', ''],
        })
    }
    componentDidMount() {
        this.setState({
            adKey: firebase.database().ref('Ad').push().key,
        })
    }

    render() {
        // console.log(this.state);
        let photoIndex = [0, 1, 2, 3]
        return (
            <div>
                {/* Place Ad NavBar */}
                <nav className="navbar sticky-top navbar-light bg-light placeAdNav">
                    <Link className="navbar-brand" to={'/'}>
                        <img src={Logo} alt="" loading="lazy" />
                    </Link>
                    <h6><b>POST YOUR AD</b></h6>
                </nav>
                <p className="divider"></p>

                {/* Place Ad Form */}

                {
                    this.props.loginStatus === true
                        ?
                        <div className='placeAdForm'>

                            {/* Choose category */}

                            <div>
                                <h6>Choose category</h6>
                                <div className="dropdown">
                                    <a className="btn btn-dark dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.category === "" ? 'Select Category' : this.state.category}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {
                                            this.props.allCategories.map((v, i) => {
                                                return (
                                                    <a className="dropdown-item" onClick={() => { this.setState({ category: v }) }} key={i}>{v}</a>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <br /><hr /><br />

                            {/* title, description and price */}

                            <form>
                                <div className="form-group">
                                    <label htmlFor="productTitle"><h6>Add title</h6></label>
                                    <input onChange={(e) => { this.setState({ title: e.target.value }) }}
                                       maxLength='70' value={this.state.title} type="text" className="form-control" id="productTitle" />
                                    <small>Mention the key features of your item (e.g. brand, model, age, type)</small>

                                </div><br />

                                <div className="form-group">
                                    <label htmlFor="productDescription"><h6>Description</h6></label>
                                    <textarea onChange={(e) => { this.setState({ description: e.target.value }) }}
                                      maxLength='4096' value={this.state.description} className="form-control" id="productDescription" rows="3"></textarea>
                                    <small>Include condition, features and reason for selling</small>
                                </div><br />

                                <h6>Set a price</h6>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Rs</span>
                                    </div>
                                    <input onChange={(e) => { this.setState({ price: e.target.value }) }}
                                        value={this.state.price} type="number" className="form-control" aria-describedby="basic-addon1" />
                                </div>
                            </form>

                            <br /><hr /><br />

                            {/* Upload Photo */}

                            <h5>Upload Photo</h5><br />
                            {
                                photoIndex.map((value, index) => {
                                    return (
                                        <span key={index}>
                                            <p><input type="file" accept="image/*" name="image" id={`file${index}`} onChange={(e) => { this.setPhoto(e, index) }} style={{ display: 'none' }} /></p>
                                            {
                                                this.state.photo[index] === ''
                                                    ?
                                                    <label htmlFor={`file${index}`} style={{ cursor: 'pointer' }}><UploadPhoto /></label>
                                                    :
                                                    <small>Uploaded</small>
                                            }
                                        </span>
                                    )
                                })
                            }


                            {/* <UploadPhoto />
                            <UploadPhoto />
                            <UploadPhoto /> */}

                            <br /><hr /><br />

                            <h5>Your Deatails</h5><br />

                            {/* Name & Phone */}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name"><h6>Name</h6></label>
                                    <input value={this.props.userName} readOnly
                                        type="text" className="form-control" id="name" />
                                </div><br />

                                <h6>Mobile Phone Number</h6>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">+92</span>
                                    </div>
                                    <input type='tel' onChange={(e) => { this.setState({ phone: e.target.value }) }}
                                        placeholder="300-1234567" pattern="[0-9]{3}-[0-9]{7}"
                                        value={this.state.phone} className="form-control" aria-describedby="basic-addon1" />
                                </div><br />
                            </form>

                            {/* Your Location */}

                            <div>
                                <h6>Your location</h6>
                                <div className="dropdown">
                                    <a className="btn btn-dark dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.location === '' ? 'Your Location' : this.state.location}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {
                                            this.props.locations.map((v, i) => {
                                                return (
                                                    <a className="dropdown-item" onClick={() => { this.setState({ location: v.location }) }} key={i}>{v.location}</a>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div><br /><hr />

                            {
                                this.state.alert === '' ? <div></div> :
                                    <div className="alert alert-danger" role="alert">{this.state.alert}</div>
                            }


                            <button type="button" className="btn btn-info postAdBtn" onClick={() => { this.postAd() }}><b>POST AD</b></button><br />



                        </div>
                        :
                        <div className='alertTriangle'>
                            <svg width="5.3125em" height="5em" viewBox="0 0 17 16" class="bi bi-exclamation-triangle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                            </svg>
                            <h6>Sorry, you are not allowed to access this page. Login First!</h6>
                        </div>
                }

                <nav className="navbar navbar-light copyrightFooter">
                    <div className='row'>
                        <p className='col'><b>Other Countries</b> India - South Africa - Indonesia</p>
                        <p className='col'><b>Free Classifieds in Pakistan.</b> © 2006-2020 OLX</p>
                    </div>
                </nav>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        loginStatus: state.app.loginStatus,
        uid: state.app.uid,
        userName: state.app.userName,
        photoURL: state.app.photoURL,
        allCategories: state.app.allCategories,
        locations: state.app.locations
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceAd);