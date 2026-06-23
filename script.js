const addScoreBtnElement = document.getElementById("addBtn")
const clearBtnElement = document.getElementById("clearBtn")
const scorelistDiv = document.getElementById("scoreList")
const testCountDiv = document.getElementById("testCount")
const averageDiv = document.getElementById("average")
const bestScoreDiv = document.getElementById("bestScore")
const lowerScoreDiv = document.getElementById("lowestScore")
const gradeDisplayDiv = document.getElementById("gradeDisplay")
const starDisplayDiv = document.getElementById("starDisplay")
const scoreInputElement = document.getElementById("scoreInput")

let scores = []

function addscore() {
  const rawValue = scoreInputElement.value.trim()

  if (rawValue === "") {
    scorelistDiv.textContent = "Please enter a score"
    return
  }

  const score = Number(rawValue)

  if (Number.isNaN(score)) {
    scorelistDiv.textContent = "Please enter a valid number"
    return
  }

  if (score < 0 || score > 100) {
    scorelistDiv.textContent = "Score must be between 0-100"
    return
  }

  scores.push(score)
  scoreInputElement.value = ""
  scoreInputElement.focus()
  updateresult()
}

function clearAllScore() {
  scores.splice(0, scores.length)
  scoreInputElement.value = ""
  updateresult()
}

function updateresult() {
  if (scores.length === 0) {
    scorelistDiv.className = "empty"
    scorelistDiv.textContent = "No scores yet"
    testCountDiv.textContent = 0
    averageDiv.textContent = "--"
    bestScoreDiv.textContent = "--"
    lowerScoreDiv.textContent = "--"
    gradeDisplayDiv.textContent = "--"
    starDisplayDiv.textContent = ""
    return
  }

  scorelistDiv.className = ""
  scorelistDiv.innerHTML = scores
    .map((score) => `<div class="score-item">${score}</div>`)
    .join("")

  testCountDiv.textContent = scores.length

  let sum = 0
  let maxScore = scores[0]
  let minScore = scores[0]

  for (const score of scores) {
    sum += score
    if (score > maxScore) {
      maxScore = score
    }
    if (score < minScore) {
      minScore = score
    }
  }

  const average = sum / scores.length
  averageDiv.textContent = average.toFixed(2)
  bestScoreDiv.textContent = maxScore
  lowerScoreDiv.textContent = minScore

  const roundedAverage = Math.round(average)
  let grade = "F"
  let stars = "star"

  if (roundedAverage >= 90) {
    grade = "A"
    stars = "5 star"
  } else if (roundedAverage >= 80) {
    grade = "B"
    stars = "4 star"
  } else if (roundedAverage >= 70) {
    grade = "C"
    stars = "3 star"
  } else if (roundedAverage >= 60) {
    grade = "D"
    stars = "2 star"
  }

  gradeDisplayDiv.textContent = grade
  starDisplayDiv.textContent = stars
}

updateresult()

addScoreBtnElement.addEventListener("click", addscore)
clearBtnElement.addEventListener("click", clearAllScore)
scoreInputElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addscore()
  }
})
