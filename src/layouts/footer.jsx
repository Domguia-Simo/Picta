import React from 'react'
import '../assets/css/headerFooterStyle/headerFooterStyles.css'

function Footer(){
    return(
        <React.Fragment>
            <div id="footer">
                <center>
                <span className='fas fa-camera'> Picta</span>  &nbsp;&nbsp;
                    <span className='fab fa-facebook'></span>&nbsp;&nbsp;
                    <span className='fab fa-google'></span>&nbsp;&nbsp;
                    <span className='fab fa-twitter'></span>&nbsp;&nbsp;
                    <span className='fab fa-instagram'></span>&nbsp;&nbsp;

                </center>
            </div>
        </React.Fragment>
    )
}

export default Footer