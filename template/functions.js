// Switch light/dark theme
$(function() {
	let $switchBtn = $("#switch-theme"),
		osDarkscheme = window.matchMedia("(prefers-color-scheme: dark)"),
		$html = $("html"),
		dataAttr = "data-theme",
		light = "light",
		dark = "dark";

	$switchBtn.click(function(e) {
		e.preventDefault();
		$(this).blur();

		if (osDarkscheme.matches) {
			$html.attr(dataAttr, $html.attr(dataAttr) == light ? dark : light);
			var theme = $html.attr(dataAttr) == light ? light : dark;
		} else {
			$html.attr(dataAttr, $html.attr(dataAttr) == dark ? light : dark);
			var theme = $html.attr(dataAttr) == dark ? dark : light;
		}
		localStorage.setItem("sideoftheforce", theme);
	});
	
});

// Show/hide password
if ( (typeof showPassword !== "undefined") && $("[type='password']").length ) {
	let $passwordInput = $("input[type='password']"),
		showpassBtn = ("<button type='button' class='showpass-btn fa fa-eye' data-showpass></button>");

	$passwordInput.each(function() {
		$(this).after(showpassBtn);
	});

	$("[data-showpass]").click(function() {
		let thisPassword = $(this).prev($passwordInput),
			typeValue = thisPassword.attr("type") === "password" ? "text" : "password";

		$(this).toggleClass("fa-eye fa-eye-slash").blur();
		thisPassword.attr("type", typeValue).toggleClass("warning");
	});
}

// Display first username letter as default avatar in viewtopic mini-profile
if ($(".avatar-letter").length) {
	$(".no-avatar").each(function() {
		let $letterContainer = $(this).find(".avatar-letter"),
			$usernameLink = $(this).find("[class*='username']"),
			firstLetter = $usernameLink.text().slice(0,1);
			
		$letterContainer.append(firstLetter);
	});
}

/* Animate scroll to top */
$(window).scroll(function() {
	if ($(this).scrollTop() > 250) {
		$(".scrolltop").fadeIn();
	} else {
		$(".scrolltop").fadeOut();
	}
});

$(".scrolltop, .top").click(function() {
	$("html, body").animate({scrollTop : 0}, "fast");
	return false;
});

// Let user change main colors
$(function() {
    let $root = $("html"),
		cssVar = "--main-";
	
	$(".cp-list-item").each(function() {
		let $colPickItem = $(this).find("input"),
			itemId = $colPickItem.prop("id"),
			$buttonReset = $(this).find("button"),
			originalColor = $("#getcolors").css(cssVar + itemId);
	
		if (localStorage.getItem("main" + itemId)) {
			let storedColor = localStorage.getItem("main" + itemId);
			$("#" + itemId).attr("value", storedColor);
			$buttonReset.removeAttr("disabled");
		} else {
			$("#" + itemId).attr("value", originalColor);
		}			
	
		function spectrumize(colorOption) {
			$colPickItem.spectrum({
				type: "color",
				color: colorOption,
				showPalette: false,
				showInput: true,
				showAlpha: false,
				clickoutFiresChange: false,
				allowEmpty: false,
				containerClassName: "dropdown",
				cancelText: cancelLang,
				chooseText: confirmLang,
				move: function (thisColor) {
					$root.css(cssVar + itemId, thisColor.toHexString());
				},
				show: function (thisColor) {
					changed = false;
					currentColor = thisColor;
				},
				hide: function () {
					if (!changed && currentColor) {
						$root.css(cssVar + itemId, currentColor.toHexString());
					}
				},
				change: function (thisColor) {
					changed = true;
					$root.css(cssVar + itemId, thisColor.toHexString());
					$buttonReset.prop("disabled", false);
					localStorage.setItem("main" + itemId, thisColor.toHexString());
				}
			});
		}
		spectrumize();

		$buttonReset.click(function() {
			$colPickItem.spectrum("destroy");
			$root.css(cssVar + itemId, "");
			$(this).blur().prop("disabled", true);
			
			spectrumize(originalColor);

			let removeEachItem = ["main" + itemId];
			for (key of removeEachItem) {
				localStorage.removeItem(key);
			}
		});

	});
});

/* Modal Login Window */
$(function() {
	let $loginLink = $("#modal-login-trigger"),
		$form = "#modal-login",
		$phpbbWrapper = "#darkenwrapper";

	if ($($form).length) {
		$loginLink.click(function(e) {
			e.preventDefault();
			$($phpbbWrapper + ", " + $form).fadeIn(300);
		});

		$($phpbbWrapper + ", " + $form + " .alert_close").click(function(e) {
			e.preventDefault();
			$($phpbbWrapper + ", " + $form).fadeOut(300);
		});
	}
});
