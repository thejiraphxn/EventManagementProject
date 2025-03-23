function LoginValidation(values){
    let error = {}

    if(values.username_or_email === ""){
        error.username_or_email = "กรุณากรอกชื่อผู้ใช้หรืออีเมล"
    } else if(values.password === ""){
        error.password = "กรุณากรอกรหัสผ่าน"
    }

    return error;

    
}

export default LoginValidation;