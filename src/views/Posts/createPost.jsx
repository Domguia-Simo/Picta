import React, { useState ,useEffect} from 'react'

const CreatePost = ()=>{

    const email =  localStorage.getItem('email')
    if(email == 0){
        alert("Sorry You cannot access this page without authentication")
        window.location.pathname ="/"
    }

    const [imgName ,setImgName] = useState(false)
    const [desc ,setDesc] = useState()
    const [post ,setPost] = useState(0)
    const [file ,setFile] = useState(0)

function handleChange(e){
    setDesc(e.target.value)
}
    function upload(e){
        // console.log(e.target.files)
        // setFile(e.target.files)

        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }
    //  email = "domguiasimoulrich@gmail.com"
    // console.log(email)
    useEffect(()=>{
        if(file != 0){
            let formData = new FormData
            formData.append('file' ,file)

            // // for (const f of file) {
            //     formData.append("files", f);
            // //   }


            fetch('http://localhost:5000/picta/api/post/uploadFile',{
                method:"POST",
                body:formData
            })
            .then(res => res.json())
            .then(data => {console.log(data)
                setImgName(data.filename)
            })
            .catch(err => console.log(err))
            setFile(0)
        }
    },[file])

    const userName = localStorage.getItem('name');
    let time  =new Date
    time = time.getDate()+'-'+(time.getMonth()+1)+'-'+time.getFullYear()
    useEffect(()=>{
        if(post != 0){
            fetch('http://localhost:5000/picta/api/post/uploadPost',{
                method:"POST",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Origin':'*'
                },
                body:JSON.stringify({
                    name:imgName,
                    by:userName,
                    date:time,
                    desc:desc,
                    likes:'0',
                    image:file
                })
            })
            .then(res => res.json())
            .then(data => {
    
            })
            .catch(err => console.log(err))
            setPost(0)
            window.location.pathname = '/'
        }
    },[post])

    return(
        <React.Fragment>
<br/>
<center>
            <h1>Create a publication</h1>
            <div style={{
                // border:"solid 1px grey",
                width:"50%",
                margin:"auto"
            }}>
                <form style={{border:"solid 1px grey"}}>
                    <div>
                        <label htmlFor='image' onChange={(e)=>upload(e)} style={{cursor:"pointer"}}><h2>Upload a picture <span className="fas fa-camera"></span> </h2></label><br/>
                        <div 
                            style={{
                                border:"solid 1px grey",
                                width:"400px",
                                height:"300px",
                                overflow:"hidden"
                            }}
                        >
                            {imgName ? <img src={`http://localhost:5000/uploads/${imgName}`} width="400px" height="300px"/> : ''}
                            
                        </div>
                        <input type="file" name="file" id="image" multiple onChange={(e)=>upload(e)} style={{display:"none"}} />
                    </div><br/>
                    
                    <label htmlFor='dscription'>Description : </label>
                    <textarea cols="5" rows="5" value={desc} onChange={(e)=>handleChange(e)}
                        style={{
                            padding:"5px"
                        }}
                    />

            <br/>
                <div>
                 <input type="submit" value="Post" onClick={(e)=>{
                    e.preventDefault()
                    setPost(post+1)}}/>
                </div>

                </form>


            </div>
            </center>
        </React.Fragment>
    )
}

export default CreatePost