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
(function() {
    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeSwitch';
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
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
        font-size: 22px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: transform 0.3s;
    `;
    themeBtn.onmouseover = () => themeBtn.style.transform = 'scale(1.1)';
    themeBtn.onmouseout = () => themeBtn.style.transform = 'scale(1)';
    document.body.appendChild(themeBtn);

    const style = document.createElement('style');
    style.textContent = `
        /* الثيم الداكن - ألوان رايقة */
        body.dark-theme { 
            background: #121212; 
            color: #e0e0e0; 
        }
        body.dark-theme header, 
        body.dark-theme nav, 
        body.dark-theme footer,
        body.dark-theme .course-item, 
        body.dark-theme .teacher-item,
        body.dark-theme .review-item, 
        body.dark-theme .vision-box,
        body.dark-theme .about-card,
        body.dark-theme .contact-form,
        body.dark-theme .teacher-card-horizontal {
            background: #1e1e2f; 
            color: #e0e0e0;
            border-color: #2d2d42;
        }
        body.dark-theme .course-item h3,
        body.dark-theme .teacher-item h3,
        body.dark-theme .about-card h2 {
            color: #f5b041; 
        }
        body.dark-theme .course-btn,
        body.dark-theme .submit-btn,
        body.dark-theme .more-courses-btn {
            background: #f5b041;
            color: #1e1e2f;
        }
        body.dark-theme .course-btn:hover {
            background: #e67e22;
        }
        body.dark-theme .breadcrumbs {
            background: #1e1e2f;
            color: #e0e0e0;
        }
        body.dark-theme .breadcrumbs a {
            color: #f5b041;
        }
        body.dark-theme input,
        body.dark-theme textarea,
        body.dark-theme select {
            background: #2d2d42;
            color: #e0e0e0;
            border-color: #444;
        }
        body.dark-theme .experience-years {
            background: #2d2d42;
            color: #f5b041;
        }
        body.dark-theme .rating-stars,
        body.dark-theme .rating {
            color: #f5b041;
        }
        body.dark-theme .footer-divider {
            background: #2d2d42;
        }
        body.dark-theme .social-icons i {
            background: #2d2d42;
            color: #f5b041;
        }
        body.dark-theme .social-icons i:hover {
            background: #f5b041;
            color: #1e1e2f;
        }
    `;
    document.head.appendChild(style);

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
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
