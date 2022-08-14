import React from "react";
import Header from "../components/Header";

export default function About() {
  return (
    <div>
      <Header />
      <div className="about">
        <div className="about__main">
            <div className="about__txt"> <h1>About us</h1>
          <p>
            Marrisunni.com is a premium matrimonial website for Sunni community
            in Kerala. Our aim is to help Sunni community to find their suitable
            life partner in an Islamic way. We do not support anything that's
            not Halal in Islam so Marrisunni.com is not a dating portal at all.
            Only matured Muslim men and women with an intention of marriage are
            allowed to register at Marrisunni.com. <br />
            We are among the most trustworthy and technically advanced
            matrimonial portals. Marrisunni.com will make your matrimonial
            searches and online-match making a simple, easy and happy
            experience. No wonder as the number of memberships of Marrisunni.com
            is greatly increasing day by day.
          </p></div>
         
        </div>
      </div>
    </div>
  );
}
