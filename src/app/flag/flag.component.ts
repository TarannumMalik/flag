import { Component, AfterViewInit, ElementRef, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements AfterViewInit {
  @ViewChild('flagCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private t: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvasRef.nativeElement;
      this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
      this.width = canvas.width = window.innerWidth;
      this.height = canvas.height = window.innerHeight;
      this.startAnimation();
    }
  }

  private flagflow(a: number, b: number, t: number): void {
    this.context.lineWidth = 0.5;
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.width, this.height);

    // Orange
    for (let i = -60; i < 60; i += 1) {
      this.context.strokeStyle = 'rgba(255,153,51,0.8)';
      this.context.beginPath();
      this.context.moveTo(0, this.height / 2);
      for (let j = 0; j < this.width; j += 10) {
        this.context.lineTo(
          10 * Math.sin(i / 10) + j + 0.008 * j * j,
          Math.floor(
            this.height / 2 +
            (j / 2) * Math.sin(j / 50 - t / 50 - i / 118) +
            (i * 0.9) * Math.cos(j / 25 - (i + t) / 65)
          )
        );
      }
      this.context.stroke();
    }

    // Green 
    const verticalOffset = 100; 
    for (let i = -60; i < 60; i += 1) {
      this.context.strokeStyle = 'rgba(19,136,8,0.5)';
      this.context.beginPath();
      this.context.moveTo(0, this.height / 2);
      for (let j = 0; j < this.width; j += 10) {
        this.context.lineTo(
          10 * Math.sin(i / 10) + j + 0.008 * j * j,
          Math.floor(
            this.height / 2 +
            verticalOffset + 
            (j / 2) * Math.sin(j / 50 - t / 50 - i / 118) +
            (i * 0.9) * Math.cos(j / 25 - (i + t) / 65)
          )
        );
      }
      this.context.stroke();
    }
  }

  private startAnimation(): void {
    const animate = () => {
      window.requestAnimationFrame(animate);
      this.t += 1;
      this.flagflow(33, 52 * Math.sin(this.t / 2400), this.t);
    };
    animate();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvasRef.nativeElement;
      this.width = canvas.width = window.innerWidth;
      this.height = canvas.height = window.innerHeight;
      this.context.fillStyle = 'hsla(277,95%,55%,1)';
    }
  }
}
