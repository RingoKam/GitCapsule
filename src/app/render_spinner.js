exports.spinner = {
    "start": (selector) => {
        $("html").addClass("dimmer");
        $(selector).addClass("cp-spinner cp-skeleton"); 
    },
    "end": (selector) => {
        $("html").removeClass("dimmer");
        $(selector).removeClass("cp-spinner cp-skeleton"); 
    }
}