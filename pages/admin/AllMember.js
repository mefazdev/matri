import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  doc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  where,
  getDoc,

} from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Table } from 'react-bootstrap';
import AdminHeader from '../../components/AdminHeader';
import Link from 'next/link';

// import Cookies from 'universal-cookie';
// import { Link } from 'react-router-dom';
export default function AllMember() {

    const [members,setMembers] = useState([])
    const [admin,setAdmin] = useState({})
    const fetchData = async () => {
        const q = await query(collection(db, "member"), 
        // orderBy("timestamp", "desc")
        );
        onSnapshot(q, (snapshot) => {
          setMembers(snapshot.docs.map((doc) => doc));
           
        });
        
      }

      useEffect (()=>{
        fetchData()
      fetchAdmin()
      },[])

      const fetchAdmin = async () => {
        const docRef = doc(db, "admin","EcJ56nx8OgfacXrUBkHg");
        const docSnap = await getDoc(docRef);
    
        setAdmin(docSnap.data());

      };
 
  return (
    <div >

        {admin.admin  ?
        <>
        <AdminHeader/>
        <div className='admin'>
            {/* <button onClick={()=>console.log(admin.admin)}>HElo</button> */}
        

         <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {/* Name */}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                   Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {/* Status */}
                    
                  </th>
                  
                  {/* <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((data,index)=>{

const no = members.length - index
const d = data.data()
return(
    <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{no}</div>
                      {/* <div className="text-sm text-gray-500">''''</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={d.photo} alt="" />
                        </div> */}
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">{d.brideName}</div>
                          {/* <div className="text-sm text-gray-500">fdfdf</div> */}
                        </div>
                      </div>
                    </td>
                    <td>
                    <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={d.photo} alt="" />
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{d.district}</div>
                      <div className="text-sm text-gray-500">{d.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{d.phone}</div>
                      {/* <div className="text-sm text-gray-500">{d.city}</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                      >
                       {d.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* {person.role} */}
                      <Link href={`/admin/viewProfile/${encodeURIComponent(data.id)}`}><button id='ad__view__btn'>View</button></Link>
                    </td>
                  
                  </tr>
)
                })}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
             </div> </>: 
             ' '
             }
        
         
         </div>
  )
}
