import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import {useNavigate, BrowserRouter, Route, Link, Routes, Outlet, Navigate} from 'react-router-dom';
 
//hide pages unless logged in
const ProtectedRoute = () =>{
  const User = localStorage.getItem("iden");
  const user = JSON.parse(User);


  return user ? <Outlet/>: <Navigate to={"/login"}/>

}

//function creates a component for buttons
function Btn({classn, btnHandler, value}){
  return(
    <button className={classn} type='button' onClick={btnHandler}>{value}</button>
  );

}

//component on home page
function AddBtn({btnHandler, value}){
  return(
    <button className='moduleBtn' type='button' onClick={btnHandler}>{value}</button>
  );

}

//Profile function
function Profile(){
  return(
    <h1>Hello World</h1>
  )
}

//form to record information about a course
function Form(){
  const [cCode, setCCode] = useState("");
  const [cName, setCName] = useState("");
  const storedId = localStorage.getItem('iden');
  const id = JSON.parse(storedId);

  const add = async () =>{
    let mod;
    try{
      axios.post('http://localhost:8080/api/modules', mod = {modCode: cCode, modName: cName, userId: id.key})
      .then((response) => {
        console.log(response);
      });

    }catch(err){
      console.log(err);
    }finally{
      alert("module added successfully!");
    }
    

  } 
  
  return( 
    <>
    <div className='formDiv'>
      <Box label='Course Code: ' type="text" val={cCode} onValueChange={setCCode}/>
      <Box label='Course Name: ' type="text" val={cName} onValueChange={setCName}/>
      <Btn classn={'sidebarBtnq'} btnHandler={() => add()} value={'Add'}/>

    </div>
    </>

  );
  
}

//view to add information about coursework
function AddCoursework(){
  const storedCode = localStorage.getItem('code');
  const code = JSON.parse(storedCode);
  const storedId = localStorage.getItem('iden');
  const id = JSON.parse(storedId);

  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [date, setDate] = useState("");
  const [gradeOutOf100, setGradeOutOf100] = useState(0);
  const [gradeOutOfPercentage, setGradeOutOfPercentage] = useState(0);
  

  const add = async () =>{
    let coursework;
    try{
      axios.post('http://localhost:8080/api/coursework', coursework = {
        "name": name,
        "percentage": percentage,
        "dueDate": date,
        "gradeOutOf100": gradeOutOf100,
        "gradeOutOfPercentage": gradeOutOfPercentage,
        "userId": id.key,
        "moduleCode": code.key,

      })
      .then((response) => {
        console.log(response);
      });

    }catch(err){
      console.log(err);
    }finally{
      alert("coursework added successfully!");
    }

    console.log(coursework.moduleCode);
    

  } 
  
  return( 
    <>
    <div className='formDiv'>
      <Box label='Coursework: ' type="text" val={name} onValueChange={setName}/>
      <Box label='Coursework weight: ' type="text" val={percentage} onValueChange={setPercentage}/>
      <Box label='Due Date: ' type="date" val={date} onValueChange={setDate}/>
      <Box label='Grade out of 100: ' type="text" val={gradeOutOf100} onValueChange={setGradeOutOf100}/>
      <Box label='Grade out of weight: ' type="text" val={gradeOutOfPercentage} onValueChange={setGradeOutOfPercentage}/>
      <Btn classn={'sidebarBtnq'} btnHandler={() => add()} value={'Add'}/>

    </div>
    </>
  );
}

//what users see when the log in(A list of courses that they have already added to their account )
function Home1(){
  const storedId = localStorage.getItem('iden');
  const id = JSON.parse(storedId);
  //const [id, setId] = useState(1); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const getData = async () =>{
      try{
        const response = await axios.get(`http://localhost:8080/api/modules/users/${id.key}`);
        setData(response.data);

      }catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
      
    }
    getData();
  })

  if(loading) return <p>Loading...</p>;

  function addCourse(){
    window.open("/Home/addCourses", "_self", "_self");
  }

  function courseWorkView(btnValue){
    window.open("/Home/courseWork", "_self", "_self");
      const thing ={key: btnValue};
      localStorage.setItem('code', JSON.stringify(thing));
  }

 
  return(
    <>
    <center>
    <Box label={'Search'} type={'text'}onValueChange={null}/>


    </center>
    <ul> 
      {
        data.map((item) =>(
          <div className='modBtnDiv'><Btn classn='moduleBtn' btnHandler={() => courseWorkView(item.modName)} value={<li key={item.modCode}>{item.modName}</li>} /></div>
        ))

        
      }
      <div className='modBtnDiv'><AddBtn btnHandler={() => addCourse()} value={<li>Add Module(+)</li>}/></div>
    </ul>
    
    
    </>
    
  );
}

function Input2({val, courseId}){
  //function to update information in the database
    const updatePercent = (grade) => {
      try{
        axios.put(`http://localhost:8080/api/coursework/percent/${courseId}` , grade, {
          headers:{
            "Content-Type": "application/json"
          }
        });
  
      }catch(err){
        console.log(err);
      }
  
    }
  
    return(
      <input className='ini' type="text" value={val} onChange={(e) => {
        courseId = courseId;
        updatePercent(e.target.value);
      }}/>
  
    );
      
  }


function Input({val, courseId}){
//function to update information in the database
  const update100 = (grade) => {
    try{
      axios.put(`http://localhost:8080/api/coursework/${courseId}` , grade, {
        headers:{
          "Content-Type": "application/json"
        }
      });

    }catch(err){
      console.log(err);
    }

  }

  return(
    <input className='ini' type="text" value={val} onChange={(e) => {
      courseId = courseId;
      update100(e.target.value);
    }}/>

  );
    
}

//area where course work is viewed
function CourseWork(){
  const storedId = localStorage.getItem('iden');
  const id = JSON.parse(storedId);
  const storedCode = localStorage.getItem('code');
  const code = JSON.parse(storedCode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await axios.get(`http://localhost:8080/api/coursework/user/${id.key}/module/${code.key}`);
        setData(response.data);

      }catch(err){
        console.log(err);
      }

    }
    fetchData();
  });

  var courseId;
  var courseIden = []; 
  var grade100 = [];
  var gradePercent = [];

  data.map((item) => (courseIden.push(item.courseId)))
  data.map((item) => (grade100.push(item.gradeOutOf100)))
  data.map((item) => (gradePercent.push(item.gradeOutOfPercentage)))


  //add course work
  function addCourse(){
    window.open("/Home/addCoursework", "_self", "_self");
  }

  const tableItems = data.map((item) => (
    <>
      <tr>
        <td className='col' key={item.courseId}>{item.name}</td>
        <td className='col'>{item.percentage}</td>
        <td className='col'>{item.dueDate}</td>
        <td className='col'><Input courseId={item.courseId} val={grade100[data.indexOf(item)]}/></td>
        <td className='col'><Input2 courseId={item.courseId} val={gradePercent[data.indexOf(item)]}/></td>

      </tr>
        
    </>
    
  ))

  return(
    <>
    <center>
    <table className='table'border={5} cellPadding={10}>
      <thead>
        <tr>
        <th>Coursework</th>
        <th>Weight</th>
        <th>Due Date</th>
        <th>Grade out of 100</th>
        <th>Grade out of weight</th>

        </tr>
        
      </thead>
      <tbody>
      {
        tableItems
      }

      </tbody>
      
      

    
    </table>
    <br />

    <Btn classn={"sidebarBtn"} btnHandler={() => addCourse()} value={"Add Coursework"}/>
      
    </center>
    </>
    
  );

  
}

//creates the ability to toggle between view of courses, coursework and profile. The sidebar with a navigation list is also seen
function Home(){
  //opens the profile in the provided space
  function toogleToProfile(){
    window.open("/Home/Profile", "_self", "_self");
    
  }

  //opens homw view with the modules added
  function toogleToHome(){
    window.open("/Home", "_self", "_self");
    
  }

  const navigate = useNavigate();
  //logs you out of the system
  function logOut(){
    navigate("/login", {replace: true});
    localStorage.setItem("iden", null);
  }
  return(
    <>
    <div className='home'>
      
      <div className='sidebar'>
        <div className='head'>side</div>
        <br />
        <Btn classn='sidebarBtn' btnHandler={() => toogleToHome()} value={'Home'}/>
        <Btn classn='sidebarBtn' btnHandler={() => toogleToProfile()} value={'Profile'}/>
        <Btn classn='sidebarBtn' btnHandler={() => logOut()} value={'Log Out'}/>
        

      </div>

      <div className='moduleDashboard'>
      <div className='head'>
        <b>Modules</b>
      </div>
      <Routes>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='' element={<Home1/>}></Route>
        <Route path='/addCourses' element={<Form />}></Route>
        <Route path='/courseWork' element={<CourseWork/>}></Route>
        <Route path='/addCoursework' element={<AddCoursework/>}></Route>

      </Routes>
    
          
      </div>

      
    </div>
    </>
      
  );
}


function Box({label,type, val, onValueChange}){
  return(
    <>
      <label>{label}</label>
      <input type={type}
      value={val}
      onChange={(e) =>onValueChange(e.target.value)} />
      <br /><br />
    </>
  );
    
}

//sign up view
function Signup(){
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const add = async () =>{
    try{
      axios.post('http://localhost:8080/api/users', {
        "name": userName,
        "email": userEmail,
        "password": userPassword 
      })
      .then((response) => {
        console.log(response);
      });

    }catch(err){
      console.log(err);
    }finally{
      alert("user added successfully!");
    }
    

  } 
  
  return( 
    <>
    <center>
      
    <div className='signupDiv'>
      <header>
        Course Organization App Signup
      </header>
      <br />
      <Box label='Name: ' type="text" val={userName} onValueChange={setUserName}/>
      <Box label='Email: ' type="text" val={userEmail} onValueChange={setUserEmail}/>
      <Box label='Password: ' type="password" val={userPassword} onValueChange={setUserPassword}/>
      <Btn classn={'sidebarBtnq'} btnHandler={() => add()} value={'Add'}/>

    </div>

    </center>
    
    </>

  );
}

//function represents the login page 
function Main(){
  const [id, setId] = useState(0);
  const [val1,setVal1] = useState("");
  const [val2,setVal2] = useState("");
  const [login,setLogin] = useState(false);
  

  const handleLogin = async() =>{
    const response = await axios.post("http://localhost:8080/api/users/login", {
      "email": val1,
      "password": val2
    });

    
    if(response.data){
      const thing ={key: response.data.userId};
      localStorage.setItem('iden', JSON.stringify(thing));
      console.log("hi");
      navigate("/Home");    
    } 
    else{
        console.log("false");
    }
  }

  const navigate = useNavigate();
  function handleSignUp(){
    navigate('/Signup')
  }

  return(
    <div className='mainCon'>
      <div className='container'>
        <h2>Login</h2>
        <Box label="Username: " type={"text"} val={val1} onValueChange={setVal1}/>
        <Box label="Password: " type={"password"} val={val2} onValueChange={setVal2}/>

        <Button onLogin={()=> handleLogin()}/>
        <button onClick={() => handleSignUp()}>Sign up</button>
               
      </div>

    </div>
    
  );

}

//component for buttons and the function for the on click
function Button({onLogin}){
  return(
    <>
      <button onClick={onLogin} type='button'>Login</button>
    </>
  )
}



function App() { 

  return (
    <> 
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Main />}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/Home/*' element={<Home/>}/>
        </Route>
        <Route path='/Signup' element={<Signup/>}></Route>
      </Routes>
      <Link to={"/Home/*"}></Link>
      <Link to={'/Profile'}></Link>
      <Link to={'/addCourses'}></Link>
      <Link to={'/courseWork'}></Link>
      <Link to={'/addCourseWork'}></Link>


    </BrowserRouter>
      
    </>
  )
}

 

export default App
