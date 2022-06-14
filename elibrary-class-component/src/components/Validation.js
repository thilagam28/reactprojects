
//Thilagam
export function firstNameValidation(input){
  return /^[A-za-z].{3,15}$/.test(input);
}
//Kannan
export function lastNameValidation(input){
  return /^[A-Za-z].{3,15}$/.test(input);
}

//thilagam@gmail.com
export function emailValidation(input){
    return /^.+@.+\..+$/.test(input);
}

//passowrd validation
export function passwordValidation(input){
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{5,30}$/.test(input);
}
//Book Id
export function bookIdValidation(input){
  return /^[0-9].{0,4}$/.test(input);
}
export function bookTitleValidation(input){
  return /^[A-za-z].{3,15}$/.test(input);
}
export function bookDescValidation(input){
  return /^[A-za-z].{3,15}$/.test(input);
}
export function authorNameValidation(input){
  return /^[A-za-z].{3,15}$/.test(input);
}
export function noBooksValidation(input){
  return /^[0-9].{0,4}$/.test(input);
}