import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSidebar } from './sidebar/SidebarContext';

const TIME_THRESHOLD_MILLISECONDS = 40;
const DISTANCE_THRESHOLD_PIXELS = 50;

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

type SwipeEventParams = (
  element: HTMLDivElement | null,
  alreadySwiped: () => void
) => void;

type SwipeListenerProviderProps = {
  className?: string;
  children: ReactNode;
  enabledSidebarSwiping?: boolean;
  disableAlreadySwiped?: boolean;
  onSwipeLeft?: SwipeEventParams;
  onSwipeRight?: SwipeEventParams;
  onSwipeUp?: SwipeEventParams;
  onSwipeDown?: SwipeEventParams;
};

const SwipeListenerProvider = ({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  disableAlreadySwiped,
  enabledSidebarSwiping,
}: SwipeListenerProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [openSidebar] = useSidebar();
  const [swipedLeft, setSwipedLeft] = useState(false);
  const [swipedRight, setSwipedRight] = useState(false);
  const [swipedUp, setSwipedUp] = useState(false);
  const [swipedDown, setSwipedDown] = useState(false);

  useEffect(() => {
    if (!swipedLeft) return;

    setSwipedLeft(false);
  }, [swipedLeft]);

  useEffect(() => {
    if (!swipedRight) return;

    setSwipedRight(false);
  }, [swipedRight]);

  useEffect(() => {
    if (!swipedUp) return;

    setSwipedUp(false);
  }, [swipedUp]);

  useEffect(() => {
    if (!swipedDown) return;

    setSwipedDown(false);
  }, [swipedDown]);

  useEffect(() => {
    if (!ref.current) return;

    let startTime = 0;
    let clientX0 = 0;
    let clientY0 = 0;
    let alreadySwiped = false;

    const doAlreadySwiped = () => {
      alreadySwiped = true;
    };

    const handleXSwipes = (event: TouchEvent) => {
      const touch = event.touches[0];
      const deltaX = touch.clientX - clientX0;
      clientX0 = touch.clientX;

      if (Math.abs(deltaX) <= DISTANCE_THRESHOLD_PIXELS) return;

      if (deltaX > DISTANCE_THRESHOLD_PIXELS) {
        if (window.innerWidth < 768 && enabledSidebarSwiping) {
          openSidebar();
        }

        setSwipedLeft(true);
        onSwipeLeft?.(ref.current, doAlreadySwiped);
      } else {
        setSwipedRight(true);
        onSwipeRight?.(ref.current, doAlreadySwiped);
      }

      alreadySwiped = true && !disableAlreadySwiped;
    };

    const handleYSwipes = (event: TouchEvent) => {
      const touch = event.touches[0];
      const deltaY = touch.clientY - clientY0;
      clientY0 = touch.clientY;

      if (Math.abs(deltaY) <= DISTANCE_THRESHOLD_PIXELS) return;

      if (deltaY > DISTANCE_THRESHOLD_PIXELS) {
        setSwipedDown(true);
        onSwipeDown?.(ref.current, doAlreadySwiped);
      } else {
        setSwipedUp(true);
        onSwipeUp?.(ref.current, doAlreadySwiped);
      }

      alreadySwiped = true && !disableAlreadySwiped;
    };

    ref.current.ontouchstart = (event) => {
      startTime = Date.now();
      clientX0 = event.touches[0].clientX;
      clientY0 = event.touches[0].clientY;
      alreadySwiped = false;
    };

    ref.current.ontouchmove = (event) => {
      if (alreadySwiped) return;

      const deltaTime = Date.now() - startTime;
      if (deltaTime < TIME_THRESHOLD_MILLISECONDS) return;
      startTime = Date.now();

      handleXSwipes(event);
      handleYSwipes(event);
    };
  }, []);

  return (
    <div className={`${className ?? 'min-h-screen'}`} ref={ref}>
      <SwipeListenerContext.Provider value={{ swipedLeft, swipedRight }}>
        {children}
      </SwipeListenerContext.Provider>
    </div>
  );
};

export default SwipeListenerProvider;
export { useSwipeListener };
