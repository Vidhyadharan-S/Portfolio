import React, { useState, useEffect } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

const ScrambleText = ({ text, className, href }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let frameId;
    let iteration = 0;

    const animate = () => {
      if (!isHovering) {
        setDisplayText(text);
        return;
      }

      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        setIsHovering(false);
        cancelAnimationFrame(frameId);
      } else {
        iteration += 1 / 3; // Sped up speed of scramble settling
        frameId = requestAnimationFrame(animate);
      }
    };

    if (isHovering) {
      frameId = requestAnimationFrame(animate);
    } else {
      setDisplayText(text);
    }

    return () => cancelAnimationFrame(frameId);
  }, [isHovering, text]);

  return (
    <a
      href={href}
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </a>
  );
};

export default ScrambleText;
