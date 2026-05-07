
// ============================================================
//  ملف مشترك لجميع صفحات الموقع (آمن ولا يتعارض)
// ============================================================


   
(function() {
    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    onReady(function() {
        // -----------------------------------------------
        // 1. ميزات الصفحة الرئيسية (تظهر فقط إذا وجدت العناصر)
        // -----------------------------------------------
        
        // زر العودة للأعلى (Back to Top)
        var backToTopBtn = document.getElementById("backToTop");
        if (backToTopBtn) {
            window.addEventListener("scroll", function() {
                if (window.scrollY > 300) {
                    backToTopBtn.style.display = "block";
                } else {
                    backToTopBtn.style.display = "none";
                }
            });
            backToTopBtn.addEventListener("click", function() {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

        // الساعة الحقيقية في الفوتر
        var clockSpan = document.getElementById("realTimeClock");
        if (clockSpan) {
            function updateClock() {
                var now = new Date();
                clockSpan.textContent = now.toLocaleTimeString("ar-SA");
            }
            updateClock();
            setInterval(updateClock, 1000);
        }

        // أزرار تغيير الثيم
        var themeLight = document.getElementById("themeLight");
        var themeDark = document.getElementById("themeDark");
        if (themeLight && themeDark) {
            themeLight.addEventListener("click", function() {
                document.body.classList.remove("dark-theme");
                document.body.classList.add("light-theme");
            });
            themeDark.addEventListener("click", function() {
                document.body.classList.remove("light-theme");
                document.body.classList.add("dark-theme");
            });
        }

        // -----------------------------------------------
        // 2. صفحة النتيجة (تظهر فقط إذا وجدت عناصر النتيجة)
        // -----------------------------------------------
        var currentScoreEl = document.getElementById("currentScore");
        var bestScoreEl = document.getElementById("bestScore");
        if (currentScoreEl && bestScoreEl) {
            var currentScore = sessionStorage.getItem("currentQuizScore");
            var bestScore = sessionStorage.getItem("quizBestScore");
            var total = sessionStorage.getItem("quizTotalQuestions");

            if (currentScore === null || total === null) {
                currentScoreEl.textContent = "لا توجد بيانات";
                bestScoreEl.textContent = "لا توجد بيانات";
            } else {
                currentScoreEl.textContent = currentScore + " / " + total;
                bestScoreEl.textContent = (bestScore !== null ? bestScore : "?") + " / " + total;
            }

            // إعادة الاختبار
            var retakeBtn = document.getElementById("retakeQuizBtn");
            if (retakeBtn) {
                var originalUrl = sessionStorage.getItem("currentQuizUrl");
                retakeBtn.href = originalUrl ? originalUrl : "../pages/quiz/quiz-basics.html";
            }

            // العودة للدرس
            var backToLessonBtn = document.getElementById("backToLessonBtn");
            if (backToLessonBtn) {
                var lessonUrl = sessionStorage.getItem("lessonPageUrl");
                backToLessonBtn.href = lessonUrl ? lessonUrl : "../pages/lessons/lesson1_page1.html";
            }
        }
    });
})();

// ========================================
// script.js - ملف واحد لجميع الصفحات
// ========================================

(function applyThemeToAllPages() {
    // تطبيق الثيم المخزن عند تحميل الصفحة
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // مراقبة التغييرات في localStorage (إذا تغير من أي صفحة)
    window.addEventListener('storage', function(e) {
        if (e.key === 'theme') {
            if (e.newValue === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
    });
})();

// ========================================
// 1. أزرار الصفحة الرئيسية (تظهر فقط في الهوم)
// ========================================

// التحقق إذا كانت الصفحة الحالية هي الصفحة الرئيسية
const isHomePage = window.location.pathname === '/' || 
                   window.location.pathname.includes('index.html') ||
                   window.location.pathname.endsWith('/') ||
                   window.location.pathname === '/index.html';

if (isHomePage) {

// 1. زر العودة للأعلى
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

// 2. زر تبديل الثيمات (أيقونات إيموجي)
(function() {
    // تطبيق الثيم المخزن فوراً
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeSwitch';
    themeBtn.innerHTML = '🌙';  // أيقونة قمر
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
        themeBtn.innerHTML = '☀️';  // أيقونة شمس
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

}  // <-- إغلاق شرط isHomePage

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
//  RESULT PAGE MODULE (معدل لدعم العودة للدرس)
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

        // عرض الدرجات (كما كان)
        var currentScoreEl = document.getElementById("currentScore");
        var bestScoreEl    = document.getElementById("bestScore");
        if (currentScoreEl && bestScoreEl) {
            var currentScore = sessionStorage.getItem("currentQuizScore");
            var bestScore    = sessionStorage.getItem("quizBestScore");
            var total        = sessionStorage.getItem("quizTotalQuestions");

            if (currentScore === null || total === null) {
                currentScoreEl.textContent = "لا توجد بيانات";
                bestScoreEl.textContent    = "لا توجد بيانات";
            } else {
                currentScoreEl.textContent = currentScore + " / " + total;
                bestScoreEl.textContent    = bestScore    + " / " + total;
            }
        }

        // 🔁 إعادة توجيه زر "إعادة الاختبار" إلى نفس الاختبار الذي جاء منه الطالب
        var retakeBtn = document.getElementById("retakeQuizBtn");
        if (retakeBtn) {
            var originalQuizUrl = sessionStorage.getItem("currentQuizUrl");
            if (originalQuizUrl) {
                retakeBtn.href = originalQuizUrl;
            } else {
                // رابط افتراضي في حالة عدم وجود الرابط المسجل
                retakeBtn.href = "../pages/quiz/quiz-basics.html";
            }
        }

        // 🔁 إضافة: توجيه زر "العودة للدرس" إلى الدرس المرتبط بالاختبار
        var backToLessonBtn = document.getElementById("backToLessonBtn");
        if (backToLessonBtn) {
            var lessonUrl = sessionStorage.getItem("lessonPageUrl");
            if (lessonUrl) {
                backToLessonBtn.href = lessonUrl;
            } else {
                // رابط افتراضي إذا لم يتم تخزينه
                backToLessonBtn.href = "../pages/lessons/lesson1_page1.html";
            }
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

// ============================================================
//  FAVORITE RECIPES MODULE (إدارة الوصفات المفضلة)
// ============================================================
// إدارة الوصفات المفضلة
function toggleFav(id, btn) {
  let favs = JSON.parse(localStorage.getItem('favRecipes') || '[]');
  
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    btn.classList.remove('active');
  } else {
    favs.push(id);
    btn.classList.add('active');
  }
  
  localStorage.setItem('favRecipes', JSON.stringify(favs));
}

// تلوين القلوب عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const favs = JSON.parse(localStorage.getItem('favRecipes') || '[]');
  document.querySelectorAll('.fav[onclick]').forEach(btn => {
    const id = btn.getAttribute('onclick').match(/'([^']+)'/)?.[1];
    if (id && favs.includes(id)) btn.classList.add('active');
  });
});

// ============================================
// الجزء المدمج
// ============================================

console.log("✅ JavaScript Phase 3 - شموخ (مدمج مع كود صديقتي)");

// ============================================
// دوال مساعدة (من كودي)
// ============================================

function showToastMessage(message, type = "success") {
    const oldMsg = document.querySelector('.toast-message');
    if (oldMsg) oldMsg.remove();
    
    const msg = document.createElement('div');
    msg.className = `toast-message ${type}`;
    
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-triangle-exclamation';
    
    msg.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    document.body.appendChild(msg);
    
    // إضافة تنسيق التوست إذا مو موجود
    if (!document.querySelector('#toast-style')) {
        const style = document.createElement('style');
        style.id = 'toast-style';
        style.textContent = `
            .toast-message {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #4f6357;
                color: white;
                padding: 12px 24px;
                border-radius: 50px;
                font-size: 14px;
                z-index: 9999;
                animation: fadeInUp 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                font-family: 'Tajawal', sans-serif;
            }
            .toast-message.error {
                background: #e74c3c;
            }
            .toast-message.warning {
                background: #f39c12;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (msg) msg.remove();
    }, 3000);
}

// ============================================
// المعلومات الشخصية (personal-info.html) - من كودي
// ============================================

// دالة تحويل الصورة إلى Base64
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

// دالة حفظ جميع المعلومات الشخصية في localStorage
function savePersonalInfo() {
    // جلب البيانات من الحقول
    const firstName = document.getElementById('firstName')?.value || '';
    const lastName = document.getElementById('lastName')?.value || '';
    const birthdate = document.getElementById('birthdate')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const country = document.getElementById('country')?.value || '';
    const email = document.getElementById('email')?.value || '';
    
    // جلب الصورة الحالية
    const profileImageSrc = document.getElementById('profileImage')?.src || '../images/user.png';
    
    // تجميع البيانات في كائن واحد
    const userData = {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        phone: phone,
        country: country,
        email: email,
        profileImage: profileImageSrc,
        updatedAt: new Date().toLocaleString('ar-SA')
    };
    
    // حفظ في localStorage
    localStorage.setItem('userPersonalInfo', JSON.stringify(userData));
    
    // تحديث الصورة في الهيدر أيضاً
    const headerImage = document.getElementById('headerUserImage');
    if (headerImage && profileImageSrc !== '../images/user.png') {
        headerImage.src = profileImageSrc;
    }
    
    showToastMessage("✅ تم حفظ المعلومات الشخصية بنجاح", "success");
    console.log("✅ تم حفظ المعلومات الشخصية في localStorage");
}

// دالة تحميل المعلومات الشخصية من localStorage
function loadPersonalInfo() {
    const savedData = localStorage.getItem('userPersonalInfo');
    
    if (savedData) {
        const userData = JSON.parse(savedData);
        
        // تعبئة الحقول بالبيانات المحفوظة
        if (document.getElementById('firstName')) document.getElementById('firstName').value = userData.firstName || '';
        if (document.getElementById('lastName')) document.getElementById('lastName').value = userData.lastName || '';
        if (document.getElementById('birthdate')) document.getElementById('birthdate').value = userData.birthdate || '';
        if (document.getElementById('phone')) document.getElementById('phone').value = userData.phone || '';
        if (document.getElementById('country')) document.getElementById('country').value = userData.country || 'المملكة العربية السعودية';
        if (document.getElementById('email')) document.getElementById('email').value = userData.email || '';
        
        // تعبئة الصورة الشخصية
        if (userData.profileImage && userData.profileImage !== '../images/user.png' && !userData.profileImage.includes('blob:')) {
            const profileImage = document.getElementById('profileImage');
            if (profileImage) profileImage.src = userData.profileImage;
            
            // تحديث الصورة في الهيدر أيضاً
            const headerImage = document.getElementById('headerUserImage');
            if (headerImage) headerImage.src = userData.profileImage;
        }
        
        console.log("✅ تم تحميل المعلومات الشخصية من localStorage");
    } else {
        console.log("ℹ️ لا توجد بيانات محفوظة، يتم استخدام البيانات الافتراضية");
    }
}

function initPersonalInfoPage() {
    console.log("Personal Info Page - Ready");
    
    // تحميل البيانات المحفوظة
    loadPersonalInfo();
    
    // زر تعديل الصورة
    const editImageBtn = document.getElementById('editImageBtn');
    const imageInput = document.getElementById('profileImageInput');
    const profileImage = document.getElementById('profileImage');
    
    if (editImageBtn && imageInput) {
        editImageBtn.addEventListener('click', function() {
            // فتح نافذة اختيار الملف
            imageInput.click();
        });
        
        // معالج اختيار الصورة
        imageInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // التحقق من أن الملف صورة
                if (!file.type.startsWith('image/')) {
                    showToastMessage("❌ الرجاء اختيار ملف صورة صالح (jpg, png, gif)", "error");
                    return;
                }
                
                // التحقق من حجم الصورة (حد أقصى 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    showToastMessage("❌ حجم الصورة كبير جداً، الرجاء اختيار صورة أقل من 2 ميجابايت", "error");
                    return;
                }
                
                try {
                    // تحويل الصورة إلى Base64
                    const base64Image = await imageToBase64(file);
                    
                    // عرض الصورة في الواجهة
                    if (profileImage) profileImage.src = base64Image;
                    
                    showToastMessage("✅ تم تغيير الصورة الشخصية، اضغط حفظ لحفظ التغييرات", "success");
                } catch (error) {
                    console.error("خطأ في تحويل الصورة:", error);
                    showToastMessage("❌ حدث خطأ أثناء تحميل الصورة", "error");
                }
            }
        });
    }
    
    // زر حفظ المعلومات
    const saveBtn = document.getElementById('savePersonalInfoBtn');
    if (saveBtn) {
        // إزالة المستمعات القديمة لتجنب التكرار
        const newSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
        newSaveBtn.addEventListener('click', function() {
            savePersonalInfo();
        });
    }
}

// ============================================
// الوصفات المفضلة (favorite-recipes.html) - من كودي
// ============================================

let timeouts = {};

function initFavoriteRecipesPage() {
    console.log("Favorite Recipes Page - Remove after 2 seconds");

    function checkAndShowEmptyMessage() {
        const visibleCards = document.querySelectorAll('.recipe-card:not(.removed)');
        const noRecipesMsg = document.getElementById('noRecipesMessage');
        if (visibleCards.length === 0) {
            if (noRecipesMsg) noRecipesMsg.style.display = 'block';
        } else {
            if (noRecipesMsg) noRecipesMsg.style.display = 'none';
        }
    }

    function hideRecipeCard(card) {
        if (timeouts[card.id]) clearTimeout(timeouts[card.id]);
        timeouts[card.id] = setTimeout(() => {
            card.classList.add('removed');
            checkAndShowEmptyMessage();
        }, 2000);
    }

    function showRecipeCard(card) {
        if (timeouts[card.id]) {
            clearTimeout(timeouts[card.id]);
            delete timeouts[card.id];
        }
        card.classList.remove('removed');
        checkAndShowEmptyMessage();
    }

    document.querySelectorAll('.fav-heart-icon').forEach(heart => {
        heart.style.color = 'red';
        const card = heart.closest('.recipe-card');

        heart.addEventListener('click', function(e) {
            e.stopPropagation();
            if (this.style.color === 'red') {
                this.style.color = 'gray';
                hideRecipeCard(card);
            } else {
                this.style.color = 'red';
                showRecipeCard(card);
            }
        });
    });

    checkAndShowEmptyMessage();
}

// ============================================
// صفحة دوراتي (my-courses.html) - من كودي (محدثة لديناميكية الجدول)
// ============================================

function initMyCoursesPage() {
    console.log("My Courses Page - جدول نتائج الاختبارات الديناميكي");

    function displayScoresTable() {
        const container = document.getElementById('scoresTableContainer');
        if (!container) return;

        // ✅ قراءة النتائج من localStorage بدلاً من البيانات الثابتة
        let quizResults = [];
        const savedResults = localStorage.getItem('quizResults');
        
        if (savedResults) {
            try {
                quizResults = JSON.parse(savedResults);
            } catch(e) {
                console.error("خطأ في قراءة النتائج:", e);
            }
        }

        // ✅ إذا لم توجد نتائج، نعرض رسالة "لا توجد نتائج"
        if (quizResults.length === 0) {
            container.innerHTML = `
                <div class="scores-section">
                    <h3><i class="fas fa-clipboard-list"></i> نتائج اختباراتك السابقة</h3>
                    <p class="desc">لم تقم بإجراء أي اختبار بعد. قم بإكمال الدورات واختبر نفسك!</p>
                    <div class="no-data">📭 لا توجد نتائج اختبارات حالياً</div>
                </div>
            `;
            return;
        }

        // ✅ ترتيب النتائج من الأحدث إلى الأقدم
        const sortedResults = [...quizResults].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        // ✅ بناء الجدول ديناميكياً
        let tableHTML = `
            <div class="scores-section">
                <h3><i class="fas fa-clipboard-list"></i> نتائج اختباراتك السابقة</h3>
                <p class="desc">هذه قائمة بنتائج الاختبارات التي قمت بها في دوراتك المختلفة</p>
                <table class="scores-table">
                    <thead>
                        <tr>
                            <th>اسم الدورة</th>
                            <th>الدرجة</th>
                            <th>التاريخ</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        sortedResults.forEach(result => {
            let formattedDate = result.date;
            try {
                const dateObj = new Date(result.date);
                formattedDate = dateObj.toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            } catch(e) {
                formattedDate = result.date || 'غير معروف';
            }
            
            tableHTML += `
                <tr>
                    <td>${escapeHtmlForTable(result.courseName)}</td>
                    <td>${result.score}/${result.totalQuestions}</td>
                    <td>${formattedDate}</td>
                </tr>
            `;
        });

        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = tableHTML;
    }

    function escapeHtmlForTable(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    displayScoresTable();
}

// ============================================
// صفحة ملاحظاتي (my-notes.html) - من كودي
// ============================================

let notesArray = [];

function initMyNotesPage() {
    console.log("My Notes Page - Phase 3");

    function loadNotes() {
        const stored = localStorage.getItem('myNotes');
        if (stored && stored !== '[]') {
            notesArray = JSON.parse(stored);
        } else {
            notesArray = [
                { id: Date.now() + 1, text: "تحضير وصفة الكوكيز لتقديمها في درس الطبخ يوم الأحد", priority: "1" },
                { id: Date.now() + 2, text: "مراجعة دورة تكوين البهارات وتطبيق الوصفات الجديدة", priority: "2" },
                { id: Date.now() + 3, text: "شراء مستلزمات المعجنات من السوبر ماركت", priority: "3" }
            ];
        }
        renderNotes();
    }

    function saveToStorage() {
        localStorage.setItem('myNotes', JSON.stringify(notesArray));
        showToastMessage("تم حفظ التغييرات بنجاح", "success");
    }

    function renderNotes() {
        const container = document.getElementById('notesListContainer');
        if (!container) return;

        if (notesArray.length === 0) {
            container.innerHTML = '<div class="no-data">📭 لا توجد ملاحظات حالياً</div>';
            return;
        }

        container.innerHTML = '';
        notesArray.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.className = `note-item priority-${note.priority}`;
            noteDiv.setAttribute('data-id', note.id);
            noteDiv.innerHTML = `
                <input type="checkbox" class="note-checkbox" data-id="${note.id}" id="note_${note.id}">
                <label for="note_${note.id}">
                    <i class="fas fa-sticky-note note-icon"></i>
                    <span class="note-priority priority-${note.priority}">الأولوية ${note.priority}</span>
                    <span class="note-text">${escapeHtmlForNotes(note.text)}</span>
                </label>
            `;
            container.appendChild(noteDiv);
        });
    }

    function addNote() {
        const text = document.getElementById('note-text').value.trim();
        const priority = document.getElementById('note-priority').value;

        if (text.length === 0) {
            showToastMessage("الرجاء إدخال نص الملاحظة", "error");
            return;
        }
        if (text.length < 30) {
            showToastMessage("نص الملاحظة قصير جداً، يجب أن يكون 30 حرفاً على الأقل", "error");
            return;
        }
        if (!priority) {
            showToastMessage("الرجاء اختيار الأولوية", "error");
            return;
        }

        const newNote = {
            id: Date.now(),
            text: text,
            priority: priority
        };
        notesArray.push(newNote);
        renderNotes();

        document.getElementById('note-text').value = '';
        document.getElementById('note-priority').value = '';
        showToastMessage("تم إضافة الملاحظة بنجاح", "success");
    }

    function deleteSelectedNotes(event) {
        if (event) event.stopPropagation();
        
        const checkboxes = document.querySelectorAll('.note-checkbox:checked');
        
        if (checkboxes.length === 0) {
            showToastMessage("الرجاء تحديد ملاحظة واحدة على الأقل للحذف", "error");
            return;
        }

        const confirmDelete = confirm(`⚠️ هل أنت متأكد من حذف ${checkboxes.length} ملاحظة؟`);
        
        if (confirmDelete) {
            const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.getAttribute('data-id')));
            notesArray = notesArray.filter(note => !idsToDelete.includes(note.id));
            renderNotes();
            showToastMessage("تم حذف الملاحظات المحددة", "success");
        }
    }

    function escapeHtmlForNotes(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    const addBtn = document.getElementById('addNoteBtn');
    const saveBtn = document.getElementById('saveNotesBtn');
    const deleteBtn = document.getElementById('deleteSelectedBtn');
    
    if (addBtn) {
        const newAddBtn = addBtn.cloneNode(true);
        addBtn.parentNode.replaceChild(newAddBtn, addBtn);
        newAddBtn.addEventListener('click', addNote);
    }
    
    if (saveBtn) {
        const newSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
        newSaveBtn.addEventListener('click', saveToStorage);
    }
    
    if (deleteBtn) {
        const newDeleteBtn = deleteBtn.cloneNode(true);
        deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
        newDeleteBtn.addEventListener('click', deleteSelectedNotes);
    }

    loadNotes();
}

// ============================================
// صفحة التقييمات (evaluations.html) - من كودي
// ============================================

function initEvaluationsPage() {
    console.log("Evaluations Page - Ready");

    const deleteButtons = document.querySelectorAll('.delete-eval-btn');
    
    deleteButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const cardId = this.getAttribute('data-id');
            const evaluationCard = document.getElementById(`eval${cardId}`);
            
            if (!evaluationCard) return;
            
            const confirmDelete = confirm(`⚠️ هل أنت متأكد من حذف هذا التقييم؟`);
            
            if (confirmDelete) {
                evaluationCard.remove();
                showToastMessage("تم حذف التقييم بنجاح", "success");
            }
        });
    });
}

// ============================================
// إدارة المحادثات المحفوظة (localStorage) - من كودي
// ============================================

// حفظ محادثة جديدة
function saveConversation(teacherId, teacherName, teacherImg, teacherStatus, lastMessage, lastTime) {
    let conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    
    const existingIndex = conversations.findIndex(c => c.id === teacherId);
    
    const conversation = {
        id: teacherId,
        name: teacherName,
        img: teacherImg,
        status: teacherStatus,
        lastMessage: lastMessage,
        lastTime: lastTime,
        lastMessageTime: new Date().getTime()
    };
    
    if (existingIndex !== -1) {
        conversations[existingIndex] = conversation;
    } else {
        conversations.unshift(conversation);
    }
    
    conversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    localStorage.setItem('conversations', JSON.stringify(conversations));
    return conversation;
}

// تحميل وعرض المحادثات المحفوظة
function loadAndDisplayConversations() {
    const container = document.getElementById('conversationsList');
    if (!container) return;
    
    const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    
    if (conversations.length === 0) {
        container.innerHTML = '<div class="no-conversations">📭 لا توجد محادثات بعد، ابدأ محادثة جديدة بالضغط على زر +</div>';
        return;
    }
    
    container.innerHTML = '';
    conversations.forEach(conv => {
        let chatFile = '';
        if (conv.id === 'maryam') chatFile = 'chat-maryam.html';
        else if (conv.id === 'noura') chatFile = 'chat-noura.html';
        else if (conv.id === 'ali') chatFile = 'chat-ali.html';
        else if (conv.id === 'sahar') chatFile = 'chat-sahar.html';
        else if (conv.id === 'chef-noura') chatFile = 'chat-noura.html';
        else if (conv.id === 'chef-ahmed') chatFile = 'chat-ahmed.html';
        else if (conv.id === 'chef-lama') chatFile = 'chat-lama.html';
        else if (conv.id === 'chef-fahad') chatFile = 'chat-fahad.html';
        else chatFile = `chat-${conv.id}.html`;
        
        const card = document.createElement('a');
        card.className = 'conversation-card';
        card.href = `../chats/${chatFile}?teacher=${conv.id}`;
        card.innerHTML = `
            <div class="conversation-avatar">
                <img src="${conv.img}" alt="${conv.name}" onerror="this.src='../images/user.png'">
                <span class="status-dot ${conv.status}"></span>
            </div>
            <div class="conversation-info">
                <h4>${conv.name}</h4>
                <p class="last-message">${conv.lastMessage || 'ابدأ المحادثة الآن'}</p>
            </div>
            <div class="conversation-time">
                <span>${conv.lastTime || 'الآن'}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// بدء محادثة جديدة من زر الإضافة
function startNewChat() {
    const select = document.getElementById('new-teacher-select');
    const selectedOption = select.options[select.selectedIndex];
    
    if (!selectedOption.value) {
        showToastMessage("❌ الرجاء اختيار معلم من القائمة", "error");
        return;
    }
    
    const teacherId = selectedOption.value;
    const chatFile = selectedOption.getAttribute('data-file');
    const teacherName = selectedOption.getAttribute('data-name');
    const teacherImg = selectedOption.getAttribute('data-img');
    const teacherStatus = selectedOption.getAttribute('data-status');
    
    // حفظ المحادثة في localStorage
    saveConversation(teacherId, teacherName, teacherImg, teacherStatus, "✨ بدأت محادثة جديدة", "الآن");
    
    showToastMessage(`✨ تم فتح محادثة مع ${teacherName}`, "success");
    setTimeout(() => {
        window.location.href = `../chats/${chatFile}?teacher=${teacherId}`;
    }, 500);
}

// تحديث آخر رسالة لمحادثة
window.updateLastMessage = function(teacherId, lastMessage, lastTime) {
    let conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    const index = conversations.findIndex(c => c.id === teacherId);
    
    if (index !== -1) {
        conversations[index].lastMessage = lastMessage;
        conversations[index].lastTime = lastTime;
        conversations[index].lastMessageTime = new Date().getTime();
        conversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
        localStorage.setItem('conversations', JSON.stringify(conversations));
    }
};

// صفحة التواصل مع المعلمين
function initContactTeachersPage() {
    console.log("Contact Teachers Page - Ready");
    
    // تحميل وعرض المحادثات المحفوظة
    loadAndDisplayConversations();
    
    // ربط زر الإضافة
    const addBtn = document.getElementById('addTeacherBtn');
    if (addBtn) {
        const newAddBtn = addBtn.cloneNode(true);
        addBtn.parentNode.replaceChild(newAddBtn, addBtn);
        newAddBtn.addEventListener('click', startNewChat);
    }
}

// ============================================
// تشغيل حسب الصفحة الحالية (موحد) - من كودي
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    console.log("🔍 Current page:", path);
    
    if (path.includes('personal-info.html')) {
        initPersonalInfoPage();
    }
    else if (path.includes('favorite-recipes.html')) {
        initFavoriteRecipesPage();
    }
    else if (path.includes('my-courses.html')) {
        initMyCoursesPage();
    }
    else if (path.includes('my-notes.html')) {
        initMyNotesPage();
    }
    else if (path.includes('evaluations.html')) {
        initEvaluationsPage();
    }
    else if (path.includes('contact-teachers.html')) {
        initContactTeachersPage();
    }
});
if (document.getElementById('evaluationForm')) {
    const stars = document.querySelectorAll('.my-star');
    const ratingInput = document.getElementById('rating-value');
    let selectedRating = 0;

    function updateStars(rating) {
        stars.forEach(star => {
            const val = parseInt(star.getAttribute('data-value'));
            star.style.color = val <= rating ? '#ffb347' : '#ddd';
        });
    }

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            ratingInput.value = selectedRating;
            updateStars(selectedRating);
            const container = document.getElementById('ratingStarsContainer');
            if (container) {
                container.style.border = '';
                container.style.padding = '';
            }
        });
    });

    const form = document.getElementById('evaluationForm');
    const teacherSelect = document.getElementById('teacher');
    const reviewText = document.getElementById('review');
    const ratingContainer = document.getElementById('ratingStarsContainer');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        teacherSelect.classList.remove('error-border');
        reviewText.classList.remove('error-border');
        if (ratingContainer) {
            ratingContainer.style.border = '';
            ratingContainer.style.padding = '';
        }

        if (teacherSelect.value === "") {
            teacherSelect.classList.add('error-border');
            isValid = false;
        }

        if (selectedRating === 0) {
            if (ratingContainer) {
                ratingContainer.style.border = '2px solid #e74c3c';
                ratingContainer.style.borderRadius = '20px';
                ratingContainer.style.padding = '8px';
            }
            isValid = false;
        }

        if (reviewText.value.trim() === "") {
            reviewText.classList.add('error-border');
            isValid = false;
        }

        if (!isValid) {
            alert("الرجاء إكمال جميع الحقول: اختر معلم، اختر تقييم، واكتب تعليقك.");
            return;
        }

        const message = selectedRating >= 4 ? "شكراً لتقييمك 👍" : "نأسف أن الدورة لم ترقَ لتوقعاتك. سنعمل على تحسينها 💪";
        alert(message);
        window.location.href = "my-courses.html";
    });
}// ========== صفحة الدورات (courses.html) ==========
if (document.getElementById('coursesGrid')) {
    const moreBtn = document.getElementById('moreLessonsBtn');
    const hiddenCards = document.querySelectorAll('.my-course-card[style*="display: none"]');
    let allVisible = false;

    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.my-course-card');
            if (!allVisible) {
                cards.forEach(card => card.style.display = 'block');
                moreBtn.textContent = 'عرض أقل';
                allVisible = true;
            } else {
                // إظهار أول 3 فقط
                cards.forEach((card, index) => {
                    card.style.display = index < 3 ? 'block' : 'none';
                });
                moreBtn.textContent = 'المزيد من الدورات';
                allVisible = false;
            }
        });
    }

console.log('✅ تم تحميل جميع ملفات JavaScript بنجاح (كود مدمج)!');
