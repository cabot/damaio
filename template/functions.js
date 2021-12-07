// Switch light/dark style
$(function() {

	var switchBtn = $("#switch-theme"),
		osDarkscheme = window.matchMedia("(prefers-color-scheme: dark)"),
		html = $("html"),
		dataAttr = "data-theme",
		light = "light",
		dark = "dark";

	$(function() {
		var storedTheme = localStorage.getItem("sideoftheforce");

		if (storedTheme == dark) {
			html.attr(dataAttr, dark);
		} else if (storedTheme == light) {
			html.attr(dataAttr, light);
		}
	});

	switchBtn.click(function(e) {
		e.preventDefault();
		$(this).blur();

		if (osDarkscheme.matches) {
			html.attr(dataAttr, html.attr(dataAttr) == light ? dark : light);
			var theme = html.attr(dataAttr) == light ? light : dark;
		} else {
			html.attr(dataAttr, html.attr(dataAttr) == dark ? light : dark);
			var theme = html.attr(dataAttr) == dark ? dark : light;
		}
		localStorage.setItem("sideoftheforce", theme);
	});
	
});

// Show/hide password
if ($("[type='password']").length) {
	var passwordInput = $("input[type='password']"),
		showpassBtn = ("<button type='button' class='showpass-btn fa fa-eye' data-showpass></button>");

	passwordInput.each(function() {
		$(this).after(showpassBtn);
	});

	$("[data-showpass]").click(function() {
		var thisPassword = $(this).prev(passwordInput);
		var typeValue = thisPassword.attr("type") === 'password' ? 'text' : 'password';

		$(this).toggleClass("fa-eye fa-eye-slash").blur();
		thisPassword.attr("type", typeValue).toggleClass("warning");
	});
}

// Display first username letter as default avatar
if ($('.avatar-letter').length) {
	$(".no-avatar").each(function() {
		var letterContainer = $(this).find(".avatar-letter"),
			usernameLink = $(this).find("[class*='username']"),
			firstLetter = usernameLink.text().slice(0,1);
			
		letterContainer.append(firstLetter);
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

    var root = $("html"),
		color1 = "color1", color2 = "color2", color3 = "color3", cssVar = "--main-",
		main_color1 = localStorage.getItem("main" + color1),
    	main_color2 = localStorage.getItem("main" + color2),
    	main_color3 = localStorage.getItem("main" + color3),
		itemColor1 = $("#getcolors").css(cssVar + color1),
		itemColor2 = $("#getcolors").css(cssVar + color2),
		itemColor3 = $("#getcolors").css(cssVar + color3);

	if (main_color1) {
		$("#" + color1).attr("value", main_color1);
		$("#reset" + color1).removeAttr("disabled");
	} else {
		$("#" + color1).attr("value", itemColor1);
	}

	if (main_color2) {
		$("#" + color2).attr("value", main_color2);
		$("#reset" + color2).removeAttr("disabled");
	} else {
		$("#" + color2).attr("value", itemColor2);
	}

	if (main_color3) {
		$("#" + color3).attr("value", main_color3);
		$("#reset" + color3).removeAttr("disabled");
	} else {
		$("#" + color3).attr("value", itemColor3);
	}
	
	$(".cp-list-item").each(function() {

		var colPickItem = $(this).find("input"),
			itemId = colPickItem.prop("id"),
			buttonReset = $(this).find("button");
				
		colPickItem.spectrum({
			type: "color",
			showPalette: false,
			showInput: true,
			showAlpha: false,
			clickoutFiresChange: false,
			allowEmpty: false,
			containerClassName: "dropdown",
			cancelText: cancelLang,
			chooseText: confirmLang,
			move: function (thisColor) {
				root.css(cssVar + itemId, thisColor.toHexString());
			},
			show: function (thisColor) {
				changed = false;
				currentColor = thisColor;
			},
			hide: function () {
				if (!changed && currentColor) {
					root.css(cssVar + itemId, currentColor.toHexString());
				}
			},
			change: function (thisColor) {
				changed = true;
				root.css(cssVar + itemId, thisColor.toHexString());
				buttonReset.prop("disabled", false);
				localStorage.setItem("main" + itemId, thisColor.toHexString());
			}
		});

		buttonReset.click(function() {

			colPickItem.spectrum("destroy");
			root.css(cssVar + itemId, "");
			$(this).blur().prop("disabled", true);

			switch (true) {
				case itemId == color1:
					itemColor = itemColor1;
					break;
				case itemId == color2:
					itemColor = itemColor2;
					break;
				case itemId == color3:
					itemColor = itemColor3;
					break;                
			}
			
			colPickItem.spectrum({
				type: "color",
				color: itemColor,
				showPalette: false,
				showInput: true,
				showAlpha: false,
				clickoutFiresChange: false,
				allowEmpty: false,
				containerClassName: "dropdown",
				cancelText: cancelLang,
				chooseText: confirmLang,
				move: function (thisColor) {
					root.css(cssVar + itemId, thisColor.toHexString());
				},
				show: function (thisColor) {
					changed = false;
					currentColor = thisColor;
				},
				hide: function () {
					if (!changed && currentColor) {
						root.css(cssVar + itemId, currentColor.toHexString());
					}
				},
				change: function (thisColor) {
					changed = true;
					root.css(cssVar + itemId, thisColor.toHexString());
					buttonReset.prop("disabled", false);
					localStorage.setItem("main" + itemId, thisColor.toHexString());
				}
			});

			var removeEachItem = ["main" + itemId];
			for (key of removeEachItem) {
				localStorage.removeItem(key);
			}

		});

	});
});

$(function() {
	var loginLink = $("#modal-login-trigger"),
		form = "#modal-login",
		phpbbWrapper = "#darkenwrapper";

	if ($(form).length) {
		loginLink.click(function(e) {
			e.preventDefault();
			$(phpbbWrapper + ", " + form).fadeIn(300);
		});

		$(phpbbWrapper + ", " + form + " .alert_close").click(function(e) {
			e.preventDefault();
			$(phpbbWrapper + ", " + form).fadeOut(300);
		})
	}
});
