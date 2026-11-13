// ============================================================
// ⚠️ TROQUE PELO NÚMERO REAL DA STAR
// Formato: 55 + DDD + número, só dígitos. Exemplo: 5574999998888
// ============================================================
var WA_NUMBER = "5574900000000";

function wa(msg) {
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
}

var PRECO = 70; // valor mensal por veículo

// Links do WhatsApp (botões, botão flutuante)
var base = "Olá! Vim pelo site da STAR e quero contratar o rastreamento veicular.";
document.querySelectorAll("a.wa").forEach(function (a) {
  a.href = wa(base);
  a.target = "_blank";
  a.rel = "noopener";
});

// Ano do rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Menu do celular
var menu = document.getElementById("menu");
var links = document.getElementById("links");
menu.onclick = function () { links.classList.toggle("open"); };
links.onclick = function (e) {
  if (e.target.tagName === "A") links.classList.remove("open");
};

// Calculadora com desconto
// Acima de 5 veículos: 5% | 10 ou mais: 10% | Acima de 30: 15%
function desconto(n) {
  if (n > 30) return 15;
  if (n >= 10) return 10;
  if (n > 5) return 5;
  return 0;
}

function brl(v) {
  return v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

var tipo = "carro";
var rng = document.getElementById("rng");

function calc() {
  var n = +rng.value;
  var d = desconto(n);
  var bruto = n * PRECO;
  var total = bruto * (1 - d / 100);

  document.getElementById("q").textContent = n;
  document.getElementById("p").textContent = brl(total);
  document.getElementById("old").textContent = d ? "R$ " + brl(bruto) : "";
  document.getElementById("off").textContent = d ? d + "% de desconto aplicado" : "";
  document.getElementById("resumo").textContent =
    n + " " + tipo + (n > 1 ? "s" : "") + " • 1º mês grátis";

  document.getElementById("t5").classList.toggle("on", d === 5);
  document.getElementById("t10").classList.toggle("on", d === 10);
  document.getElementById("t30").classList.toggle("on", d === 15);

  var msg = "Olá! Vim pelo site da STAR. Quero rastrear " + n + " " + tipo + (n > 1 ? "s" : "") +
    " (R$ " + brl(total) + "/mês" + (d ? ", com " + d + "% de desconto" : "") + "). Podem me atender?";
  document.getElementById("waCalc").href = wa(msg);
  document.getElementById("waCalc").target = "_blank";
  document.getElementById("waCalc").rel = "noopener";
}

rng.oninput = calc;

document.getElementById("chips").onclick = function (e) {
  var b = e.target.closest(".chip");
  if (!b) return;
  document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("on"); });
  b.classList.add("on");
  tipo = b.dataset.t;
  calc();
};
calc();

// Animação ao rolar a página
var io = new IntersectionObserver(function (es) {
  es.forEach(function (x) {
    if (x.isIntersecting) {
      x.target.classList.add("in");
      io.unobserve(x.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".rev").forEach(function (el) { io.observe(el); });
