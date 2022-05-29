import { Link } from 'react-router-dom'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as ACTIONS from "../../store/actions/index"
import { postApi } from '../../Api/api';
import md5 from 'md5'
function CreateUser() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState();
    const dispatch = useDispatch();
    const [power, setPower] = useState();
     // lấy giá trị input đưa vào setInputs
    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    // lấy giá trị select 
    const handlePower = (event) => {
        setPower(event.target.value)
    }
        // Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        var password=null;
        inputs.password===inputs.pass ? password=inputs.password : setMessage("Password không khớp")
        if(password!==null){
        const user = {name:inputs.name,
            password:md5(password),
            phone:inputs.phone,
            email:inputs.email,
            address:inputs.address,
            power:power ? power : 1,
            status:1
        }  
        postApi("user/create",user).then((response) => {
            dispatch(ACTIONS.createUser(user))
        })
        setInputs({values: ''})
        setMessage("")
        alert("Thêm Thành Công")
        }
        
    }
    return (  
        <div className="container" style={styles.container}>
        <div className="row">
            <div className="col-12 col-sm-12">
               <h1 style={styles.title}>User</h1> 
            </div>
            <div>
              <Link to="/admin/user">
                  <button className="btn btn-outline-secondary">Go Back</button>
              </Link>
            </div>
        <form onSubmit={(event)=>handleSubmit(event)} style={styles.form}>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Name</label>
          <input type="text" 
            className="form-control" 
            name="name" 
            onChange={(event)=>onChange(event)} 
            placeholder="Enter Name" required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Email</label>
          <input type="email" 
            className="form-control" 
            name="email"
            onChange={(event)=>onChange(event)} 
            placeholder="Enter Email" required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Phone</label>
          <input type="text" 
            className="form-control" 
            name="phone" 
            onChange={(event)=>onChange(event)} 
            placeholder="Enter Phone" required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Address</label>
          <input type="text" 
            className="form-control" 
            name="address"
            onChange={(event)=>onChange(event)} 
            placeholder="Enter Address" required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Power</label>
          <select className="form-control" name="power"  onChange={(event)=>handlePower(event)} required>
             <option value="1">Admin</option>
             <option value="2">Quản lý sản phẩm</option>
             <option value="3">Quản lý đơn hàng</option>
          </select>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Password</label>
          <input type="password" 
            className="form-control" 
            name="password"
            onChange={(event)=>onChange(event)} 
            required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Retype Password</label>
          <input type="password"
            className="form-control" 
            name="pass" 
            onChange={(event)=>onChange(event)} 
            required/><p style={{"color":"red"}}>{message ? "" : message}</p>
        </div>
        <div className="col-12"  style={{'textAlign':'center'}}>               
            <button type="submit" className="btn btn-outline-danger">Save</button>   
            <button type="reset" className="btn btn-outline-danger" style={styles.reset}>Reset</button>       
        </div>
      </form>
      </div>
      </div>
    );
}

export default CreateUser;
const styles={
  container:{
      fontFamily:"Times New Roman",
      fontSize:"18px"
  },
  title:{
      textAlign:"center",
      color:"red",
      padding:"20px"
  },
  form:{
    padding:"10px"
  },
  formDiv:{
    margin:"auto",
    with:"50%",
    marginTop:"10px"
  },
  reset:{
    marginLeft:"10px"
  }
}