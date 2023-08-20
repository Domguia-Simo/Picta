import React from 'react'
import routes from '../routes'
import {Route ,Routes,useLocation ,Link} from 'react-router-dom'

//styles
import '../assets/css/authStyles/authStyles.css'

function Auth(){

    //Redirection
    let url = useLocation()
    // console.log(url)
    // if(url.pathname == '/auth'){
    //     window.location.pathname = '/auth/login'
    // }
  

    //filtering only the routes having the auth layout
    const authRoutes = routes.map(row => {
        if(row.layout == '/auth'){
            return <Route path={row.path} element={row.component} key={row.name}/>
        }
    })

let test = 0
    if(window.location.pathname == "/auth/login"){
        test =1
    }

    return(
        <React.Fragment>

            <div id="auth">
                <div id="top"></div>
                <div id="bottom">
                    {/* <div> */}
                    <span>[Co-pilot]</span>
                    <span>[About Us]</span>
                    <span>[Contact]</span>
                    <span>[Home]</span>
                    {/* </div> */}
                </div>
            </div>

            <div id="routeContent">
            <Routes>
                {authRoutes}
            </Routes>
            
            { test ?
            <>
            <br/><br/>
                <center style={{
                 color:"white",
                 fontSize:"large",
                 fontWeight:"bold",
                 cursor:"pointer"
     
                }} 
                onClick={()=>{
                    window.location.pathname="/auth/register"
                }}> No account !</center></>
                :
                <><br/>
                <center style={{
                    color:"white",
                    fontSize:"large",
                    fontWeight:"bold",
                    cursor:"pointer"
                   }}
                   onClick={()=>{
                    window.location.pathname="/auth/login"
                   }}
                   >Already Have an account </center></>
            }
            </div>

        </React.Fragment>
    )
}

export default Auth