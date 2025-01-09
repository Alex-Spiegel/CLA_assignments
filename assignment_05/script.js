// getting the necessary HTML elements
let quote = document.getElementById("quote");
let testiImg = document.getElementById("testi-img");
let quoterName = document.getElementById("quoter-name");
let quoterProfession = document.getElementById("quoter-profession");

// making an array of objects where the info is stored as key-value pairs
let slides = [
    {
        text: `"This platform is an absolute game-changer for competitive programmers. The extensive range of problems and challenges offered here truly hones your skills and prepares you for any coding competition. With detailed solutions and an active community, it's the perfect environment to sharpen your coding prowess."`,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "June Cha",
        profession: "Software Engineer",
    },
    {
        text: `"I can't express enough how valuable this platform has been for me. As someone deeply passionate about algorithms and data structures, I've found the diverse set of problems here both stimulating and enriching. The intuitive interface and seamless experience make it my go-to destination for honing my problem-solving skills."`,
        image: "https://randomuser.me/api/portraits/women/67.jpg",
        name: "Iida Niskanen",
        profession: "Data Engineer",
    },
    {
        text: `"If you're serious about excelling in competitive coding, look no further. This platform not only provides a comprehensive set of problems but also fosters a supportive community where you can exchange ideas and strategies. It's been instrumental in my journey towards becoming a better competitive coder."`,
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Renee Sims",
        profession: "Cloud engineer",
    },
    {
        text: `"I've tried numerous competitive programming platforms, but none come close to the quality and depth offered here. From beginner-friendly challenges to advanced algorithmic puzzles, there's something for everyone. The platform's commitment to excellence is evident in every aspect, making it my preferred choice for honing my coding skills."`,
        image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb", 
        name: "Sasha Ho",
        profession: "Phd student",
    },
    {
        text: `"As a seasoned programmer, I'm always on the lookout for platforms that challenge and inspire me. This platform exceeds all expectations with its vast array of problems and unparalleled learning resources. Whether you're a novice or a seasoned coder, you'll find endless opportunities to push your boundaries and elevate your skills."`,
        image: "https://randomuser.me/api/portraits/men/97.jpg",
        name: "Veeti Seppanen",
        profession: "Frontend developer",
    }
]

// makes sure to start with 1st (0nd array) slide. Sets variable to 0, calls the showSlides() function and passes 0 as a parameter to it.
let slideIndex = 0;
showSlides(slideIndex);

// the go-one-slide-down function
function minusSlides() {
    slideIndex = slideIndex -1;

    //makes sure to start again from top
    if(slideIndex < 0){
        slideIndex = 4;
    }
    //execute the showSlides() function with the updated slide Index
    showSlides(slideIndex);
}

// the go-one-slide-up function
function plusSlides() {
    slideIndex = slideIndex + 1;

    //makes sure to start again from bottom
    if (slideIndex >= slides.length){
        slideIndex = 0;
    }
    //execute the showSlides() function with the updated slide Index
    showSlides(slideIndex);
}

// manipulating the DOM with the index-selected values
function showSlides(index) {
    quote.textContent = slides[index].text;
    testiImg.src = slides[index].image;
    quoterName.textContent = slides[index].name;
    quoterProfession.textContent = slides[index].profession;
}
// implementing an infinite testimonal loop that changes every 3 seconds
setInterval(plusSlides, 3000);

// getting HTML element and setting if with the JS date API
let year = document.getElementById("year");

let copyrightDate = new Date();
let copyrightYear = copyrightDate.getFullYear();
year.textContent = copyrightYear;

// adding form validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // getting all necessary HTML elements
    let name = document.getElementById("name").value.trim(); //shaving away blank spaces
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    let nameError = document.getElementById("name-error");
    let emailError = document.getElementById("email-error");
    let messageError = document.getElementById("message-error");

    //defining variables for the messages
    let errorMsg01 = "";
    let errorMsg02 = "";
    let errorMsg03 = "";

    if (name === "") {
        errorMsg01 = "Name is required";
        nameError.innerText = errorMsg01;
        return false;
        //stops the rest from executing

    } else {
        nameError.innerText = "";
    }

    if (email === "") {
        errorMsg02 = "Email is required";
        emailError.innerText = errorMsg02;
        return false;
        //stops the rest from executing

    } else {
        emailError.innerText = "";
    }

    if (message === "") {
        errorMsg03 = "Message is required";
        messageError.innerText = errorMsg03;
        return false;
        //stops the rest from executing

    } else {
        messageError.innerText = "";
    }

    // adding sweet alert
    Swal.fire({
        title: "Thank you for reaching out!",
        text: "Form submitted successfully!",
        icon: "success"
      });
});

// adding desired funtionality: When user clicks field, error disappears
document.getElementById('name').addEventListener('focus', function() {
    document.getElementById("name-error").innerText = "";
});

document.getElementById('email').addEventListener('focus', function() {
    document.getElementById('email-error').innerText = "";
});

document.getElementById('message').addEventListener('focus', function() {
    document.getElementById('message-error').innerText = "";
});
