// ========================================
// home.js - صفحة الرئيسية كاملة
// ========================================

// 1. زر العودة للأعلى
(function() {
    const backBtn = document.createElement('button');
    backBtn.id = 'backToTop';
    backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #4f6357;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 22px;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: transform 0.3s;
    `;
    backBtn.onmouseover = () => backBtn.style.transform = 'scale(1.1)';
    backBtn.onmouseout = () => backBtn.style.transform = 'scale(1)';
    document.body.appendChild(backBtn);

    window.addEventListener('scroll', () => {
        backBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('✅ تم العودة للأعلى');
    });
})();

// 2. زر تبديل الثيمات (بألوان رايقة)
(function () {

    // هذا يشتغل فوراً قبل أي شي — يطبق الثيم على كل الصفحات
    if (localStorage.getItem("siteTheme") === "dark") {
        document.body.classList.add("dark-theme");
    }

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else { fn(); }
    }

    onReady(function () {

        var btn = document.getElementById("themeToggleBtn");
        if (!btn) return; // باقي الصفحات توقف هنا — الثيم طُبق فوق

        var icon  = btn.querySelector("i");
        var label = btn.querySelector("span");

        // ضبط الزر حسب الثيم الحالي
        if (localStorage.getItem("siteTheme") === "dark") {
            icon.className    = "fas fa-sun";
            label.textContent = "الثيم الفاتح";
        }

        btn.addEventListener("click", function () {
            var isDark = document.body.classList.toggle("dark-theme");

            if (isDark) {
                icon.className    = "fas fa-sun";
                label.textContent = "الثيم الفاتح";
                localStorage.setItem("siteTheme", "dark");
            } else {
                icon.className    = "fas fa-moon";
                label.textContent = "الثيم الداكن";
                localStorage.setItem("siteTheme", "light");
            }
        });

    });

})();

// 3. زر "المزيد" للدروس
(function() {
    const courses = document.querySelectorAll('.course-item');
    if (courses.length > 2) {
        for (let i = 2; i < courses.length; i++) {
            courses[i].style.display = 'none';
        }

        const container = document.querySelector('.course-slider');
        const moreBtn = document.createElement('button');
        moreBtn.textContent = 'المزيد من الدورات ▼';
        moreBtn.style.cssText = `
            display: block;
            margin: 20px auto;
            padding: 12px 30px;
            background: #4f6357;
            color: white;
            border: none;
            border-radius: 40px;
            cursor: pointer;
            font-size: 16px;
            transition: 0.3s;
        `;
        moreBtn.onmouseover = () => moreBtn.style.background = '#6f8f82';
        moreBtn.onmouseout = () => moreBtn.style.background = '#4f6357';
        
        container.parentNode.insertBefore(moreBtn, container.nextSibling);

        let expanded = false;
        moreBtn.addEventListener('click', () => {
            for (let i = 2; i < courses.length; i++) {
                courses[i].style.display = expanded ? 'none' : 'block';
            }
            expanded = !expanded;
            moreBtn.textContent = expanded ? 'عرض أقل ▲' : 'المزيد من الدورات ▼';
            console.log(`✅ تم ${expanded ? 'إظهار' : 'إخفاء'} الدروس الإضافية`);
        });
    }
})();

// 4. زر البحث
(function() {
    const searchInput = document.querySelector('nav input[type="text"]');
    if (searchInput) {
        searchInput.placeholder = 'ابحث عن دورة...';
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            const courses = document.querySelectorAll('.course-item');
            let foundCount = 0;

            courses.forEach(course => {
                const title = course.querySelector('h3')?.innerText.toLowerCase() || '';
                const desc = course.querySelector('p')?.innerText.toLowerCase() || '';
                
                if (searchTerm === '' || title.includes(searchTerm) || desc.includes(searchTerm)) {
                    course.style.display = 'block';
                    foundCount++;
                } else {
                    course.style.display = 'none';
                }
            });

            let noResultsMsg = document.querySelector('.no-results-msg');
            if (searchTerm !== '' && foundCount === 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('p');
                    noResultsMsg.className = 'no-results-msg';
                    noResultsMsg.style.cssText = 'text-align: center; color: #e94560; margin: 20px;';
                    noResultsMsg.textContent = '❌ لا توجد نتائج مطابقة للبحث';
                    document.querySelector('.course-slider').parentNode.appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
            
            console.log(`✅ بحث عن: "${searchTerm}" - تم العثور على ${foundCount} نتيجة`);
        });
    }
})();

// 5. تأثير عند الضغط على أزرار عرض الدرس
(function() {
    const courseBtns = document.querySelectorAll('.course-btn');
    courseBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const courseName = this.closest('.course-item')?.querySelector('h3')?.innerText || 'الدورة';
            console.log(`✅ تم الضغط على: عرض درس ${courseName}`);
        });
    });
})();

// 6. تأثير عند الضغط على أزرار التنقل
(function() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const pageName = this.innerText;
            console.log(`✅ تم الضغط على: ${pageName}`);
        });
    });
})();

// 7. تأثير عند الضغط على أيقونات التواصل الاجتماعي
(function() {
    const socialIcons = document.querySelectorAll('.social-icons i');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.classList[1]?.replace('fa-', '') || 'وسائل التواصل';
            alert(`📍 سيتم نقلك إلى صفحتنا على ${platform}`);
            console.log(`✅ تم الضغط على: ${platform}`);
        });
    });
})();

// 8. تأثير عند الضغط على الشروط والأحكام
(function() {
    const terms = document.querySelector('.footer-right p');
    if (terms) {
        terms.addEventListener('click', function() {
            alert('📜 الشروط والأحكام:\n\n1. جميع الحقوق محفوظة\n2. يمنع نسخ المحتوى دون إذن\n3. الاشتراك يمنحك صلاحية الوصول لكل الدورات');
            console.log('✅ تم الضغط على: الشروط والأحكام');
        });
        terms.style.cursor = 'pointer';
    }
})();

// 9. الساعة الحقيقية (لون أخضر - بدون ثواني)
(function() {
    setTimeout(function() {
        const footer = document.querySelector('.footer');
        if (!footer) {
            console.log('ما لقيت الفوتر');
            return;
        }
        
        const clockDiv = document.createElement('div');
        clockDiv.id = 'realTimeClock';
        clockDiv.style.cssText = 'background:#4f6357;color:white;padding:10px 20px;border-radius:30px;font-size:16px;text-align:center;margin:15px auto;width:fit-content;font-family:Tajawal,sans-serif;';
        
        footer.parentNode.insertBefore(clockDiv, footer);
        
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString('ar-SA');
            clockDiv.innerHTML = '🕐 ' + dateString + ' - ' + timeString;
        }
        
        updateClock();
        setInterval(updateClock, 60000);
        
        console.log('✅ الساعة شغالة (أخضر - بدون ثواني)');
    }, 500);
})();

console.log('✅ تم تحميل جميع أزرار الصفحة الرئيسية بنجاح!');
// ========================================
// home.js - صفحة الرئيسية كاملة نهايه
// ========================================

// ============================================================
//  QUIZ — الأدوات الأساسية للطبخ
// ============================================================
(function () {

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else { fn(); }
    }

    onReady(function () {

        var submitBtn = document.getElementById("submitQuizBtn");
        if (!submitBtn) return;

        var TOTAL_QUESTIONS = 5;
        var QUIZ_KEY = "basic_tools_quiz";

        var CORRECT_ANSWERS = {
            q1: "سكين الشيف",
            q2: "الخشب أو البلاستيك",
            q3: "خلاط كهربائي",
            q4: "غسل اليدين جيدًا",
            q5: "Bread Knife (سكين الخبز)"
        };

        function allAnswered() {
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                if (!document.querySelector('input[name="q' + i + '"]:checked')) {
                    alert("الرجاء الإجابة على السؤال رقم " + i);
                    var card = document.querySelectorAll(".question-card")[i - 1];
                    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
                    return false;
                }
            }
            return true;
        }

        function calculateScore() {
            var score = 0;
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                var key = "q" + i;
                var selected = document.querySelector('input[name="' + key + '"]:checked');
                if (selected && selected.value === CORRECT_ANSWERS[key]) score++;
            }
            return score;
        }

        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!allAnswered()) return;

            var currentScore = calculateScore();
            var stored = localStorage.getItem(QUIZ_KEY);
            var bestScore = stored !== null ? parseInt(stored, 10) : 0;
            if (currentScore > bestScore) {
                bestScore = currentScore;
                localStorage.setItem(QUIZ_KEY, bestScore);
            }

            sessionStorage.setItem("currentQuizScore",   currentScore);
            sessionStorage.setItem("quizBestScore",      bestScore);
            sessionStorage.setItem("quizTotalQuestions", TOTAL_QUESTIONS);
            sessionStorage.setItem("quizName",           QUIZ_KEY);

            window.location.href = "../result.html";
        });

    });

})();

// ============================================================
//  QUIZ — كيك الفانيلا
// ============================================================
(function () {

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else { fn(); }
    }

    onReady(function () {

        var submitBtn = document.getElementById("submitQuizBtn");
        if (!submitBtn) return;

        var TOTAL_QUESTIONS = 5;
        var QUIZ_KEY = "vanilla_cake_quiz";

        var CORRECT_ANSWERS = {
            q1: "15 دقيقة",
            q2: "180 درجة",
            q3: "ملعقة خشبية",
            q4: "لا تفتح قبل 20 دقيقة",
            q5: "كاكاو بودرة"
        };

        function allAnswered() {
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                if (!document.querySelector('input[name="q' + i + '"]:checked')) {
                    alert("الرجاء الإجابة على السؤال رقم " + i);
                    var card = document.querySelectorAll(".question-card")[i - 1];
                    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
                    return false;
                }
            }
            return true;
        }

        function calculateScore() {
            var score = 0;
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                var key = "q" + i;
                var selected = document.querySelector('input[name="' + key + '"]:checked');
                if (selected && selected.value === CORRECT_ANSWERS[key]) score++;
            }
            return score;
        }

        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!allAnswered()) return;

            var currentScore = calculateScore();
            var stored = localStorage.getItem(QUIZ_KEY);
            var bestScore = stored !== null ? parseInt(stored, 10) : 0;
            if (currentScore > bestScore) {
                bestScore = currentScore;
                localStorage.setItem(QUIZ_KEY, bestScore);
            }

            sessionStorage.setItem("currentQuizScore",   currentScore);
            sessionStorage.setItem("quizBestScore",      bestScore);
            sessionStorage.setItem("quizTotalQuestions", TOTAL_QUESTIONS);
            sessionStorage.setItem("quizName",           QUIZ_KEY);

            window.location.href = "../result.html";
        });

    });

})();

// ============================================================
//  QUIZ — القهوة السعودية
// ============================================================
(function () {

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else { fn(); }
    }

    onReady(function () {

        var submitBtn = document.getElementById("submitQuizBtn");
        if (!submitBtn) return;

        // تحقق إننا في صفحة كويز القهوة تحديداً
        if (!document.querySelector('input[name="q1"][value="بن سعودي"]')) return;

        var TOTAL_QUESTIONS = 5;
        var QUIZ_KEY = "saudi_coffee_quiz";

        var CORRECT_ANSWERS = {
            q1: "سكر",
            q2: "10 دقائق",
            q3: "هاون ومدقة (مهباش)",
            q4: "الاكتفاء (لا تريد المزيد)",
            q5: "قرفة"
        };

        function allAnswered() {
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                if (!document.querySelector('input[name="q' + i + '"]:checked')) {
                    alert("الرجاء الإجابة على السؤال رقم " + i);
                    var card = document.querySelectorAll(".question-card")[i - 1];
                    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
                    return false;
                }
            }
            return true;
        }

        function calculateScore() {
            var score = 0;
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                var key = "q" + i;
                var selected = document.querySelector('input[name="' + key + '"]:checked');
                if (selected && selected.value === CORRECT_ANSWERS[key]) score++;
            }
            return score;
        }

        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!allAnswered()) return;

            var currentScore = calculateScore();
            var stored = localStorage.getItem(QUIZ_KEY);
            var bestScore = stored !== null ? parseInt(stored, 10) : 0;
            if (currentScore > bestScore) {
                bestScore = currentScore;
                localStorage.setItem(QUIZ_KEY, bestScore);
            }

            sessionStorage.setItem("currentQuizScore",   currentScore);
            sessionStorage.setItem("quizBestScore",      bestScore);
            sessionStorage.setItem("quizTotalQuestions", TOTAL_QUESTIONS);
            sessionStorage.setItem("quizName",           QUIZ_KEY);

            window.location.href = "../result.html";
        });

    });

})();

// ============================================================
//  QUIZ — الفطور الصحي
// ============================================================
(function () {

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else { fn(); }
    }

    onReady(function () {

        var submitBtn = document.getElementById("submitQuizBtn");
        if (!submitBtn) return;

        // تمييز هذا الكويز عن غيره
        if (!document.querySelector('input[name="q1"][value="شوفان"]')) return;

        var TOTAL_QUESTIONS = 5;
        var QUIZ_KEY = "healthy_breakfast_quiz";

        var CORRECT_ANSWERS = {
            q1: "دقيق أبيض",
            q2: "5 دقائق",
            q3: "خلاط كهربائي",
            q4: "مكسرات محمصة",
            q5: "10 دقائق"
        };

        function allAnswered() {
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                if (!document.querySelector('input[name="q' + i + '"]:checked')) {
                    alert("الرجاء الإجابة على السؤال رقم " + i);
                    var card = document.querySelectorAll(".question-card")[i - 1];
                    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
                    return false;
                }
            }
            return true;
        }

        function calculateScore() {
            var score = 0;
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                var key = "q" + i;
                var selected = document.querySelector('input[name="' + key + '"]:checked');
                if (selected && selected.value === CORRECT_ANSWERS[key]) score++;
            }
            return score;
        }

        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!allAnswered()) return;

            var currentScore = calculateScore();
            var stored = localStorage.getItem(QUIZ_KEY);
            var bestScore = stored !== null ? parseInt(stored, 10) : 0;
            if (currentScore > bestScore) {
                bestScore = currentScore;
                localStorage.setItem(QUIZ_KEY, bestScore);
            }

            sessionStorage.setItem("currentQuizScore",   currentScore);
            sessionStorage.setItem("quizBestScore",      bestScore);
            sessionStorage.setItem("quizTotalQuestions", TOTAL_QUESTIONS);
            sessionStorage.setItem("quizName",           QUIZ_KEY);

            window.location.href = "../result.html";
        });

    });

})();

// ============================================================
//  QUIZ — فطاير بالجبن والدجاج
// ============================================================
(function () {

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else { fn(); }
    }

    onReady(function () {

        var submitBtn = document.getElementById("submitQuizBtn");
        if (!submitBtn) return;

        // تمييز هذا الكويز عن غيره
        if (!document.querySelector('input[name="q1"][value="دقيق"]')) return;

        var TOTAL_QUESTIONS = 5;
        var QUIZ_KEY = "cheese_chicken_pie_quiz";

        var CORRECT_ANSWERS = {
            q1: "سكر",
            q2: "60 دقيقة",
            q3: "حشوة اللحم المفروم",
            q4: "180 درجة مئوية",
            q5: "10 دقائق"
        };

        function allAnswered() {
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                if (!document.querySelector('input[name="q' + i + '"]:checked')) {
                    alert("الرجاء الإجابة على السؤال رقم " + i);
                    var card = document.querySelectorAll(".question-card")[i - 1];
                    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
                    return false;
                }
            }
            return true;
        }

        function calculateScore() {
            var score = 0;
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                var key = "q" + i;
                var selected = document.querySelector('input[name="' + key + '"]:checked');
                if (selected && selected.value === CORRECT_ANSWERS[key]) score++;
            }
            return score;
        }

        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!allAnswered()) return;

            var currentScore = calculateScore();
            var stored = localStorage.getItem(QUIZ_KEY);
            var bestScore = stored !== null ? parseInt(stored, 10) : 0;
            if (currentScore > bestScore) {
                bestScore = currentScore;
                localStorage.setItem(QUIZ_KEY, bestScore);
            }

            sessionStorage.setItem("currentQuizScore",   currentScore);
            sessionStorage.setItem("quizBestScore",      bestScore);
            sessionStorage.setItem("quizTotalQuestions", TOTAL_QUESTIONS);
            sessionStorage.setItem("quizName",           QUIZ_KEY);

            window.location.href = "../result.html";
        });

    });

})();

// ============================================================
//  QUIZ — التورتيلا بالدجاج
// ============================================================
(function () {

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else { fn(); }
    }

    onReady(function () {

        var submitBtn = document.getElementById("submitQuizBtn");
        if (!submitBtn) return;

        // تمييز هذا الكويز عن غيره
        if (!document.querySelector('input[name="q1"][value="صدور دجاج"]')) return;

        var TOTAL_QUESTIONS = 5;
        var QUIZ_KEY = "tortilla_chicken_quiz";

        var CORRECT_ANSWERS = {
            q1: "زيتون أسود",
            q2: "5 دقائق",
            q3: "حشوة المأكولات البحرية",
            q4: "3 أيام",
            q5: "تسخينها في الفرن"
        };

        function allAnswered() {
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                if (!document.querySelector('input[name="q' + i + '"]:checked')) {
                    alert("الرجاء الإجابة على السؤال رقم " + i);
                    var card = document.querySelectorAll(".question-card")[i - 1];
                    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
                    return false;
                }
            }
            return true;
        }

        function calculateScore() {
            var score = 0;
            for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
                var key = "q" + i;
                var selected = document.querySelector('input[name="' + key + '"]:checked');
                if (selected && selected.value === CORRECT_ANSWERS[key]) score++;
            }
            return score;
        }

        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!allAnswered()) return;

            var currentScore = calculateScore();
            var stored = localStorage.getItem(QUIZ_KEY);
            var bestScore = stored !== null ? parseInt(stored, 10) : 0;
            if (currentScore > bestScore) {
                bestScore = currentScore;
                localStorage.setItem(QUIZ_KEY, bestScore);
            }

            sessionStorage.setItem("currentQuizScore",   currentScore);
            sessionStorage.setItem("quizBestScore",      bestScore);
            sessionStorage.setItem("quizTotalQuestions", TOTAL_QUESTIONS);
            sessionStorage.setItem("quizName",           QUIZ_KEY);

            window.location.href = "../result.html";
        });

    });

})();

// ============================================================
//  RESULT PAGE MODULE
// ============================================================
(function () {

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    onReady(function () {

        // تحقق من وجود عناصر صفحة النتيجة (يمنع التشغيل في صفحات أخرى)
        var currentScoreEl = document.getElementById("currentScore");
        var bestScoreEl    = document.getElementById("bestScore");
        if (!currentScoreEl || !bestScoreEl) return;

        // جلب البيانات
        var currentScore = sessionStorage.getItem("currentQuizScore");
        var bestScore    = sessionStorage.getItem("quizBestScore");
        var total        = sessionStorage.getItem("quizTotalQuestions");

        // عرض الدرجات — إذا ما في بيانات يعرض رسالة تنبيه
        if (currentScore === null || total === null) {
            currentScoreEl.textContent = "لا توجد بيانات";
            bestScoreEl.textContent    = "لا توجد بيانات";
        } else {
            currentScoreEl.textContent = currentScore + " / " + total;
            bestScoreEl.textContent    = bestScore    + " / " + total;
        }

    });

})();


// ============================================================
//  ADD RECIPE PAGE MODULE
// ============================================================
(function () {

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    onReady(function () {

        // تحقق إننا في صفحة إضافة وصفة
        if (!document.querySelector(".add-recipe-page")) return;

        // ربط البطاقات بالـ modals
        var cardModalMap = [
            { cardIndex: 0, modalId: "modal-social"  },
            { cardIndex: 1, modalId: "modal-website" },
            { cardIndex: 2, modalId: "modal-image"   },
            { cardIndex: 3, modalId: "modal-text"    }
        ];

        var cards = document.querySelectorAll(".method-card");

        cardModalMap.forEach(function (item) {
            if (cards[item.cardIndex]) {
                cards[item.cardIndex].addEventListener("click", function () {
                    openModal(item.modalId);
                });
            }
        });

        // فتح وإغلاق الـ modal
        function openModal(id) {
            var modal = document.getElementById(id);
            if (modal) modal.classList.add("active");
        }

        function closeModal(id) {
            var modal = document.getElementById(id);
            if (modal) modal.classList.remove("active");
        }

        // زر الإغلاق
        document.querySelectorAll(".modal-close").forEach(function (btn) {
            btn.addEventListener("click", function () {
                closeModal(this.getAttribute("data-close"));
            });
        });

        // إغلاق بالضغط خارج الـ modal
        document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
            overlay.addEventListener("click", function (e) {
                if (e.target === overlay) closeModal(overlay.id);
            });
        });

        // رفع صورة — عرض اسم الملف
        var imageInput = document.getElementById("imageUpload");
        if (imageInput) {
            imageInput.addEventListener("change", function () {
                var preview = document.getElementById("uploadPreview");
                if (this.files[0]) {
                    preview.textContent = "✔ " + this.files[0].name;
                }
            });
        }

        // دالة Toast
        function showToast(msg) {
            var toast = document.getElementById("toast");
            var toastMsg = document.getElementById("toast-msg");
            if (!toast) return;
            toastMsg.textContent = msg;
            toast.classList.add("show");
            setTimeout(function () { toast.classList.remove("show"); }, 3000);
        }

        // أزرار الإرسال
        var actions = [
            {
                btnId: "btn-social",
                modalId: "modal-social",
                inputId: "input-social",
                validate: function (val) { return val.startsWith("http"); },
                errorMsg: "الرجاء إدخال رابط صحيح",
                successMsg: "تمت إضافة الفيديو بنجاح! 🎉"
            },
            {
                btnId: "btn-website",
                modalId: "modal-website",
                inputId: "input-website",
                validate: function (val) { return val.startsWith("http"); },
                errorMsg: "الرجاء إدخال رابط صحيح",
                successMsg: "تمت إضافة الوصفة بنجاح! 🎉"
            },
            {
                btnId: "btn-image",
                modalId: "modal-image",
                inputId: "imageUpload",
                validate: function () {
                    var f = document.getElementById("imageUpload");
                    return f && f.files.length > 0;
                },
                errorMsg: "الرجاء اختيار صورة أولاً",
                successMsg: "تمت إضافة الصورة بنجاح! 🎉"
            },
            {
                btnId: "btn-text",
                modalId: "modal-text",
                inputId: "input-recipe-text",
                validate: function (val) { return val.length > 10; },
                errorMsg: "الرجاء كتابة نص الوصفة",
                successMsg: "تم حفظ الوصفة بنجاح! 🎉"
            }
        ];

        actions.forEach(function (action) {
            var btn = document.getElementById(action.btnId);
            if (!btn) return;
            btn.addEventListener("click", function () {
                var inputEl = document.getElementById(action.inputId);
                var val = inputEl ? inputEl.value.trim() : "";
                if (!action.validate(val)) {
                    alert(action.errorMsg);
                    return;
                }
                closeModal(action.modalId);
                showToast(action.successMsg);
                // إعادة تعيين الحقول
                if (inputEl && inputEl.type !== "file") inputEl.value = "";
                var preview = document.getElementById("uploadPreview");
                if (preview) preview.textContent = "";
            });
        });

    });

})();
