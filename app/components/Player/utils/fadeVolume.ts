import { type YouTubePlayer } from "react-youtube";
import { clamp } from "../../../utils/clamp";
import { wait } from "../../../utils/wait";

const getContinueCondition = (isIncreasing: boolean, targetVolume: number) =>
  isIncreasing
    ? (vol: number) => vol <= targetVolume
    : (vol: number) => vol >= targetVolume;

export const fadeVolume = async (player: YouTubePlayer, target: number, step: number = 1) => {
  const clampedTargetVolume = clamp(target, 0, 100);
  const currentVolume = player.getVolume();
  const isIncreasing = clampedTargetVolume > currentVolume;
  const fadeStep = isIncreasing ? step : -step;

  const meetsCondition = getContinueCondition(isIncreasing, clampedTargetVolume);

  let volume = currentVolume;
  while (meetsCondition(volume)) {
    volume += fadeStep;
    await wait(10);
    player.setVolume(clamp(volume, 0, 100));
  }
};