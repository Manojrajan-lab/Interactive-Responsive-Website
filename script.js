// IMAGE CAROUSEL

const images = [
    "https://ik.imagekit.io/Mylab/1018-600x400.jpg",
    "https://ik.imagekit.io/Mylab/1016-600x400.jpg",
    "https://ik.imagekit.io/Mylab/1015-600x400.jpg"
  ];
  
  let currentIndex = 0;
  const carouselImg = document.getElementById("carousel-img");
  
  function showImage() {
    carouselImg.src = images[currentIndex];
  }
  
  document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  });
  
  document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  });
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  }, 5000);
  
  
  // QUIZ FUNCTIONALITY
  
  const quizData = [
    {
      question: "What does CSS stand for?",
      answers: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System"
      ],
      correct: 0
    },
    {
      question: "Which language runs in the browser?",
      answers: ["Python", "JavaScript", "C++"],
      correct: 1
    },
    {
      question: "What does API stand for?",
      answers: [
        "Application Programming Interface",
        "Advanced Programming Internet",
        "Applied Program Integration"
      ],
      correct: 0
    }
  ];
  
  let questionIndex = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  
  function loadQuestion() {
    const current = quizData[questionIndex];
    questionEl.textContent = current.question;
    answersEl.innerHTML = "";
  
    current.answers.forEach((answer, index) => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.addEventListener("click", () => selectAnswer(index));
      answersEl.appendChild(btn);
    });
  }
  
  function selectAnswer(index) {
    const buttons = document.querySelectorAll("#answers button");
  
    buttons.forEach((btn, i) => {
      btn.disabled = true;
  
      if (i === quizData[questionIndex].correct) {
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
      }
    });
  
    if (index === quizData[questionIndex].correct) {
      score++;
    }
  }
  
  
  nextBtn.addEventListener("click", () => {
    questionIndex++;
    if (questionIndex < quizData.length) {
      loadQuestion();
    } else {
      document.getElementById("quiz-container").innerHTML =
        `<h3>You scored ${score} out of ${quizData.length}</h3>`;
    }
  });
  
  loadQuestion();
  
  // FETCH API (JOKE)
  
  const jokeBtn = document.getElementById("joke-btn");
  const jokeText = document.getElementById("joke");
  
  jokeBtn.addEventListener("click", async () => {
    jokeText.textContent = "Loading joke...";
  
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
  
      jokeText.textContent = `${data.setup} - ${data.punchline}`;
    } catch (error) {
      jokeText.textContent = "Failed to load joke. Try again.";
    }
  });
  