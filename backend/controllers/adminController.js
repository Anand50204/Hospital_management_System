

// api adding doctore

const addDoctor = async (req,res)=>{
try{
    const {name,email,password,speciality,degree, experience,about,fees,address }= req.body;
    const imageFile = req.file;

    console.log(imageFile,{name,email,password,speciality,degree, experience,about,fees,address });
    

}catch(error){
    console.log(error);
    
}
}

export {addDoctor}