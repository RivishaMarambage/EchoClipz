import React, { useEffect, useRef } from 'react';

export function LoadingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const W = canvas.width;
    const H = canvas.height;
    const G = '#39ff14';

    const GROUND = H - 28;
    const platforms = [
      { x: 110, label: 'TT',  color: '#ff0050', color2: '#000000', shape: 'tiktok' },
      { x: 230, label: 'YT',  color: '#ff0000', color2: '#ffffff', shape: 'youtube' },
      { x: 350, label: 'IG',  color: '#e1306c', color2: '#f77737', shape: 'insta' },
      { x: 470, label: 'FB',  color: '#1877f2', color2: '#ffffff', shape: 'facebook' },
    ];
    const MONEY_X = 590;
    const PLAT_W = 48;
    const PLAT_H = 10;
    const PLAT_Y = GROUND - 2;

    const robot = {
      x: 30, y: GROUND,
      vy: 0, onGround: true,
      legPhase: 0,
      jumping: false,
      targetPlatIdx: 0,
      landed: [] as number[],
      celebrating: false,
      celebrateFrame: 0,
      reachedMoney: false
    };

    const sparks: any[] = [];
    const coins: any[] = [];

    function spawnSparks(x: number, y: number, color: string) {
      for (let i = 0; i < 10; i++) {
        sparks.push({
          x, y,
          vx: (Math.random() - 0.5) * 5,
          vy: -Math.random() * 4 - 1,
          life: 1, color
        });
      }
    }

    function spawnCoins(x: number, y: number) {
      for (let i = 0; i < 6; i++) {
        coins.push({
          x, y,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 5 - 2,
          life: 1, rot: Math.random() * Math.PI * 2
        });
      }
    }

    function drawGrid() {
      ctx!.strokeStyle = '#0f0f0f';
      ctx!.lineWidth = 0.5;
      for (let x = 0; x < W; x += 40) { ctx!.beginPath(); ctx!.moveTo(x,0); ctx!.lineTo(x,H); ctx!.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx!.beginPath(); ctx!.moveTo(0,y); ctx!.lineTo(W,y); ctx!.stroke(); }
    }

    function drawGround() {
      ctx!.fillStyle = '#111';
      ctx!.fillRect(0, GROUND + 2, W, H - GROUND - 2);
      ctx!.strokeStyle = G;
      ctx!.lineWidth = 1;
      ctx!.beginPath(); ctx!.moveTo(0, GROUND + 2); ctx!.lineTo(W, GROUND + 2); ctx!.stroke();
      ctx!.fillStyle = '#1a1a1a';
      for (let x = 0; x < W; x += 20) {
        ctx!.fillRect(x, GROUND + 4, 10, 4);
      }
    }

    function drawTikTokIcon(cx: number, cy: number, s: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.fillStyle = '#000';
      ctx!.beginPath(); ctx!.roundRect(-s, -s, s*2, s*2, 4); ctx!.fill();
      ctx!.fillStyle = '#69C9D0';
      ctx!.beginPath(); ctx!.arc(s*0.1, -s*0.05, s*0.42, 0, Math.PI*2); ctx!.fill();
      ctx!.fillStyle = '#EE1D52';
      ctx!.beginPath(); ctx!.arc(-s*0.1, s*0.05, s*0.42, 0, Math.PI*2); ctx!.fill();
      ctx!.fillStyle = '#fff';
      ctx!.beginPath(); ctx!.arc(0, 0, s*0.38, 0, Math.PI*2); ctx!.fill();
      ctx!.restore();
    }

    function drawYouTubeIcon(cx: number, cy: number, s: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.fillStyle = '#ff0000';
      ctx!.beginPath(); ctx!.roundRect(-s, -s*0.65, s*2, s*1.3, 4); ctx!.fill();
      ctx!.fillStyle = '#fff';
      ctx!.beginPath(); ctx!.moveTo(-s*0.25, -s*0.38); ctx!.lineTo(s*0.42, 0); ctx!.lineTo(-s*0.25, s*0.38); ctx!.closePath(); ctx!.fill();
      ctx!.restore();
    }

    function drawInstaIcon(cx: number, cy: number, s: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      const grad = ctx!.createLinearGradient(-s, s, s, -s);
      grad.addColorStop(0, '#f09433'); grad.addColorStop(0.25, '#e6683c');
      grad.addColorStop(0.5, '#dc2743'); grad.addColorStop(0.75, '#cc2366'); grad.addColorStop(1, '#bc1888');
      ctx!.fillStyle = grad;
      ctx!.beginPath(); ctx!.roundRect(-s, -s, s*2, s*2, 5); ctx!.fill();
      ctx!.strokeStyle = '#fff'; ctx!.lineWidth = 1.8;
      ctx!.beginPath(); ctx!.roundRect(-s*0.55, -s*0.55, s*1.1, s*1.1, 4); ctx!.stroke();
      ctx!.beginPath(); ctx!.arc(0, 0, s*0.32, 0, Math.PI*2); ctx!.stroke();
      ctx!.beginPath(); ctx!.arc(s*0.42, -s*0.42, s*0.1, 0, Math.PI*2); ctx!.fillStyle='#fff'; ctx!.fill();
      ctx!.restore();
    }

    function drawFacebookIcon(cx: number, cy: number, s: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.fillStyle = '#1877f2';
      ctx!.beginPath(); ctx!.roundRect(-s, -s, s*2, s*2, 4); ctx!.fill();
      ctx!.fillStyle = '#fff';
      ctx!.font = `bold ${s*1.5}px serif`;
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';
      ctx!.fillText('f', s*0.08, s*0.1);
      ctx!.restore();
    }

    function drawMoneyIcon(cx: number, cy: number, s: number, pulse: number) {
      const sc = 1 + Math.sin(pulse) * 0.08;
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.scale(sc, sc);
      ctx!.fillStyle = '#ffd700';
      ctx!.beginPath(); ctx!.arc(0, 0, s, 0, Math.PI*2); ctx!.fill();
      ctx!.strokeStyle = '#b8860b'; ctx!.lineWidth = 1.5;
      ctx!.beginPath(); ctx!.arc(0, 0, s, 0, Math.PI*2); ctx!.stroke();
      ctx!.fillStyle = '#7a5c00';
      ctx!.font = `bold ${s*1.1}px monospace`;
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';
      ctx!.fillText('$', 0, 1);
      ctx!.restore();
    }

    function drawPlatform(p: any, landed: boolean) {
      const cx = p.x + PLAT_W/2;
      const iconS = 14;
      const iconY = PLAT_Y - PLAT_H - iconS - 4;

      ctx!.fillStyle = landed ? '#1a3a10' : '#151515';
      ctx!.strokeStyle = landed ? G : '#2a2a2a';
      ctx!.lineWidth = 1;
      ctx!.beginPath(); ctx!.roundRect(p.x, PLAT_Y - PLAT_H, PLAT_W, PLAT_H, 3); ctx!.fill(); ctx!.stroke();

      if (landed) {
        ctx!.strokeStyle = G; ctx!.lineWidth = 0.5;
        ctx!.setLineDash([3,3]);
        ctx!.beginPath(); ctx!.moveTo(cx, PLAT_Y - PLAT_H); ctx!.lineTo(cx, iconY + iconS + 2); ctx!.stroke();
        ctx!.setLineDash([]);
      }

      if (p.shape === 'tiktok') drawTikTokIcon(cx, iconY, iconS);
      else if (p.shape === 'youtube') drawYouTubeIcon(cx, iconY, iconS);
      else if (p.shape === 'insta') drawInstaIcon(cx, iconY, iconS);
      else if (p.shape === 'facebook') drawFacebookIcon(cx, iconY, iconS);
    }

    function drawRobot(rx: number, ry: number, legPh: number, jumping: boolean, celebrating: boolean, celebFrame: number) {
      const cx = rx + 12;
      const by = ry;

      ctx!.save();
      if (celebrating) {
        const bounce = Math.sin(celebFrame * 0.3) * 5;
        ctx!.translate(0, bounce);
      }

      ctx!.fillStyle = G;
      ctx!.strokeStyle = '#0d2e06';
      ctx!.lineWidth = 1;

      const headY = by - 38;
      ctx!.beginPath(); ctx!.roundRect(cx - 8, headY, 16, 14, 3); ctx!.fill(); ctx!.stroke();
      ctx!.fillStyle = '#0d0d0d';
      ctx!.beginPath(); ctx!.arc(cx - 3, headY + 5, 2.5, 0, Math.PI*2); ctx!.fill();
      ctx!.beginPath(); ctx!.arc(cx + 3, headY + 5, 2.5, 0, Math.PI*2); ctx!.fill();
      if (!jumping) {
        ctx!.fillStyle = G;
        ctx!.fillRect(cx - 4, headY + 10, 8, 1.5);
      } else {
        ctx!.fillStyle = '#ffd700';
        ctx!.beginPath(); ctx!.arc(cx - 3, headY + 5, 2.5, 0, Math.PI*2); ctx!.fill();
        ctx!.beginPath(); ctx!.arc(cx + 3, headY + 5, 2.5, 0, Math.PI*2); ctx!.fill();
        ctx!.fillStyle = G;
        for (let i = 0; i < 4; i++) {
          ctx!.fillRect(cx - 4 + i*2.5, headY + 10, 1.5, 1.5);
        }
      }

      ctx!.fillStyle = '#2aee0a';
      ctx!.strokeStyle = '#0d2e06';
      ctx!.beginPath(); ctx!.roundRect(cx - 10, by - 38 + 14, 20, 14, 2); ctx!.fill(); ctx!.stroke();
      ctx!.fillStyle = '#39ff14';
      ctx!.fillRect(cx - 5, by - 22, 10, 2);

      const armAngle = jumping ? -0.8 : Math.sin(legPh) * 0.5;
      ctx!.strokeStyle = G; ctx!.lineWidth = 3; ctx!.lineCap = 'round';
      ctx!.beginPath(); ctx!.moveTo(cx - 10, by - 28);
      ctx!.lineTo(cx - 10 - Math.cos(armAngle + 0.5) * 10, by - 28 + Math.sin(armAngle + 0.5) * 8); ctx!.stroke();
      ctx!.beginPath(); ctx!.moveTo(cx + 10, by - 28);
      ctx!.lineTo(cx + 10 + Math.cos(-armAngle + 0.5) * 10, by - 28 + Math.sin(-armAngle + 0.5) * 8); ctx!.stroke();

      const lLeg = jumping ? -0.6 : Math.sin(legPh) * 0.5;
      const rLeg = jumping ? 0.6 : -Math.sin(legPh) * 0.5;
      ctx!.strokeStyle = G; ctx!.lineWidth = 3;
      ctx!.beginPath(); ctx!.moveTo(cx - 5, by - 10);
      ctx!.lineTo(cx - 5 + Math.sin(lLeg) * 10, by - 10 + Math.cos(Math.abs(lLeg)) * 10); ctx!.stroke();
      ctx!.beginPath(); ctx!.moveTo(cx + 5, by - 10);
      ctx!.lineTo(cx + 5 + Math.sin(rLeg) * 10, by - 10 + Math.cos(Math.abs(rLeg)) * 10); ctx!.stroke();

      ctx!.fillStyle = '#2aee0a';
      ctx!.beginPath();
      ctx!.ellipse(cx - 5 + Math.sin(lLeg)*10, by - 10 + Math.cos(Math.abs(lLeg))*10, 4, 3, 0, 0, Math.PI*2); ctx!.fill();
      ctx!.beginPath();
      ctx!.ellipse(cx + 5 + Math.sin(rLeg)*10, by - 10 + Math.cos(Math.abs(rLeg))*10, 4, 3, 0, 0, Math.PI*2); ctx!.fill();

      if (celebrating) {
        ctx!.fillStyle = '#ffd700';
        ctx!.font = 'bold 14px monospace';
        ctx!.textAlign = 'center';
        ctx!.fillText('$$$', cx, by - 55 + Math.sin(celebFrame*0.2)*4);
      }
      ctx!.restore();
    }

    function updateAndDrawSparks() {
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy; s.vy += 0.2; s.life -= 0.06;
        if (s.life <= 0) { sparks.splice(i,1); continue; }
        ctx!.globalAlpha = Math.max(0, s.life);
        ctx!.fillStyle = s.color;
        ctx!.beginPath(); ctx!.arc(s.x, s.y, 2, 0, Math.PI*2); ctx!.fill();
        ctx!.globalAlpha = 1;
      }
    }

    function updateAndDrawCoins() {
      for (let i = coins.length - 1; i >= 0; i--) {
        const c = coins[i];
        c.x += c.vx; c.y += c.vy; c.vy += 0.25; c.life -= 0.04; c.rot += 0.15;
        if (c.life <= 0) { coins.splice(i,1); continue; }
        ctx!.globalAlpha = Math.max(0, c.life);
        ctx!.save(); ctx!.translate(c.x, c.y); ctx!.rotate(c.rot);
        ctx!.fillStyle = '#ffd700';
        ctx!.beginPath(); ctx!.ellipse(0, 0, 5, 3, 0, 0, Math.PI*2); ctx!.fill();
        ctx!.fillStyle = '#b8860b';
        ctx!.font = 'bold 5px monospace'; ctx!.textAlign='center'; ctx!.textBaseline='middle';
        ctx!.fillText('$', 0, 0);
        ctx!.restore();
        ctx!.globalAlpha = 1;
      }
    }

    let moneyPulse = 0;
    let jumpTriggered = false;
    let animationId: number;

    function tick() {
      frame++;
      moneyPulse += 0.07;

      if (!robot.reachedMoney) {
        const targetX = robot.targetPlatIdx < platforms.length
          ? platforms[robot.targetPlatIdx].x + PLAT_W/2 - 12
          : MONEY_X - 12;

        if (!robot.jumping) {
          robot.legPhase += 0.18;
          const dist = targetX - robot.x;
          if (dist > 4) {
            robot.x += Math.min(2.5, dist * 0.06);
          } else {
            const onPlat = robot.targetPlatIdx < platforms.length;
            if (onPlat && !robot.landed.includes(robot.targetPlatIdx)) {
              robot.landed.push(robot.targetPlatIdx);
              const p = platforms[robot.targetPlatIdx];
              spawnSparks(robot.x + 12, robot.y - 5, p.color);
            }
            if (!jumpTriggered) {
              jumpTriggered = true;
              setTimeout(() => {
                robot.jumping = true;
                robot.vy = -10;
                jumpTriggered = false;
                robot.targetPlatIdx++;
              }, 200);
            }
          }
          robot.y = GROUND;
        } else {
          robot.vy += 0.55;
          robot.y += robot.vy;
          robot.x += 2.2;
          robot.legPhase += 0.05;

          const landY = GROUND;
          if (robot.y >= landY) {
            robot.y = landY;
            robot.jumping = false;
            robot.vy = 0;

            if (robot.targetPlatIdx >= platforms.length && robot.x >= MONEY_X - 20) {
              robot.reachedMoney = true;
              robot.celebrating = true;
              spawnCoins(robot.x + 12, robot.y - 20);
              spawnCoins(robot.x + 12, robot.y - 20);
            }
          }
        }
      } else {
        robot.celebrateFrame++;
        if (robot.celebrateFrame % 40 === 0) spawnCoins(robot.x + 12, robot.y - 30);
        robot.legPhase += 0.3;
      }

      ctx!.clearRect(0, 0, W, H);
      drawGrid();
      drawGround();

      platforms.forEach((p, i) => drawPlatform(p, robot.landed.includes(i)));

      const moneyY = GROUND - 30;
      drawMoneyIcon(MONEY_X, moneyY, 18, moneyPulse);

      ctx!.strokeStyle = robot.reachedMoney ? '#ffd700' : '#1a3a10';
      ctx!.lineWidth = 0.5; ctx!.setLineDash([4,4]);
      ctx!.beginPath();
      platforms.forEach((p, i) => {
        const px = p.x + PLAT_W/2;
        if (i === 0) ctx!.moveTo(30, GROUND); else ctx!.lineTo(px, PLAT_Y - PLAT_H);
        ctx!.lineTo(px, PLAT_Y - PLAT_H);
      });
      ctx!.lineTo(MONEY_X, moneyY + 18);
      ctx!.stroke(); ctx!.setLineDash([]);

      updateAndDrawSparks();
      updateAndDrawCoins();
      drawRobot(robot.x, robot.y, robot.legPhase, robot.jumping, robot.celebrating, robot.celebrateFrame);

      animationId = requestAnimationFrame(tick);
    }

    animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width="640" 
      height="160" 
      className="w-full h-auto bg-[#080808] rounded-xl border border-zinc-900/50"
    />
  );
}
