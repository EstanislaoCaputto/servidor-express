import multer from "multer";
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+file.fieldname+"."+file.originalname.split(".")[1])
    }
})
const upload = multer({storage:storage});
export default upload