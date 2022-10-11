import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../Containers/home/home'
import PlaceAd from '../Containers/placeAd/placeAd'
import Profile from '../Containers/profile/profile'
import Ad from '../Containers/ad/ad'

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/placeAd' component={PlaceAd} />
                <Route path='/ad' component={Ad} />
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return ({

    })
}
const mapDispatchToProps = (dispatch) => {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);