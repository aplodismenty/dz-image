import { getRefs } from './getRefs';

const { guidanceInput, guidanceNum, stepsInput, stepsNum } = getRefs;

const onChangeGuidance = evt => {
  guidanceNum.textContent = evt.target.value;
};

const onChangeSteps = evt => {
  stepsNum.textContent = evt.target.value;
};

guidanceInput.addEventListener('input', onChangeGuidance);
stepsInput.addEventListener('input', onChangeSteps);
