import '../styles/globals.css'
import '../styles/header.css'
import '../styles/home.css'
import '../styles/footer.css'
import '../styles/profilecreation/basic.css'
import '../styles/profilecreation/education.css'
import '../styles/profilecreation/photoUpload.css'
import '../styles/profilecreation/verifyNumber.css'
import '../styles/account/home.css'
import '../styles/accountNav.css'
import '../styles/accountSidebar.css'

import '../styles/display.css'
import '../styles/viewProfile.css'
import '../styles/account/editProfile.css'
import Head from 'next/head'  
import { useStore } from '../redux/store'
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  
 
  return(
    
      <>
    <Head>
  <style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400&family=Rubik+Moonrocks&display=swap');
</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400&family=Poppins:wght@300&family=Rubik+Moonrocks&display=swap');
</style>
  </Head>  
   <Provider store={store}>
   <Component {...pageProps} />
  </Provider>

  </>

      
    )
}

export default MyApp
