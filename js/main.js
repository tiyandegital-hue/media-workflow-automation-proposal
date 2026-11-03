/* Tiyan Digital proposal — interactions */
(function(){
  "use strict";
  document.documentElement.classList.add("js");

  /* Mobile nav */
  var burger = document.querySelector(".burger");
  var links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", function(){
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function(e){
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* Entrance reveals — staggered, expo.out */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function(el){ el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) {
          var el = en.target;
          var d = parseFloat(el.getAttribute("data-d") || "0");
          el.style.transitionDelay = d + "s";
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function(el){ io.observe(el); });
  }

  /* Pipeline packets — animate along SVG paths */
  function animatePipes(){
    if (reduce) return;
    document.querySelectorAll(".pipe-svg").forEach(function(svg){
      var wires = svg.querySelectorAll(".pipe-wire[data-flow]");
      wires.forEach(function(wire, wi){
        var len = wire.getTotalLength();
        for (var k = 0; k < 2; k++) {
          (function(w, L, idx){
            var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            c.setAttribute("r", "4");
            c.setAttribute("class", "packet");
            svg.appendChild(c);
            var start = null, dur = 2400, delay = idx * 1200 + wi * 350;
            function frame(ts){
              if (!start) start = ts;
              var t = ((ts - start - delay) % (dur * 2)) / dur;
              if (t < 0) { requestAnimationFrame(frame); return; }
              var tt = t > 1 ? 2 - t : t; /* ping-pong */
              var p = w.getPointAtLength(tt * L);
              c.setAttribute("cx", p.x); c.setAttribute("cy", p.y);
              c.setAttribute("opacity", t > 1 ? 0.35 : 1);
              requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
          })(wire, len, k);
        }
      });
    });
  }
  if (document.readyState === "complete") animatePipes();
  else window.addEventListener("load", animatePipes);

  /* FAQ accordion */
  document.querySelectorAll(".faq-item").forEach(function(item){
    var q = item.querySelector(".faq-q"), a = item.querySelector(".faq-a");
    q.addEventListener("click", function(){
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    });
  });

  /* Contact form — validate, then honest mailto handoff */
  var form = document.getElementById("audit-form");
  if (form) {
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var ok = true;
      ["cf-name","cf-email","cf-msg"].forEach(function(id){
        var f = document.getElementById(id);
        var err = document.getElementById(id + "-err");
        var bad = !f.value.trim() || (id === "cf-email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        err.style.display = bad ? "block" : "none";
        f.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) ok = false;
      });
      var consent = document.getElementById("cf-consent");
      var cerr = document.getElementById("cf-consent-err");
      if (!consent.checked) { cerr.style.display = "block"; ok = false; }
      else cerr.style.display = "none";
      if (!ok) return;
      var subject = "Workflow audit request — " + document.getElementById("cf-name").value.trim();
      var body = "Name: " + document.getElementById("cf-name").value.trim() +
        "\nEmail: " + document.getElementById("cf-email").value.trim() +
        "\nCompany: " + document.getElementById("cf-co").value.trim() +
        "\n\n" + document.getElementById("cf-msg").value.trim();
      document.getElementById("form-ok").style.display = "block";
      window.location.href = "mailto:contact@tiyandegital.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      form.reset();
    });
  }

  /* Footer year */
  var y = document.getElementById("yr");
  if (y) y.textContent = new Date().getFullYear();
})();
