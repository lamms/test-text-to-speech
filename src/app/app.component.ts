import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Injector, OnInit, ViewChild } from '@angular/core';
import { AudioData } from '../text-to-speech/text-to-speech';
import { TextToSpeechService } from '../text-to-speech/text-to-speech.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  audioData = undefined;
  title = 'Text to speech';
  constructor(
    injector: Injector,
    private textToSpeechService: TextToSpeechService,
    private sanitizer: DomSanitizer
  ) { }
  getVoice() {
    this.textToSpeechService
      .getVoice('Xe biển số 29S6-2 2 3 3 8 xin mời vào trong bãi gửi xe để làm thủ rục ')
      .subscribe((audioData: AudioData) => {
        this.audioData = this.transform('audio/mpeg', audioData.audioContent);
      });
  }
  transform(mimeType: string, base64Data: string): SafeResourceUrl {  
    return this.sanitizer.bypassSecurityTrustResourceUrl(
        
      `data:${mimeType};base64, ${base64Data}`
    );
  } 
  
} 
