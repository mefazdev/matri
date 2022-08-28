import React from 'react'
import Header from '../components/Header'

export default function Contact() {
  return (
    <div>
        <Header/>

        <div className='contact'> 
        
        <div className=" contact__form__div">
            <h3>Write to us</h3>

            <div>
              <form 
            //   onSubmit={sendForm}
                className="grid grid-cols-1">
                <input required name='name' placeholder="Name" />
                <input required name='email' type="email" placeholder="Email" />
                <input required name='phone' placeholder="Phone" />

                <textarea name='message' placeholder="Message" />
             
              <button  > SEND</button>
            
               
              </form>
            </div>
          </div>   
        </div>
    </div>
   
  
 
  )
}
