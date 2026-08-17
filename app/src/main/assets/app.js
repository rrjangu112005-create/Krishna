const exams = [
    {
        name: "राजस्थान CET",
        description: "CET की तैयारी, विषयवार सामग्री और Mock Test"
    },
    {
        name: "राजस्थान पुलिस",
        description: "Police भर्ती की तैयारी और अभ्यास"
    },
    {
        name: "पटवारी",
        description: "Patwari परीक्षा की संपूर्ण तैयारी"
    },
    {
        name: "VDO / BDO",
        description: "ग्राम विकास अधिकारी और BDO की तैयारी"
    },
    {
        name: "अन्य राजस्थान भर्ती",
        description: "अन्य प्रतियोगी परीक्षाओं की तैयारी"
    }
];

const questions = [
    {
        question: "राजस्थान की राजधानी क्या है?",
        options: [
            "जयपुर",
            "जोधपुर",
            "उदयपुर",
            "कोटा"
        ],
        answer: 0
    },
    {
        question: "राजस्थान दिवस कब मनाया जाता है?",
        options: [
            "30 मार्च",
            "15 अगस्त",
            "26 जनवरी",
            "1 नवंबर"
        ],
        answer: 0
    },
    {
        question: "CET का पूरा नाम क्या है?",
        options: [
            "Common Eligibility Test",
            "Central Education Test",
            "Career Eligibility Test",
            "Common Exam Training"
        ],
        answer: 0
    },
    {
        question: "राजस्थान का राज्य वृक्ष कौन सा है?",
        options: [
            "खेजड़ी",
            "नीम",
            "पीपल",
            "बरगद"
        ],
        answer: 0
    },
    {
        question: "राजस्थान का राज्य पक्षी कौन सा है?",
        options: [
            "गोडावण",
            "मोर",
            "तोता",
            "कबूतर"
        ],
        answer: 0
    },
    {
        question: "राजस्थान की सबसे बड़ी खारे पानी की झील कौन सी है?",
        options: [
            "सांभर झील",
            "पुष्कर झील",
            "जयसमंद झील",
            "आना सागर"
        ],
        answer: 0
    },
    {
        question: "भारत का संविधान कब लागू हुआ?",
        options: [
            "26 जनवरी 1950",
            "15 अगस्त 1947",
            "26 नवंबर 1949",
            "2 अक्टूबर 1950"
        ],
        answer: 0
    },
    {
        question: "भारत की राजधानी क्या है?",
        options: [
            "नई दिल्ली",
            "मुंबई",
            "जयपुर",
            "लखनऊ"
        ],
        answer: 0
    }
];


function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageId === "exams") {
        loadExams();
    }
}


function loadExams() {

    const container =
        document.getElementById("examList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    exams.forEach(function(exam) {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>🎯 ${exam.name}</h3>

            <p>
                ${exam.description}
            </p>

            <button
                class="primary"
                onclick="openExam('${exam.name}')">

                परीक्षा खोलें

            </button>
        `;

        container.appendChild(card);
    });
            }function openExam(examName) {

    showMessage(
        examName,
        "इस परीक्षा के लिए Syllabus, Notes, PDF, Videos, Previous Papers और Mock Tests उपलब्ध कराए जाएंगे।"
    );
}


function openYouTube(searchText) {

    const url =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(searchText);

    window.location.href = url;
}


function callCenter() {

    window.location.href =
        "tel:6375630291";
}


function showMessage(title, message) {

    const modal =
        document.getElementById("modal");

    const titleBox =
        document.getElementById("mt");

    const messageBox =
        document.getElementById("mb");

    if (!modal) {
        return;
    }

    if (titleBox) {
        titleBox.textContent = title;
    }

    if (messageBox) {
        messageBox.textContent = message;
    }

    modal.style.display = "flex";
}


function closeModal() {

    const modal =
        document.getElementById("modal");

    if (modal) {
        modal.style.display = "none";
    }
}


function startTest() {

    const quiz =
        document.getElementById("quiz");

    if (!quiz) {
        return;
    }

    quiz.innerHTML = "";

    questions.forEach(function(item, index) {

        const questionBox =
            document.createElement("div");

        questionBox.className = "card q";

        let optionsHTML = "";

        item.options.forEach(function(option, optionIndex) {

            optionsHTML += `
                <label>
                    <input
                        type="radio"
                        name="question${index}"
                        value="${optionIndex}">

                    ${option}
                </label>
            `;
        });

        questionBox.innerHTML = `
            <h3>
                ${index + 1}. ${item.question}
            </h3>

            ${optionsHTML}
        `;

        quiz.appendChild(questionBox);
    });

    const submitButton =
        document.createElement("button");

    submitButton.className = "primary";

    submitButton.textContent =
        "✅ उत्तर जमा करें";

    submitButton.onclick =
        calculateResult;

    quiz.appendChild(submitButton);
        }
function calculateResult() {

    let score = 0;
    let attempted = 0;

    questions.forEach(function(item, index) {

        const selected =
            document.querySelector(
                `input[name="question${index}"]:checked`
            );

        if (selected) {

            attempted++;

            if (
                Number(selected.value) ===
                item.answer
            ) {
                score++;
            }
        }
    });

    const wrong =
        attempted - score;

    showMessage(
        "🎉 Mock Test Result",
        "कुल प्रश्न: " +
        questions.length +
        "\n\nप्रयास किए: " +
        attempted +
        "\n\nसही उत्तर: " +
        score +
        "\n\nगलत उत्तर: " +
        wrong +
        "\n\nस्कोर: " +
        score +
        " / " +
        questions.length
    );
}


function openTest() {

    showPage("tests");

    startTest();
}


function openCurrentAffairs() {

    openYouTube(
        "Rajasthan Current Affairs Hindi"
    );
}


function openClasses() {

    openYouTube(
        "Rajasthan CET Police Patwari BDO Classes Hindi"
    );
}


function openVideos() {

    openYouTube(
        "Rajasthan CET latest lecture"
    );
}


function openNotes() {

    showMessage(
        "📚 PDF / Notes",
        "Notes और PDF सामग्री जल्द उपलब्ध कराई जाएगी।"
    );
}


function openPapers() {

    showMessage(
        "📄 Previous Papers",
        "Previous Year Papers जल्द उपलब्ध कराए जाएंगे।"
    );
}


function openExamSection(examName) {

    showMessage(
        examName,
        "इस परीक्षा की तैयारी सामग्री जल्द उपलब्ध कराई जाएगी।"
    );
}document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("home");

        loadExams();

    }
);


document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("modal");

        if (
            modal &&
            event.target === modal
        ) {
            closeModal();
        }

    }
);
