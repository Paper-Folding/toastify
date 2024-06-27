import Toastify from "./src/toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

/**
 * show my customized toast
 * @param text text content
 * @param duration duration to show, -set to "-1" to show permanently
 * @param preset color preset to show
 * @param { iconClassName, background, border, fontColor } style configurations that will be overwrite(if passed) with preset
 */
function showToast(text = "", duration = 3000, preset = null, { iconClassName = undefined, background = undefined, border = undefined, fontColor = undefined } = {}) {
    let styleToApply = { iconClassName, background, border, fontColor };
    Object.keys(styleToApply).forEach((key) => styleToApply[key] === undefined && delete styleToApply[key]); // remove undefined style
    if (preset) {
        let presetStyle = {};
        switch (preset) {
            case "primary":
                presetStyle = {
                    iconClassName: "bi-info-lg",
                    background: "#cfe2ff",
                    border: "1px solid #9ec5fe",
                    fontColor: "#0a58ca"
                };
                break;
            case "success":
                presetStyle = {
                    iconClassName: "bi-check-lg",
                    background: "#d1e7dd",
                    border: "1px solid #a3cfbb",
                    fontColor: "#146c43"
                };
                break;
            case "warning":
                presetStyle = {
                    iconClassName: "bi-exclamation-lg",
                    background: "#ffe69c",
                    border: "1px solid #ffd746",
                    fontColor: "#997404"
                };
                break;
            case "danger":
                presetStyle = {
                    iconClassName: "bi-x-circle",
                    background: "#f8d7da",
                    border: "1px solid #f1aeb5",
                    fontColor: "#b02a37"
                };
                break;
        }
        styleToApply = { ...presetStyle, ...styleToApply };
    }
    Toastify({
        text,
        duration,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            color: styleToApply.fontColor,
            background: styleToApply.background,
            fontSize: "1.1em",
            borderRadius: "6px",
            border: styleToApply.border,
            boxShadow: "rgb(0 0 0 / 10%) 2px -2px 5px 2px"
        },
        avatar: styleToApply.iconClassName
    }).showToast();
}

showToast("I just want to notify you.", -1, "primary");

showToast("Hello World!", -1, "success");
showToast("Hello World!", -1, "success", { iconClassName: "bi-heart" });

showToast("Ow man, what are you doing? What are you doing? are you doing? you doing? doing? ing?", -1, "warning");
showToast("Get out of there quickly!", -1, "danger");
