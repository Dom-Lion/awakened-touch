(function () {
  "use strict";

  /* ---------- language ---------- */
  var LANG_KEY = "awakenedtouch-lang";
  var html = document.documentElement;
  var savedLang = localStorage.getItem(LANG_KEY);
  if (savedLang === "de" || savedLang === "en") {
    html.setAttribute("data-lang", savedLang);
  }

  function setLang(lang) {
    html.setAttribute("data-lang", lang);
    localStorage.setItem(LANG_KEY, lang);
    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.querySelectorAll(".lang-opt").forEach(function (opt) {
        opt.classList.toggle("is-active", opt.getAttribute("data-lang") === lang);
      });
    });
    document.documentElement.setAttribute("lang", lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setLang(html.getAttribute("data-lang") || "de");

    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = html.getAttribute("data-lang") || "de";
        setLang(current === "de" ? "en" : "de");
      });
    });

    /* ---------- mobile nav ---------- */
    var burger = document.getElementById("nav-burger");
    if (burger) {
      burger.addEventListener("click", function () {
        document.body.classList.toggle("nav-open");
      });
      document.querySelectorAll(".main-nav .nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
          document.body.classList.remove("nav-open");
        });
      });
    }

    /* ---------- header solid on scroll ---------- */
    var header = document.querySelector(".site-header");
    function onScroll() {
      if (!header) return;
      if (window.scrollY > 60) header.classList.add("solid");
      else header.classList.remove("solid");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- reveal on scroll ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("in-view");
      });
    }

    /* ---------- contact form (Web3Forms) ---------- */
    var form = document.getElementById("contact-form");
    if (form) {
      var statusBox = document.getElementById("form-status");
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var accessKey = form.querySelector('input[name="access_key"]').value;
        if (!accessKey || accessKey.indexOf("REPLACE_WITH") !== -1) {
          showStatus(
            false,
            "Formular ist noch nicht aktiviert. Bitte richte einen kostenlosen Web3Forms-Zugang ein (siehe Kommentar im Code) oder schreibe direkt eine E-Mail.",
            "Form is not activated yet. Please set up a free Web3Forms access key (see code comment) or email us directly."
          );
          return;
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        var originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";

        var formData = new FormData(form);
        var payload = Object.fromEntries(formData.entries());

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            if (data.success) {
              form.reset();
              showStatus(
                true,
                "Danke für deine Nachricht. Ich melde mich so bald wie möglich bei dir.",
                "Thank you for your message. I will get back to you as soon as possible."
              );
            } else {
              showStatus(
                false,
                "Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreibe direkt eine E-Mail.",
                "Something went wrong. Please try again or email us directly."
              );
            }
          })
          .catch(function () {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            showStatus(
              false,
              "Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreibe direkt eine E-Mail.",
              "Something went wrong. Please try again or email us directly."
            );
          });
      });

      function showStatus(ok, deMsg, enMsg) {
        statusBox.classList.remove("ok", "err");
        statusBox.classList.add("show", ok ? "ok" : "err");
        statusBox.innerHTML =
          '<span class="i18n-de">' + deMsg + "</span>" + '<span class="i18n-en">' + enMsg + "</span>";
      }
    }
  });
})();
