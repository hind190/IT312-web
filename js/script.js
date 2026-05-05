
//------------QUIZ----------
// استخدام دالة مجهولة (IIFE) مع انتظار تحميل DOM
(function() {
    // التأكد من تحميل الصفحة بالكامل قبل بدء التنفيذ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuiz);
    } else {
        initQuiz();
    }

    function initQuiz() {
        // تعريف ثوابت داخل النطاق المحلي (لن تتعارض مع أي متغير خارجي)
        const QUIZ_NAME = "basic_tools_quiz";
        const TOTAL_QS = 5;

        const correctAnswers = {
            q1: "سكين الشيف",
            q2: "الخشب أو البلاستيك",
            q3: "خلاط كهربائي",
            q4: "غسل اليدين جيدًا",
            q5: "Bread Knife (سكين الخبز)"
        };

        const submitButton = document.getElementById("submitQuizBtn");
        if (!submitButton) {
            console.error("❌ زر إرسال الاختبار غير موجود!");
            return;
        }

        // دالة التحقق من الإجابة على جميع الأسئلة
        function isAllQuestionsAnswered() {
            for (let i = 1; i <= TOTAL_QS; i++) {
                const selected = document.querySelector(`input[name="q${i}"]:checked`);
                if (!selected) {
                    alert(`⚠️ الرجاء الإجابة على السؤال رقم ${i}`);
                    // التمرير إلى السؤال غير المجاب
                    const targetCard = document.querySelector(`.question-card:nth-of-type(${i})`);
                    if (targetCard) targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
                    return false;
                }
            }
            return true;
        }

        // دالة حساب الدرجة
        function calculateScore() {
            let score = 0;
            for (let i = 1; i <= TOTAL_QS; i++) {
                const selected = document.querySelector(`input[name="q${i}"]:checked`);
                if (selected && selected.value === correctAnswers[`q${i}`]) {
                    score++;
                }
            }
            return score;
        }

        // دالة تحديث أفضل نتيجة في localStorage
        function updateBestScore(currentScore) {
            const stored = localStorage.getItem(QUIZ_NAME);
            let best = (stored !== null) ? parseInt(stored) : null;
            if (best === null || currentScore > best) {
                localStorage.setItem(QUIZ_NAME, currentScore);
                best = currentScore;
            }
            return best;
        }

        // دالة تخزين بيانات الاختبار الحالي في sessionStorage
        function storeCurrentQuizData(currentScore, bestScore) {
            sessionStorage.setItem("currentQuizScore", currentScore);
            sessionStorage.setItem("quizBestScore", bestScore);
            sessionStorage.setItem("quizTotalQuestions", TOTAL_QS);
            sessionStorage.setItem("quizName", QUIZ_NAME);
        }

        // معالج النقر على زر الإرسال
        function handleSubmit() {
            // 1. التحقق من الإجابة على جميع الأسئلة
            if (!isAllQuestionsAnswered()) return;

            // 2. حساب الدرجة
            const currentScore = calculateScore();

            // 3. تحديث أفضل نتيجة في localStorage
            const bestScore = updateBestScore(currentScore);

            // 4. تخزين البيانات للصفحة التالية
            storeCurrentQuizData(currentScore, bestScore);

            // 5. الانتقال إلى صفحة النتائج (عدل المسار حسب بنية موقعك)
            window.location.href = "../result.html";
        }

        // ربط الحدث
        submitButton.addEventListener("click", handleSubmit);
    }
})();
