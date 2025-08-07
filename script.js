document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results-container');

    [span_0](start_span)// Correct answers extracted from the PDF's Answer Key[span_0](end_span)
    const questions = [
        { id: 1, answer: 'B' }, { id: 2, answer: 'B' },
        { id: 3, answer: 'A' }, { id: 4, answer: 'A' },
        { id: 5, answer: 'A' }, { id: 6, answer: 'C' },
        { id: 7, answer: 'D' }, { id: 8, answer: 'D' },
        { id: 9, answer: 'A' }, { id: 10, answer: 'D' },
        { id: 11, answer: 'B' }, { id: 12, answer: 'C' },
        { id: 13, answer: 'B' }, { id: 14, answer: 'B' },
        { id: 15, answer: 'D' }
    ];

    const options = ['A', 'B', 'C', 'D'];

    // Generate question cards dynamically
    questions.forEach(q => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.id = `question-${q.id}`;

        // IMPORTANT: Assumes you have images named q1.png, q2.png, etc.
        const imageSrc = `q${q.id}.png`;

        let optionsHTML = '';
        options.forEach(opt => {
            optionsHTML += `
                <label>
                    <input type="radio" name="q${q.id}" value="${opt}">
                    <span>Option ${opt}</span>
                </label>
            `;
        });

        questionCard.innerHTML = `
            <h3>Question ${q.id}</h3>
            <img src="${imageSrc}" alt="Image for Question ${q.id}">
            <div class="options">
                ${optionsHTML}
            </div>
        `;
        quizForm.appendChild(questionCard);
    });

    submitBtn.addEventListener('click', function () {
        let score = 0;
        const totalQuestions = questions.length;

        questions.forEach(q => {
            const questionCard = document.getElementById(`question-${q.id}`);
            const selectedOption = quizForm.querySelector(`input[name="q${q.id}"]:checked`);
            const labels = questionCard.querySelectorAll('.options label');

            // Disable all options for this question
            questionCard.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = true;
            });

            if (selectedOption) {
                if (selectedOption.value === q.answer) {
                    score++;
                    questionCard.classList.add('correct');
                } else {
                    questionCard.classList.add('incorrect');
                    // Highlight the correct answer as well
                    const correctLabel = Array.from(labels).find(label => label.querySelector('input').value === q.answer);
                    if(correctLabel) {
                        correctLabel.style.backgroundColor = '#a5d6a7'; // A lighter green for the correct answer hint
                        correctLabel.style.borderColor = '#4caf50';
                    }
                }
            } else {
                 // The user didn't answer
                 questionCard.classList.add('incorrect');
                 const correctLabel = Array.from(labels).find(label => label.querySelector('input').value === q.answer);
                 if(correctLabel) {
                    correctLabel.style.backgroundColor = '#a5d6a7';
                    correctLabel.style.borderColor = '#4caf50';
                 }
            }
        });

        // Display the final score
        resultsContainer.innerHTML = `You scored ${score} out of ${totalQuestions}!`;
        resultsContainer.style.backgroundColor = score > totalQuestions / 2 ? '#e8f5e9' : '#ffebee';
        resultsContainer.style.color = score > totalQuestions / 2 ? '#2e7d32' : '#c62828';
        
        // Disable the submit button after submission
        submitBtn.disabled = true;
    });
});
