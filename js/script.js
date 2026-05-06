// ========================================
// home.js - صفحة الرئيسية كاملة
// ========================================

// 1. زر العودة للأعلى (يظهر فقط في الصفحة الرئيسية)
(function() {
    const backBtn = document.createElement('button');
    backBtn.id = 'backToTop';
    backBtn.innerHTML = '▲';
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
        font-size: 24px;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: transform 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
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

// 2. زر تبديل الثيمات (يظهر فقط في الصفحة الرئيسية)
(function() {
    // تطبيق الثيم المخزن فوراً
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeSwitch';
    themeBtn.innerHTML = '🌙';
    themeBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        background: #4f6357;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: transform 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    themeBtn.onmouseover = () => themeBtn.style.transform = 'scale(1.1)';
    themeBtn.onmouseout = () => themeBtn.style.transform = 'scale(1)';
    document.body.appendChild(themeBtn);

    if (localStorage.getItem('theme') === 'dark') {
        themeBtn.innerHTML = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeBtn.innerHTML = isDark ? '☀️' : '🌙';
        console.log(`✅ تم تغيير الثيم إلى ${isDark ? 'داكن' : 'فاتح'}`);
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
        btn.addEventListener('click', function() {
            const courseName = this.closest('.course-item')?.querySelector('h3')?.innerText || 'الدورة';
            console.log(`✅ تم الضغط على: عرض درس ${courseName}`);
        });
    });
})();

// 6. تأثير عند الضغط على أزرار التنقل
(function() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
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

// 9. الساعة الحقيقية
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
        
        console.log('✅ الساعة شغالة');
    }, 500);
})();

console.log('✅ تم تحميل جميع أزرار الصفحة الرئيسية بنجاح!');

// ========================================
// 2. صفحة عن الموقع (About Us)
// ========================================

if (document.getElementById('teachersContainer')) {
    // بيانات المعلمين
    const teachersData = [
        { name: "أحمد", img: "../images/chef-ahmed.jpg", experience: 12 },
        { name: "نوره", img: "../images/chef-noura.jpg", experience: 8 },
        { name: "لمى", img: "../images/chef-lama.jpg", experience: 5 }
    ];

    // عرض المعلمين
    function displayTeachers(teachers) {
        const container = document.getElementById('teachersContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 0; i < teachers.length; i++) {
            const teacher = teachers[i];
            const card = document.createElement('div');
            card.className = 'teacher-card-horizontal';
            card.innerHTML = `
                <img src="${teacher.img}" alt="${teacher.name}">
                <h3>${teacher.name}</h3>
                <div class="experience-years">📅 ${teacher.experience} سنوات خبرة</div>
            `;
            container.appendChild(card);
        }
    }

    // ترتيب عشوائي
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // ترتيب حسب الاختيار
    function sortTeachers(type) {
        let sorted = [...teachersData];
        
        if (type === 'name-asc') {
            sorted.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        } 
        else if (type === 'name-desc') {
            sorted.sort((a, b) => b.name.localeCompare(a.name, 'ar'));
        }
        else if (type === 'exp-asc') {
            sorted.sort((a, b) => a.experience - b.experience);
        }
        else if (type === 'exp-desc') {
            sorted.sort((a, b) => b.experience - a.experience);
        }
        
        return sorted;
    }

    // تشغيل الصفحة
    let currentTeachers = shuffleArray([...teachersData]);
    displayTeachers(currentTeachers);

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const value = this.value;
            
            if (value === '') {
                currentTeachers = shuffleArray([...teachersData]);
            } else {
                currentTeachers = sortTeachers(value);
            }
            
            displayTeachers(currentTeachers);
        });
    }

    console.log('✅ about.js شغال');
}


// ========================================
// 3. صفحة تواصل معنا (Contact Us)
// ========================================


if (document.querySelector('.contact-form form')) {
    (function initContactPage() {
        
        const contactForm = document.querySelector('.contact-form form');
        if (!contactForm) return;

        // إضافة زر مسح الحقول
        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.id = 'clearBtn';
        clearBtn.innerHTML = '<i class="fas fa-eraser"></i> مسح الحقول';
        clearBtn.style.cssText = `
            background-color: #8ea79a;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 40px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 15px;
            margin-right: 15px;
            transition: 0.3s;
        `;
        clearBtn.onmouseover = () => clearBtn.style.backgroundColor = '#6f8f82';
        clearBtn.onmouseout = () => clearBtn.style.backgroundColor = '#8ea79a';
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.style.marginLeft = '15px';
        submitBtn.parentNode.insertBefore(clearBtn, submitBtn.nextSibling);

        clearBtn.addEventListener('click', function() {
            contactForm.reset();
            document.querySelectorAll('.error-message').forEach(err => err.remove());
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                input.style.borderColor = '#dfeae3';
            });
            console.log('✅ تم مسح جميع الحقول');
        });

        // دالة التحقق من البريد الإلكتروني
        function isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        // دالة التحقق من أن الاسم لا يبدأ برقم
        function nameNotStartWithNumber(name) {
            const firstChar = name.trim().charAt(0);
            return isNaN(parseInt(firstChar));
        }

        // دالة التحقق من أن الاسم FirstName LastName
        function isValidFullName(name) {
            const trimmedName = name.trim();
            const parts = trimmedName.split(' ');
            return parts.length >= 2 && parts[0].length > 0 && parts[1].length > 0;
        }

        // دالة عرض الخطأ
        function showError(input, message) {
            let errorDiv = input.parentElement.querySelector('.error-message');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.cssText = `
                    color: #e94560;
                    font-size: 13px;
                    margin-top: 5px;
                    padding-right: 15px;
                `;
                input.parentElement.appendChild(errorDiv);
            }
            errorDiv.textContent = message;
            input.style.borderColor = '#e94560';
        }

        // دالة إزالة الخطأ
        function removeError(input) {
            const errorDiv = input.parentElement.querySelector('.error-message');
            if (errorDiv) errorDiv.remove();
            input.style.borderColor = '#dfeae3';
        }

        // حدث إرسال النموذج
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // التحقق من الاسم
            if (!nameInput.value.trim()) {
                showError(nameInput, '❌ الرجاء إدخال الاسم');
                isValid = false;
            } else if (!nameNotStartWithNumber(nameInput.value)) {
                showError(nameInput, '❌ الاسم لا يمكن أن يبدأ برقم');
                isValid = false;
            } else if (!isValidFullName(nameInput.value)) {
                showError(nameInput, '❌ الرجاء إدخال الاسم الكامل (مثال: أحمد محمد)');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // التحقق من البريد الإلكتروني
            if (!emailInput.value.trim()) {
                showError(emailInput, '❌ الرجاء إدخال البريد الإلكتروني');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, '❌ الرجاء إدخال بريد إلكتروني صحيح (مثال: name@example.com)');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // التحقق من الرسالة
            if (!messageInput.value.trim()) {
                showError(messageInput, '❌ الرجاء كتابة رسالتك');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // إذا كان كل شيء صحيح
            if (isValid) {
                const senderName = nameInput.value.trim();
                
                // ✅ Popup alert مع اسم المرسل (المطلوب)
                alert(`✅ تم إرسال رسالتك بنجاح يا ${senderName}!\n\nشكراً لتواصلك معنا، سنقوم بالرد عليك قريباً.`);
                
                // مسح الحقول
                contactForm.reset();
                document.querySelectorAll('.error-message').forEach(err => err.remove());
                document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                    input.style.borderColor = '#dfeae3';
                });
                
                console.log('✅ تم إرسال الرسالة بنجاح');
            } else {
                console.log('❌ فشل الإرسال: البيانات غير صحيحة');
            }
        });

        // إزالة الخطأ عند الكتابة
        const inputs = ['name', 'email', 'message'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', function() {
                    removeError(this);
                });
            }
        });

        console.log('✅ تم تحميل صفحة تواصل معنا بنجاح');
    })();
}



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
