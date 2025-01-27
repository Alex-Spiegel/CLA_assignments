import React, { useState, useEffect } from "react";

function Testimonials() {
  // Slides als State definieren
  const slides = [
    {
      text: "This platform is an absolute game-changer for competitive programmers. The extensive range of problems and challenges offered here truly hones your skills and prepares you for any coding competition. With detailed solutions and an active community, it's the perfect environment to sharpen your coding prowess.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "June Cha",
      profession: "Software Engineer",
    },
    {
      text: "I can't express enough how valuable this platform has been for me. As someone deeply passionate about algorithms and data structures, I've found the diverse set of problems here both stimulating and enriching. The intuitive interface and seamless experience make it my go-to destination for honing my problem-solving skills.",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      name: "Iida Niskanen",
      profession: "Data Engineer",
    },
    {
      text: "If you're serious about excelling in competitive coding, look no further. This platform not only provides a comprehensive set of problems but also fosters a supportive community where you can exchange ideas and strategies. It's been instrumental in my journey towards becoming a better competitive coder.",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Renee Sims",
      profession: "Cloud Engineer",
    },
    {
      text: "I've tried numerous competitive programming platforms, but none come close to the quality and depth offered here. From beginner-friendly challenges to advanced algorithmic puzzles, there's something for everyone. The platform's commitment to excellence is evident in every aspect, making it my preferred choice for honing my coding skills.",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb",
      name: "Sasha Ho",
      profession: "PhD Student",
    },
    {
      text: "As a seasoned programmer, I'm always on the lookout for platforms that challenge and inspire me. This platform exceeds all expectations with its vast array of problems and unparalleled learning resources. Whether you're a novice or a seasoned coder, you'll find endless opportunities to push your boundaries and elevate your skills.",
      image: "https://randomuser.me/api/portraits/men/97.jpg",
      name: "Veeti Seppanen",
      profession: "Frontend Developer",
    },
  ];

  // Aktuellen Slide-Index speichern
  const [slideIndex, setSlideIndex] = useState(0);

  // Slide-Änderungsfunktion
  const showSlide = (index) => {
    if (index < 0) {
      setSlideIndex(slides.length - 1);
    } else if (index >= slides.length) {
      setSlideIndex(0);
    } else {
      setSlideIndex(index);
    }
  };

  // Automatische Slide-Änderung
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval); // Cleanup
  }, [slides.length]);

  return (
    <section className="text-center mt-3 mb-[80px]">
      <h3 className="text-3xl text-primary font-bold">Testimonials</h3>
      {/* Testimonials Container */}
      <div className="flex justify-center items-center w-[370px] h-[500px] mx-auto border rounded-2xl bg-myWhite">
        {/* Left Arrow */}
        <button
          className="flex items-center justify-center cursor-pointer w-8 h-8 flex-shrink-0 border border-MyLightGray text-base hover:text-primary hover:bg-MyLightGray"
          onClick={() => showSlide(slideIndex - 1)}
        >
          &#10094;
        </button>
        {/* Card Wrapper */}
        <div className="flex flex-col items-center w-[300px] p-7">
          <p className="text-2xl">
            &#128970;&#128970;&#128970;&#128970;&#128970;
          </p>
          <p className="mt-4 text-base font-bold leading-[100%]">
            &#8220;{slides[slideIndex].text}&#8221;
          </p>
          <div className="mb-6 w-12 h-12 rounded-full filter grayscale">
            <img
              className="object-cover w-full h-full mt-6 rounded-full"
              src={slides[slideIndex].image}
              alt="profile-pic"
            />
          </div>
          <h4 className="mt-4 text-sm font-bold">{slides[slideIndex].name}</h4>
          <p className="mt-1 text-xs font-semibold">
            {slides[slideIndex].profession}
          </p>
        </div>
        {/* Right Arrow */}
        <button
          className="flex items-center justify-center cursor-pointer w-8 h-8 flex-shrink-0 border border-MyLightGray text-base hover:text-primary hover:bg-MyLightGray"
          onClick={() => showSlide(slideIndex + 1)}
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
