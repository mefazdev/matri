import Image from "next/image";
import React from "react";
import Header from "../../components/Header";
import upload from "../../asset/image/upload.jpg";
import Link from "next/link";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
export default function PhotoUpload() {
  return (
    <div>
      <Header />
      <div className="photo__upload">
        <div className="photo__upload__div grid md:grid-cols-3 gap-10">
          <div className="photo__upload__left">
            <div className="photo__upload__left__img">
              <Image src={upload} />
            </div>
          </div>

          <div className="photo__upload__right md:col-span-2">
            <h4>Add photo</h4>
            <div className="photo__upload__box">
              <div className="photo__upload__box__row grid md:grid-cols-3">
                <div className="photo__upload__box__row__left">
                  {/* <div className=''></div> */}
                  <div className="photo__upload__box__row__left__div">
                    <AddAPhotoOutlinedIcon id="photo__upload__cam__icon" />
                    <div className="file-input">
                      <input
                        type="file"
                        id="img3"
                        // onChange={handleImageThree}
                      />
                      <label for="img3">UPLOAD PHOTO</label>
                    </div>
                  </div>
                </div>
                <div className="photo__upload__box__row__right md:col-span-2">
                  <div className="photo__upload__right__div">
                    <p>Please make sure your photo clearly shows your face</p>
                    <Link href="/profilecreation/VerifyNumber">
                      <button>UPLOAD</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
