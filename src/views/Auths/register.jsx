import React,{useState ,useEffect} from 'react'

//Register styles
import '../../assets/css/registerStyles/registerStyles.css'

function Register(){

    const [verify ,setVerify] = useState(0)
    const [form ,setForm] = useState({
        fname:'',
        lname:'',
        email:'',
        password:'',
        confirm:''
    })

    function handleChange(e){
        setForm({...form ,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setVerify(verify+1)

    }

    useEffect(()=>{
        if(verify != 0){
            fetch('http://localhost:5000/picta/api/user/createUser',{
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Origin": "*",
                },
                body:JSON.stringify({
                    name:form.fname,
                    surName:form.lname,
                    email:form.email,
                    password:form.password,
                    confirm:form.confirm,
                }),
            })
            .then(res => res.json())
            .then(data => {
                if(data.message == "Registration successfull"){
                    window.location.pathname = "/auth/login"
                }
                alert(JSON.stringify(data.message))
                
            })
            .catch(err => console.log(err))

            setVerify(0)
        }
    },[verify])


    return(
        <React.Fragment>
            <div className="form">

                <form method="POST" action="" onSubmit={(e)=>handleSubmit(e)}>
                    <center> <h2>Register !</h2></center>

                    <hr/>

                    <div>
                    <label htmlFor="fname">First Name : </label><br/>
                    <input type="text" name="fname" id="fname" value={form.fname} onChange={(e)=>handleChange(e)} />
                    </div>

                    <div>
                    <label htmlFor="lname">Last Name : </label><br/>
                    <input type="text" name="lname" id="lname" value={form.lname} onChange={(e)=>handleChange(e)}/>
                    </div>

                    <div>
                    <label htmlFor="email">Email : </label><br/>
                    <input type="email" name="email" id="email" value={form.email} onChange={(e)=>handleChange(e)}/>
                    </div>

                    <div>
                    <label htmlFor="pwd">Password: </label><br/>
                    <input type="password" name="password" id="pwd" value={form.password} onChange={(e)=>handleChange(e)}/>
                    </div>

                    <div>
                    <label htmlFor="confirm">Confirm Password : </label><br/>
                    <input type="password" name="confirm" id="confirm" value={form.confirm} onChange={(e)=>handleChange(e)}/>
                    </div>
                        <br/>
                        <hr/>

                        <div>
                            <br/>
                        <input type="submit" value="Register"/>
                        <input type="reset" value="Cancel"/>

                        </div>

                </form>
            </div>
            
        </React.Fragment>
    )
}

export default Register