import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {forkJoin, from, Observable, timer} from 'rxjs';
import {concatMap, delay, map, shareReplay, switchMap, tap, toArray} from 'rxjs/operators';
import { AudioData, AudioRequest, Customers, TextSpeech } from './text-to-speech';
import { GoogleApi } from '../google-api';
const REFRESH_INTERVAL = 15000;
const REFRESH_INTERVAL_SPEAKER = 8000;

@Injectable()
export class TextToSpeechService  {
  private customers$: Observable<Customers> | null | undefined;
  pageNumber: number;
  limitPage = 1;
  startPage = 1;
  size = 10;

  constructor(injector: Injector, private httpClient: HttpClient) {
   // super(injector);
  }
  getVoice(text: string): Observable<AudioData> {
    const params = new HttpParams().set('key', GoogleApi.texttospeech.key);
    const ssml = `<speak>${text.replace('-', '<break time=\"0.5s\"/>')}</speak>`;
    const body: AudioRequest = {
      input: { ssml },
      audioConfig: { audioEncoding: 'MP3', pitch: '0.00', speakingRate: '1.00' },
      voice: { languageCode: 'vi-VN', ssmlGender: 'FEMALE' }
    };

    return this.httpClient.post<AudioData>(GoogleApi.texttospeech.url, body, { params });
  }
}
