import React from 'react';
import './footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className='footer'>
                <nav className="navbar navbar-light bg-light">
                    <div className='row'>
                        <div className='col'>
                            <h6><b>POPULAR CATEGORIES</b></h6>
                            <a href='/'>Cars</a>
                            <a href='/'>Flats for rent</a>
                            <a href='/'>Jobs</a>
                            <a href='/'>Mobile Phones</a>
                        </div>
                        <div className='col'>
                            <h6><b>TRENDING SEARCHES</b></h6>
                            <a href='/'>Bikes</a>
                            <a href='/'>Watches</a>
                            <a href='/'>Books</a>
                            <a href='/'>Dogs</a>
                        </div>
                        <div className='col'>
                            <h6><b>ABOUT US</b></h6>
                            <a href='/'>About</a>
                            <a href='/'>OLX Group</a>
                            <a href='/'>OLX Blog</a>
                            <a href='/'>Contact Us</a>
                            <a href='/'>OLX for Businesses</a>

                        </div>
                        <div className='col'>
                            <h6><b>OLX</b></h6>
                            <a href='/'>Help</a>
                            <a href='/'>Sitemap</a>
                            <a href='/'>Legal &#38; Privacy information</a>

                        </div>
                        <div className='col'>
                            <h6><b>FOLLOW US</b></h6>
                        </div>
                    </div>
                </nav>
                <nav className="navbar navbar-light copyrightFooter">
                    <div className='row'>
                        <p className='col'><b>Other Countries</b> India - South Africa - Indonesia</p>                        
                        <p className='col'><b>Free Classifieds in Pakistan.</b> © 2006-2020 OLX</p>
                    </div>
                </nav>

            </div>
        );
    }
}

export default Footer;