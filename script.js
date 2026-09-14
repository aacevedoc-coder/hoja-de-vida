$(function () {

  /* ---------- 1) Enlace activo en la navegación ---------- */
  var pagina = window.location.pathname.split("/").pop() || "index.html";
  $(".nav__link").each(function () {
    var href = $(this).attr("href");
    if (href === pagina) {
      $(this).addClass("active");
    }
  });

  /* ---------- 2) Menú responsive (hamburguesa) ---------- */
  $("#navToggle").on("click", function () {
    $("#navLinks").slideToggle(220);
  });

  // Si el usuario agranda la ventana, aseguramos que el menú se vea
  $(window).on("resize", function () {
    if ($(window).width() > 768) {
      $("#navLinks").removeAttr("style");
    }
  });

  /* ---------- 3) Sombra dinámica en el nav al hacer scroll ---------- */
  $(window).on("scroll", function () {
    $(".nav").toggleClass("nav--scrolled", $(window).scrollTop() > 10);
  });

  /* ---------- 4) Animación de aparición al hacer scroll ---------- */
  function revealOnScroll() {
    var limiteInferior = $(window).scrollTop() + $(window).height() - 60;
    $(".reveal").each(function () {
      if (!$(this).hasClass("visible") && $(this).offset().top < limiteInferior) {
        $(this).addClass("visible");
      }
    });
  }
  revealOnScroll();
  $(window).on("scroll resize", revealOnScroll);

  /* ---------- 5) Validación del formulario de contacto ---------- */
  var $form = $("#form-contacto");
  if ($form.length) {

    var $nombre = $("#nombre");
    var $email = $("#email");
    var $telefono = $("#telefono");
    var $mensaje = $("#mensaje");
    var $alerta = $("#form-alert");

    function marcarError($campo, mensaje) {
      $campo.addClass("is-invalid").removeClass("is-valid");
      $campo.siblings(".invalid-feedback").text(mensaje);
    }

    function marcarValido($campo) {
      $campo.removeClass("is-invalid").addClass("is-valid");
    }

    function validarNombre() {
      var valor = $nombre.val().trim();
      if (valor.length < 3) {
        marcarError($nombre, "Ingresa tu nombre completo (mínimo 3 caracteres).");
        return false;
      }
      marcarValido($nombre);
      return true;
    }

    function validarEmail() {
      var valor = $email.val().trim();
      var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!regexEmail.test(valor)) {
        marcarError($email, "Ingresa un correo electrónico válido (ejemplo@dominio.com).");
        return false;
      }
      marcarValido($email);
      return true;
    }

    function validarTelefono() {
      var valor = $telefono.val().trim();
      if (valor === "") {
        // El teléfono es opcional
        $telefono.removeClass("is-invalid is-valid");
        return true;
      }
      var regexTelefono = /^[0-9+\s()-]{7,20}$/;
      if (!regexTelefono.test(valor)) {
        marcarError($telefono, "Ingresa un teléfono válido (solo números, espacios, +, - o paréntesis).");
        return false;
      }
      marcarValido($telefono);
      return true;
    }

    function validarMensaje() {
      var valor = $mensaje.val().trim();
      if (valor.length < 10) {
        marcarError($mensaje, "Cuéntame un poco más sobre tu proyecto (mínimo 10 caracteres).");
        return false;
      }
      marcarValido($mensaje);
      return true;
    }

    // Validación en tiempo real mientras el usuario escribe
    $nombre.on("input blur", validarNombre);
    $email.on("input blur", validarEmail);
    $telefono.on("input blur", validarTelefono);
    $mensaje.on("input blur", validarMensaje);

    // Validación al enviar
    $form.on("submit", function (e) {
      e.preventDefault();

      var nombreOk = validarNombre();
      var emailOk = validarEmail();
      var telefonoOk = validarTelefono();
      var mensajeOk = validarMensaje();

      if (nombreOk && emailOk && telefonoOk && mensajeOk) {
        $alerta
          .removeClass("error")
          .addClass("success")
          .text("✅ ¡Gracias, " + $nombre.val().trim().split(" ")[0] + "! Tu mensaje fue validado correctamente.")
          .fadeIn(300);

        $form[0].reset();
        $(".form-control").removeClass("is-valid is-invalid");

        setTimeout(function () {
          $alerta.fadeOut(400);
        }, 5000);
      } else {
        $alerta
          .removeClass("success")
          .addClass("error")
          .text("⚠️ Revisa los campos marcados en rojo antes de enviar.")
          .fadeIn(300);
      }
    });
  }
});