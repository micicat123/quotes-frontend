import axios from "axios";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Footer = () => {

    return(
        <div className="footer">
             <img src="/pictures/quote-icon.png" alt="logo" className="quote-icon" />
             <p className="footer-text">All Rights Reserved | skillupmentor.com</p>
        </div>    
    )
}

export default Footer;