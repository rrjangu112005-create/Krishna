const APP_NAME = "कृष्ण कोचिंग सेंटर";
const CENTER_PHONE = "6375630291";

let currentUser = null;
let currentUserProfile = null;
let selectedExam = "";

const EXAMS = [
    {
        id: "cet",
        name: "राजस्थान CET"
    },
    {
        id: "police",
        name: "राजस्थान पुलिस"
    },
    {
        id: "patwari",
        name: "पटवारी"
    },
    {
        id: "vdo",
        name: "VDO / BDO"
    },
    {
        id: "other",
        name: "अन्य राजस्थान भर्ती"
    }
];


function byId(id) {
    return document.getElementById(id);
}


function showPage(id) {

    document.querySelectorAll(".page")
        .forEach(function(page) {
            page.classList.remove("active");
        });

    const page = byId(id);

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo(0, 0);
}


function openHome() {
    showPage("home");
}


function openExams() {

    showPage("exams");

    renderExams();
}
function renderExams() {

    const container =
        byId("examList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    EXAMS.forEach(function(exam) {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>🎯 ${escapeHtml(exam.name)}</h3>

            <button
                class="primary"
                onclick="selectExam('${exam.id}')">
                इस परीक्षा की सामग्री देखें
            </button>
        `;

        container.appendChild(card);
    });
}


function selectExam(examId) {

    selectedExam = examId;

    showPage("videos");

    loadVideos();
}


function openVideos() {

    showPage("videos");

    loadVideos();
}


function openClasses() {

    showPage("classes");

    loadVideos();
}


function openNotes() {

    showPage("pdfs");

    loadNotes();
}


function openPapers() {

    showPage("papers");

    loadPapers();
}


function openQuestionBank() {

    showPage("questionbank");

    loadQuestionBank();
}


function openCurrentAffairs() {

    showPage("current");

    loadCurrentAffairs();
        }
async function loadVideos() {

    const container =
        byId("videoList");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="card">
            <p>वीडियो लोड हो रहे हैं...</p>
        </div>
    `;

    if (!window.FirebaseApp) {

        showError(
            container,
            "वीडियो सेवा अभी Firebase से connect नहीं हुई है।"
        );

        return;
    }

    try {

        const videos =
            await window.FirebaseApp.getVideos(
                selectedExam
            );

        renderVideos(videos);

    } catch (error) {

        console.error(error);

        showError(
            container,
            "वीडियो लोड नहीं हो सके।"
        );
    }
}


function renderVideos(videos) {

    const container =
        byId("videoList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!videos || videos.length === 0) {

        container.innerHTML = `
            <div class="card">
                <h3>🎥 वीडियो उपलब्ध नहीं हैं</h3>
                <p>
                    इस परीक्षा के लिए अभी कोई वीडियो upload नहीं किया गया है।
                </p>
            </div>
        `;

        return;
    }

    videos.forEach(function(video) {

        const card =
            document.createElement("div");

        card.className = "card";

        const videoUrl =
            escapeAttribute(video.url || "");

        card.innerHTML = `
            <h3>
                ▶️ ${escapeHtml(video.title || "वीडियो")}
            </h3>

            <p>
                ${escapeHtml(video.description || "")}
            </p>

            <video
                controls
                playsinline
                preload="metadata"
                style="width:100%;border-radius:12px;"
                src="${videoUrl}">
            </video>
        `;

        container.appendChild(card);
    });
}


function filterVideos(examId) {

    selectedExam = examId;

    loadVideos();
}
async function loadNotes() {

    const container =
        byId("notesList");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="card">
            <p>Notes लोड हो रहे हैं...</p>
        </div>
    `;

    if (!window.FirebaseApp) {

        showError(
            container,
            "Notes service अभी Firebase से connect नहीं हुई है।"
        );

        return;
    }

    try {

        const files =
            await window.FirebaseApp.getFiles(
                "notes"
            );

        renderFiles(
            container,
            files,
            "📚 PDF / Notes"
        );

    } catch (error) {

        console.error(error);

        showError(
            container,
            "Notes लोड नहीं हो सके।"
        );
    }
}


async function loadPapers() {

    const container =
        byId("papersList");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="card">
            <p>Previous Papers लोड हो रहे हैं...</p>
        </div>
    `;

    if (!window.FirebaseApp) {

        showError(
            container,
            "Previous Papers service अभी Firebase से connect नहीं हुई है।"
        );

        return;
    }

    try {

        const files =
            await window.FirebaseApp.getFiles(
                "papers"
            );

        renderFiles(
            container,
            files,
            "📄 Previous Papers"
        );

    } catch (error) {

        console.error(error);

        showError(
            container,
            "Previous Papers लोड नहीं हो सके।"
        );
    }
}


function renderFiles(
    container,
    files,
    heading
) {

    container.innerHTML = "";

    if (!files || files.length === 0) {

        container.innerHTML = `
            <div class="card">
                <h3>${heading}</h3>
                <p>
                    अभी कोई सामग्री upload नहीं की गई है।
                </p>
            </div>
        `;

        return;
    }

    files.forEach(function(file) {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>
                ${escapeHtml(file.title || "File")}
            </h3>

            <p>
                ${escapeHtml(file.description || "")}
            </p>

            <button
                class="primary"
                onclick="openRemoteFile('${escapeAttribute(file.url)}')">
                📖 खोलें
            </button>
        `;

        container.appendChild(card);
    });
}


function openRemoteFile(url) {

    if (!url) {

        showMessage(
            "File",
            "File उपलब्ध नहीं है।"
        );

        return;
    }

    window.open(url, "_blank");
    }
    async function loadQuestionBank() {

    const container =
        byId("questionBankList");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="card">
            <p>Question Bank लोड हो रहा है...</p>
        </div>
    `;

    if (!window.FirebaseApp) {

        showError(
            container,
            "Question Bank अभी Firebase से connect नहीं हुआ है।"
        );

        return;
    }

    try {

        const questions =
            await window.FirebaseApp.getQuestions(
                selectedExam
            );

        renderQuestionBank(questions);

    } catch (error) {

        console.error(error);

        showError(
            container,
            "Question Bank लोड नहीं हो सका।"
        );
    }
}


function renderQuestionBank(questions) {

    const container =
        byId("questionBankList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!questions || questions.length === 0) {

        container.innerHTML = `
            <div class="card">
                <h3>❓ Question Bank</h3>
                <p>
                    इस परीक्षा के लिए questions उपलब्ध नहीं हैं।
                </p>
            </div>
        `;

        return;
    }

    questions.forEach(function(question, index) {

        const card =
            document.createElement("div");

        card.className = "card";

        const options =
            Array.isArray(question.options)
                ? question.options
                : [];

        card.innerHTML = `
            <h3>
                ${index + 1}.
                ${escapeHtml(question.question)}
            </h3>

            ${options.map(function(option) {

                return `
                    <p>
                        ○ ${escapeHtml(option)}
                    </p>
                `;

            }).join("")}
        `;

        container.appendChild(card);
    });
}


async function openMockTest() {

    showPage("tests");

    await startMockTest();
}
let testQuestions = [];
let testAnswers = {};


async function startMockTest() {

    const container =
        byId("quiz");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="card">
            <p>Mock Test तैयार हो रहा है...</p>
        </div>
    `;

    if (!window.FirebaseApp) {

        showError(
            container,
            "Mock Test अभी Firebase से connect नहीं हुआ है।"
        );

        return;
    }

    try {

        testQuestions =
            await window.FirebaseApp.getQuestions(
                selectedExam
            );

        testAnswers = {};

        renderMockTest();

    } catch (error) {

        console.error(error);

        showError(
            container,
            "Mock Test तैयार नहीं हो सका।"
        );
    }
}


function renderMockTest() {

    const container =
        byId("quiz");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!testQuestions.length) {

        container.innerHTML = `
            <div class="card">
                <h3>📝 Mock Test</h3>
                <p>
                    इस परीक्षा के लिए questions उपलब्ध नहीं हैं।
                </p>
            </div>
        `;

        return;
    }

    testQuestions.forEach(
        function(question, index) {

            const card =
                document.createElement("div");

            card.className = "card";

            let optionsHtml = "";

            question.options.forEach(
                function(option, optionIndex) {

                    optionsHtml += `
                        <label
                            style="display:block;margin:12px 0;">

                            <input
                                type="radio"
                                name="test_${index}"
                                value="${optionIndex}"
                                onchange="setTestAnswer(${index},${optionIndex})">

                            ${escapeHtml(option)}

                        </label>
                    `;
                }
            );

            card.innerHTML = `
                <h3>
                    ${index + 1}.
                    ${escapeHtml(question.question)}
                </h3>

                ${optionsHtml}
            `;

            container.appendChild(card);
        }
    );


    const submit =
        document.createElement("button");

    submit.className = "primary";

    submit.textContent =
        "✅ Test Submit करें";

    submit.onclick =
        submitMockTest;

    container.appendChild(submit);
}


function setTestAnswer(
    questionIndex,
    answerIndex
) {

    testAnswers[questionIndex] =
        answerIndex;
}


async function submitMockTest() {

    let score = 0;
    let attempted = 0;

    testQuestions.forEach(
        function(question, index) {

            if (
                Object.prototype.hasOwnProperty.call(
                    testAnswers,
                    index
                )
            ) {

                attempted++;

                if (
                    Number(testAnswers[index]) ===
                    Number(question.answer)
                ) {

                    score++;
                }
            }
        }
    );


    const result = {

        total:
            testQuestions.length,

        attempted:
            attempted,

        correct:
            score,

        wrong:
            attempted - score,

        score:
            score,

        submittedAt:
            new Date().toISOString()
    };


    if (
        currentUser &&
        window.FirebaseApp
    ) {

        try {

            await window.FirebaseApp.saveTestResult(
                currentUser.uid,
                result
            );

        } catch (error) {

            console.error(error);
        }
    }


    showMessage(
        "🎉 Mock Test Result",

        "कुल प्रश्न: " +
        result.total +

        "\n\nप्रयास: " +
        result.attempted +

        "\n\nसही: " +
        result.correct +

        "\n\nगलत: " +
        result.wrong +

        "\n\nस्कोर: " +
        result.score
    );
            }
                async function loadCurrentAffairs() {

    const container =
        byId("currentList");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="card">
            <p>Current Affairs लोड हो रहे हैं...</p>
        </div>
    `;

    if (!window.FirebaseApp) {

        showError(
            container,
            "Current Affairs service उपलब्ध नहीं है।"
        );

        return;
    }

    try {

        const items =
            await window.FirebaseApp.getCollection(
                "currentAffairs"
            );

        renderCurrentAffairs(items);

    } catch (error) {

        console.error(error);

        showError(
            container,
            "Current Affairs लोड नहीं हो सके।"
        );
    }
}


function renderCurrentAffairs(items) {

    const container =
        byId("currentList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!items || items.length === 0) {

        container.innerHTML = `
            <div class="card">
                <h3>📰 Current Affairs</h3>
                <p>
                    अभी कोई Current Affairs उपलब्ध नहीं है।
                </p>
            </div>
        `;

        return;
    }

    items.forEach(function(item) {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>
                📰 ${escapeHtml(item.title || "")}
            </h3>

            <p>
                ${escapeHtml(item.text || "")}
            </p>
        `;

        container.appendChild(card);
    });
}


async function loadNotices() {

    const container =
        byId("noticeList");

    if (!container) {
        return;
    }

    if (!window.FirebaseApp) {
        return;
    }

    try {

        const items =
            await window.FirebaseApp.getCollection(
                "notices"
            );

        renderNotices(items);

    } catch (error) {

        console.error(error);
    }
}


function renderNotices(items) {

    const container =
        byId("noticeList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!items || items.length === 0) {

        container.innerHTML = `
            <div class="card">
                <h3>📢 Notices</h3>
                <p>
                    अभी कोई नया notice नहीं है।
                </p>
            </div>
        `;

        return;
    }

    items.forEach(function(item) {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>
                📢 ${escapeHtml(item.title || "")}
            </h3>

            <p>
                ${escapeHtml(item.text || "")}
            </p>
        `;

        container.appendChild(card);
    });
}
function openLogin() {

    showPage("login");
}


async function loginUser() {

    const email =
        byId("loginEmail");

    const password =
        byId("loginPassword");

    if (!email || !password) {

        showMessage(
            "Login",
            "Login form उपलब्ध नहीं है।"
        );

        return;
    }

    if (!window.FirebaseApp) {

        showMessage(
            "Firebase",
            "Firebase connection उपलब्ध नहीं है।"
        );

        return;
    }

    try {

        const result =
            await window.FirebaseApp.login(
                email.value.trim(),
                password.value
            );

        currentUser =
            result.user;

        currentUserProfile =
            result.profile;

        showPage("home");

        showMessage(
            "✅ Login सफल",
            "आप सफलतापूर्वक login हो गए हैं।"
        );

    } catch (error) {

        console.error(error);

        showMessage(
            "❌ Login असफल",
            getFirebaseError(error)
        );
    }
}


async function registerUser() {

    const email =
        byId("registerEmail");

    const password =
        byId("registerPassword");

    if (!email || !password) {
        return;
    }

    if (!window.FirebaseApp) {

        showMessage(
            "Firebase",
            "Firebase connection उपलब्ध नहीं है।"
        );

        return;
    }

    try {

        await window.FirebaseApp.register(
            email.value.trim(),
            password.value
        );

        showMessage(
            "✅ Registration सफल",
            "अब अपने account से login करें।"
        );

    } catch (error) {

        console.error(error);

        showMessage(
            "Registration",
            getFirebaseError(error)
        );
    }
}


async function logoutUser() {

    if (
        window.FirebaseApp &&
        window.FirebaseApp.logout
    ) {

        await window.FirebaseApp.logout();
    }

    currentUser = null;
    currentUserProfile = null;

    showPage("home");
}


async function openAdmin() {

    if (!currentUser) {

        showMessage(
            "Admin",
            "पहले login करें।"
        );

        return;
    }

    if (
        !currentUserProfile ||
        currentUserProfile.role !== "admin"
    ) {

        showMessage(
            "Access Denied",
            "इस account को Admin permission नहीं है।"
        );

        return;
    }

    showPage("admin");

    loadAdminContent();
}
async function loadAdminContent() {

    if (
        !currentUserProfile ||
        currentUserProfile.role !== "admin"
    ) {
        return;
    }

    if (!window.FirebaseApp) {
        return;
    }

    try {

        const videos =
            await window.FirebaseApp.getVideos();

        const notes =
            await window.FirebaseApp.getFiles(
                "notes"
            );

        const papers =
            await window.FirebaseApp.getFiles(
                "papers"
            );

        renderAdminItems(
            "adminVideoList",
            videos,
            "video"
        );

        renderAdminItems(
            "adminNotesList",
            notes,
            "notes"
        );

        renderAdminItems(
            "adminPaperList",
            papers,
            "papers"
        );

    } catch (error) {

        console.error(error);
    }
}


function renderAdminItems(
    elementId,
    items,
    type
) {

    const container =
        byId(elementId);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    items.forEach(function(item) {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>
                ${escapeHtml(item.title || "")}
            </h3>

            <button
                onclick="deleteContent(
                    '${type}',
                    '${escapeAttribute(item.id)}'
                )">

                🗑️ Delete

            </button>
        `;

        container.appendChild(card);
    });
}


async function deleteContent(
    type,
    id
) {

    if (
        !currentUserProfile ||
        currentUserProfile.role !== "admin"
    ) {

        showMessage(
            "Access Denied",
            "Admin permission आवश्यक है।"
        );

        return;
    }

    if (
        !window.FirebaseApp ||
        !window.FirebaseApp.deleteContent
    ) {
        return;
    }

    const confirmed =
        window.confirm(
            "क्या आप इसे delete करना चाहते हैं?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await window.FirebaseApp.deleteContent(
            type,
            id
        );

        await loadAdminContent();

        showMessage(
            "✅ सफल",
            "Content delete हो गया।"
        );

    } catch (error) {

        console.error(error);

        showMessage(
            "Delete Error",
            getFirebaseError(error)
        );
    }
}


function callCenter() {

    window.location.href =
        "tel:" + CENTER_PHONE;
}
function showMessage(
    title,
    message
) {

    const modal =
        byId("modal");

    const titleBox =
        byId("mt");

    const messageBox =
        byId("mb");

    if (!modal) {

        window.alert(
            title +
            "\n\n" +
            message
        );

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
        byId("modal");

    if (modal) {
        modal.style.display = "none";
    }
}


function showError(
    container,
    message
) {

    container.innerHTML = `
        <div class="card">
            <h3>⚠️ समस्या</h3>
            <p>
                ${escapeHtml(message)}
            </p>
        </div>
    `;
}


function getFirebaseError(error) {

    if (!error) {
        return "अनजान समस्या हुई।";
    }

    const code =
        error.code || "";

    const messages = {

        "auth/invalid-email":
            "Email सही नहीं है।",

        "auth/user-not-found":
            "यह account नहीं मिला।",

        "auth/wrong-password":
            "Password गलत है।",

        "auth/invalid-credential":
            "Email या Password गलत है।",

        "auth/email-already-in-use":
            "यह Email पहले से registered है।",

        "auth/weak-password":
            "Password कम से कम मजबूत होना चाहिए।"
    };

    return (
        messages[code] ||
        error.message ||
        "Firebase error हुआ।"
    );
}


function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return String(value ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("home");

        if (
            window.FirebaseApp &&
            window.FirebaseApp.watchAuth
        ) {

            window.FirebaseApp.watchAuth(
                function(user, profile) {

                    currentUser = user;
                    currentUserProfile = profile;

                    loadNotices();
                }
            );
        }
    }
);


document.addEventListener(
    "click",
    function(event) {

        const modal =
            byId("modal");

        if (
            modal &&
            event.target === modal
        ) {

            closeModal();
        }
    }
);
