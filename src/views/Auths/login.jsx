import React,{useState , useEffect} from 'react'
import '../../assets/css/registerStyles/registerStyles.css'

function Login(){

    const [verify ,setVerify] = useState(0)
    const [form ,setForm] = useState({
        email:'',
        password:''
    }) 

    function handleChange(e){
        setForm({...form ,[e.target.name]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        setVerify(verify+1)
    }

    useEffect(()=>{
        if(verify != 0){
            fetch('http://localhost:5000/picta/api/user/login',{
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Origin": "*",
                },
                body:JSON.stringify({
                    email:form.email,
                    password:form.password
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.message === "Connected"){
                    console.log(data)
                    localStorage.setItem('email',form.email)
                    localStorage.setItem('name',data.name)
                    setTimeout(()=>{
                        window.location.pathname = '/'
                    },2000)
                }else{
                    localStorage.setItem('email',0)
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
            <center> <h2>Login</h2></center>

            <hr/>

            <div>
            <label for="email">Email : </label><br/>
            <input type="email" name="email" id="email" value={form.email} onChange={(e)=>handleChange(e)}/>
            </div>

            <div>
            <label for="pwd">Password: </label><br/>
            <input type="password" name="password" id="pwd" value={form.password} onChange={(e)=>handleChange(e)}/>
        </div>
        <br/>
        <hr/>

        <div>
            <br/>
        <input type="submit" value="Login"/>
        <input type="reset" value="Cancel"/>

        </div>

</form>
</div>

        </React.Fragment>
    )
}

export default Login