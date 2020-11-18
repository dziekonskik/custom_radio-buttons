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

  //dlaczego jak przenosze waunek o parenta do zmiennej to ts krzyczy?
  if (iOsWasClicked && radioButtonParent !== null) {
    checkedSpan.style.transform = `translateY(${
      radioButtonParent?.clientHeight - checkedSpan.clientHeight
    }px)`;
    uncheckedSpan.style.opacity = '0';
    uncheckedSpan.style.transform = `translateY(-${
      radioButtonParent?.clientHeight - checkedSpan.clientHeight
    }px)`;

    uncheckedBackgroundFill.style.animation = 'fill 1.6s';
    delayedUncheckedBackgroundFill.style.animation = 'fill 1.6s 0.6s';
    uncheckedSpan.style.opacity = '1';
  }

  // if (androidWasClicked && radioButtonParent !== null) {
  //   console.log('elo');
  //   checkedSpan.style.transform = `translateY(-${
  //     radioButtonParent?.clientHeight - checkedSpan.clientHeight
  //   }px)`;
  //   uncheckedSpan.style.transform = `translateY(${
  //     radioButtonParent?.clientHeight - checkedSpan.clientHeight
  //   }px)`;
  //   checkedBackgroundFill.style.animation = 'fill 1.6s';
  //   delayedCheckedBackgroundFill.style.animation = 'fill 1.6s 0.6s';
  // }
};

[...labels].forEach((label) => label.addEventListener('click', pulse));
[...radiobuttons].forEach((radioButton) =>
  radioButton.addEventListener('change', handleRaiobuttonChange)
);
