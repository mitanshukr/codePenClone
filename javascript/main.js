$(document).ready(function () {

    $(".panel").height($(window).height() - $("header").height() - 10);

    function updateOutput() {
        $("iframe").contents().find("html").html("<html><head><style type='text/css'>" +
            $("#cssPanel").val() + "</style></head></body>" + $("#htmlPanel").val() + "</body></html>");

        document.getElementById("outputPanel").contentWindow.eval($("#javascriptPanel").val());
    }

    updateOutput();
    $("textarea").on('change keyup paste', function () {
        updateOutput();
    });

    function hideAllPanel() {
        $(".btn-group").children().removeClass("active");
        $("#bodyContainer").children().addClass("hidden");
    }

    function mediaChange() {
        if (mobileScreen.matches) {
            //for small screen devices (max-width: 500px)
            hideAllPanel();
            $(".btn-group").children(":first-child").addClass("active");
            $("#bodyContainer").children(":first-child").removeClass("hidden");

            $(".btn-group").children().off("click");
            $(".btn-group").children().click(function () {
                hideAllPanel();
                $(this).toggleClass("active");
                let panelId = $(this).attr("id") + "Panel";
                $("#" + panelId).toggleClass("hidden");
            });
        }
        else if (tabScreen.matches) {
            //for medium screen devices (max-width: 800px)
            hideAllPanel();
            $(".btn-group").children(":first-child").addClass("active");
            $("#bodyContainer").children(":first-child").removeClass("hidden");
            $(".btn-group").children(":last-child").addClass("active");
            $("#bodyContainer").children(":last-child").removeClass("hidden");

            let activePanel = ["html", "output"];

            $(".btn-group").children().off("click");
            $(".btn-group").children().click(function () {
                let thisID = $(this).attr("id");

                if (this.matches(".active")) {
                    //when user clicks on active panel button...
                    $(this).toggleClass("active");
                    let panelId = $(this).attr("id") + "Panel";
                    $("#" + panelId).toggleClass("hidden");

                    if (thisID != activePanel[0])
                        activePanel[1] = activePanel[0];

                    activePanel[0] = null;
                }
                else {
                    //when user clicks on inactive(hidden) panel button...
                    let selectPanel = activePanel.shift();
                    $("#" + selectPanel + "Panel").toggleClass("hidden");
                    $("#" + selectPanel).toggleClass("active");

                    $(this).toggleClass("active");
                    let panelId = $(this).attr("id") + "Panel";
                    $("#" + panelId).toggleClass("hidden");

                    activePanel.push(thisID);
                }
            });
        }
        else {
            //for other screens...
            $(".btn-group").children().off("click");
            $(".btn-group").children().click(function () {
                $(this).toggleClass("active");
                let panelId = $(this).attr("id") + "Panel";
                $("#" + panelId).toggleClass("hidden");
            });
        }
    }

    //media queries; on Screen change.
    var mobileScreen = window.matchMedia("(max-width: 500px)");
    var tabScreen = window.matchMedia("(max-width: 800px)");

    mediaChange();
    tabScreen.addEventListener("change", mediaChange);
    mobileScreen.addEventListener("change", mediaChange);

});
