// Switch light/dark style
$(function() {

	var switchBtn = $(".switch-theme"),
		osDarkscheme = window.matchMedia("(prefers-color-scheme: dark)"),
		html = $("html"),
		dataAttr = "data-theme",
		light = "light",
		dark = "dark";

	$(function() {
		var storedTheme = localStorage.getItem("darksideornot");

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
		localStorage.setItem("darksideornot", theme);
	});
	
});

// Show/hide password
if ($("[type='password']").length) {
	var passwordInput = $("input[type='password']");

	passwordInput.each(function() {
		$(this).after("<button type='button' class='showpass-btn fa fa-eye' data-showpass></button>");
	});

	$("[data-showpass]").click(function() {
		var thisPassword = $(this).prev(passwordInput);
		var typeValue = thisPassword.attr("type") === 'password' ? 'text' : 'password';

		$(this).toggleClass("fa-eye fa-eye-slash").blur();
		thisPassword.attr("type", typeValue);
	});
}

// Display first username letter as default avatar
if ($('.avatar-letter').length) {
	$(".no-avatar").each(function() {
		$(this).find(".avatar-letter")
		.append($(this).children("[class*='username']").text().slice(0,1));
	});
}

//$("#username_logged_in:not(.no-bulletin)").find(".header-avatar").prepend("<i>" + $("span[class*='username']").text().slice(0,1) + "</i>");

/* Animate scroll to top */
$(window).scroll(function() {
	if ($(this).scrollTop() > 300) {
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

    var proflat_color1 = localStorage.getItem("proflatcolorcol1"),
    	proflat_color2 = localStorage.getItem("proflatcolorcol2"),
    	proflat_color3 = localStorage.getItem("proflatcolorcol3");

	if (proflat_color1) {
		$("#col1").attr("value", proflat_color1);
	}
	if (proflat_color2) {
		$("#col2").attr("value", proflat_color2);
	}
	if (proflat_color3) {
		$("#col3").attr("value", proflat_color3);
	}

	var reset1 = $("#reset1"),
		reset2 = $("#reset2"),
		reset3 = $("#reset3");
		
	if (proflat_color1) {
		reset1.removeAttr("disabled");
	}
	if (proflat_color2) {
		reset2.removeAttr("disabled");
	}
	if (proflat_color3) {
		reset3.removeAttr("disabled");
	}

    var root = $("html");
	
	$(".colorli").each(function() {

		var colPickItem = $(this).find("input");
		var itemId = colPickItem.prop("id");
		var isChange = false;
		var previousСolor;
		var buttonReset = $(this).find("button");

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
				root.css("--proflat-color-" + itemId, thisColor.toHexString());
			},
			show: function (thisColor) {
				isChange = false;
				previousСolor = thisColor;
			},
			hide: function () {
				if (!isChange && previousСolor) {
					root.css("--proflat-color-" + itemId, previousСolor.toHexString());
				}
			},
			change: function (thisColor) {
				isChange = true;
				root.css("--proflat-color-" + itemId, thisColor.toHexString());
				buttonReset.prop("disabled", false);
				localStorage.setItem("proflatcolor" + itemId, thisColor.toHexString());
			}
		});

		buttonReset.click(function() {

			colPickItem.spectrum("destroy");
			root.css("--proflat-color-" + itemId, "");
			$(this).blur().prop("disabled", true);

			var itemCol;
			var itemCol1 = "#2b5b84",
				itemCol2 = "#1e91fc",
				itemCol3 = "#4889c5";
				
			switch (true) {
				case itemId == "col1":
					itemCol = itemCol1;
					break;
				case itemId == "col2":
					itemCol = itemCol2;
					break;
				case itemId == "col3":
					itemCol = itemCol3;
					break;                
			}
			
			colPickItem.spectrum({
				type: "color",
				color: itemCol,
				showPalette: false,
				showInput: true,
				showAlpha: false,
				clickoutFiresChange: false,
				allowEmpty: false,
				containerClassName: "dropdown",
				cancelText: cancelLang,
				chooseText: confirmLang,
				move: function (thisColor) {
					root.css("--proflat-color-" + itemId, thisColor.toHexString());
				},
				show: function (thisColor) {
					isChange = false;
					previousСolor = thisColor;
				},
				hide: function () {
					if (!isChange && previousСolor) {
						root.css("--proflat-color-" + itemId, previousСolor.toHexString());
					}
				},
				change: function (thisColor) {
					isChange = true;
					root.css("--proflat-color-" + itemId, thisColor.toHexString());
					buttonReset.prop("disabled", false);
					localStorage.setItem("proflatcolor" + itemId, thisColor.toHexString());
				}
			});

			var removeEachItem = ["proflatcolor" + itemId];
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

$("input[type='checkbox'], input[type='radio']").addClass("hidden-input").after("<span class='fake-input'></span>");

/*$(function() {
	var lang = $("html").prop("lang"),
		title;
	switch (true) {
		case lang == "en_us":
			title = "Light / Dark";
			break;
		case lang == "ar":
			title = "فاتح / داكن";
			break;
		case lang == "es-ar":
			title = "Claro / Oscuro";
			break;
		case lang == "eu":
			title = "Argia / Iluna";
			break;
		case lang == "be":
			title = "Светлае / Цёмнае";
			break;
		case lang == "pt-br":
			title = "Claro / Escuro";
			break;		
		case lang == "en-gb":
			title = "Light / Dark";
			break;
		case lang == "bg":
			title = "Светло / Тъмно";
			break;
		case lang == "ca":
			title = "Clar / Fosc";
			break;
		case lang == "hr":
			title = "Svjetlo / Tamno";
			break;
		case lang == "hr-x-vi":
			title = "Svjetlo / Tamno";
			break;
		case lang == "cs":
			title = "Světlá / Tmavá";
			break;
		case lang == "da":
			title = "Lys / Mørk";
			break;
		case lang == "nl":
			title = "Licht / Donker";
			break;
		case lang == "nl-x-formal":
			title = "Licht / Donker";
			break;
		case lang == "et":
			title = "Hele / Tume";
			break;
		case lang == "fi":
			title = "Vaalea/Tumea";
			break;
		case lang == "fr":
			title = "Clair / Sombre";
			break;               
	}	
	$("#switch-theme").attr("title", title);
});*/
