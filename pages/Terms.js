import React from "react";
import Header from "../components/Header";
import AdjustIcon from "@mui/icons-material/Adjust";
export default function Terms() {
  return (
    <div>
      <Header />
      <div className="terms">
        <div className="terms__main">
          <h2>TERMS & CONDITION</h2>
           
           
          <div className="terms__row flex">
            <AdjustIcon className="term__icon" />
            <p>To become a member of this website and to be able to communicate with fellow members, you must register as a member and follow the instructions given during the Registration process</p>
          </div>
          <div className="terms__row flex">
            <AdjustIcon className="term__icon" />
            <p>Pursuant to such changes, if you continue to use the site then it will be constituted as your acceptance for the changes</p>
          </div>
          <div className="terms__row flex">
            <AdjustIcon className="term__icon" />
            <p>The marrysunni.com site is only to facilitate personal advertisement for lawful marriage alliance between persons who are legally competent to enter into matrimony under the laws to which they are subject.</p>
          </div>
          <div className="terms__row flex">
            <AdjustIcon className="term__icon" />
            <p>You acknowledge and confirm that your registration with marrysunni.com and the usage of marrysunni.com services is with the intention of marriage and not otherwise, marrysunni.com Membership is restricted strictly to the registered marrysunni.com individual member only.</p>
          </div>
          <div className="terms__row flex">
            <AdjustIcon className="term__icon" />
            <p>Marrysunni.com uses third party payment gateways for collection payment through credit/debit cards or other payment instruments.</p>
            </div>
            <div className="terms__row flex">
            <AdjustIcon className="term__icon" />
            <p>In case of Males, there is an age bar to contact others profile. You can only view contacts to members who are 15 years younger than you. If they accept your interest, you can contact that person but if they decline your interest, you won`t be able to contact them</p>
            </div>
            <div className="terms__row flex">
            <AdjustIcon className="term__icon" />
            <p>In case of Females, you have an age limit to contact others profiles. This means the candidate can only view contacts to members who are 15 years older than you. If they accept your interest you can contact them, but if they decline your interest, you won`t be able to contact them.</p>
            </div>
             
        </div>
      </div>
    </div>
  );
}
