// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getStorage, ref as ref_storage, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser;
const storage = getStorage();

const _init = document.getElementById("init");
const _name = document.getElementById("name");
const _picture = document.getElementById("picture");
const _username = document.getElementById("username");
const _dob = document.getElementById("dob");
const _magicsentence = document.getElementById("magic-sentence");
const _gender = document.getElementById("gender");
const _region = document.getElementById("region");
const _recovery = document.getElementById("recovery");
//const _verify = document.getElementById("verify");
const _creation = document.getElementById("creation");
const _summary = document.getElementById("summary");
const _terms = document.getElementById("terms");
const _success = document.getElementById("success");

document.getElementById("NametoInit").addEventListener("click", NametoInit);
document.getElementById("PicturetoName").addEventListener("click", PicturetoName);
document.getElementById("UsernametoPicture").addEventListener("click", UsernametoPicture);
document.getElementById("MagictoUsername").addEventListener("click", MagictoUsername);
document.getElementById("DOBtoMagic").addEventListener("click", DOBtoMagic);
document.getElementById("GendertoDOB").addEventListener("click", GendertoDOB);
document.getElementById("RegiontoGender").addEventListener("click", RegiontoGender);
document.getElementById("RecoverytoRegion").addEventListener("click", RecoverytoRegion);
document.getElementById("CreationtoRecovery").addEventListener("click", CreationtoRecovery);
//document.getElementById("CreationtoVerify").addEventListener("click", CreationtoVerify);
document.getElementById("SummarytoCreation").addEventListener("click", SummarytoCreation);
document.getElementById("TermstoSummary").addEventListener("click", TermstoSummary);


document.getElementById("signup").addEventListener("click", InittoName);
document.getElementById("NametoPicture").addEventListener("click", NametoPicture);
document.getElementById("PicturetoUsername").addEventListener("click", PicturetoUsername);
document.getElementById("UsernametoMagic").addEventListener("click", UsernametoMagic);
document.getElementById("MagictoDOB").addEventListener("click", MagictoDOB);
document.getElementById("DOBtoGender").addEventListener("click", DOBtoGender);
document.getElementById("GendertoRegion").addEventListener("click", GendertoRegion);
document.getElementById("RegiontoRecovery").addEventListener("click", RegiontoRecovery);
document.getElementById("RecoverytoCreation").addEventListener("click", RecoverytoCreation);
//document.getElementById("VerifytoCreation").addEventListener("click", VerifytoCreation);
document.getElementById("CreationtoSummary").addEventListener("click", CreationtoSummary);
document.getElementById("SummarytoTerms").addEventListener("click", SummarytoTerms);
document.getElementById("TermstoSuccess").addEventListener("click", TermstoSuccess);

document.getElementById("signin").addEventListener("click", signin);

document.getElementById("pp-upload").addEventListener("click", pictureupload);

document.getElementById("uname").addEventListener("input", usernameshare);

var first_name,middle_name,last_name, user_name, magic_sentence, pass_word, gender_sex, dob_dmy, country_name, secondary_email, phonenumber, nex_id, nex_email, hasAgreedtoTermsandCondition = "No", timeofAgreement, dateofAgreement, hasNexOS = 0, hasBubble = 0, pplink = "0";
var imageURL;
var nowdate,ccodeStr = "";

function hasSymbols(string) {
    var symbolPattern = /[^A-Za-z0-9\s]/;
    return symbolPattern.test(string);
}

function hasAlphabet(string) {
    var AlphabetPattern = /[A-Za-z]/;
    return AlphabetPattern.test(string);
}

function hasNumber(string) {
    var NumberPattern = /[0-9]/;
    return NumberPattern.test(string);
}

function hasUnderscore(string) {
    var UnderscorePattern = /[_]/;
    return UnderscorePattern.test(string);
}

function hasAtandDotSymbol(string) {
var hasAtSymbol = string.includes("@");
  var hasDotSymbol = string.includes(".");
  
  return hasAtSymbol && hasDotSymbol;
}

function hasSmallLetter(string) {
    var smallletterPattern = /[a-z]/;
    return smallletterPattern.test(string);
}

function hasBigLetter(string) {
    var bigletterPattern = /[A-Z]/;
    return bigletterPattern.test(string);
}

function signin(){

    const signin_email = document.getElementById("signin-email").value;
    const signin_pass = document.getElementById("signin-pass").value;

    signInWithEmailAndPassword(auth, signin_email, signin_pass)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("You are now signed in");
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

function initfunc(){    
    _init.style.display = "flex";
    _name.style.display = "none";
    _username.style.display = "none";
    _dob.style.display = "none";
    _gender.style.display = "none";
    _magicsentence.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";
    _summary.style.display = "none";
    
}

function namefunc(){    
    _name.style.display = "flex";
    _username.style.display = "none";
    _dob.style.display = "none";
    _gender.style.display = "none";
    _magicsentence.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";


    //while signup user can not be signedin by firebase
    if (user)
    {
        signOut(auth);
    }
}

function picturefunc(){    
    _picture.style.display = "flex";
    _name.style.display = "none";
    _username.style.display = "none";
    _dob.style.display = "none";
    _gender.style.display = "none";
    _magicsentence.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
}

function usernamefunc(){
    _username.style.display = "flex";
    _name.style.display = "none";
    _dob.style.display = "none";
    _gender.style.display = "none";
    _magicsentence.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";

    var date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');

    var min = 10; // Minimum value (inclusive)
    var max = 99; // Maximum value (inclusive)
  
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    nowdate = year+month+day+randomNumber;

    const dnow = document.getElementById("nexid_dnow")
    dnow.innerHTML = nowdate;

    var codeNumber = Math.floor(Math.random() * 4);

    const ccode = document.getElementById("nexid_ccode")

    if(ccodeStr == ""){
        switch(codeNumber){
            case 0:
                ccodeStr = "TDM";
                break;
            case 1:
                ccodeStr = "MVP";
                break;
            case 2:
                ccodeStr = "XFC";
                break;
            case 3:
                ccodeStr = "AVG";
                break;
            case 4:
                ccodeStr = "ZFR";
                break;
            default:
                ccodeStr = "XBM";
                break;
        }

        ccode.innerHTML = ccodeStr;
    }
    
}

function dobfunc(){
    _dob.style.display = "flex";
    _name.style.display = "none";
    _username.style.display = "none";
    _gender.style.display = "none";
    _magicsentence.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";
}

function genderfunc(){
    _gender.style.display = "flex";   
    _dob.style.display = "none";
    _name.style.display = "none";
    _username.style.display = "none";
    _magicsentence.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";
}

function magicsentencefunc(){
    _magicsentence.style.display = "flex";
    _name.style.display = "none";
    _dob.style.display = "none";
    _username.style.display = "none";
    _gender.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";
}

function regionfunc(){
    _region.style.display = "flex";
    _name.style.display = "none";
    _dob.style.display = "none";
    _magicsentence.style.display = "none";
    _gender.style.display = "none";
    _username.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";
}

function recoveryfunc(){
    _recovery.style.display = "flex";
    _name.style.display = "none";
    _dob.style.display = "none";
    _magicsentence.style.display = "none";
    _gender.style.display = "none";
    _region.style.display = "none";
    _username.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";
}
/*
function verifyfunc(){
    _verify.style.display = "flex";
    _name.style.display = "none";
    _dob.style.display = "none";
    _magicsentence.style.display = "none";
    _gender.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    _username.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _success.style.display = "none";

    const verify_msg = document.getElementById("link-sent-msg");
    verify_msg.innerHTML = "A verification link has been sent to <b>" + secondary_email + "</b>. Please go to your email and click on the link to progress from this page."
}
*/

function creationfunc(){
    _creation.style.display = "flex";
    _name.style.display = "none";
    _dob.style.display = "none";
    _magicsentence.style.display = "none";
    _gender.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _success.style.display = "none";
    _terms.style.display = "none";
    _username.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";
}

function summaryfunc(){
    _summary.style.display = "flex";
    _terms.style.display = "none";
    _name.style.display = "none";
    _dob.style.display = "none";
    _magicsentence.style.display = "none";
    _gender.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _success.style.display = "none";
    _username.style.display = "none"; 
    _init.style.display = "none";
    _picture.style.display = "none";
    
    const sum_name = document.getElementById("sum_name");
    const sum_uname = document.getElementById("sum_uname");
    const sum_nid = document.getElementById("sum_nid");
    const sum_nmail = document.getElementById("sum_nmail");
    const sum_pnumber = document.getElementById("sum_pnumber");
    const sum_magics = document.getElementById("sum_magics");
    const sum_pword = document.getElementById("sum_pword");
    const sum_dob = document.getElementById("sum_dob");
    const sum_gender = document.getElementById("sum_gender");
    const sum_country = document.getElementById("sum_country");
    const sum_hasbubble = document.getElementById("sum_hasbubble");
    const sum_hasnexos = document.getElementById("sum_hasnexos");

    sum_name.innerHTML = "<b>Name: </b>" + first_name + " " + middle_name + " " + last_name;
    sum_uname.innerHTML = "<b>Username: </b>" + user_name;
    sum_nid.innerHTML = "<b>NEX ID: </b>" + nex_id;
    sum_magics.innerHTML = "<b>Magic Sentence: </b>" + magic_sentence;
    sum_pword.innerHTML = "<b>Pasword: </b>" + pass_word;
    sum_nmail.innerHTML = "<b>NEX Email: </b>" + nex_email;
    sum_pnumber.innerHTML = "<b>Phone Number: </b>" + phonenumber;
    sum_dob.innerHTML = "<b>Date of Birth: </b>" + dob_dmy.substring(3, 15);
    sum_gender.innerHTML = "<b>Gender: </b>" + gender_sex;
    sum_country.innerHTML = "<b>Country: </b>" + country_name;

    var string;
    if(hasBubble == 1){
        string = "Yes";
    }else{
        string = "No"
    }
    sum_hasbubble.innerHTML = "Will Have A <b>Bubble</b> Account: " + string;

    if(hasNexOS == 1){
        string = "Yes";
    }else{
        string = "No"
    }
    sum_hasnexos.innerHTML = "Will Have A <b>NEX OS</b> Account: " + string;
}

function termsfunc(){
    _terms.style.display = "flex";
    _name.style.display = "none";
    _dob.style.display = "none";
    _magicsentence.style.display = "none";
    _gender.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _success.style.display = "none";
    _username.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";
}

function successfunc(){
    _success.style.display = "flex";
    _name.style.display = "none";
    _dob.style.display = "none";
    _magicsentence.style.display = "none";
    _gender.style.display = "none";
    _region.style.display = "none";
    _recovery.style.display = "none";
    //_verify.style.display = "none";
    _creation.style.display = "none";
    _terms.style.display = "none";
    _username.style.display = "none";
    _summary.style.display = "none";
    _init.style.display = "none";
    _picture.style.display = "none";

    if (user)
    {
        signOut(auth);
    }
}

function InittoName(){
    namefunc();
}

function NametoPicture(){
    const disclaimer = document.getElementById("disclaimer");
    const fname = document.getElementById("fname");
    const mname = document.getElementById("mname");
    const lname = document.getElementById("lname");

    if(fname.value == "" | lname.value == ""){
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "First and Last Name must be filled";
    }else if(hasSymbols(fname.value) | hasSymbols(lname.value) | hasSymbols(mname.value)| hasNumber(fname.value) | hasNumber(lname.value) | hasNumber(mname.value))
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Names must not have any symbols or numbers";
    }else
    {
        first_name = fname.value;
        middle_name = mname.value;
        last_name = lname.value;

        disclaimer.innerHTML = " * <b>Disclaimer:</b> You can not change name later * ";
        disclaimer.style.color = "white";
        picturefunc();
    }
}

function pictureupload(){
    document.getElementById("open-file").click();
}

const destImage = document.createElement('canvas');
const ctx = destImage.getContext('2d');

document.getElementById("open-file").addEventListener("change", function(event) {
    
    imageURL = URL.createObjectURL(event.target.files[0]);
    
    const outputImageAspectRatio = 1;
    const sourceImage = new Image();
    sourceImage.src = imageURL;
    
    // we want to wait for our image to load
    sourceImage.onload = () => {
    // let's store the width and height of our image
         const inputWidth = sourceImage.naturalWidth;
         const inputHeight = sourceImage.naturalHeight;

        // get the aspect ratio of the input image
         const inputImageAspectRatio = inputWidth / inputHeight;

         // if it's bigger than our target aspect ratio
         let outputWidth = inputWidth;
         let outputHeight = inputHeight;
         if (inputImageAspectRatio > outputImageAspectRatio) {
             outputWidth = inputHeight * outputImageAspectRatio;
         } else if (inputImageAspectRatio < outputImageAspectRatio) {
             outputHeight = inputWidth / outputImageAspectRatio;
         }

         // create a canvas that will present the output image
         //const destImage = document.createElement('canvas');
         destImage.width = outputWidth;
         destImage.height = outputHeight;

         // calculate the position to draw the image at
         const outputX = (outputWidth - inputWidth) * 0.5;
         const outputY = (outputHeight - inputHeight) * 0.5;

         // draw our image at position 0, 0 on the canvas
         //const ctx = destImage.getContext('2d');
         ctx.drawImage(sourceImage, outputX, outputY);

         // start loading our image
         var image = document.getElementById('profile-pic');
         image.src = destImage.toDataURL("image/jpeg", 0.5);
    };

    //var image = document.getElementById('profile-pic');
    //imageURL = URL.createObjectURL(event.target.files[0])
    //image.src = imageURL ;

    //imageURL = event.target.files[0];
    //image.src = URL.createObjectURL(imageURL) ; 
}, false);

function PicturetoUsername(){
    usernamefunc();
}

function firebaseupload(url) {
    const outputImageAspectRatio = 1;
    const sourceImage = new Image();
    sourceImage.src = imageURL;
    
    // we want to wait for our image to load
    sourceImage.onload = () => {
    // let's store the width and height of our image
         const inputWidth = sourceImage.naturalWidth;
         const inputHeight = sourceImage.naturalHeight;

        // get the aspect ratio of the input image
         const inputImageAspectRatio = inputWidth / inputHeight;

         // if it's bigger than our target aspect ratio
         let outputWidth = inputWidth;
         let outputHeight = inputHeight;
         if (inputImageAspectRatio > outputImageAspectRatio) {
             outputWidth = inputHeight * outputImageAspectRatio;
         } else if (inputImageAspectRatio < outputImageAspectRatio) {
             outputHeight = inputWidth / outputImageAspectRatio;
         }

         // create a canvas that will present the output image
         //const destImage = document.createElement('canvas');
         destImage.width = outputWidth;
         destImage.height = outputHeight;

         // calculate the position to draw the image at
         const outputX = (outputWidth - inputWidth) * 0.5;
         const outputY = (outputHeight - inputHeight) * 0.5;

         // draw our image at position 0, 0 on the canvas
         //const ctx = destImage.getContext('2d');
         ctx.drawImage(sourceImage, outputX, outputY);
         
         destImage.toBlob((blob) => {
            // Upload the cropped image blob to Firebase Storage
            const storageRef = ref_storage(storage, 'accounts/country/'+country_name+ "/" + auth.currentUser.uid + "/" + "pp" + nex_id + ".jpg");
            uploadBytesResumable(storageRef, blob)
            .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then(downloadURL => {
                        pplink = downloadURL;
                        CreateAccount();
                })
              })
              .catch((error) => {
                alert('Error uploading image:', error);
              });
          }, 'image/jpeg', 0.3);
         
    };
}

function usernameshare()
{
    const uname = document.getElementById("uname");
    const nxid = document.getElementById("nexid_id");
    const nxemail = document.getElementById("nex-email");

    nxid.value = uname.value.toUpperCase();
    nxemail.value = uname.value;
}

function UsernametoMagic(){
    const disclaimer = document.getElementById("disclamer_uname");
    const uname = document.getElementById("uname");

    if(uname.value == ""){
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Username must be filled";
    }else if(!hasAlphabet(uname.value) | !hasNumber(uname.value) | hasSymbols(uname.value))
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Username must contain alphabets & number";
    }else if(uname.value.length < 6 | uname.value.length > 15)
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Username length must be between 6 and 15";
    }
    else
    {
        user_name = uname.value;
        nex_id = ccodeStr + uname.value.toUpperCase() + nowdate;
        nex_email = uname.value + "@nex.mail";
        disclaimer.innerHTML = "Username must contain alphabets,number & underscore";
        disclaimer.style.color = "white";
        magicsentencefunc();
    }
}

function MagictoDOB(){
    const disclaimer = document.getElementById("disclamer_msentence");
    const msentence = document.getElementById("msentence");
    const pword = document.getElementById("pword");
    const re_pword = document.getElementById("re_pword");


    if(msentence.value == "" | pword.value == ""){
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Catchphrase & Password must be filled";
    }else if(hasSymbols(msentence.value) | hasBigLetter(msentence.value) | hasNumber(msentence.value))
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Catchphrase must only have lowercase letters and no symbols or numbers";
    }
    
    else if(!hasSymbols(pword.value))
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Password must contain symbol";
    }else if(!hasSmallLetter(pword.value))
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Password must contain small alphabets";
    }else if(!hasNumber(pword.value))
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Password must contain number";
    }else if(!hasBigLetter(pword.value))
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Password must contain big alphabets";
    }
    
    else if(pword.value.length < 6)
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Password length can not be less than 6";
    }

    else if(pword.value != re_pword.value)
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Retyped Password is not the same";
    }
    else
    {
        magic_sentence = msentence.value;
        pass_word = pword.value;
        disclaimer.innerHTML = "";
        dobfunc();
    }
}

function DOBtoGender(){
    const disclaimer = document.getElementById("disclaimer_dob");
    const dateofbirth = document.getElementById("date");

    var dob = new Date(dateofbirth.value);
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    
    // Check if the birthday hasn't occurred yet this year
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }

    if(age < 18){
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "You must be atleast 18 years old";
    }
    else if(!age){
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Your Birth Date is required";
    }
    else{
        dob_dmy = dob.toString()
        disclaimer.innerHTML = " * <b>Disclaimer:</b> You can not change your <b>Date of Birth</b> later * ";
        disclaimer.style.color = "white";
        genderfunc();
    }
}

function GendertoRegion(){
    const sex = document.getElementById("sex");
    gender_sex = sex.value;

    regionfunc();
}

function RegiontoRecovery(){
    const country = document.getElementById("country");
    country_name = country.value;

    recoveryfunc();
}

function RecoverytoCreation(){
    const disclaimer = document.getElementById("disclaimer_recovery");
    const remail = document.getElementById("remail");
    const pnumber = document.getElementById("pnumber");

    if(remail.value == "" | pnumber.value == ""){
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "E-mail and Phone Number can not be empty";
    }else if(!hasAtandDotSymbol(remail.value))
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "This is not a valid E-mail";
    }else if(pnumber.value.length < 7)
    {
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "Phone Number can not be less than 7";
    }
    else
    {
        secondary_email = remail.value;
        phonenumber = pnumber.value;
        disclaimer.innerHTML = "";
        creationfunc();
    }
}

/*
function VerifytoCreation(){
    const disclaimer = document.getElementById("disclaimer_verify");
}*/

function CreationtoSummary(){
    const hasBubble_tick = document.getElementById("bubble_tick");
    const hasNexOStick = document.getElementById("nexos_tick");

    if(hasBubble_tick.checked){
        hasBubble = 1;
    }else{
        hasBubble = 0;
    }

    if(hasNexOStick.checked){
        hasNexOS = 1;
    }else{
        hasNexOS = 0;
    }
    summaryfunc();
}

function SummarytoTerms(){
    termsfunc();
}

function TermstoSuccess(){
    const disclaimer = document.getElementById("disclaimer_terms");
    const agree_tick = document.getElementById("agreement-trigger");
    var submitbtn = document.getElementById("TermstoSuccess");

    if(!agree_tick.checked){
        disclaimer.style.color = "rgb(255, 100, 100)";
        disclaimer.innerHTML = "You have to accept our agreement to make this account";

    }else{
        var now = new Date();
  
        var year = now.getFullYear();
        var month = String(now.getMonth() + 1).padStart(2, '0');
        var day = String(now.getDate()).padStart(2, '0');
        
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');

        hasAgreedtoTermsandCondition = "Yes";
        timeofAgreement = hours + " : " + minutes + " : " + seconds;
        dateofAgreement = day + " / " + month + " / " + year;

        createUserWithEmailAndPassword(auth, nex_email, pass_word)
        .then((userCredential) => {
            
            disclaimer.innerHTML = "";
            submitbtn.disabled = true;

            if(imageURL === undefined){
                CreateAccount();
                submitbtn.disabled = false;
            }else{
                firebaseupload();
                submitbtn.disabled = false;
            }
        })
        .catch((error) => {
            disclaimer.style.color = "rgb(255, 100, 100)";
            disclaimer.innerHTML = "Something went wrong : " + error.message;
            submitbtn.disabled = false;
        });
        
    }  
}

function CreateAccount() {
    if(nex_id != "" || first_name != "" || last_name != "" || user_name != "" || magic_sentence != "" || pass_word != "" || gender != "" || dob_dmy != "" || country_name != "" || secondary_email != "" || hasAgreedtoTermsandCondition == "Yes" || timeofAgreement != "" || dateofAgreement != ""){
        
        set(ref(database, 'accounts/country/'+country_name+ "/" + auth.currentUser.uid), {
        "NEX ID" : nex_id,
        "First Name": first_name,
        "Middle Name": middle_name,
        "Last Name": last_name, 
        "Username": user_name, 
        "Magic Sentence" : magic_sentence,
        "Password": pass_word,
        "DOB":  dob_dmy,
        "Gender":  gender_sex,
        "Country": country_name,
        "NEX Email": nex_email,
        "Secondary Email" : secondary_email,
        "Phone Number" : phonenumber,
        "isAgreedtoTerms" : hasAgreedtoTermsandCondition,
        "Time of Agreement" : timeofAgreement,
        "Date of Agreement" : dateofAgreement,
        "hasNexOS" : hasNexOS,
        "hasBubble" : hasBubble,
        "privateKey" : auth.currentUser.uid,
        "forceSignOutAllService" : 0,
        "profileImageURL" : pplink
        });

        if(hasNexOS == 1){
            set(ref(database, 'apps/NEX OS/accounts/'+country_name+ "/" + auth.currentUser.uid), {
            "NEX ID" : nex_id,
            "First Name": first_name,
            "Middle Name": middle_name,
            "Last Name": last_name, 
            "Username": user_name, 
            "DOB":  dob_dmy,
            "Gender":  gender_sex,
            "Country": country_name,
            "NEX Email": nex_email,
            "Secondary Email" : secondary_email,
            "Phone Number" : phonenumber,
            "isAgreedtoTerms" : hasAgreedtoTermsandCondition,
            "Time of Agreement" : timeofAgreement,
            "Date of Agreement" : dateofAgreement,
            "profileImageURL" : pplink
            });
        }

        
        if(hasBubble == 1){
            set(ref(database, 'apps/Bubble/accounts/'+country_name+ "/" + auth.currentUser.uid), {
                "NEX ID" : nex_id,
                "First Name": first_name,
                "Middle Name": middle_name,
                "Last Name": last_name, 
                "Username": user_name, 
                "DOB":  dob_dmy,
                "Gender":  gender_sex,
                "Country": country_name,
                "NEX Email": nex_email,
                "Secondary Email" : secondary_email,
                "Phone Number" : phonenumber,
                "isAgreedtoTerms" : hasAgreedtoTermsandCondition,
                "Time of Agreement" : timeofAgreement,
                "Date of Agreement" : dateofAgreement,
                "profileImageURL" : pplink
                });
        }

        successfunc();
            
    }else{
        alert("Something is wrong in the Data. Please Try Again.");
    }
    
}

function NametoInit(){   
    initfunc();  
}

function PicturetoName(){
    
    namefunc(); 
}

function UsernametoPicture(){
    
    picturefunc(); 
}

function MagictoUsername(){
    
    usernamefunc();
    
}

function DOBtoMagic(){
    
    magicsentencefunc();
    
}

function GendertoDOB(){
    
    dobfunc();
    
}

function RegiontoGender(){
    genderfunc();
}

function RecoverytoRegion(){
    regionfunc();
}

function CreationtoRecovery(){
    
    recoveryfunc();
}

function TermstoSummary(){
    summaryfunc();
}

function SummarytoCreation(){
    creationfunc();
}