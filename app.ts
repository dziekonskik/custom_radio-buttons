const labels = document.querySelectorAll('.input-labels__label');

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
  indicatorManager(event.target, event.clientX, event.clientY);
};

[...labels].forEach((label) => label.addEventListener('click', pulse));
