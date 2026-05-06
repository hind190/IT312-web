
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


// التحقق إذا كانت الصفحة الحالية هي الصفحة الرئيسية
const isHomePage = window.location.pathname === '/' || 
                   window.location.pathname.includes('index.html') ||
                   window.location.pathname.endsWith('/') ||
                   window.location.pathname === '/index.html';

// ========================================
// 1. أزرار الصفحة الرئيسية (تظهر فقط في الهوم)
// ========================================

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
