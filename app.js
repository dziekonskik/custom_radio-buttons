"use strict";
const labels = document.querySelectorAll('.input-labels__label');
const radiobuttons = document.querySelectorAll('.native-radio-button');
const indicatorManager = (target, positionX, positionY) => {
    const indicator = document.createElement('div');
    indicator.className = '';
    indicator.style.top = `${positionY - indicator.offsetHeight / 2}px`;
    indicator.style.left = `${positionX - indicator.offsetWidth / 2}px`;
    indicator.classList.add('indicator');
    document.body.appendChild(indicator);
    target.onmouseup = () => indicator.remove();
    return indicator;
};
const pulse = (event) => {
    const radiobuttonsContainer = (document.querySelector('.radiobuttons'));
    if (radiobuttonsContainer === null) {
        return;
    }
    indicatorManager(event.target, event.clientX, event.clientY);
};
const setInitialPosition = () => {
    const checkedSpan = (document.querySelector('.radio-span--checked'));
    const uncheckedSpan = (document.querySelector('.radio-span--unchecked'));
    checkedSpan.style.top = '0';
    checkedSpan.style.left = '0';
    uncheckedSpan.style.bottom = '0';
    uncheckedSpan.style.left = '0';
};
const performAnimation = (main, secondary, parent, background, delayedBackground) => {
    main.style.zIndex = '9';
    secondary.style.zIndex = '7';
    main.style.transform = `translateY(${(parent === null || parent === void 0 ? void 0 : parent.clientHeight) - main.clientHeight}px)`;
    main.style.animation = 'easeOutBounce 0.3s 0.6s';
    background.style.animation = 'fill 1.6s';
    delayedBackground.style.animation =
        'fill 1.6s 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
};
const styleReset = (...elements) => {
    [...elements].forEach((element) => element.removeAttribute('style'));
};
const handleRaiobuttonChange = (event) => {
    const radioButton = event.target;
    const radioButtonParent = radioButton.parentElement;
    const checkedSpan = (document.querySelector('.radio-span--checked'));
    const uncheckedSpan = (document.querySelector('.radio-span--unchecked'));
    const checkedBackgroundFill = (document.querySelector('.background-animate--checked'));
    const uncheckedBackgroundFill = (document.querySelector('.background-animate--unchecked'));
    const delayedCheckedBackgroundFill = (document.querySelector('.background-animate--delayedchecked'));
    const delayedUncheckedBackgroundFill = (document.querySelector('.background-animate--delayedunchecked'));
    const iOsWasClicked = radioButton.classList.contains('native-radio-button--ios');
    const androidWasClicked = radioButton.classList.contains('native-radio-button--adnroid');
    //dlaczego jak przenosze waunek o parenta do zmiennej to ts krzyczy?
    if (iOsWasClicked && radioButtonParent !== null) {
        styleReset(checkedSpan, uncheckedSpan, radioButtonParent, uncheckedBackgroundFill, delayedUncheckedBackgroundFill);
        performAnimation(checkedSpan, uncheckedSpan, radioButtonParent, uncheckedBackgroundFill, delayedUncheckedBackgroundFill);
    }
    if (androidWasClicked && radioButtonParent !== null) {
        styleReset(uncheckedSpan, checkedSpan, radioButtonParent, checkedBackgroundFill, delayedCheckedBackgroundFill);
        performAnimation(uncheckedSpan, checkedSpan, radioButtonParent, checkedBackgroundFill, delayedCheckedBackgroundFill);
    }
};
setInitialPosition();
[...labels].forEach((label) => label.addEventListener('click', pulse));
[...radiobuttons].forEach((radioButton) => radioButton.addEventListener('change', handleRaiobuttonChange));
