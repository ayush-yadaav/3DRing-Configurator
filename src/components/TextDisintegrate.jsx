import React, { useEffect, useRef } from "react";

export default function TextDisintegrate({ sequence = [], duration = 4000 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null); // Parent size track karne ke liye
  const stateRef = useRef({
    currentPhraseIndex: 0,
    particles: [],
    state: "idle",
    stateTimer: 0,
    isUserHovering: false,
    dpr: 1,
    mouse: { x: -1000, y: -1000 }
  });

  useEffect(() => {
    if (!sequence || sequence.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let animationFrameId;

    const GAP = 2;              
    const TRANSITION_DURATION = 140; 
    const MOUSE_RADIUS = 180; 
    const HOVER_FORCE = 30;   

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    class Particle {
      constructor(targetX, targetY, color, dpr) {
        this.x = targetX;
        this.y = targetY;
        this.startX = targetX;
        this.startY = targetY;
        this.targetX = targetX;
        this.targetY = targetY;
        
        this.vx = 0;
        this.vy = 0;
        
        this.color = color;
        this.size = (Math.random() * 1.2 + 1.2) * (dpr * 0.7);
        this.returnSpeed = 0.07 + Math.random() * 0.04; 
      }

      morphTo(newTargetX, newTargetY, newColor, dpr) {
        this.startX = this.x;
        this.startY = this.y;
        this.targetX = newTargetX;
        this.targetY = newTargetY;
        this.color = newColor;

        const angle = Math.random() * Math.PI * 2;
        
        const blastDistance = (Math.random() * 40 + 20) * dpr; 
        this.vx = Math.cos(angle) * blastDistance;
        this.vy = Math.sin(angle) * blastDistance;
      }

      update(progress, stateObj) {
        if (stateObj.state === "idle") {
          let baseTargetX = this.targetX;
          let baseTargetY = this.targetY;

          let mdx = stateObj.mouse.x - this.x;
          let mdy = stateObj.mouse.y - this.y;
          let dist = Math.sqrt(mdx * mdx + mdy * mdy);
          
          if (dist < MOUSE_RADIUS * stateObj.dpr) {
            let force = (MOUSE_RADIUS * stateObj.dpr - dist) / (MOUSE_RADIUS * stateObj.dpr);
            let angle = Math.atan2(mdy, mdx);
            
            baseTargetX -= Math.cos(angle) * force * (HOVER_FORCE * stateObj.dpr);
            baseTargetY -= Math.sin(angle) * force * (HOVER_FORCE * stateObj.dpr);
            
            stateObj.isUserHovering = true;
          }

          this.x += (baseTargetX - this.x) * this.returnSpeed;
          this.y += (baseTargetY - this.y) * this.returnSpeed;

        } else if (stateObj.state === "transition") {
          if (progress < 0.5) {
            const t = progress / 0.5; 
            const easeOut = 1 - Math.pow(1 - t, 3);
            this.x = this.startX + this.vx * easeOut;
            this.y = this.startY + this.vy * easeOut;
          } else {
            const t = (progress - 0.5) / 0.5; 
            const easeIn = easeInOutCubic(t); 
            
            const currentExplodedX = this.startX + this.vx;
            const currentExplodedY = this.startY + this.vy;
            
            this.x = currentExplodedX + (this.targetX - currentExplodedX) * easeIn;
            this.y = currentExplodedY + (this.targetY - currentExplodedY) * easeIn;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      }
    }

    const createTextPixels = (phrase, dpr) => {
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;

      const isMobile = window.innerWidth < 640;
      
     
      const baseSize = isMobile ? Math.min(canvas.width * 0.11, 44 * dpr) : 74 * dpr;
     
      const startX = isMobile ? canvas.width * 0.08 : 40 * dpr;
      const startY = isMobile ? canvas.height * 0.18 : 45 * dpr;
      
      offCtx.fillStyle = "#ffffff";
      offCtx.font = `700 ${baseSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      offCtx.textBaseline = "top";
      offCtx.fillText(phrase.line1, startX, startY);

      offCtx.fillStyle = "#FFC107";
      offCtx.font = `italic 700 ${baseSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      offCtx.fillText(phrase.line2, startX, startY + baseSize * 1.18);

      const imgData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data;
      const targets = [];

      for (let y = 0; y < canvas.height; y += GAP * dpr) {
        for (let x = 0; x < canvas.width; x += GAP * dpr) {
          const i = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
          if (imgData[i + 3] > 128) {
            targets.push({
              x: x,
              y: y,
              color: `rgba(${imgData[i]}, ${imgData[i+1]}, ${imgData[i+2]}, ${imgData[i+3]/255})`
            });
          }
        }
      }
      return targets;
    };

    const initPhrase = () => {
      const stateObj = stateRef.current;
      const currentPhrase = sequence[stateObj.currentPhraseIndex];
      if (!currentPhrase) return;

      const targets = createTextPixels(currentPhrase, stateObj.dpr);
      const updatedParticles = [];

      for (let i = 0; i < targets.length; i++) {
        if (i < stateObj.particles.length) {
          let p = stateObj.particles[i];
          p.morphTo(targets[i].x, targets[i].y, targets[i].color, stateObj.dpr);
          updatedParticles.push(p);
        } else {
          let srcX = targets[i].x;
          let srcY = targets[i].y;
          if (stateObj.particles.length > 0) {
            const randomParent = stateObj.particles[Math.floor(Math.random() * stateObj.particles.length)];
            srcX = randomParent.x;
            srcY = randomParent.y;
          }
          let newP = new Particle(srcX, srcY, targets[i].color, stateObj.dpr);
          newP.morphTo(targets[i].x, targets[i].y, targets[i].color, stateObj.dpr);
          updatedParticles.push(newP);
        }
      }
      stateObj.particles = updatedParticles;
    };

    const resizeAndScaleCanvas = () => {
      const stateObj = stateRef.current;
      stateObj.dpr = window.devicePixelRatio || 1;
      
      
      const parentWidth = containerRef.current ? containerRef.current.clientWidth : window.innerWidth;
      const isMobile = window.innerWidth < 640;
      
   
      const width = isMobile ? window.innerWidth * 0.95 : Math.min(parentWidth, 720);
      const height = isMobile ? 200 : 260;

      canvas.width = width * stateObj.dpr;
      canvas.height = height * stateObj.dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      stateObj.particles = [];
      initPhrase();
    };

    const animate = () => {
      const stateObj = stateRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stateObj.isUserHovering = false;

      let progress = 0;
      if (stateObj.state === "transition") {
        progress = stateObj.stateTimer / TRANSITION_DURATION;
      }

      for (let i = 0; i < stateObj.particles.length; i++) {
        stateObj.particles[i].update(progress, stateObj);
        stateObj.particles[i].draw();
      }

      if (stateObj.state === "idle") {
        if (!stateObj.isUserHovering) {
          stateObj.stateTimer++;
          const maxIdleFrames = (duration / 1000) * 60; 
          
          if (stateObj.stateTimer > maxIdleFrames) {
            stateObj.currentPhraseIndex = (stateObj.currentPhraseIndex + 1) % sequence.length;
            initPhrase();
            stateObj.state = "transition";
            stateObj.stateTimer = 0;
          }
        } else {
          if (stateObj.stateTimer > 0) stateObj.stateTimer -= 2;
        }
      } else if (stateObj.state === "transition") {
        stateObj.stateTimer++;
        if (progress >= 1) {
          stateObj.state = "idle";
          stateObj.stateTimer = 0;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const stateObj = stateRef.current;
      stateObj.mouse.x = (e.clientX - rect.left) * stateObj.dpr;
      stateObj.mouse.y = (e.clientY - rect.top) * stateObj.dpr;
    };

    const handleMouseLeave = () => {
      const stateObj = stateRef.current;
      stateObj.mouse.x = -1000;
      stateObj.mouse.y = -1000;
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      resizeAndScaleCanvas();
      animate();
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    resizeAndScaleCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [sequence, duration]);

  return (
    <div ref={containerRef} className="w-full flex justify-center lg:justify-start overflow-visible">
      <canvas 
        ref={canvasRef} 
        className="block max-w-full cursor-default pointer-events-auto"
        style={{ background: "transparent" }}
      />
    </div>
  );
}