import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSidebar } from './sidebar/SidebarContext';
import interact from 'interactjs';
import { DragEvent } from '@interactjs/types';

type SwipeEvents = {
  swipedLeft: boolean;
  swipedRight: boolean;
};

const SwipeListenerContext = createContext<SwipeEvents>({
  swipedLeft: false,
  swipedRight: false,
});

const useSwipeListener = () => {
  return useContext(SwipeListenerContext);
};

type SwipeListenerProviderProps = {
  className?: string;
  children: ReactNode;
  enabledSidebarSwiping?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

const SwipeListenerProvider = ({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
  enabledSidebarSwiping,
}: SwipeListenerProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [openSidebar] = useSidebar();
  const [swipedLeft, setSwipedLeft] = useState(false);
  const [swipedRight, setSwipedRight] = useState(false);

  useEffect(() => {
    if (!swipedLeft) return;

    setSwipedLeft(false);
  }, [swipedLeft]);

  useEffect(() => {
    if (!swipedRight) return;

    setSwipedRight(false);
  }, [swipedRight]);

  useEffect(() => {
    if (!ref.current) return;

    const interactable = interact(ref.current).draggable({});
    interactable.styleCursor(false);

    let alreadySwiped = false;
    interactable.on('dragstart', () => {
      alreadySwiped = false;
    });

    interactable.on('dragmove', (event: DragEvent) => {
      console.log(event.speed);
      if (alreadySwiped) return;
      if (event.speed < 600) return;

      const distance = event.clientX - event.clientX0;
      if (Math.abs(distance) <= 100) return;

      if (distance > 100) {
        if (window.innerWidth < 768 && enabledSidebarSwiping) {
          openSidebar();
        }

        setSwipedLeft(true);
        onSwipeLeft?.();
      } else {
        setSwipedRight(true);
        onSwipeRight?.();
      }

      alreadySwiped = true;
    });

    return () => interactable.unset();
  }, []);

  return (
    <div className={`touch-none ${className ?? 'min-h-screen'}`} ref={ref}>
      <SwipeListenerContext.Provider value={{ swipedLeft, swipedRight }}>
        {children}
      </SwipeListenerContext.Provider>
    </div>
  );
};

export default SwipeListenerProvider;
export { useSwipeListener };
