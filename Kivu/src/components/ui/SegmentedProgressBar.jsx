import React, { useEffect, useState } from "react";


/*useEffect waits 50ms to let the component mount, then sets mounted = true.

Each <div> starts at width: 0% and animates to its target width.

Tailwind classes like transition-all duration-700 ease-in-out handle smooth animation.

*/

const SegmentedProgressBar = ({ segments, totalValue }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timeout = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full h-5 bg-gray-300 rounded overflow-hidden flex">
      {segments.map((segment, index) => {
        const segmentWidth = (segment.value / totalValue) * 100;
        return (
          <div
            key={index}
            className="h-full transition-all duration-700 ease-in-out"
            style={{
              width: mounted ? `${segmentWidth}%` : "0%",
              backgroundColor: segment.color,
            }}
          />
        );
      })}
    </div>
  );
};

export default SegmentedProgressBar;
