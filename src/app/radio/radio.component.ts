import { Component, OnInit } from '@angular/core';
import radioJson from '../../data/radioJson.json';
import { Radio } from './radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent implements OnInit {
  title: string = 'radio singulars';
  buttonName: string = 'Search';
  radioStations: Radio[] = [];
  inputValue!: string;
  filterArray!: Radio[];

  getTitle() {
    return this.title;
  }

  searchRadio() {
    this.filterArray = this.radioStations.filter((radio: Radio) => 
     radio.name.includes(this.inputValue)
    );
  }

  ngOnInit(): void {
    this.radioStations = radioJson;
  }
}
