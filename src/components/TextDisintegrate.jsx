import React, { useEffect, useRef } from "react";

export default function TextDisintegrate({ sequence = [], duration = 4000 }) {
  const canvasRef = useRef(null);
  const currentWordIndex = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let animationFrameId;
    let particles = [];
    let nextWordTimeout;
    let isDisintegrating = false;

    
    const resizeCanvas = () => {
      const isMobile = window.innerWidth < 640;
      canvas.width = isMobile ? 340 : 700;
      canvas.height = isMobile ? 110 : 180; 
    };
    resizeCanvas();

    class Particle {
      constructor(x, y, color) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = x;
        this.targetY = y;
        this.color = color;
        this.size = window.innerWidth < 640 ? 1.3 : 1.6; 
        
        this.vx = 0;
        this.vy = 0;
        this.ease = Math.random() * 0.05 + 0.04; 
        this.friction = 0.82; 
      }

      update() {
        if (isDisintegrating) {
          this.vx += (Math.random() - 0.5) * 1.8;
          this.vy += (Math.random() - 0.5) * 1.8;
          this.vx *= this.friction;
          this.vy *= this.friction;
          this.x += this.vx;
          this.y += this.vy;
        } else {
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          this.vx = dx * this.ease;
          this.vy = dy * this.ease;
          this.x += this.vx;
          this.y += this.vy;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    function initParticles(data) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isMobile = window.innerWidth < 640;
      
      const fontSize = isMobile ? 42 : 72;
      const lineHeight = isMobile ? 46 : 78;
      
      ctx.textAlign = isMobile ? "center" : "left";
      ctx.textBaseline = "top";

      const startX = isMobile ? canvas.width / 2 : 0;

      
      ctx.font = `300 ${fontSize}px sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(data.line1, startX, 0);

     
      ctx.font = `300 italic ${fontSize}px sans-serif`;
      ctx.fillStyle = "#facc15"; 
      ctx.fillText(data.line2, startX, lineHeight);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = [];
      const gap = 2; 

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = imgData.data[index + 3];

          if (alpha > 120) {
            const r = imgData.data[index];
            const g = imgData.data[index + 1];
            const b = imgData.data[index + 2];
            const hexColor = r > 200 && g > 200 && b < 100 ? "#facc15" : "#ffffff";

            particles.push(new Particle(x, y, hexColor));
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    initParticles(sequence[currentWordIndex.current]);
    animate();

    const cycleText = () => {
      isDisintegrating = true;
      setTimeout(() => {
        currentWordIndex.current = (currentWordIndex.current + 1) % sequence.length;
        initParticles(sequence[currentWordIndex.current]);
        isDisintegrating = false;
        nextWordTimeout = setTimeout(cycleText, duration);
      }, 1000);
    };

    nextWordTimeout = setTimeout(cycleText, duration);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(nextWordTimeout);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [sequence, duration]);

  return <canvas ref={canvasRef} className="block mx-auto lg:mx-0 max-w-full" />;
}