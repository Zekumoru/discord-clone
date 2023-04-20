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

    let startTime = 0;
    let clientX0 = 0;
    let alreadySwiped = false;

    ref.current.ontouchstart = (event) => {
      startTime = Date.now();
      clientX0 = event.touches[0].clientX;
      alreadySwiped = false;
    };

    ref.current.ontouchmove = (event) => {
      if (alreadySwiped) return;

      const deltaTime = Date.now() - startTime;
      if (deltaTime < TIME_THRESHOLD_MILLISECONDS) return;

      const deltaX = event.touches[0].clientX - clientX0;
      clientX0 = event.touches[0].clientX;
      startTime = Date.now();

      if (Math.abs(deltaX) <= DISTANCE_THRESHOLD_PIXELS) return;

      if (deltaX > DISTANCE_THRESHOLD_PIXELS) {
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
