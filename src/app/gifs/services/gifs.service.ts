import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';



@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) { this.loadLocalStorage(); console.log('service localStart') }

  public gifList: Gif[] = []

  private APIKEY: string = 'kZM13kLnRNOjSunrD16B3QAxxOpQE4a8';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs/'
  private _tagsHistory: string[] = []

  private organizeHistory(tag: string) {

    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {

      this._tagsHistory = this._tagsHistory
        .filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10)
    this.saveLocalStorage()
  }

  get tagsHistory() {
    return [ ...this._tagsHistory ]
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return
  this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
   if(this._tagsHistory.length ===0) return
   this.searchTag(this._tagsHistory[0])

  }
    searchTag(tag: string): void {
      if(tag === '' || tag.length === 0) return;
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.APIKEY)
      .set('limit', '10')
      .set('q', tag)
    this.http.get<SearchResponse>(`${this.serviceUrl}search?`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data
        console.log({ gif: this.gifList })
      })
    /*  fetch('https://api.giphy.com/v1/gifs/search?api_key=kZM13kLnRNOjSunrD16B3QAxxOpQE4a8&q=valorant&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips')
       .then(res => res.json())
       .then(data => console.log(data)) */
    //this._tagsHistory.unshift(tag);

  }
}
