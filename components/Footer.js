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
          {/* <div className="footer__adress">
            <div className="flex">
              <BusinessIcon id="footer__icon" />
              <div className="pl-2">
                <h5>CLEVERKINGS PVT LTD</h5>
                <h6>
                  {" "}
                  Thamburan Arcade, Medical College, <br /> Kozhikode, Kerala,
                  <br /> India - 673008
                </h6>
                <h5>CIN : U72900KL2016PTC047206</h5>
              </div>
            </div>
            <div className="flex footer__call">
              <CallIcon id="footer__icon" />
              <p>
                +91 9656 600 009 <br /> +91 8013 666 999{" "}
              </p>
            </div>
            <div className="flex footer__mail">
              <MailIcon id="footer__icon" />
              <p>info@cleverkings.com</p>
            </div>

            <div className="flex footer__input">
              <input placeholder="Subscribe our newsletter" />
              <span className="rounded-full">
                <ArrowForwardIcon id="footer__arrow" />
              </span>
            </div>
          </div> */}

          {/* <div className="footer__service mt-8 lg:mt-0">
            <div className="footer__service__div">
              <Link href="/web">
                <p>Web development</p>
              </Link>
              <Link href="/software">
                <p>Software development</p>
              </Link>
              <Link href="/app">
                <p>App development</p>
              </Link>
              <Link href="/game">
                <p>Game development</p>
              </Link>

         
              <Link href="/graphicdesign">
                <p>Graphic design</p>
              </Link>
              <Link href="/animation">
                <p>Animation</p>
              </Link>
              
            </div>
          </div> */}
          {/* <div className="footer__service">
            <div className="footer__service__div">
              <Link href="/digitalmarketing">
                <p>Digital marketing</p>
              </Link>
              <Link href="/branding">
                <p>Branding</p>
              </Link>
              <Link href="/seo">
                <p>SEO</p>
              </Link>
              <Link href="/smm">
                <p>SMM</p>
              </Link>
              <Link href="/emailmarketing">
                <p>Email marketing</p>
              </Link>

              <Link href="/influencer">
                <p>Influencer marketing</p>
              </Link>
            </div>
          </div>
          <div className="footer__service">
            <div className="footer__service__div">
              <Link href="/domain">
                <p>Domain</p>
              </Link>
              <Link href="/hosting">
                <p>Hosting</p>
              </Link>
              <Link href="/cloud">
                <p>Cloud computing</p>
              </Link>

              <Link href="/ai">
                <p>Artificial intelligence</p>
              </Link>
              <Link href="/web">
                <p>Robotics</p>
              </Link>
              <Link href="/b_consultancy">
                <p>Business consultancy</p>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__content grid grid-cols-1 lg:grid-cols-3">
          <div className="footer__bottom__content__left__div lg:col-span-2">
            <div className="footer__bottom__content__left  ">
              <div className="flex justify-center">
                <Link href="/privacyPolicy">
                  <p>
                    Privacy policy <span>|</span>
                  </p>
                </Link>
                <Link href="/terms">
                  <p>
                    Terms and conditions <span>|</span>
                  </p>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link href="/cookie">
                  <p>
                    Cookie policy <span>|</span>
                  </p>
                </Link>
                <Link href="/refund">
                <p>Refund policy </p>
                </Link>
              </div>
            
            </div>
            <div className="footer__bottom__content__left lg:pt-2 ">
              <div className="flex justify-center">
                <Link href="/support">
                  <p>
                    Support<span>|</span>
                  </p>
                </Link>
                <Link href="/amc">
                  <p>
                    Annual maintenance contract <span>|</span>
                  </p>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link href="/disclaimer">
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
              <p>Made with</p>
              <FavoriteBorderIcon id="footer__favorite__icon" />

              <p className="ml-2">
                Team{" "}
                <span>
                  <Link href="/ ">Cleverkings</Link>
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
}