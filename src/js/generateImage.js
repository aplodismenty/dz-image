import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { getRefs } from './getRefs';
import { resolution } from './resolution';

const {
  runBtn,
  generatedImg,
  promptStr,
  modelInput,
  negativePromptStr,
  samplerInput,
  seedStr,
  guidanceInput,
  resolutionInput,
  upscaleInput,
  stepsInput,
  DEZGO_IMAGES_API_KEY,
} = getRefs;

const generateImage = async () => {
  const prompt = promptStr.value;

  if (prompt.trim().length === 0) {
    Notify.failure('Prompt cannot be empty!');
    return;
  }

  const model = modelInput.value;
  const negativePrompt = negativePromptStr.value;
  const guidance = guidanceInput.value;
  const sampler = samplerInput.value;
  const seed = seedStr.value;
  const resolutionVal = resolutionInput.value;
  const upscale = upscaleInput.value;
  const steps = stepsInput.value;

  const encodedParams = new URLSearchParams();
  encodedParams.append('prompt', prompt);
  encodedParams.append('model', model);
  if (negativePrompt.trim().length !== 0) {
    encodedParams.append('negative_prompt', negativePrompt);
  }
  encodedParams.append('guidance', guidance);
  encodedParams.append('sampler', sampler);
  if (seed.trim().length !== 0) {
    encodedParams.append('seed', seed);
  }

  const size = resolution(resolutionVal);

  encodedParams.append('width', size.width);
  encodedParams.append('height', size.height);
  encodedParams.append('upscale', upscale);
  encodedParams.append('steps', steps);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': DEZGO_IMAGES_API_KEY,
      'X-RapidAPI-Host': 'dezgo.p.rapidapi.com',
    },
    body: encodedParams,
  };

  Loading.circle('Generating...');
  const response = await fetch(
    'https://dezgo.p.rapidapi.com/text2image',
    options
  );
  const pngBlob = await response.blob();
  Loading.remove();
  generatedImg.src = URL.createObjectURL(pngBlob);
};

runBtn.addEventListener('click', generateImage);
