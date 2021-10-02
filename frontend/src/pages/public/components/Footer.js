import React from "react";

import "./Footer.css";

function Footer() {
    // stick it inside a <footer></footer> or a generic div, I just don't want the space consumed on the screen
    return (
        <div className="justify-content-around flex-row flex-wrap footer_mobile-desktop-switch mobile-hide-instead-of-flex landing_footer-desktop-color ">
            <div className="darkmode-text">About</div>
            <div className="darkmode-text">Help Center</div>
            <div className="darkmode-text">Terms</div>
            <div className="darkmode-text">Privacy Policy</div>
            <div className="darkmode-text">Cookies</div>
            <div className="darkmode-text">Ads Info</div>
            <div className="darkmode-text">Blog</div>
            <div className="darkmode-text">Status</div>
            <div className="darkmode-text">Jobs</div>
            <div className="darkmode-text">Brand</div>
            <div className="darkmode-text">Advertise</div>
            <div className="darkmode-text">Settings</div>
        </div>
    );
}

export default Footer;
