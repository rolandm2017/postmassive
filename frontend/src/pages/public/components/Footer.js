import React from "react";

import "./Footer.css";

function Footer() {
    // stick it inside a <footer></footer> or a generic div, I just don't want the space consumed on the screen
    return (
        <div
            id="footer_general"
            className="footer_mobile-desktop-switch footer_mobile-hide-instead-of-flex footer_desktop-color"
        >
            <div className="darkmode-text">About</div>
            <div className="darkmode-text mobile-center">Help Center</div>
            <div className="darkmode-text mobile-right">Terms</div>
            <div className="darkmode-text">Privacy Policy</div>
            <div className="darkmode-text mobile-center">Cookies</div>
            <div className="darkmode-text mobile-right">Ads Info</div>
            <div className="darkmode-text">Blog</div>
            <div className="darkmode-text mobile-center">Status</div>
            <div className="darkmode-text mobile-right">Jobs</div>
            <div className="darkmode-text">Brand</div>
            <div className="darkmode-text mobile-center">Advertise</div>
            <div className="darkmode-text mobile-right">Settings</div>
        </div>
    );
}

export default Footer;
