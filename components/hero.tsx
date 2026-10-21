import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import CandyShoal from './ui/cluster-about-glossy';

const colors = ['#ffac49', '#ec7baa', '#887bff', '#87d4c7'];
function HeroAnimation() {
  const [paused, setPaused] = useState(matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>('#motion-toggle')!;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const toggle = () => setPaused(value => !value);
    const preference = (event: MediaQueryListEvent) => setPaused(event.matches);
    button.addEventListener('click', toggle);
    media.addEventListener('change', preference);
    return () => { button.removeEventListener('click', toggle); media.removeEventListener('change', preference); };
  }, []);
  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>('#motion-toggle')!;
    button.textContent = paused ? '▶ Play animation' : 'Ⅱ Pause animation';
    button.setAttribute('aria-pressed', String(paused));
    document.querySelector('#hero')!.classList.toggle('paused', paused);
  }, [paused]);
  return <CandyShoal background="#08090b" count={28} scale={140} merge={45}
    colors={colors} speed={paused ? 0 : 22} hover={paused ? 0 : 65}
    gather={paused ? 0 : 5} placement={{x:0, angle:-15, tilt:8}}
    advanced={{resolution:55, fieldWidth:62, fieldHeight:52, grain:0, vignette:8}}
  />;
}
const target = document.querySelector('.hero-art');
if (target) createRoot(target).render(<HeroAnimation />);
