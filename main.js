const userName = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmPass = document.querySelector('#password2')
const form = document.querySelector('form')

function showError(input, message) {
    let parent = input.parentElement
    let small = parent.querySelector('small')

    parent.classList.add('error')
    small.innerHTML = message
}

function showSuccess(input) {
    let parent = input.parentElement
    let small = parent.querySelector('small')

    parent.classList.remove('error')
    small.innerHTML = ''
}

function checkEmptyError(listInput) {

    let isEmptyError = false;
    
    listInput.forEach(function(input){
        input.value = input.value.trim()
        if(!input.value){
            showError(input, 'Không được để trống')
            isEmptyError = true
        }
        else{
            showSuccess(input)
        }
    })
    return isEmptyError
}

function checkEmailError(input) {
    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim()

    let isEmailError = !regexEmail.test(input.value)
    if(regexEmail.test(input.value)){
        showSuccess(input)
    }
    else{
        showError(input, 'Email không hợp lệ')
    }
    
    return isEmailError
}

function checkLengthError(input, min ,max){
    input.value = input.value.trim()

    // nếu không return từng if nó sẽ chạy showSuccess(input)
    if(input.value.length < min){
        showError(input, `Không được ít hơn ${min} ký tự`)
        return true
    }
    if(input.value.length > max){
        showError(input, `Không được nhiều hơn ${max} ký tự`)
        return true
    }
    showSuccess(input)
    return false
}


function checkMatchPasswords(input1, input2) {
    if(input1.value !== input2.value){
        showError(input2, 'Mật khẩu không trùng khớp')
    }
}


// Submit: Sự kiện xảy ra khi một biểu mẫu được gửi
form.addEventListener('submit', function(e) {

    // khi submit ko bị load lại trang
    e.preventDefault()

    checkEmptyError([userName, email, password, confirmPass])    
    checkEmailError(email)
    checkLengthError(userName, 3, 10)
    checkLengthError(password, 3, 10)
    checkMatchPasswords(password, confirmPass)
})
