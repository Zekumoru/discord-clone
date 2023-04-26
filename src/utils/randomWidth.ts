const MAXIMUM_WIDTH_PERCENT = 80;
const MINIMUM_WIDTH_PERCENT = 30;
const WIDTH_MULTIPLIER = 5;

type RandomWidthOptions = {
  maxPercent?: number;
  minPercent?: number;
  multiplier?: number;
};

const randomWidth = ({
  maxPercent,
  minPercent,
  multiplier,
}: RandomWidthOptions = {}) => {
  const max = maxPercent ?? MAXIMUM_WIDTH_PERCENT;
  const min = minPercent ?? MINIMUM_WIDTH_PERCENT;
  const widthMultiplier = multiplier ?? WIDTH_MULTIPLIER;
  const maxMultiplier = (max - min) / widthMultiplier;

  return Math.floor(Math.random() * maxMultiplier) * widthMultiplier + min;
};

export default randomWidth;
export type { RandomWidthOptions };
