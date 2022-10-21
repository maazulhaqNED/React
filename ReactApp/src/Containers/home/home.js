import React from 'react';
import './home.css'
import { connect } from 'react-redux'
import Header from '../../Components/header/header';
import Footer from '../../Components/footer/footer'
import AdCard from '../../Components/adCard/adCard'
import * as firebase from 'firebase/app'
import Firebase from '../../Config/firebase'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adslist: [],
            heading: ''
        }
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
            <div>
                <Header />
                <div className='adsDiv'>
                    <ul className='adsList'>
                        <small>All ads</small><hr />
                        {
                            this.state.adslist.map((ad, index) => {
                                if (this.props.selectedLoc != '' && this.props.selectedCategory != '') {
                                    if (Number(this.props.minPrice) != '' && Number(this.props.maxPrice) != '' && Number(this.props.maxPrice) > Number(this.props.minPrice)) {
                                        if (ad.location == this.props.selectedLoc && ad.category == this.props.selectedCategory && Number(ad.price) >= Number(this.props.minPrice) && Number(ad.price) <= Number(this.props.maxPrice)) {
                                            return (
                                                <li key={index}>
                                                    <AdCard ad={ad} />
                                                </li>
                                            );
                                        }
                                    }
                                    else {
                                        if (ad.location == this.props.selectedLoc && ad.category == this.props.selectedCategory) {
                                            return (
                                                <li key={index}>
                                                    <AdCard ad={ad} />
                                                </li>
                                            );
                                        }
                                    }
                                }
                                else if (this.props.selectedLoc != '' && this.props.selectedCategory == '') {
                                    if (Number(this.props.minPrice) != '' && Number(this.props.maxPrice) != '' && Number(this.props.maxPrice) > Number(this.props.minPrice)) {
                                        if (ad.location == this.props.selectedLoc && Number(ad.price) >= Number(this.props.minPrice) && Number(ad.price) <= Number(this.props.maxPrice)) {
                                            return (
                                                <li key={index}>
                                                    <AdCard ad={ad} />
                                                </li>
                                            );
                                        }
                                    }
                                    else {
                                        if (ad.location == this.props.selectedLoc) {
                                            return (
                                                <li key={index}>
                                                    <AdCard ad={ad} />
                                                </li>
                                            );
                                        }
                                    }
                                }
                                else if (this.props.selectedLoc == '' && this.props.selectedCategory != '') {
                                    if (Number(this.props.minPrice) != '' && Number(this.props.maxPrice) != '' && Number(this.props.maxPrice) > Number(this.props.minPrice)) {
                                        if (ad.category == this.props.selectedCategory && Number(ad.price) >= Number(this.props.minPrice) && Number(ad.price) <= Number(this.props.maxPrice)) {
                                            return (
                                                <li key={index}>
                                                    <AdCard ad={ad} />
                                                </li>
                                            );
                                        }
                                    }
                                    else {
                                        if (ad.category == this.props.selectedCategory) {
                                            return (
                                                <li key={index}>
                                                    <AdCard ad={ad} />
                                                </li>
                                            );
                                        }
                                    }
                                }
                                else {
                                    if (Number(this.props.minPrice) != '' && Number(this.props.maxPrice) != '' && Number(this.props.maxPrice) > Number(this.props.minPrice)) {
                                        if (Number(ad.price) >= Number(this.props.minPrice) && Number(ad.price) <= Number(this.props.maxPrice)) {

                                            return (
                                                <li key={index}>
                                                    <AdCard ad={ad} />
                                                </li>
                                            );
                                        }
                                    }
                                    else {
                                        return (
                                            <li key={index}>
                                                <AdCard ad={ad} />
                                            </li>
                                        );
                                    }
                                }
                            })
                        }
                    </ul>
                </div>
                <Footer />
            </div>)
    }

}

const mapStateToProps = (state) => {
    return ({
        selectedLoc: state.app.selectedLoc,
        selectedCategory: state.app.selectedCategory,
        minPrice: state.app.minPrice,
        maxPrice: state.app.maxPrice,

    })
}
const mapDispatchToProps = (dispatch) => {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);