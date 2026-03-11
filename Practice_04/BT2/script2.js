const prices = {
    Ao:150000,
    Quan:200000,
    Giay:500000
}

const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const delivery = document.getElementById("delivery")
const address = document.getElementById("address")
const note = document.getElementById("note")

const totalPrice = document.getElementById("totalPrice")

const confirmBox = document.getElementById("confirmBox")
const summary = document.getElementById("summary")

function showError(id,msg){
    document.getElementById(id+"Error").innerText = msg
}

function clearError(id){
    document.getElementById(id+"Error").innerText = ""
}


function validateProduct(){
    if(product.value===""){
        showError("product","Phải chọn sản phẩm")
        return false
}
    clearError("product")
    return true
}

function validateQuantity(){

    let q = Number(quantity.value)

    if(!Number.isInteger(q) || q<1 || q>99){
        showError("quantity","1 - 99")
        return false
}

    clearError("quantity")
    return true
}

function validateDelivery(){

    let today = new Date()
    let selected = new Date(delivery.value)

    let maxDate = new Date()
    maxDate.setDate(today.getDate()+30)

    if(selected < today){
        showError("delivery","Không chọn ngày quá khứ")
        return false
}

    if(selected > maxDate){
        showError("delivery","Không quá 30 ngày")
        return false
}

    clearError("delivery")
    return true
}

function validateAddress(){

    if(address.value.trim().length < 10){
        showError("address","Ít nhất 10 ký tự")
        return false
}

    clearError("address")
    return true
}

function validateNote(){

    let len = note.value.length

    if(len>200){
        showError("note","Không quá 200 ký tự")
        return false
}

    clearError("note")
    return true
}

function validatePayment(){

l   et pay = document.querySelector('input[name="payment"]:checked')

    if(!pay){
        showError("payment","Chọn phương thức")
        return false
}

    clearError("payment")
    return true
}

function updateTotal(){

    let p = prices[product.value]

    let q = Number(quantity.value)

    if(p && q){

        let total = p*q

        totalPrice.innerText = total.toLocaleString("vi-VN")

}

}

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

note.addEventListener("input",function(){

    let len = note.value.length

    let count = document.getElementById("charCount")

    count.innerText = len + "/200"

    if(len>200){
        count.style.color="red"
}
    else{
        count.style.color="black"
}

})

form.addEventListener("submit",function(e){

    e.preventDefault()

    let valid =
    validateProduct() &
    validateQuantity() &
    validateDelivery() &
    validateAddress() &
    validateNote() &
    validatePayment()

    if(valid){

        let p = product.options[product.selectedIndex].text
        let q = quantity.value
        let d = delivery.value
        let total = totalPrice.innerText

        summary.innerText =
        `Sản phẩm: ${p}
        Số lượng: ${q}
        Ngày giao: ${d}
        Tổng tiền: ${total} VNĐ`

        confirmBox.style.display="block"

}

})

document.getElementById("confirmBtn").onclick = function(){

confirmBox.style.display="none"

form.style.display="none"

document.getElementById("successMessage").innerText =
"Đặt hàng thành công 🎉"

}

document.getElementById("cancelBtn").onclick = function(){

confirmBox.style.display="none"

}