const labels: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  '.input-labels__label'
);
const radiobuttons: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  '.native-radio-button'
);

const indicatorManager = (
  target: any,
  positionX: number,
  positionY: number
): Element => {
  const indicator = document.createElement('div');
  indicator.className = '';
  indicator.style.top = `${positionY - indicator.offsetHeight / 2}px`;
  indicator.style.left = `${positionX - indicator.offsetWidth / 2}px`;
  indicator.classList.add('indicator');
  document.body.appendChild(indicator);
  target.onmouseup = () => indicator.remove();
  return indicator;
};

const pulse = (event: MouseEvent) => {
  const radiobuttonsContainer = <HTMLElement>(
    document.querySelector('.radiobuttons')
  );
  if (radiobuttonsContainer === null) {
    return;
  }
  indicatorManager(event.target, event.clientX, event.clientY);
};

const setInitialPosition = () => {
  const checkedSpan = <HTMLElement>(
    document.querySelector('.radio-span--checked')
  );
  const uncheckedSpan = <HTMLElement>(
    document.querySelector('.radio-span--unchecked')
  );
  checkedSpan.style.top = '0';
  checkedSpan.style.left = '0';
  uncheckedSpan.style.bottom = '0';
  uncheckedSpan.style.left = '0';
};

const performAnimation = (
  main: HTMLElement,
  secondary: HTMLElement,
  parent: HTMLElement,
  background: HTMLElement,
  delayedBackground: HTMLElement
): void => {
  main.style.zIndex = '9';
  secondary.style.zIndex = '7';
  main.style.transform = `translateY(${
    parent?.clientHeight - main.clientHeight
  }px)`;
  secondary.style.opacity = '0';
  background.style.animation = 'fill 1.6s';
  delayedBackground.style.animation = 'fill 1.6s 0.6s';
  secondary.style.top = '0';
  secondary.style.opacity = '1';
};

const styleReset = (...elements: HTMLElement[]) => {
  [...elements].forEach((element) => element.removeAttribute('style'));
};

const handleRaiobuttonChange = (event: Event) => {
  const radioButton = <Element>event.target;
  const radioButtonParent = radioButton.parentElement;
  const checkedSpan = <HTMLElement>(
    document.querySelector('.radio-span--checked')
  );
  const uncheckedSpan = <HTMLElement>(
    document.querySelector('.radio-span--unchecked')
  );
  const checkedBackgroundFill = <HTMLElement>(
    document.querySelector('.background-animate--checked')
  );
  const uncheckedBackgroundFill = <HTMLElement>(
    document.querySelector('.background-animate--unchecked')
  );
  const delayedCheckedBackgroundFill = <HTMLElement>(
    document.querySelector('.background-animate--delayedchecked')
  );
  const delayedUncheckedBackgroundFill = <HTMLElement>(
    document.querySelector('.background-animate--delayedunchecked')
  );

  const iOsWasClicked = radioButton.classList.contains(
    'native-radio-button--ios'
  );
  const androidWasClicked = radioButton.classList.contains(
    'native-radio-button--adnroid'
  );

  setInitialPosition(checkedSpan, uncheckedSpan);

  //dlaczego jak przenosze waunek o parenta do zmiennej to ts krzyczy?
  if (iOsWasClicked && radioButtonParent !== null) {
    styleReset(
      checkedSpan,
      uncheckedSpan,
      radioButtonParent,
      uncheckedBackgroundFill,
      delayedUncheckedBackgroundFill
    );
    performAnimation(
      checkedSpan,
      uncheckedSpan,
      radioButtonParent,
      uncheckedBackgroundFill,
      delayedUncheckedBackgroundFill
    );
  }

  if (androidWasClicked && radioButtonParent !== null) {
    styleReset(
      uncheckedSpan,
      checkedSpan,
      radioButtonParent,
      checkedBackgroundFill,
      delayedCheckedBackgroundFill
    );
    performAnimation(
      uncheckedSpan,
      checkedSpan,
      radioButtonParent,
      checkedBackgroundFill,
      delayedCheckedBackgroundFill
    );
  }
};

setInitialPosition();

[...labels].forEach((label) => label.addEventListener('click', pulse));
[...radiobuttons].forEach((radioButton) =>
  radioButton.addEventListener('change', handleRaiobuttonChange)
);
