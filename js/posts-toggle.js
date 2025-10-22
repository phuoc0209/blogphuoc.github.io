document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest('.toggle-btn');
    if (!btn) return;
    const contentId = btn.getAttribute('data-target');
    const content = document.getElementById(contentId);
    if (!content) return;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Đóng các bài khác (chỉ 1 mở)
    document.querySelectorAll('.post-content:not([hidden])').forEach(function (el) {
      if (el !== content) {
        el.setAttribute('hidden', '');
        const otherBtn = document.querySelector('.toggle-btn[data-target="' + el.id + '"]');
        if (otherBtn) { otherBtn.setAttribute('aria-expanded', 'false'); otherBtn.textContent = 'Xem'; }
      }
    });

    if (isOpen) {
      content.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Xem';
    } else {
      content.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Thu gọn';
      content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});