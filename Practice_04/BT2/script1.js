const form = document.getElementById("registerForm")

function showError(id,message){
    document.getElementById(id+"Error").innerText = message
}

function clearError(id){
    document.getElementById(id+"Error").innerText = ""
}

function validateFullname(){

    let value = document.getElementById("fullname").value.trim()

    let regex = /^[A-Za-zÀ-ỹ\s]{3,}$/

    if(value === ""){
        showError("fullname","Không được để trống")
        return false
}

    if(!regex.test(value)){
        showError("fullname","Ít nhất 3 ký tự và chỉ chứa chữ")
        return false
}

    clearError("fullname")
    return true
}

function validateEmail(){

    let value = document.getElementById("email").value.trim()

    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(value === ""){
        showError("email","Email không được trống")
        return false
}

    if(!regex.test(value)){
        showError("email","Email không đúng định dạng")
        return false
}

    clearError("email")
    return true
}

function validatePhone(){

    let value = document.getElementById("phone").value.trim()

    let regex = /^0\d{9}$/

    if(!regex.test(value)){
        showError("phone","SĐT phải 10 số và bắt đầu bằng 0")
        return false
}

    clearError("phone")
    return true
}

function validatePassword(){

    let value = document.getElementById("password").value

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    if(!regex.test(value)){
        showError("password","≥8 ký tự, có hoa, thường, số")
        return false
}

    clearError("password")
    return true
}

function validateConfirmPassword(){

    let pass = document.getElementById("password").value
    let confirm = document.getElementById("confirmPassword").value

    if(pass !== confirm){
        showError("confirmPassword","Mật khẩu không khớp")
        return false
}

    clearError("confirmPassword")
    return true
}

function validateGender(){

    let gender = document.querySelector('input[name="gender"]:checked')

    if(!gender){
        showError("gender","Phải chọn giới tính")
        return false
}

    clearError("gender")
    return true
}

function validateTerms(){

    let terms = document.getElementById("terms").checked

    if(!terms){
        showError("terms","Phải đồng ý điều khoản")
        return false
}

    clearError("terms")
    return true
}

form.addEventListener("submit",function(e){

    e.preventDefault()

    let valid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirmPassword() &
    validateGender() &
    validateTerms()

    if(valid){

        let name = document.getElementById("fullname").value

        form.style.display="none"

        document.getElementById("successMessage").innerText =
        "Đăng ký thành công 🎉 Xin chào " + name

}

})


document.querySelectorAll("input").forEach(input=>{

    input.addEventListener("blur",function(){

        switch(input.id){

            case "fullname": validateFullname(); break
            case "email": validateEmail(); break
            case "phone": validatePhone(); break
            case "password": validatePassword(); break
            case "confirmPassword": validateConfirmPassword(); break

}

})

    input.addEventListener("input",function(){

        let error = document.getElementById(input.id+"Error")

        if(error){
            error.innerText=""
}

})

})