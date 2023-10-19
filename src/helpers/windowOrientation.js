function windowOrientation() {
    window.addEventListener("orientationchange", ()=> {
        console.log("window.screen.orientation: " + window.screen.orientation);
    });
    
    if (window.matchMedia("(orientation: portrait)").matches) {
        var current_mode = 'Portrait';
    } else if (window.matchMedia("(orientation: landscape)").matches) {
        var current_mode = 'Landscape';
    }
    else {
        var current_mode = window.innerWidth < window.innerHeight ? "Portrait" : "Landscape";
    }
    console.log("current_mode: " + current_mode);
    return current_mode
}