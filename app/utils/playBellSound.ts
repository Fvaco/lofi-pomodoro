export const playBellSound = () => {
  const bellSound = new Audio('/success-bell.ogg');
  bellSound.play();
}