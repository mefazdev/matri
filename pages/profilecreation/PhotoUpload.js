import Image from "next/image";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import upload from "../../asset/image/upload.jpg";
import Link from "next/link";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { useRouter } from "next/router";

export default function PhotoUpload() {
  const [user, setUser] = useState({});
  const [member, setMember] = useState([]);
  const [photo, setPhoto] = useState("");
  const [uploading, setUploading] = useState(false);
  const [spin,setSpin] = useState(false)
  const router = useRouter();
  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };
  const fetchMember = async () => {
    const userId = (await user) ? user.uid : null;

    if (userId) {
      const q = await query(
        collection(db, "member"),
        where("userId", "==", user?.uid)
      );

      const data = await getDocs(q);
      setMember(data.docs.map((doc) => doc));
    }
  };

  const handlePhoto = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setPhoto(readerEvent.target.result);
    };
  };

  const uploadPhoto = async () => {
    setSpin(true)
    setUploading(true);
    const id = member[0].id;
    const photoRef = ref(storage, `upload/${id}/photo`);
    await uploadString(photoRef, photo, "data_url").then(async (snapshot) => {
      const downloadURL1 = await getDownloadURL(photoRef);
      await updateDoc(doc(db, "member", id), {
        photo: downloadURL1,
      });
    });
    router.push("/account/Home");
    setSpin(false)
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    fetchMember();
  }, [user]);
  return (
    <div>
      <Header />
      <div className="photo__upload">
        <div className="photo__upload__div  ">
          <div className="grid md:grid-cols-3 gap-10">
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
                    <div className="photo__upload__box__row__left__div">
                      {photo ? (
                        <img src={photo} />
                      ) : (
                        <AddAPhotoOutlinedIcon id="photo__upload__cam__icon" />
                      )}

                      <div className="file-input">
                        <input type="file" id="img3" onChange={handlePhoto} />
                        <label htmlFor="img3">
                          {photo ? "CHANGE" : "SELECT PHOTO"}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="photo__upload__box__row__right md:col-span-2">
                    <div className="photo__upload__right__div">
                      <p>Please make sure your photo clearly shows your face</p>

                      <button
                        onClick={uploadPhoto}
                        disabled={photo ? false : true}
                      >
                        {uploading ? "Uploading" : "UPLOAD"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Link href='/profilecreation/VerifyNumber'><button className="photo__skip">SKIP</button></Link> */}
          <Link href="/account/Home">
            <button className="photo__skip">SKIP</button>
          </Link>
        </div>
      </div>
      {/* {spin ? (
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-300"></span>
        </span>
      ) : (
        ""
      )} */}
    </div>
  );
}
