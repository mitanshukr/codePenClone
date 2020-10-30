$(document).ready(function () {
    function removeAll() {
        $(".btn-group").children().removeClass("active");
        $("#bodyContainer").children().addClass("hidden");
    }

    function mediaChange(x) {
        if (x.matches) {
            removeAll();
            $(".btn-group").children(":first-child").addClass("active");
            $("#bodyContainer").children(":first-child").removeClass("hidden");

            $(".btn-group").children().off("click");
            $(".btn-group").children().click(function () {
                removeAll();
                $(this).toggleClass("active");
                let panelId = $(this).attr("id") + "Panel";
                $("#" + panelId).toggleClass("hidden");
            });
        }
        else {

            $(".btn-group").children().off("click");
            $(".btn-group").children().click(function () {
                $(this).toggleClass("active");
                let panelId = $(this).attr("id") + "Panel";
                $("#" + panelId).toggleClass("hidden");
            });
        }
    }

    var x = window.matchMedia("(max-width: 550px)");
    mediaChange(x);
    x.addEventListener("change", mediaChange);

    function updateOutput() {
        $("iframe").contents().find("html").html("<html><head><style type='text/css'>" +
            $("#cssPanel").val() + "</style></head></body>" + $("#htmlPanel").val() + "</body></html>");

        document.getElementById("outputPanel").contentWindow.eval($("#javascriptPanel").val());
    }

    $(".panel").height($(window).height() - $("header").height() - 10);

    updateOutput();
    $("textarea").on('change keyup paste', function () {
        updateOutput();
    });
});