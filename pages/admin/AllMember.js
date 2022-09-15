import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { db, storage } from "../../firebase";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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
import moment from 'moment';
import { Fragment, useRef  } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Cookies from 'universal-cookie';
// import { deleteUser, getAuth } from 'firebase/auth';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

// import Cookies from 'universal-cookie';
// import { Link } from 'react-router-dom';
export default function AllMember() {

    const [members,setMembers] = useState([])
    // const [admin,setAdmin] = useState({})
    const [deleting,setDeleting] = useState(false)
    const [deleteId,setDeleteId] = useState('')
    const [delUserId,setDelUserId] = useState('')

    const [open, setOpen] = useState(false)
    const cookies = new Cookies();
    const admin = cookies.get('admin')
const [user,setUser] = useState({})
    const cancelButtonRef = useRef(null)
    const fetchData = async () => {
        const q = await query(collection(db, "member"), 
        orderBy("timesTamp","desc")
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
    
        // setAdmin(docSnap.data());

      };
 


      const openDelete = (id,userId)=>{
       setOpen(true)
       setDeleteId(id)
       setDelUserId(userId)
        
      }

      const deleteProfile = async ()=>{
        setOpen(false)
        setDeleting(true)
        
        deleteDoc(doc(db, "member", deleteId));
        
         
  
          
       
       setDeleteId('')
      setDelUserId('')
       
      } 
  return (
    <div >

        {admin == "true"  ?
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
                    Date
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
const dt = d.date;
const date = moment.unix(dt).format("MMM DD, YY");
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
                          <div className="text-sm font-medium text-gray-900">{date}</div>
                          {/* <div className="text-sm text-gray-500">fdfdf</div> */}
                        </div>
                      </div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* {person.role} */}
              <button
              onClick={()=>openDelete(data.id,data.data().userId)}
              id='ad__dlt__btn'>Delete</button> 
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
        
        <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <WarningAmberIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Delete this account?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this account? All of  data of this account will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={deleteProfile}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
         </div>
  )
}
