// Switch light/dark theme
$(function () {
	let $switchBtn = $("#switch-theme"),
		osDarkscheme = window.matchMedia("(prefers-color-scheme: dark)"),
		$html = $("html"),
		dataAttr = "data-theme",
		light = "light",
		dark = "dark";

	$switchBtn.on("click", function (e) {
		let theme = "";

		if (osDarkscheme.matches) {
			$html.attr(dataAttr, $html.attr(dataAttr) === light ? dark : light);
			theme = $html.attr(dataAttr) === light ? light : dark;
		} else {
			$html.attr(dataAttr, $html.attr(dataAttr) === dark ? light : dark);
			theme = $html.attr(dataAttr) === dark ? dark : light;
		}
		localStorage.setItem("sideoftheforce", theme);
		e.preventDefault();
		e.stopPropagation();
	});
});

// Show/hide password
if ((typeof showPassword !== "undefined") && $("[type='password']").length) {
	let $passwordInput = $("input[type='password']"),
		showpassBtn = ('<button type="button" class="showpass-btn fa fa-eye" data-showpass></button>');

	$passwordInput.each(function () {
		$(this).after(showpassBtn);
	});

	$("[data-showpass]").on("click", function () {
		let thisPassword = $(this).prev($passwordInput),
			typeValue = thisPassword.attr("type") === "password" ? "text" : "password";

		$(this).toggleClass("fa-eye fa-eye-slash");
		thisPassword.attr("type", typeValue).toggleClass("warning");
	});
}

/* Animate scroll to top */
$(window).scroll(function () {
	if ($(this).scrollTop() > 250) {
		$(".scrolltop").fadeIn();
	} else {
		$(".scrolltop").fadeOut();
	}
});

$(".scrolltop, .top").on("click", function () {
	$("html, body").animate({ scrollTop: 0 }, "fast");
	return false;
});

// Let user change main colors
$(function () {
	let $root = $("html"),
		cssVar = "--main-",
		cancelLang = $("#getcolors").data("cancel"),
		confirmLang = $("#getcolors").data("confirm");

	$(".cp-list-item").each(function () {
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
				containerClassName: "dropdown damaiopicker main" + itemId,
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

		$buttonReset.on("click", function () {
			$colPickItem.spectrum("destroy");
			$root.css(cssVar + itemId, "");
			$(this).prop("disabled", true);

			spectrumize(originalColor);

			let removeEachItem = ["main" + itemId];
			for (key of removeEachItem) {
				localStorage.removeItem(key);
			}
		});

	});

	$("#spectrum-dropdown-trigger").on("click", function () {
		$(this).next().find("li").first().find("button").first().focus();
	});
});

/* Modal Login Window */
$(function () {
	let $loginLink = $("#modal-login-trigger"),
		$form = "#modal-login",
		$phpbbWrapper = "#darkenwrapper";

	if ($($form).length) {
		$loginLink.on("click", function (e) {
			e.preventDefault();
			$($phpbbWrapper + ", " + $form).fadeIn(300);
			$("#username").focus();
		});

		$($phpbbWrapper + ", " + $form + " .alert_close").on("click", function (e) {
			e.preventDefault();
			$($phpbbWrapper + ", " + $form).fadeOut(300);
			$loginLink.focus();
		});

		$(document).on("keydown", function (e) {
			if (e.keyCode === 27 && $($form).is(":visible")) {
				$($phpbbWrapper + ", " + $form).fadeOut(300);
				$loginLink.focus();
			}
		});
	}
});

/* Add class on body when scrolling under #page-header */
function initScrollHandler() {
	let pageHeader = $("#page-header").height();

	function addScrolledClass() {
		$("body").addClass("scrolled");
	}

	function removeScrolledClass() {
		$("body").removeClass("scrolled");
	}

	function handleScroll() {
		var nowScrollTop = $(this).scrollTop();
		if (nowScrollTop > pageHeader) {
			addScrolledClass();
		} else {
			removeScrolledClass();
		}
	}

	// Handler for scrolling
	$(window).scroll(handleScroll);

	// Handler for anchor links
	$(document).on("click", 'a[href^="#"]', function (e) {
		e.preventDefault();
		// Get the target element's offset
		const target = $(this).attr("href");

		if (target !== "#" && target !== "") {
			const offset = $(target).offset().top - 40;

			// Animate the scroll to the target element
			$("html, body").animate({ scrollTop: offset }, 500, function () {
				// After scrolling, add or remove the "scrolled" class based on the scroll position
				var nowScrollTop = $(window).scrollTop();
				if (nowScrollTop > pageHeader) {
					addScrolledClass();
				} else {
					removeScrolledClass();
				}
			});
		}
	});

	// Handler for window resize
	$(window).resize(function () {
		// Update the value of pageHeader when the window is resized and the height of #page-header changes
		pageHeader = $("#page-header").height();

		// Check if the page is already scrolled (in case of anchor link usage on page load)
		var nowScrollTop = $(window).scrollTop();
		if (nowScrollTop > pageHeader) {
			addScrolledClass();
		} else {
			removeScrolledClass();
		}
	});

	// Initially check if the page is already scrolled (in case of anchor link usage on page load)
	if ($(window).scrollTop() > pageHeader) {
		addScrolledClass();
	}
}

// Add class to current member search link (memberlist_body.html)
function getMemberSearchParam() {
	const defaultSearch = $(".member-search > strong a").first();
	const memberlistSearch = new URL(document.location).searchParams;
	const firstChar = memberlistSearch.get("first_char");

	if (firstChar) {
		const charLink = $(".member-search").find('[href*="memberlist.php?first_char=' + firstChar + '"]');
		defaultSearch.removeClass("current-search");
		charLink.addClass("current-search");
	} else {
		defaultSearch.addClass("current-search");
	}
}
