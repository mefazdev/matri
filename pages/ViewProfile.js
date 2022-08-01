import React from "react";
import AccountSidebar from "../components/AccountSidebar";
import AccountNav from "../components/AccountNav";
import PlaceIcon from "@mui/icons-material/Place";
import imageHolder from "../asset/image/photo-holder.png";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function ViewProfile() {
  return (
    <div className="view">
      <AccountNav />
      <div className="view__content flex">
        <AccountSidebar />

        <div className="view__right">
          <div className="view__head flex">
            <div className="flex view__head__left ">
              <h6>FASEEH SHAH</h6>
              <p>(WR34434)</p>
            </div>

            <div className="view__head__right flex">
              <PlaceIcon id="view__loc__icon" />
              <p>Manjeri, Malappuram</p>
            </div>
          </div>

          <div className="view__main grid md:grid-cols-3">
            <div className="view__main__img">
              <Image alt="" src={imageHolder} />
            </div>
            <div className="md:col-span-2 view__main__right">
              <div className="view__main__first__row  flex">
                <PersonIcon className="view__main__icons" id='view__peron' />
                <p>19 yrs, 148 cm, Never Married</p>
              </div>
              <div className="view__main__first__row flex ">
                <SettingsAccessibilityIcon
                id='sett__icon'
                className="view__main__icons"/>
                <p>App Sunni</p>
              </div>
              <div className="view__main__first__row flex ">
                <AutoAwesomeIcon className="view__main__icons"
                id='auto__icon'
                />
                <p>Never Married</p>
              </div>
              <div className="view__main__first__row flex ">
                <SchoolIcon className="view__main__icons"
                id='school__icon'
                />
                <p>BA English</p>
              </div>
              <div className="view__main__first__row flex ">
                <PlaceIcon id='place__icon' className="view__main__icons"/>
                <p>Manjeri, Malappuram</p>
              </div>


              <div className="view__like">
                  <h6>Like this member?</h6>
                  <p>If you are interested in this profile, please send an Interest to this person.</p>
              <button >EXPRESS INTEREST
                <FavoriteIcon id='view__fav__icon'/>
                 </button>

                 <h5>
Contact this member directly through Mobile, E-mail and Wahtsapp. 
{/* and Chat by upgrading your membership. Upgrade Now */}
</h5>
              </div>
            </div>
          </div>

          <div className="view__desc">
            <h6> Description</h6>
            <p>He is currently studying in BCOM (Tax) at National college. We are a nuclear family. My family consists Father mother and daughter .</p>
          </div>

          <div className="view__desc">
            <h6>Location & Contact</h6>
           <div className="view__loc__row  ">
             
            <h5>Cherukulam, Manjeri</h5>
             
            <h5>Malappuram</h5>
            <h5>Kerala</h5>
            <h5>Elankur (PO)</h5>

            <p>Phone: 8738585858</p>
            <p>Secondary No : 54343435554</p>
            <p>Whatsapp : 43429858344</p>
           </div>
          </div>

          <div className="view__desc">
            <h6>Basic Information</h6>
            <div className="view__desc__columns grid grid-cols-2">
            <div>
                <div className="flex mt-1"><p>Name : </p>
                 <h5 className="ml-2">Falleh</h5>
                </div>
                <div className="flex  "><p>Age : </p>
                 <h5 className="ml-2">20</h5>
                </div>
                <div className="flex  "><p>Maritial Status : </p>
                 <h5 className="ml-2">Never Married</h5>
                </div>
                <div className="flex mt-1"><p>Marriage Plan : </p>
                 <h5 className="ml-2">Soon</h5>
                </div>
                <div className="flex mt-1"><p>Physical Status : </p>
                 <h5 className="ml-2">Normal</h5>
                </div>

                
            </div>
            <div>
            <div className="flex mt-1"><p>Profile ID : </p>
                 <h5 className="ml-2">D343455</h5>
                </div>
                <div className="flex  "><p>Gender : </p>
                 <h5 className="ml-2">20</h5>
                </div>
                <div className="flex  "><p>Profile created by : </p>
                 <h5 className="ml-2">Father</h5>
                </div>
                <div className="flex mt-1"><p>Languages known : </p>
                 <h5 className="ml-2">English, Malayalam</h5>
                </div>
                <div className="flex mt-1"><p>Physical Status : </p>
                 <h5 className="ml-2">Normal</h5>
                </div>
            </div>
            </div>
          </div>

          <div className="view__desc">
            <h6> Religious Information</h6>
            <div className="view__desc__columns grid grid-cols-2">
            <div>
                <div className="flex mt-1"><p>Groupe : </p>
                 <h5 className="ml-2">AP Sunni</h5>
                </div>
                <div className="flex  "><p>Perform Namaz : </p>
                 <h5 className="ml-2">Always</h5>

                </div>
                <div className="flex  "><p>Madhab : </p>
                 <h5 className="ml-2">Shafi</h5>
                 
                </div>
                 

                
            </div>
            <div>
            
                <div className="flex  "><p>Religious Education : </p>
                 <h5 className="ml-2">Scholar</h5>
                </div>
                <div className="flex mt-1"><p>Religiousness : </p>
                 <h5 className="ml-2">Religious</h5>
                </div>
                <div className="flex mt-1"><p>Hijab : </p>
                 <h5 className="ml-2">Prefer Hijab</h5>
                </div>
            </div>
            </div>
          </div>

          <div className="view__desc">
            <h6> Educational & Professional Information</h6>
            <div className="view__desc__columns grid grid-cols-2">
            <div>
                <div className="flex mt-1"><p>Education : </p>
                 <h5 className="ml-2">Bachlors(Bcom)</h5>
                </div>
                <div className="flex  "><p>Edu Details : </p>
                 <h5 className="ml-2">Bcom Tax(1st year)</h5>

                </div>
                
                 

                
            </div>
            <div>
            
                <div className="flex  "><p>Profession : </p>
                 <h5 className="ml-2">Student</h5>
                </div>
                <div className="flex  "><p>Professional type : </p>
                 <h5 className="ml-2">Student</h5>
                 
                </div>
            </div>
            </div>
          </div>

          <div className="view__desc">
            <h6>Physical Attributes</h6>
            <div className="view__desc__columns grid grid-cols-2">
            <div>
                <div className="flex mt-1"><p>Height : </p>
                 <h5 className="ml-2">150 cm</h5>
                </div>
                <div className="flex  "><p>Weight : </p>
                 <h5 className="ml-2">45 kgs</h5>

                </div>
                
                 
                <div className="flex  "><p>Complexion : </p>
                 <h5 className="ml-2">Fair</h5>
                </div>
                
            </div>
            <div>
            
                
                <div className="flex  "><p>Body type : </p>
                 <h5 className="ml-2">Average</h5>
                 
                </div>
                <div className="flex  "><p>Hair Color : </p>
                 <h5 className="ml-2">Black</h5>
                 
                </div>
            </div>
            </div>
          </div>

          <div className="view__desc">
            <h6>Family Details</h6>
            <div className="view__desc__columns grid grid-cols-2">
            <div>
                <div className="flex mt-1"><p>Family Type : </p>
                 <h5 className="ml-2">Nuclear Family</h5>
                </div>
                <div className="flex  "><p>Financial Status : </p>
                 <h5 className="ml-2">Middle Class</h5>

                </div>
                
                 
                
                <div className="flex  "><p>Living Situation : </p>
                 <h5 className="ml-2">Live with family</h5>
                 
                </div>
                <div className="flex  "><p>No of younger brother : </p>
                 <h5 className="ml-2">2</h5>
                 
                </div>
                <div className="flex  "><p>No of younger sister : </p>
                 <h5 className="ml-2">2</h5>
                 
                </div>
            </div>
            <div>
            <div className="flex  "><p>Father : </p>
                 <h5 className="ml-2">Alive(Enginner)</h5>
                </div>
                
                <div className="flex  "><p>Mother : </p>
                 <h5 className="ml-2">Alive(House Wife)</h5>
                 
                </div>
                

                <div className="flex  "><p>Family Value : </p>
                 <h5 className="ml-2">Liberal</h5>
                 
                </div>
                <div className="flex  "><p>No of elder brother : </p>
                 <h5 className="ml-2">2</h5>
                 
                </div>
                <div className="flex  "><p>No of elder sister : </p>
                 <h5 className="ml-2">2</h5>
                 
                </div>
                
            </div>
            </div>
            

          </div>

          <div className="view__desc">
            <h6>Iam looking for</h6>
            <h5>person who is ready for share my responsibility and happiness. He should also be able to support my family if needed.</h5>
      </div>

      <div className="view__intrest__send">
        <div className="view__intrest__send__head">
            <p>Are you interested in this Profile?</p>
        </div>
        <div className="view__intrest__send__div flex">
            <p>If you are interested in this profile, please send an Interest to this person.</p>
       
       <button>EXPRESS INTEREST </button>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
