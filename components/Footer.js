import Link from "next/link";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import BusinessIcon from "@material-ui/icons/Business";
// import CallIcon from "@material-ui/icons/Call";
// import MailIcon from "@material-ui/icons/Mail";
// import logo from "../public/images/home/logo.png";
import Image from "next/image";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BusinessIcon from '@mui/icons-material/Business';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function Footer() {
  return (
    <div className="footers">
      <div className="footer__contents ">
        <div className="footer__logo">
          {/* <Link href="/">
            <Image src={logo} />
          </Link> */}
        </div>
        <div className="footer__columns  lg:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__content grid grid-cols-1 lg:grid-cols-3">
          <div className="footer__bottom__content__left__div lg:col-span-2">
            <div className="footer__bottom__content__left  ">
              <div className="flex justify-center">
                <Link href="/Privacy">
                  <p>
                    Privacy policy <span>|</span>
                  </p>
                </Link>
                <Link href="/Terms">
                  <p>
                    Terms and conditions <span>|</span>
                  </p>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link href="/Pricing">
                  <p>
                    Pricing <span>|</span>
                  </p>
                </Link>
                <Link href="/Privacy">
                <p>Refund policy </p>
                </Link>
              </div>
            
            </div>
            <div className="footer__bottom__content__left lg:pt-2 ">
              <div className="flex justify-center">
                <Link href="/ ">
                  <p>
                    Support<span>|</span>
                  </p>
                </Link>
                 
              </div>
              <div className="flex justify-center">
                <Link href="/">
                  <p>Disclaimer </p>
                </Link>

                <p></p>
              </div>
            </div>
          </div>
          <div className="footer__bottom__content__right ">
            <div className="flex justify-center">
              <p>All rights reserved. </p>
            </div>

            <div className="flex ml-1 mt-1">
              <p>Developed by</p>
              {/* <FavoriteBorderIcon id="footer__favorite__icon" />   */}

           
              <a href="whatsapp://send?phone=+918606256402" data-action="share/whatsapp/share"  class="float"  >
              <p style={{textDecoration:'underline',cursor:'pointer'}} className="ml-2">
                
               
                booreact 
               
             </p>
  </a>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
}