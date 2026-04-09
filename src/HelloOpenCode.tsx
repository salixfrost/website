import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Text } from "remotion";
import { useEffect, useState } from "react";

export const HelloOpenCode = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const [particles, setParticles] = useState([]);

  // Initialize particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    setParticles(newParticles);
  }, [width, height]);

  const timeInSeconds = frame / fps;

  // Title animation - fade in and scale
  const titleOpacity = interpolate(timeInSeconds, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(timeInSeconds, [0, 0.5], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle animation - fade in after title
  const subtitleOpacity = interpolate(timeInSeconds, [0.8, 1.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle slide up
  const subtitleY = interpolate(timeInSeconds, [0.8, 1.3], [30, 0], {
    extrapolateRight: "clamp",
  });

  // Particle animation
  const animatedParticles = particles.map((p, i) => ({
    ...p,
    x: p.x + p.speedX * timeInSeconds * 30,
    y: p.y + p.speedY * timeInSeconds * 30,
    opacity: Math.max(0, p.opacity - timeInSeconds * 0.1),
  }));

  // Background gradient animation
  const bgGradient = `linear-gradient(${135 + timeInSeconds * 10}deg, 
    rgba(99, 102, 241, ${interpolate(timeInSeconds, [0, 2], [0.3, 0.6], { extrapolateRight: "clamp" })}), 
    rgba(168, 85, 247, ${interpolate(timeInSeconds, [0, 2], [0.3, 0.6], { extrapolateRight: "clamp" })}),
    rgba(236, 72, 153, ${interpolate(timeInSeconds, [0, 2], [0.3, 0.6], { extrapolateRight: "clamp" })}))`;

  return (
    <AbsoluteFill style={{ background: bgGradient }}>
      {/* Animated particles */}
      {animatedParticles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.8)",
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
          }}
        >
          <Text
            style={{
              fontSize: 120,
              fontWeight: "bold",
              color: "white",
              fontFamily: "Inter, system-ui, sans-serif",
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
              letterSpacing: "-2px",
            }}
          >
            Hello
          </Text>
          <Text
            style={{
              fontSize: 120,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #ffffff, #a5f3fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Inter, system-ui, sans-serif",
              textShadow: "none",
              letterSpacing: "-2px",
            }}
          >
            OpenCode
          </Text>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Welcome to the future of coding
          </Text>
        </div>
      </div>

      {/* Bottom decoration */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
